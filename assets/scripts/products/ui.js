'use strict'

const store = require('../store')
const api = require('./api')
const showProductsHtml = require('../templates/show-products.hbs')

const deleteSuccess = function (event) {
  $('.sign-message').text('Product Deleted')
  $(event.target).parent().remove()
}

const deleteFailure = function () {
  $('.sign-message').text('Deletion Failed')
}

const updateSuccess = function () {
  $('#update-product').hide()
  $('.sign-message').text('Update Complete')
  api.getProducts()
    .then(onGetProductsSuccess)
    .then(() => {
      $('.add-product-button').show()
    })
    // .catch(onGetProductsFailure)
}

// Filling update form fields
const findSuccess = function (data) {
  const product = data.product
  $('.sign-message').text('Product retrieved')
  $('#update-name').attr('value', product.name)
  $('#update-description').attr('value', product.description)
  $('#update-url').attr('value', product.url)
  $('#update-stock').attr('value', product.stock)
  $('#update-price').attr('value', product.price)
  $('#update-product').show()
}

const findFailure = function () {
  $('.sign-message').text('Product not found')
}

// retrieves product information and calls a function to populate fields
const populateUpdateFields = function (id) {
  api.findProduct(id)
    .then(findSuccess)
    .catch(findFailure)
}

// Get products index ui show data
const onGetProductsSuccess = function (data) {
  store.products = data.products
  // $('.sign-message').text('store is ', store.products)
  const showProducts = showProductsHtml({ products: data.products })
  // clears list before appending (so you don't have duplicates)
  $('.show-products-content').html('')
  // append content to div
  $('.show-products-content').append(showProducts)
  $('.admin').hide()
  $('.add-product-button').hide()
  if (store.user.admin) {
    $('.admin').show()
  } else {
    $('.sign-message').text('you are not an admin')
  }
}

// Get products index show failure message + error
// const onGetProductsFailure = function () {
//   // $('.sign-message').text('get failure')
// }

const createSuccess = function () {
  $('.sign-message').text('Product Created')
}

const createFailure = function () {
  $('.sign-message').text('Product not created')
}

const getOrderProductSuccess = function (product) {
  store.myOrder.orderProducts.push(product.product)
  return store.myOrder.orderProducts
}

const getOrderProductFailure = function () {
  $('.sign-message').text('failed to get product')
}

module.exports = {
  onGetProductsSuccess,
  // onGetProductsFailure,
  updateSuccess,
  populateUpdateFields,
  deleteSuccess,
  deleteFailure,
  createSuccess,
  createFailure,
  getOrderProductSuccess,
  getOrderProductFailure
}
