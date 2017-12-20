'use strict'

const store = require('../store')
const orders = require('../templates/orders.hbs')
const cart = require('../templates/cart.hbs')
const prodEvents = require('../products/events.js')

// show users stored products
const onShowCart = function () {
  const data = store.currentCart.currentProducts
  if (store.currentCart.currentProducts.length > 0) {
    const total = data.map((item) => item.price).reduce((acc, price) => acc + price)
    store.currentCart.cart.order.total = total
    $('.cart-products').append(cart({ products: data, cartTotal: total }))
    $('.order-wrap').html('')
    $('#submit-cart-stripe').show()
  } else {
    $('.cart-products').append('You have no products in your cart')
    $('#submit-cart-stripe').hide()
  }
}

// success message to submit users stored data to orders
const submitOrderSuccess = function () {
  $('.sign-message').text('Successfully posted an order!')
  store.currentCart = {
    cart: {
      order: {
        products: [],
        total: 0
      }
    },
    currentProducts: []
  }
  store.myOrders = []
  store.productIdArr = []
}

// failure message for submit order
const submitOrderFailure = function () {
  $('.sign-message').text('Order not posted successfully')
}

const showOrdersSuccess = function (data) {
  store.myOrders = data.orders.filter(order => {
    return order._owner === store.user.id
  })
  if (store.myOrders.length > 0) {
    $('.orders-wrap').append(orders({ orders: store.myOrders }))
  } else {
    $('.orders-wrap').append('<p>You have no orders</p>')
  }
}

const showOrdersFailure = function () {
  $('.sign-message').text('failed getting orders')
}

const getOrderSuccess = function (data) {
  store.myOrder = data.order
  displayOrder(store.myOrder)
}

const getOrderFailure = function (data) {
  $('.sign-message').text('get order failure')
}

const displayOrder = function (order) {
  const products = store.myOrder.products
  store.productIdArr = []
  products.forEach(product => {
    store.productIdArr.push(product.product_id)
  })
  prodEvents.onGetOrderProducts(store.productIdArr)
}

module.exports = {
  onShowCart,
  submitOrderSuccess,
  submitOrderFailure,
  showOrdersSuccess,
  showOrdersFailure,
  getOrderSuccess,
  getOrderFailure
}
