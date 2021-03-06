console.log('hello world')
$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup')
  const name = $('input#name')
  const emailInput = $('input#email-input')
  const passwordInput = $('input#password-input')

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', event => {
    console.log('test')
    event.preventDefault()
    const travelerData = {
      name: name.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    }

    if (!travelerData.email || !travelerData.password) {
      return
    }
    // If we have an email and password, run the signUpTraveler function
    signUpTraveler(travelerData.name, travelerData.email, travelerData.password)
    name.val('')
    emailInput.val('')
    passwordInput.val('')
  })

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpTraveler (name, email, password) {
    $.post('/api/signup', {
      name: name,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace('/members')
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr)
  }

  function handleLoginErr (err) {
    $('#alert .msg').text(err.responseJSON)
    $('#alert').fadeIn(500)
  }
})
