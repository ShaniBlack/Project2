$(document).ready(function() {
    $.get('/api/user_data').then(data => {
        console.log('user data', data.name)
        console.log('user id', data.id)
        $('#travelerId').val(data.id)
        $('#travelerName').val(data.name)
    })

    const fileInput = document.querySelector('#fileUpload input[type=file]')

    fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
            const fileName = document.querySelector('#fileUpload .file-name')
            fileName.textContent = fileInput.files[0].name
        }
    }
})

// Getting jQuery references to the post body, title, form, and traveler select
// const bodyInput = $('#body')
// const titleInput = $('#title')
// const cityInput = $('#city')
// const lodgingInput = $('#lodging')
// const ratingsInput = $('#ratings')
// const imageName = ''
// const imageUrl = ''
// const reviewForm = $('#review')
// const travelerSelect = $('#traveler')
// Adding an event listener for when the form is submitted traveler author updating
// $(reviewForm).on('submit', handleFormSubmit)

// Gets the part of the url that comes after the "?" (which we have if we're updating a post)
// const url = window.location.search
// let postId
// let travelerId
// Sets a flag for whether or not we're updating a post to be false initially
// const updating = false
// const journaling = false


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

//     const newPost = {
//         title: titleInput
//             .val()
//             .trim(),
//         city: cityInput
//             .val()
//             .trim(),
//         lodging: lodgingInput
//             .val()
//             .trim(),
//         ratings: ratingsInput
//             .val()
//             .trim(),
//         body: bodyInput
//             .val()
//             .trim(),
//         imageURL: imagePath,
//         TravelerId: travelerSelect.val()
//     }

//     // If we're updating a post run updatePost to update a post
//     // Otherwise run submitPost to create a whole new post
//     if (updating) {
//         newPost.id = postId
//         updatePost(newPost)
//             // uploadImage(event)
//     } else {
//         submitPost(newPost)
//             // uploadImage(event)
//     }
// }

// Submits a new post and brings user to blog page upon completion
// function submitPost(post) {
//     $.post('/api/posts', post, function() {
//         window.location.href = '/blog'
//     })
// }

// function journalEntry(post) {
//     $.post('/api/posts', post, function() {
//         window.location.href = '/members'
//     })
// }

// Gets post data for the current post if we're editing, or if we're adding to an traveler's existing posts
// function getPostData(id, type) {
//     let queryUrl
//     switch (type) {
//         case 'post':
//             queryUrl = '/api/posts/' + id
//             break
//         case 'traveler':
//             queryUrl = '/api/travelers/' + id
//             break
//         default:
//             return
//     }
//     $.get(queryUrl, function(data) {
//         if (data) {
//             console.log(data.TravelerId || data.id)
//                 // If this post exists, prefill our review forms with its data
//             titleInput.val(data.title)
//             cityInput.val(data.city)
//             lodgingInput.val(data.lodging)
//             ratingsInput.val(data.ratings)
//             bodyInput.val(data.body)
//             travelerId = data.TravelerId || data.id
//                 // If we have a post with this id, set a flag for us to know to update the post
//                 // when we hit submit
//             updating = true
//         }
//     })
// }

// $.get(queryUrl, function(data) {
//     if (data) {
//         console.log(data.TravelerId || data.id)
//             // If this post exists, prefill our review forms with its data
//         titleInput.val(data.title)
//         cityInput.val(data.city)
//         lodgingInput.val(data.lodging)
//         ratingsInput.val(data.ratings)
//         bodyInput.val(data.body)
//         travelerId = data.TravelerId || data.id
//             // If we have a post with this id, set a flag for us to know to update the post
//             // when we hit submit
//         updating = true
//     }
// })
// $.get(queryUrl, function(data) {
//     if (data) {
//         console.log(data.TravelerId || data.id)
//             // If this post exists, prefill our review forms with its data
//         titleInput.val(data.title)
//         cityInput.val(data.city)
//         lodgingInput.val(data.lodging)
//         ratingsInput.val(data.ratings)
//         bodyInput.val(data.body)
//         travelerId = data.TravelerId || data.id
//             // If we have a post with this id, set a flag for us to know to update the post
//             // when we hit submit
//         journaling = true
//     }
// })

// A function to get Authors and then render our list of Authors
// function getTravelers () {
//   $.get('/api/travelers', renderTravelerList)
// }
// Function to either render a list of authors, or if there are none, direct the traveler to the page
// to create an author first
// function renderTravelerList (data) {
//   if (!data.length) {
//     window.location.href = '/travelers'
//   }
//   const rowsToAdd = []
//   for (let i = 0; i < data.length; i++) {
//     rowsToAdd.push(createTravelerRow(data[i]))
//   }
//   travelerSelect.empty()
//   console.log(rowsToAdd)
//   console.log(travelerSelect)
//   travelerSelect.append(rowsToAdd)
//   travelerSelect.val(travelerId)
// }

// Creates the traveler options in the dropdown !!!!!!!! exact same but no option except signed iD can write post !!!
//   function createTravelerRow (traveler) {
//     const listOption = $('<option>')
//     listOption.attr('value', traveler.id)
//     listOption.text(traveler.name)
//     return listOption
//   }
// })
// Update a given post, bring traveler to the blog page when done
// function updatePost(post) {
//     $.ajax({
//             method: 'PUT',
//             url: '/api/posts',
//             data: post
//         })
//         .then(function() {
//             window.location.href = '/blog'
//         })
// }

// // Update a given post, bring user to the blog page when done
// function updatePost(post) {
//     $.ajax({
//             method: 'PUT',
//             url: '/api/posts',
//             data: post
//         })
//         .then(function() {
//             window.location.href = '/blog'
//         })
// }

//     $(reviewForm).on('journal', handleFormJournal)

//     function handleFormJournal(event) {
//         event.preventDefault()
//             // Wont submit the post if we are missing a body, title, or traveler
//         if (!titleInput.val().trim() || !bodyInput.val().trim() || !travelerSelect.val()) {
//             return
//         }
//         // Constructing a newPost object to hand to the database
//         const newPost = {
//             title: titleInput
//                 .val()
//                 .trim(),
//             city: cityInput
//                 .val()
//                 .trim(),
//             lodging: lodgingInput
//                 .val()
//                 .trim(),
//             ratings: ratingsInput
//                 .val()
//                 .trim(),
//             body: bodyInput
//                 .val()
//                 .trim(),
//             TravelerId: travelerSelect.val()
//         }
//         if (journaling) {
//             newPost.id = postId
//             journalPost(newPost)
//         } else {
//             journalEntry(newPost)
//         }

//         function journalPost(post) {
//             $.ajax({
//                     method: 'PUT',
//                     url: '/api/posts',
//                     data: post
//                 })
//                 .then(function() {
//                     window.location.href = '/members'
//                 })