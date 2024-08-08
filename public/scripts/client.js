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
    avatars: 'picture',
    name: 'Lulu Largehands',
    handle: 'halo_elite',
    created_at: 'time',
    content: 'AAAHHH WOLOLO!!!'
  };
  const someTestData2 = {
    avatars: 'picture',
    name: 'Lorflorf',
    handle: 'spartanh8r',
    created_at: 'time',
    content: 'WORLORLOR!!!'
  };

  // 6. Create Test Array of Data Objects, make a helper function.

  const arrayOfTweets = [
    someTestData,
    someTestData2
  ];

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
        <label for="avatars">${data.avatars}</label>
        <label for="name">${data.name}</label>
      </div>
      <div class="header-right">
        <label for="handle">@${data.handle}</label>
      </div>
    </div>
    <p id="content">${data.content}</p>
    <footer>
      <div class="posted-tweet-footer">
        <label for="created_at">${data.created_at}</label>
        <div>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-square-up-right"></i>
          <i class="fa-solid fa-bookmark"></i>
        </div>
      </div>
    </footer>
  </article>   
`);

    // 3. Remember to return the element created by the createTweet function.
    return $tweetTemplate;
  };



  const $postedTweetContainer = $('#tweet-container');
  // Use the class id tweet-container which holds the posted tweet I want to copy.


  renderTweets(arrayOfTweets);

});