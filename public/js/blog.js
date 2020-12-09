$(document).ready(function () {
  // blogContainer holds all of our posts
  const blogContainer = $('.blog-container')
  const postCategorySelect = $('#category')
  // Click events for the edit and delete buttons
  $(document).on('click', 'button.delete', handlePostDelete)
  $(document).on('click', 'button.edit', handlePostEdit)
  // Variable to hold our posts
  let posts

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  const url = window.location.search
  let authorId
  if (url.indexOf('?author_id=') !== -1) {
    authorId = url.split('=')[1]
    getPosts(authorId)
  } else {
    getPosts()
  }

  // This function grabs posts from the database and updates the view
  function getPosts (author) {
    authorId = author || ''
    if (authorId) {
      authorId = '/?author_id=' + authorId
    }
    $.get('/api/posts' + authorId, function (data) {
      console.log('Posts', data)
      posts = data
      if (!posts || !posts.length) {
        displayEmpty(author)
      } else {
        initializeRows()
      }
    })
  }

  // This function does an API call to delete posts
  function deletePost (id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/posts/' + id
    })
      .then(function () {
        getPosts(postCategorySelect.val())
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

  // This function constructs a post's HTML
  function createNewRow (post) {
    const formattedDate = new Date(post.createdAt).toLocaleDateString()
    const newPostCard = $('<div>')
    newPostCard.addClass('card')
    const newPostCardHeading = $('<div>')
    newPostCardHeading.addClass('card-header')
    const deleteBtn = $('<button>')
    deleteBtn.text('x')
    deleteBtn.addClass('delete btn btn-danger')
    const editBtn = $('<button>')
    editBtn.text('EDIT')
    editBtn.addClass('edit btn btn-info')
    const newPostTitle = $('<h2>')
    const newPostDate = $('<small>')
    const newPostAuthor = $('<h5>')
    newPostAuthor.text('Written by: ' + post.Author.name)
    newPostAuthor.css({
      float: 'right',
      color: 'blue',
      'margin-top':
      '-10px'
    })
    const newPostCardBody = $('<div>')
    newPostCardBody.addClass('card-body')
    const newPostBody = $('<p>')
    newPostTitle.text(post.title + ' ')
    newPostBody.text(post.body)
    newPostDate.text(formattedDate)
    newPostTitle.append(newPostDate)
    newPostCardHeading.append(deleteBtn)
    newPostCardHeading.append(editBtn)
    newPostCardHeading.append(newPostTitle)
    newPostCardHeading.append(newPostAuthor)
    newPostCardBody.append(newPostBody)
    newPostCard.append(newPostCardHeading)
    newPostCard.append(newPostCardBody)
    newPostCard.data('post', post)
    return newPostCard
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete () {
    const currentPost = $(this)
      .parent()
      .parent()
      .data('post')
    deletePost(currentPost.id)
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit () {
    const currentPost = $(this)
      .parent()
      .parent()
      .data('post')
    window.location.href = '/cms?post_id=' + currentPost.id
  }

  // This function displays a message when there are no posts
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
