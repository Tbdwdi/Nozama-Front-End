'use strict'
const store = require('../store')

const config = require('../config')

const getProducts = function () {
  return $.ajax({
    url: config.apiOrigin + '/products',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteProduct = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/products/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// const getSingleProduct = function () {
//   return $.ajax({
//     url: config.apiOrigin + '/products',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  getProducts,
  deleteProduct
}
