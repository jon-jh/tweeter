/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

console.log('Inside the client.js file.')

// Request all the data from the /tweets page to see what the object looks like.

$.ajax({
  method: 'GET',
  url: '/tweets',
  success: (response) => {
    console.log(response)
  }
})

// Create a jqery element to test in developer tools.
// const $tweet = $('<article>');
// console.log($tweet)

// Paste entire posted-tweet-container into jquery using $(``)
// Name it as a new variable.

const $tweet = $(` 
  <article class="posted-tweet-container">
    <div class="posted-tweet-header">
      <div class="header-left">
        <label for="avatars">avatars</label>
        <label for="name">name</label>
      </div>
      <div class="header-right">
        <label for="handle">handle</label>
      </div>
    </div>
    <p id="content">text</p>
    <footer>
      <div class="posted-tweet-footer">
        <label for="created_at">created_at</label>
        <div>
          <i class="fa-solid fa-heart"></i>
          <i class="fa-solid fa-square-up-right"></i>
          <i class="fa-solid fa-bookmark"></i>
        </div>
      </div>
    </footer>
  </article>   
`);

const $postedTweetContainer = $('#tweet-container');

$postedTweetContainer.prepend($tweet);

});
