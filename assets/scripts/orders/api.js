'use strict'

const config = require('../config')
const store = require('../store')

// ajax call to create an order
const submitOrder = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showOrders = function () {
  return $.ajax({
    url: config.apiOrigin + '/orders',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getOrder = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/orders/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  submitOrder,
  showOrders,
  getOrder
}
