
// --- TWEETER CHARACTER COUNT--- //

$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const maxChars = 140;
    const inputChars = $(this).val().length;
    const remainingChars = maxChars - inputChars;

    const $countElement = $(this).parent().find('.counter');
    $countElement.text(remainingChars);

    if (remainingChars < 0) {
      $countElement.addClass('invalid');
    } else {
      $countElement.removeClass('invalid');
    }
  });
});