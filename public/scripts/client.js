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

  // Prevent the default action of 'Submit" which reloads the page. This does not prevent the data from being submitted.

  // Grab the new-tweet-container to get the submit (tweet) button.
  const $form = $('.new-tweet-container');
  // Listen for submit event on the form.
  $form.on('submit', (event) => {
    event.preventDefault();
    const formData = $form.serialize();
    // verify the form data is being sent.
    console.log(formData)
    // POST the serialized form data with ajax.
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: formData,
      // On submit, load tweets. (no refresh)
      success: () => {
        loadTweets();
      }

    });
  })

  // On Page Load, load tweets.
  loadTweets();
})