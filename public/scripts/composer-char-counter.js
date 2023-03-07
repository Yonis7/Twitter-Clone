/* eslint-env jquery */
$(document).ready(function () {
  let counter = 140;

  $("#form_textarea").on("keyup", function (event) {
    let txtVal = $(this).val().length;
    let updatedCounter = counter - txtVal;
    $("#form_counter").text(updatedCounter);
    if (txtVal > counter) {
      $(".form_counter").css({ color: "red" });
    } else {
      $(".form_counter").css({ color: "black" });
    }
  });
});


// const $tweet = $(`<article class="tweet">Hello world</article>`);
