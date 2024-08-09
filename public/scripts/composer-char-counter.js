$(document).ready(function() {
  console.log('Inside the composer character counter js file.');
});


$(document).ready(function() {
  const maxLength = 140;
  const textBox = $('.new-tweet-container textarea');
  const counter = $('.new-tweet-container .counter');

  textBox.on('input', function() {
    const remaining = maxLength - $(this).val().length;
    counter.text(remaining);

    if (remaining < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }

  });
});
