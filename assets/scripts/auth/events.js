'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

// sign up callback function
const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// sign in callback function
const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

// sign out callback function
const onSignOut = function () {
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// show sign up and hide main content
const showSignUp = function () {
  $('.main').hide()
  $('.sign-in-up-wrap').show()
}

// change password callback function
const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changeSuccess)
    .catch(ui.changeFailure)
  $('#change-password').children('input').val('')
}

// show change password hide main content
const showChangePassword = function () {
  $('#update-product').hide()
  $('.shopping-cart').hide()
  $('.order-wrap').html('')
  $('.orders-wrap').html('')
  $('.products-wrap').hide()
  $('#change-password-wrap').show()
}

// click handlers
const addHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  // $('#show-sign-up').on('click', showSignUp)
  $('#show-sign-in-up').on('click', showSignUp)
  $('#show-change-password').on('click', showChangePassword)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {addHandlers}
