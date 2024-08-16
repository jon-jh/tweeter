/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  // 2. Move the call for the createTweet function and the .prepend function inside this loop so that they run for every object in the array.
  const renderTweets = (arrayOfTweets) => {
    for (const tweet of arrayOfTweets) {
      const $tweet = createTweet(tweet);
      // 1. Call the createTweet function and assign it's returned element to $tweet
      $postedTweetContainer.prepend($tweet);
      // $tweet manipulates the DOM, adding each tweet to the live webpage.
    }
  };

  const createTweet = (data) => {
    // HTML form template with proper ${} tags to match the servers response data.
    const $tweetTemplate = $(` 
    <article class="posted-tweet-container">
      <div class="posted-tweet-header">
        <div class="header-left">
          <img src="${data.user.avatars}" alt="img">
          <div class ="name">${data.user.name}</div>
        </div>
        <div class="header-right">${data.user.handle}</div>
      </div>
      <p id="content">${data.content.text}</p>
      <footer>
        <div class="posted-tweet-footer">
          <p id="created_at">${data.created_at}</p>
          <div>
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-square-up-right"></i>
            <i class="fa-solid fa-bookmark"></i>
          </div>
        </div>
      </footer>
    </article>   
    `);

    // Use the TimeAgo library which has been imported into index.html to format the created_at data which is currently just a number string.

    const formattedDate = timeago.format(data.created_at);
    $tweetTemplate.find('#created_at').text(formattedDate);
    return $tweetTemplate;
  };

  const $postedTweetContainer = $('#tweet-container');
  // Use the class id tweet-container which holds the posted tweet I want to copy.

  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (serverResponseTweets) => {
        // in the load tweets function, empty the posted tweet container.
        $postedTweetContainer.empty();
        // pass the response from the server into our renderTweets function.
        renderTweets(serverResponseTweets);
      }
    });
  };

  // Create HTML escape function so that code can not be run inside a user's tweet / post.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to show hidden messages
  function showMessage(message) {
    $('#message-container').text(message).slideDown().delay(4000).slideUp();
  }

  // jQery form made from existing new tweet container
  const $form = $('.new-tweet-container');

  // Allow form submission on Enter key
  $form.on('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      $form.submit();
    }
  });

  $form.on('submit', (event) => {
    event.preventDefault();// Prevent the default action of 'Submit" which reloads the page. This does not prevent the data from being submitted.

    if ($('.counter.negative').length > 0) {
      showMessage('Woops... over limit!');
      return;// Use jquery to check if the .counter.negative class exists (this is how to do so), if so, alert with message and return; (nothing).

    } else if ($('#tweet-text').val().trim() === '') {
      showMessage('What will you share today?');
      return;// Same thing but check if the value (contents of the text box) of the box label #tweet-text (id=tweet-text) is empty '' (.trim will make sure to remove any blank spaces just in case)
    }
    const tweetText = escape($('#tweet-text').val().trim());
    $('#tweet-text').val(tweetText);// Change the contents of the user text box into the text returned from the escape function, which removes any HTML coding.

    const formData = $form.serialize();// POST the serialized form data with ajax.

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      success: (newTweet) => {
        $('#tweet-text').val('');
        $('.counter').val(140);
        for (const tweet of newTweet) {
          // Create the new tweet element using createTweet function
          const $newTweet = createTweet(tweet);
          // Prepend the new tweet to the container
          $postedTweetContainer.prepend($newTweet);
        }
        loadTweets();
      }
      // Since the server response is an array of objects, it needs to be a loop which iterates the array.
    });
  });

  // On Page Load, load tweets.
  loadTweets();
});