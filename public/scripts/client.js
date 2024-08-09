/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {


  console.log('Inside the client.js file.');

  // Request all the data from the /tweets page to see what the object looks like.

  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (response) => {
      console.log(response);
    }
  });

  // Create a jqery element to test in developer tools.
  // const $tweet = $('<article>');
  // console.log($tweet)

  // 5. Create Test Data Object
  const someTestData = {
    user: {
      name: 'Largehands',
      avatars: '',
      handle: '@halo_elite',
    },
    content: {
      text: 'YEEAHHGHHH!!!'
    },
    created_at: 1
  };
  const someTestData2 = {
    user: {
      name: 'Lorflorf',
      avatars: '',
      handle: '@spartanh8r',
    },
    content: {
      text: 'RAAAGGHWOLOROR!'
    },
    created_at: 1
  };

  // 6. Create Test Array of Data Objects to match the servers array of objects structure.

  const arrayOfTweets = [
    someTestData,
    someTestData2
  ];

  console.log(arrayOfTweets)

  // 7. Move the call for the createTweet function and the .prepend function inside this loop so that they run for every object in the array.

  const renderTweets = (arrayOfTweets) => {
    for (const tweet of arrayOfTweets) {
      // 4. Call the createTweet function and assign it's returned element to $tweet
      const $tweet = createTweet(tweet);
      $postedTweetContainer.prepend($tweet);
      // $tweet manipulates the DOM, adding each tweet to the live webpage.
    }
  };

  // 3. Wrap it inside a reusable function. (data) will be the tweet object.
  const createTweet = (data) => {
    // 1. Paste entire (finished & styled as needed) posted-tweet-container into jquery using $(``)
    // 2. Name it as a new variable.

    // 5. Replace hard-coded object paramaters with object id's ${}
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

  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (serverResponseTweets) => {
      console.log(serverResponseTweets)
      // pass the response from the server into our renderTweets function.
      renderTweets(serverResponseTweets);
    }
  })







});