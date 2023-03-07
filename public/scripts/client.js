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


  $(document).ready(function() {
    $('#new-tweet-form').on('submit', function(event) {
      event.preventDefault(); // prevent the form from submitting via HTTP
      const formData = $(this).serialize(); // serialize the form data
      $.post('/tweets', formData) // send the data to the server
        .then(function() {
          console.log('Data sent to server successfully!');
          // Now you can update the tweet list without a page refresh
        })
        .catch(function(error) {
          console.log('Error sending data to server:', error);
        });
    });
  });

  $(document).ready(function() {
    const loadTweets = function() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
          renderTweets(response);
        },
        error: function(error) {
          console.error(error);
        }
      });
    }
  }

  $("#formTweet").submit(function (event) {
    let maxTweetVal = 140;
    let tweet = $("#form_textarea").val().length;
    let tweetError = false;
    if (tweet == "" || tweet == null) {
      tweetError = true;
      $("#newtweet_empty").slideDown("slow");
      $("#newtweet_maxerror").slideUp("slow");
    }
    if (tweet > maxTweetVal) {
      tweetError = true;
      $("#newtweet_maxerror").slideDown("slow");
      $("#newtweet_empty").slideUp("slow");
    }
    if (!tweetError) {
      var formValues = $(this).serialize();
      $("#newtweet_maxerror").slideUp("slow");
      $("#newtweet_empty").slideUp("slow");
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: formValues,
      }).then(function () {
        $.get("./tweets").then(function (data) {
          $("#form_textarea").val("");
          const index = data.length - 1;
          const $tweet = createTweetElement(data[index]);
          $("#tweets-container").prepend($tweet);
        });
      });
    }
    event.preventDefault();
  });