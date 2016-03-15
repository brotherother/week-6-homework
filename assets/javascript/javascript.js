var bands = ['Ratt', 'Quiet Riot', 'Scorpions', 'Van Halen'];

function renderButtons(){ 
    $('#buttonsView').empty();
    for (var i = 0; i < bands.length; i++){
       var a = $('<button>')
       a.addClass('band');
       a.attr('data-name', bands[i]);
       a.text(bands[i]);
       $('#buttonsView').append(a);
    }
}

function displayBandGif(){
  $('#gifView').empty();

  var band = $(this).attr('data-name');
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + band + "&limit=10&api_key=dc6zaTOxFJmzC ";

  $.ajax({url: queryURL, method:'GET'}).done(function(response) {
    var results = response.data;

    console.log(results.data);

    for (var i = 0; i<10; i++) {
      var bandDiv = $('<div class="resultElement">');
      var p = $('<p>');
      p.text("Rating: " +results[i].rating);
      var bandImage = $('<img>');
      bandImage.attr('src', results[i].images.fixed_height_still.url);
      bandImage.attr('data-still', results[i].images.fixed_height_still.url);
      bandImage.attr('data-animate', results[i].images.fixed_height.url);
      bandImage.attr('data-state', "still");
      bandImage.addClass('bandImage');
      bandDiv.append(p);
      bandDiv.append(bandImage);
      $('#gifView').prepend(bandDiv);
    }

  });

   // need to clear input box on submit
  $('#gif-form').reset();
}

renderButtons();

$('#search-submit').on('click', function(){
   var band = $('#add-band').val().trim();
   bands.push(band);
   renderButtons();
   return false;
});

$(document).on('click', '.band', displayBandGif);

//image not updating to animated
$('.bandImage').on('click', function() {
  debugger;
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');
    console.log($(this).data-state);
  }else{
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }

});