$(document).ready(function() {
    // Getting references to the name input and traveler container, as well as the table body
    const nameInput = $('#traveler-name')
    const travelerList = $('tbody')
    const travelerContainer = $('.traveler-container')
        // Adding event listeners to the form to create a new object, and the button to delete
        // an traveler
    $(document).on('submit', '#traveler-form', handleTravelerFormSubmit)
    $(document).on('click', '.delete-traveler', handleDeleteButtonPress)

    // Getting the initial list of travelers
    getTravelers()

    // A function to handle what happens when the form is submitted to create a new traveler
    function handleTravelerFormSubmit(event) {
        event.preventDefault()
            // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return
        }
        // Calling the upserttraveler function and passing in the value of the name input
        upsertTraveler({
            name: nameInput
                .val()
                .trim()
        })
    }

    // A function for creating an traveler. Calls gettravelers upon completion
    function upsertTraveler(travelerData) {
        $.post('/api/travelers', travelerData)
            .then(getTravelers)
    }

    // Function for creating a new list row for travelers
    function createTravelerRow(travelerData) {
        console.log(travelerData)
            // const formattedDate = new Date(travelerData.post.createdAt).toLocaleDateString()

        const newTr = $('<tr>')
        newTr.data('traveler', travelerData)
        newTr.append('<td>' + travelerData.name + '</td>')
            // newTr.append('<td>' + travelerData.body + '</td>')

        if (travelerData.Posts) {
            newTr.append('<td> ' + travelerData.Posts.length + '</td>')
        } else {
            newTr.append('<td>0</td>')
        }
        // if (travelerData.Posts) {
        //   newTr.append('<td> ' + travelerData.Posts.body + '</td>')
        // } else {
        //   newTr.append('<td>0</td>')
        // }
        // newTr.append("<td># of posts will display when we learn joins in the next activity!</td>");
        newTr.append("<td><a href='/blog?traveler_id=" + travelerData.id + "'>Go to Posts</a></td>")
        newTr.append("<td><a href='/review?traveler_id=" + travelerData.id + "'>Create a Post</a></td>")
        newTr.append("<td><a style='cursor:pointer;color:red' class='delete-traveler'>Delete traveler</a></td>")
        return newTr
    }

    // Function for retrieving travelers and getting them ready to be rendered to the page
    function getTravelers() {
        $.get('/api/travelers', function(data) {
            const rowsToAdd = []
            for (let i = 0; i < data.length; i++) {
                rowsToAdd.push(createTravelerRow(data[i]))
            }
            renderTravelerList(rowsToAdd)
            nameInput.val('')
        })
    }

    // A function for rendering the list of travelers to the page
    function renderTravelerList(rows) {
        travelerList.children().not(':last').remove()
        travelerContainer.children('.alert').remove()
        if (rows.length) {
            console.log(rows)
            travelerList.prepend(rows)
        } else {
            renderEmpty()
        }
    }

    // Function for handling what to render when there are no travelers
    function renderEmpty() {
        const alertDiv = $('<div>')
        alertDiv.addClass('alert alert-danger')
        alertDiv.text('You must create an traveler before you can create a Post.')
        travelerContainer.append(alertDiv)
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        const listItemData = $(this).parent('td').parent('tr').data('traveler')
        const id = listItemData.id
        $.ajax({
                method: 'DELETE',
                url: '/api/travelers/' + id
            })
            .then(getTravelers)
    }
})