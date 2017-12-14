'use strict'

// const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onGetProducts = function (event) {
  event.preventDefault()
  api.getProducts()
    .then(ui.onGetProductsSuccess)
    .catch(ui.onGetProductsFailure)
}

// const onGetSingleProduct = function (event) {
//   event.preventDefault()
//   api.getSingleProduct()
//     .then(ui.onGetSingleProductSuccess)
//     .catch(ui.onGetSingleProductFailure)
// }

const addProductHandlers = function () {
  $('.dummy-button-get').on('click', onGetProducts)
  // $('.dummy-button-get-single').on('.click', onGetSingleProduct)
}

module.exports = {
  onGetProducts,
  // onGetSingleProduct,
  addProductHandlers
}
