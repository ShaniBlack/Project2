$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  const bodyInput = $('#body')
  const titleInput = $('#title')
  const cmsForm = $('#cms')
  const travelerSelect = $('#traveler')
  // Adding an event listener for when the form is submitted
  $(cmsForm).on('submit', handleFormSubmit)
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  const url = window.location.search
  let postId
  let travelerId
  // Sets a flag for whether or not we're updating a post to be false initially
  let updating = false

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf('?post_id=') !== -1) {
    postId = url.split('=')[1]
    getPostData(postId, 'post')
  } else if (url.indexOf('?traveler_id=') !== -1) {
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author

    travelerId = url.split('=')[1]
  }

  // Getting the authors, and their posts
  getTravelers()

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit (event) {
    event.preventDefault()
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !travelerSelect.val()) {
      return
    }
    // Constructing a newPost object to hand to the database
    const newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      TravelerrId: travelerSelect.val()
    }

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId
      updatePost(newPost)
    } else {
      submitPost(newPost)
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitPost (post) {
    $.post('/api/posts', post, function () {
      window.location.href = '/blog'
    })
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getPostData (id, type) {
    let queryUrl
    switch (type) {
      case 'post':
        queryUrl = '/api/posts/' + id
        break
      case 'traveler':
        queryUrl = '/api/travelers/' + id
        break
      default:
        return
    }
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data.TravelerId || data.id)
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title)
        bodyInput.val(data.body)
        travelerId = data.travelerrId || data.id
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true
      }
    })
  }

  // A function to get Authors and then render our list of Authors
  function getTravelers () {
    $.get('/api/travlers', renderTravelerList)
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderTravelerList (data) {
    if (!data.length) {
      window.location.href = '/travelers'
    }
    $('.hidden').removeClass('hidden')
    const rowsToAdd = []
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createTravelerRow(data[i]))
    }
    travelerSelect.empty()
    console.log(rowsToAdd)
    console.log(travelerSelect)
    travelerSelect.append(rowsToAdd)
    travelerSelect.val(travelerId)
  }

  // Creates the author options in the dropdown
  function createTravelerRow (author) {
    const listOption = $('<option>')
    listOption.attr('value', author.id)
    listOption.text(author.name)
    return listOption
  }

  // Update a given post, bring user to the blog page when done
  function updatePost (post) {
    $.ajax({
      method: 'PUT',
      url: '/api/posts',
      data: post
    })
      .then(function () {
        window.location.href = '/blog'
      })
  }
})
