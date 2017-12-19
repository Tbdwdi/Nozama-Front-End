'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const showOrder = require('../templates/single-order.hbs')
const getFormFields = require('../../../lib/get-form-fields.js')

const goHome = function () {
  $('#update-product').hide()
  $('.shopping-cart').hide()
  $('.order-wrap').html('')
  $('.orders-wrap').html('')
  $('#change-password-wrap').hide()
  $('.products-wrap').show()
}

const onGetProducts = function () {
  api.getProducts()
    .then(ui.onGetProductsSuccess)
    // .catch(ui.onGetProductsFailure)
}

// add product to users cart callback
const onAddProduct = function () {
  const currentId = $(event.target).parent().parent().data('id')
  const item = store.products.filter((product) => product.id === currentId)
  store.currentCart.currentProducts.push(item[0])
  $('.sign-message').text('Product added to cart')
  setTimeout(() => {
    $('.sign-message').text('')
  }, 2000)
}

const onUpdateProduct = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.updateProduct(data)
    .then(ui.updateSuccess)
    .catch(ui.updateFailure)
}

const onRemoveProduct = function (e) {
  e.preventDefault()
  api.deleteProduct($(e.target).parent().data('id'))
    .then(ui.deleteSuccess(e))
    .catch(ui.deleteFailure)
}

const onUpdateField = function (e) {
  e.preventDefault()
  store.id = $(e.target).parent().data('id')
  ui.populateUpdateFields(store.id)
}

const onCreateEvent = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.createProduct(data)
    .then(ui.createSuccess)
    .then(onGetProducts)
    .catch(ui.createFailure)
  $('#create-product').children('input').val('')
}

const addProductHandlers = function () {
  // $('.dummy-button-get-single').on('.click', onGetSingleProduct)
  $('.show-products-content').on('click', '.add-product-button', onAddProduct)
  $('.show-products-content').on('click', '.remove', onRemoveProduct)
  $('.show-products-content').on('click', '.update', onUpdateField)
  $('#update-product').on('submit', onUpdateProduct)
  $('#create-product').on('submit', onCreateEvent)
  $('#home').on('click', goHome)
}

// trying to loop through orders product id's and return each product in an array, then display each product in a template
const onGetOrderProducts = function (productArr) {
  store.myOrder.orderProducts = []

  const promiseProducts = function (productArr) {
    productArr = productArr.map(id => {
      return new Promise((resolve, reject) => {
        api.findProduct(id)
          .then(resolve)
          .catch(reject)
      })
    })
    return Promise.all(productArr)
  }

  promiseProducts(productArr)
    .then((products) => {
      $('.order-wrap').append(showOrder({ order: store.myOrder, products: products }))
    })
    .catch(() => $('.sign-message').text('Error getting order'))
}

module.exports = {
  onGetProducts,
  // onGetSingleProduct,
  addProductHandlers,
  onGetOrderProducts
}
