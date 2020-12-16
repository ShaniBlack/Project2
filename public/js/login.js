$(document).ready(() => {
    // Getting references to our form and inputs
    const loginForm = $('form.login')
    const emailInput = $('input#email-input')
    const passwordInput = $('input#password-input')

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on('submit', event => {
        event.preventDefault()
        const travelerData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        }

        if (!travelerData.email || !travelerData.password) {
            return
        }

        // If we have an email and password we run the loginTraveler function and clear the form
        loginTraveler(travelerData.email, travelerData.password)
        emailInput.val('')
        passwordInput.val('')
    })

    // loginTraveler does a post to our "api/login" route and if successful, redirects us the the members page
    function loginTraveler(email, password) {
        console.log(email, password)
        $.post('/api/login', {
                email: email,
                password: password
            })
            .then(() => {
                window.location.href = '/members'
                    // If there's an error, log the error
            })
            .catch(err => {
                console.log(err)
            })
    }
})