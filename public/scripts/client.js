/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// outline: create a function that takes an object (example tweet with pre made structure) as its argument.
// the function will use jqery to create an <article class=tweet></article>

function createTweetElement(data) { // take in the tweet data

  const $tweet = $(`<article class="tweet"></article>`)
  //jquery creates a new article class 'tweet'
  //sort the data into the structure we want

  const html = `
  <p>
  <img src="${tweet.user.avatars}">
  <p>"${tweet.user.name}"</p>
  <p>"${tweet.user.handle}"</p>
  <p>"${tweet.user.content.text}"</p>
  </p>`;

  $tweet.html(html);

  return $tweet;
}

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


