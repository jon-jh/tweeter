$(document).ready(function() {
  console.log('The DOM is ready to be manipulated with jQuery.')
});


$(document).ready(function() {
  const maxLength = 140;
  const textBox = $('.container .new-tweet form textarea');
  const counter = $('.container .new-tweet .counter');

  textBox.on('input', function() {
    const remaining = maxLength - $(this).val().length;
    counter.text(remaining)

    if (remaining < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
    
  })
})
