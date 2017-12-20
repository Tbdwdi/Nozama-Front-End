'use strict'
const store = require('../store')

// display message on sign up success
const signUpSuccess = function (data) {
  $('.sign-message').text('You signed-up successfully!')
  $('.form-control').val('')
}

// display message on sign up failure
const signUpFailure = function () {
  $('.sign-message').text('Please enter a valid email address and matching passwords')
  $('.form-control').val('')
}

// display message on sign in success
const signInSuccess = function (data) {
  store.user = data.user
  $('.sign-message').text('You have signed in successfully')
  $('.main').show()
  $('.sign-in-up-wrap').hide()
  $('#sign-out').show()
  $('#show-shopping-cart').show()
  $('#show-change-password').show()
  $('#show-past-orders').show()
  $('.form-control').val('')
  $('#show-sign-in-up').hide()
  $('#show-sign-up').hide()
  $('.add-product-button').show()
  if (store.user.admin) {
    $('.admin').show()
    $('.user-btn').hide()
  }
  // reminder from brian { add html classes to clear forms }
}

// display message on sign in failure
const signInFailure = function () {
  $('.sign-message').text('Error on sign in')
  $('.form-control').val('')
}

// display message on sign out success
// hide main div and show sign-in/up form
const signOutSuccess = function () {
  $('.sign-message').text('You have signed out successfully')
  $('.main').show()
  $('.products-wrap').show()
  $('.order-wrap').hide()
  $('.orders-wrap').hide()
  $('.shopping-cart').hide()
  $('#show-change-password').hide()
  $('.admin').hide()
  $('#sign-out').hide()
  $('#show-past-orders').hide()
  $('#show-shopping-cart').hide()
  $('#show-sign-in-up').show()
  $('#show-sign-up').show()
  $('.add-product-button').hide()
  $('#update-product').hide()
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
  // reminder from brian { add html classes to clear forms }
}

// display message on sign out failure
const signOutFailure = function () {
  $('.sign-message').text('Error signing out')
}

// display message on change password success
const changeSuccess = function () {
  $('.sign-message').text('You have changed password successfully')
  $('#change-password-wrap').hide()
  $('.products-wrap').show()
  $('.form-control').val('')
}

// display message on change password failure
const changeFailure = function () {
  $('.sign-message').text('Error changing password')
  $('.form-control').val('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changeSuccess,
  changeFailure
}
