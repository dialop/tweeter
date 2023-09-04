// --- CREATING NEW TWEETS --- //


//--- Initialize error messages as hidden ---//
$(document).ready(function() {
  const $errorMessageEmpty = $("#error-message-empty").hide();
  const $errorMessageTooLong = $("#error-message-tooLong").hide();
  
  const tweets = [];
  
  //--- Escape function to encode text and prevent XSS ---//
  const escape = (str) => {
    return $("<div>").text(str).html();
  };

  
  // --- Function to render tweets --- //
  const renderTweets = (tweetsData) => {
    const $tweetsContainer = $("#tweets-container").empty();
    tweetsData.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
  };

  
  // --- Function to create a new tweet element --- //
  const createTweetElement = (tweetData) => {
    const $tweet = $(`
        <article class="tweet">
          <header class="tweet-header">
            <div class="user-profile">
              <img class="user-icon" src="${tweetData.user.avatars}" alt="${tweetData.user.name}'s Avatar">
              <h4 class="user-name">${tweetData.user.name}</h4>
            </div>
            <div>
              <h4 class="user-handle">${tweetData.user.handle}</h4>
            </div>
          </header>
          <div class="tweet-text">
            ${escape(tweetData.content.text)}
          </div>
          <footer class="tweet-footer">
            <span class="tweet-date">${timeago.format(tweetData.created_at)}</span>
            <div class="tweet-response">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
      `);
    return $tweet;
  };
  
  // --- Function to load tweets using AJAX --- //
  const loadTweets = () => {
    $.get("/tweets/", (newTweets) => {
      renderTweets(newTweets.reverse());
    });
  };
  
  // --- Load initial tweets when the page loads --- //
  loadTweets();
  
  // --- Handle new tweet submission --- //
  $("#new-tweet-form").submit((event) => {
    event.preventDefault();
    const maxChar = 140;
    const $tweetText = $(event.target).find("#tweet-text");
    const textLength = $tweetText.val().length;
      
    $errorMessageEmpty.slideUp("slow");
    $errorMessageTooLong.slideUp("slow");
      
    if (!textLength) {
      $errorMessageEmpty.slideDown("slow");
      return; // Stop execution here
    }
      
    if (textLength > maxChar) {
      $errorMessageTooLong.slideDown("slow");
      return; // Stop execution here
    }
      
    const newTweet = $(event.target).serialize();
    $.post("/tweets/", newTweet, () => {
      $tweetText.val("");
      $(event.target).find(".counter").val(maxChar);
      loadTweets();
    });
  });
});
  
  