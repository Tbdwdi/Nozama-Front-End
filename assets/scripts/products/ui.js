'use strict'

// Get products index ui show data
const onGetProductsSuccess = function (data) {
  console.log('get success')
  console.log('data is', data)
}

// Get products index show failure message + error
const onGetProductsFailure = function (error) {
  console.log('get failure')
  console.log(error)
}

module.exports = {
  onGetProductsSuccess,
  onGetProductsFailure
}
