$(document).ready(function () {
  // blogContainer holds all of our posts Traveler
  const blogContainer = $('.blog-container')
  // $(document).on('click', 'button.save', handlePostSave)
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
    // /api/posts/:traveler_id
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
    newPostCard.addClass('card')
    newPostCard.css({
      margin: '10px'
    })
    const newPostCardHeading = $('<div>')
    newPostCardHeading.addClass('blog-header has-text-black')
    const newPostTitle = $('<h5>')
    const newPostTraveler = $('<h6>')
    const newPostCardFooting = $('<div>')

    const journalBtn = $('<button>')
    journalBtn.text('journal')
    journalBtn.addClass('journal btn btn-info')
    newPostTraveler.text(`Country:  ${post.title}   City:  ${post.city}   Rating:  ${post.ratings}  `)
    newPostCardFooting.addClass('blog-footer has-text-black')

    // const saveBtn = $('<button>')
    // saveBtn.addClass('save btn btn-link').text('save')

    const newPostCardBody = $('<div>')
    newPostCardBody.addClass('card-content')
    const newPostBody = $('<p>')
    newPostBody.text(post.body)
    // const newPostImg = $(`<img src="${post.imageURL}" alt="" srcset="">`)
    // newPostCardHeading.append(saveBtn)

    newPostCardHeading.append(newPostTitle)
    newPostCardHeading.append(newPostTraveler)
    // newPostCard.append(newPostImg)
    newPostCardBody.append(newPostBody)
    // newPostCardHeading.append(saveBtn)

    newPostCardFooting.append(`<div><a href='/blog?traveler_id=${post.Traveler.id}'>Written by: ${post.Traveler.name} ${formattedDate}</a></div>`)
    // newPostCardFooting.append(` Written by:  ${post.Traveler.name} ${formattedDate}`)
    newPostCard.append(newPostCardHeading)
    newPostCard.append(newPostCardBody)
    newPostCard.append(newPostCardFooting)
    newPostCard.data('post', post)

    return newPostCard
  }

  // function handlePostSave () {
  //   const currentPost = $(this)
  //     .parent()
  //     .parent()
  //     .data('post')
  //   window.location.href = '/blog?post_id=' + currentPost.id
  // }
  // This function displays a message when there are no posts author
  function displayEmpty (id) {
    const query = window.location.search
    let partial = ''
    if (id) {
      partial = ' for Author #' + id
    }
    blogContainer.empty()
    const messageH2 = $('<h2>')
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' })
    messageH2.html('No posts yet' + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.")
    blogContainer.append(messageH2)
  }
})
