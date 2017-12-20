'use strict'
/* global StripeCheckout */

const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const $script = require('scriptjs')

// stripe script that adds modal to html and allows for ajax request
// to get a users token to be stored for their order
const checkout = function () {
  const handler = StripeCheckout.configure({
    key: 'pk_test_OTB8FL8IFKn9v24Qi7h64eCz',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
      if (token) {
        onSubmitCart()
      }
      const tokenData = {
        token: {
          token_id: token.id,
          total: (store.currentCart.cart.order.total * 100)
        }
      }
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
      const sendToken = function (data) {
        return $.ajax({
          url: 'https://still-thicket-16022.herokuapp.com/tokens',
          method: 'POST',
          data
        })
      }
      sendToken(tokenData)
        .then(() => {
          $('.sign-message').text('Payment Successful')
          hideCart()
        })
        .catch(() => {
          $('.sign-message').text('Payment Failed')
          hideCart()
        })
    }
  })
  document.getElementById('submit-cart-stripe').addEventListener('click', function (e) {
    // Open Checkout with further options:
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: (store.currentCart.cart.order.total * 100)
    })
    e.preventDefault()
  })
  // Close Checkout on page navigation:
  window.addEventListener('popstate', function () {
    handler.close()
  })
}

$script('https://checkout.stripe.com/checkout.js', checkout)

// show cart (hbs template) and hide products
const showCart = function () {
  $('.cart-products').html('')
  $('.products-wrap').hide()
  $('#change-password-wrap').hide()
  $('.shopping-cart').show()
  $('.order-wrap').html('')
  $('.orders-wrap').html('')
  ui.onShowCart()
}

// show products and hide users cart
const hideCart = function () {
  $('.shopping-cart').hide()
  $('#update-product').hide()
  $('.products-wrap').show()
  $('.cart-products').html('')
}

// submit cart items data to store.js
const onSubmitCart = function () {
  const productArray = store.currentCart.currentProducts
  productArray.forEach((product) => {
    store.currentCart.cart.order.products.push({
      product_id: product.id,
      quantity: 1
    })
  })
  api.submitOrder(store.currentCart.cart)
    .then(ui.submitOrderSuccess)
    .catch(ui.submitOrderFailure)
}

// remove product from users cart
const onRemoveProduct = function () {
  const productId = $(event.target).parent().data('id')
  const productArray = store.currentCart.currentProducts
  store.currentCart.currentProducts = productArray.filter((product) => {
    return product.id !== productId
  })
  hideCart()
  showCart()
}

const onShowOrders = function () {
  $('.orders-wrap').html('')
  api.showOrders()
    .then(ui.showOrdersSuccess)
    .catch(ui.showOrdersFailure)
  $('.products-wrap').hide()
  $('.shopping-cart').hide()
  $('#change-password-wrap').hide()
  $('.orders-wrap').show()
}

// const onGetOrder = function (event) {
//   const id = $(event.target).parent().parent().parent().data('id')
//   api.getOrder(id)
//     .then(ui.getOrderSuccess)
//     .catch(ui.getOrderFailure)
// }

const addOrderHandlers = function () {
  $('#show-shopping-cart').on('click', showCart)
  $('#exit-cart').on('click', hideCart)
  $('#submit-cart').on('click', onSubmitCart)
  $('.cart-products').on('click', '.remove-product', onRemoveProduct)
  $('#show-past-orders').on('click', onShowOrders)
  // $('.orders-wrap').on('click', '.get-order', onGetOrder)
}

module.exports = {
  addOrderHandlers
}
