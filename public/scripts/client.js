/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  console.log('Inside the client.js file.');

  // 5. Create Test Data Object
  const someTestData = {
    user: {
      name: 'Largehands',
      avatars: src = "/images/halo.png",
      handle: '@halo_elite',
    },
    content: {
      text: 'Aaaah! Wubadaugh!!!'
    },
    created_at: 1
  };

  // 7. Create Test Array of Data Objects to match the servers array of objects structure.
  const arrayOfTweets = [
    someTestData
  ];


  // 8. Move the call for the createTweet function and the .prepend function inside this loop so that they run for every object in the array.

  const renderTweets = (arrayOfTweets) => {
    for (const tweet of arrayOfTweets) {

      const $tweet = createTweet(tweet);  // 4. Call the createTweet function and assign it's returned element to $tweet

      $postedTweetContainer.prepend($tweet);
      // $tweet manipulates the DOM, adding each tweet to the live webpage.
    }
  };

  // 3. Wrap it inside a reusable function. (data) will be the tweet object.
  const createTweet = (data) => {
    // 1. Paste entire (finished & styled as needed) posted-tweet-container into jquery using $(``)
    // 2. Name it as a new variable.
    // 6. Replace hard-coded object paramaters with object id's ${}
    const $tweetTemplate = $(` 
  <article class="posted-tweet-container">
    <div class="posted-tweet-header">
      <div class="header-left">
        <img src="${data.user.avatars}" alt="img">
        <div class ="name">${data.user.name}</div>
      </div>
      <div class="header-right">${data.user.handle}</div>
      </div>
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
    // create a variable to hold the date in a formatted form using the timeago library which has been imported into index.html.
    const formattedDate = timeago.format(data.created_at);
    $tweetTemplate.find('#created_at').text(formattedDate);

    return $tweetTemplate;
  };



  const $postedTweetContainer = $('#tweet-container');
  // Use the class id tweet-container which holds the posted tweet I want to copy.


  renderTweets(arrayOfTweets);

  // Getting the tweets from the server instead of this hard coded file.

  // Use ajax to get the array of information from the server instead of using the hard coded example tweets. We make a GET request to the location of the arrays, (/tweets), and on success:(anything) => { console.log (anything)} - this will console.log the response from the server which is going to be the array of tweets (anything).

  const loadTweets = function() {

    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (serverResponseTweets) => {
        console.log(serverResponseTweets);
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

  const $form = $('.new-tweet-container');
  // Function to show hidden messages
  function showMessage(message) {
    $('#message-container').text(message).slideDown().delay(4000).slideUp();
  }

  // Allow form submission on Enter key press since 'preventDefault' is stopping it. 'Enter' && !event.shiftKey means if it's not enter+shiftkey which normally spaces a textbox to a newline instead of submitting. 

  $form.on('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      $form.submit();
    }
  });
  // Listen for submit event on the form.
  $form.on('submit', (event) => {
    // Prevent the default action of 'Submit" which reloads the page. This does not prevent the data from being submitted.
    event.preventDefault();
    // Use jquery to check if the .counter.negative class exists (this is how to do so), if so, alert with message and return; (nothing).
    if ($('.counter.negative').length > 0) {
      showMessage('Woops... over limit!');
      return;
      // Same thing but check if the value (contents of the text box) of the box label #tweet-text (id=tweet-text) is empty '' (.trim will make sure to remove any blank spaces just in case)
    } else if ($('#tweet-text').val().trim() === '') {
      showMessage('What will you share today?');
      return;
    }

    // Change the contents of the user text box into the text returned from the escape function, which removes any HTML coding. This way it can't be run as code, it's no longer code but converted to a text message before posting.

    const tweetText = escape($('#tweet-text').val().trim());
    $('#tweet-text').val(tweetText);

    const formData = $form.serialize();
    // verify the form data is being sent.
    console.log(formData);
    // POST the serialized form data with ajax.
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      // On submit, load tweets. (no refresh)
      success: () => {
        loadTweets();
        // on success, load tweets, but also clear the text box, ans reset the counter value to 140.
        $('#tweet-text').val('');
        $('.counter').val(140);


      }

    });



  });

  // On Page Load, load tweets.
  loadTweets();
});