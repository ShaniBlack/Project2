$(document).ready(function () {
  // blogContainer holds all of our posts Traveler
  const blogContainer = $('.blog-container')
  // const postCategorySelect = $('#category')
  // Variable to hold our posts
  let posts

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  const url = window.location.search
  let travelerId
  if (url.indexOf('?traveler_id=') !== -1) {
    travelerId = url.split('=')[1]
    getPosts(travelerId)
  } else {
    getPosts()
  }

  // This function grabs posts from the database and updates the view upDate
  function getPosts (traveler) {
    travelerId = traveler || ''
    if (travelerId) {
      travelerId = '/?traveler_id=' + travelerId
    }
    $.get('/api/posts' + travelerId, function (data) {
      console.log('Posts', data)
      posts = data
      if (!posts || !posts.length) {
        displayEmpty(traveler)
      } else {
        initializeRows()
      }
    })
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows () {
    blogContainer.empty()
    const postsToAdd = []
    for (let i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]))
    }
    blogContainer.append(postsToAdd)
  }

  // post.Traveler.id
  // This function constructs a post's HTML
  function createNewRow (post) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString()
    const newPostCard = $('<div>')
    newPostCard.css({

      width: '200px',
      height: '100px',
      overflow: 'scroll'

    })
    newPostCard.addClass('card')
    newPostCard.css({
      margin: '10px'
    })
    const newPostCardHeading = $('<div>')
    newPostCardHeading.addClass('card-header')
    const newPostTitle = $('<h5>')
    // const newPostDate = $('<small>')
    const newPostTraveler = $('<h6>')
    const newPostCardFooting = $('<div>')
    newPostCardFooting.addClass('card-Footer')
    newPostTraveler.text(` City:  ${post.city}   ` + ` Rating:  ${post.ratings}  `)
    newPostTraveler.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    })
    const journalBtn = $('<button>')
    journalBtn.text('journal')
    journalBtn.addClass('journal btn btn-info')

    const newPostCardBody = $('<div>')
    newPostCardBody.addClass('card-content')
    const newPostBody = $('<p>')
    newPostTitle.text(post.title + ' ')
    newPostBody.text(post.body)
    // newPostDate.text(formattedDate)
    // newPostTitle.append(newPostDate)
    // newPostCardHeading.append(deleteBtn)
    // newPostCardHeading.append(editBtn)
    newPostCardHeading.append(journalBtn)
    newPostCardHeading.append(newPostTitle)
    newPostCardHeading.append(newPostTraveler)
    newPostCardBody.append(newPostBody)
    newPostCardFooting.append(` Written by:  ${post.Traveler.name} ` + formattedDate)
    newPostCardFooting.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    })
    newPostCard.append(newPostCardHeading)
    newPostCard.append(newPostCardBody)
    newPostCard.append(newPostCardFooting)
    newPostCard.data('post', post)

    return newPostCard
  }

  // This function figures out which post we want to delete and then calls deletePost
  // function handlePostDelete () {
  //   const currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data('post')
  //   deletePost(currentPost.id)
  // }

  // This function figures out which post we want to edit and takes it to the appropriate url
  // function handlePostEdit () {
  //   const currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data('post')
  //   window.location.href = '/cms?post_id=' + currentPost.id
  // }

  // This function displays a message when there are no posts author
  function displayEmpty (id) {
    const query = window.location.search
    let partial = ''
    if (id) {
      partial = ' for Traveler #' + id
    }
    blogContainer.empty()
    const messageH2 = $('<h2>')
    messageH2.css({
      'text-align': 'center',
      'margin-top': '50px'
    })
    messageH2.html(`What are you waiting for,${partial}start telling everyone about your travels in  <a href='/cms${query}'>your littleTravelBook</a>.`)
    blogContainer.append(messageH2)
  }
})
