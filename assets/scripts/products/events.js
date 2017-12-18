'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const getFormFields = require(`../../../lib/get-form-fields`)

const onGetProducts = function (event) {
  event.preventDefault()
  api.getProducts()
    .then(ui.onGetProductsSuccess)
    .catch(ui.onGetProductsFailure)
}

const onAddProduct = function () {
  const currentId = $(event.target).parent().parent().data('id')
  const item = store.products.filter((product) => product.id === currentId)
  store.currentCart.currentProducts.push(item[0])
  console.log('current products are ', store.currentCart.currentProducts)
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

const addProductHandlers = function () {
  $('.dummy-button-get').on('click', onGetProducts)
  // $('.dummy-button-get-single').on('.click', onGetSingleProduct)
  $('.show-products-content').on('click', '.add-product-button', onAddProduct)
  $('.show-products-content').on('click', '.remove', onRemoveProduct)
  $('.show-products-content').on('click', '.update', onUpdateField)
  $('#update-product').on('submit', onUpdateProduct)
  console.log('this happens')
}

module.exports = {
  onGetProducts,
  // onGetSingleProduct,
  addProductHandlers
}
