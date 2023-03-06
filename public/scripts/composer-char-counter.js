$(document).ready(function() {
  const textarea = $("#tweet-text");
  const counter = $(".counter");

  $("#tweet-text").on("input", function() {
    const remaining = 140 - textarea.val().length;
    counter.text(remaining);
    //Debugging
    // console.log(this)
    if (remaining < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "");
    }
  });
});

// const $tweet = $(`<article class="tweet">Hello world</article>`);
