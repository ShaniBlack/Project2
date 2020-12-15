$(document).ready(function () {
  $.get('/api/user_data').then(data => {
    console.log('user data', data.name)
    console.log('user id', data.id)
    $('#travelerId').val(data.id)
    $('#travelerName').val(data.name)
  })
  // Getting jQuery references to the post body, title, form, and traveler select
  // const bodyInput = $('#body')
  // const titleInput = $('#title')
  // const cityInput = $('#city')
  // const lodgingInput = $('#lodging')
  // const ratingsInput = $('#ratings')
  // const imageName = ''
  // const imageUrl = ''
  // const cmsForm = $('#cms')
  // const travelerSelect = $('#traveler')
  // Adding an event listener for when the form is submitted traveler author updating
  // $(cmsForm).on('submit', handleFormSubmit)

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  // const url = window.location.search
  // let postId
  // let travelerId
  // Sets a flag for whether or not we're updating a post to be false initially
  // const updating = false
  // const journaling = false

  const fileInput = document.querySelector('#fileUpload input[type=file]')

  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#fileUpload .file-name')
      fileName.textContent = fileInput.files[0].name
      // imageName = fileName.textContent
      // imagePath = 'assets/file_uploads/' + imageName
    }
  }
})

// function uploadImage (data) {
//   $.post('/api/upload', data, function () {
//     console.log('hello')
//   })
// }

// If we have this section in our url, we pull out the post id from the url
// In '?post_id=1', postId is 1

// if (url.indexOf('?post_id=') !== -1) {
//   postId = url.split('=')[1]
//   getPostData(postId, 'post')
// } else if (url.indexOf('?traveler_id=') !== -1) {
//   travelerId = url.split('=')[1]
//   // Otherwise if we have an traveler_id in our url, preset the traveler select box to be our traveler
// }

// Getting the travelers, and their posts
// getTravelers()

// A function for handling what happens when the form to create a new post is submitted
// function handleFormSubmit(event) {
//     console.log('event', event)
//     console.log('fileinput 0', fileInput.files[0])
//     event.preventDefault()
//         // uploadImage(event)
//         // Wont submit the post if we are missing a body, title, or traveler
//     if (!titleInput.val().trim() || !bodyInput.val().trim() || !travelerSelect.val()) {
//         return
//     }
//     // Constructing a newPost object to hand to the database
