/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

  function createTweetElement(tweet) {
    const calculateDate = timeago.format(tweet.created_at);
    const newTweet = `
        <article class="tweet">
        <header class="tweet--header">
          <image src=${
            tweet.user.avatars
          } alt="tweeter-User-Image" class="tweet--avatar"></image>
          <h2 class="tweet--name">${tweet.user.name}</h2>
          <time class ="tweet--handle">${tweet.user.handle}</time>
        </header>
        <div class="tweet-body">
          <p>${escape(tweet.content.text)}</p>
        </div>
       
        <footer class="tweet--footer">
        <small class="footer--age">${calculateDate} <small>
          <span class="footer--actions">
            <a href="#"><i class="fa fa-flag"></i></a>
            <a href="#"><i class="fa fa-retweet"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>'
          </span>
        </small></small>
        </footer>
      </article>
        `;
    return newTweet;
  }
  const renderTweets = function (tweets) {
    tweets.forEach(function (tweet) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    });
  };

  const loadTweets = function () {
    $.get("./tweets", function (data) {
      const dataReversed = data.reverse();
      renderTweets(dataReversed);
    });
  };
