'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const productsEvents = require('./products/events')
const orderEvents = require('./orders/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  productsEvents.addProductHandlers()
  orderEvents.addOrderHandlers()
  productsEvents.onGetProducts()
  $('.sign-in-up-wrap').hide()
  $('.shopping-cart').hide()
  $('#change-password-wrap').hide()
  $('#sign-out').hide()
  $('#show-shopping-cart').hide()
  $('#show-change-password').hide()
  $('#show-past-orders').hide()
  $('#update-product').hide()
  $('.admin').hide()
  $('.orders-wrap').show()
  $('.add-product-button').hide()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
