// google maps api
function initMap() {
  var monksLocation = {lat: 37.788084, lng: -122.440861};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: monksLocation,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: monksLocation,
    map: map,
    title: 'b. patisserie'
    });
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxUngJL6LbPYa4wQGHdAZfQTgZECKgJs0",
  authDomain: "js-circuits-682cd.firebaseapp.com",
  databaseURL: "https://js-circuits-682cd.firebaseio.com",
  projectId: "js-circuits-682cd",
  storageBucket: "js-circuits-682cd.appspot.com",
  messagingSenderId: "933669326583"
};
firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};


//makeing a reservation
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text(); //grabbing the text from the li and adding it as a property of the reservationData object
  $('.dropdown-toggle').text(reservationData.day); //lacks caret
});

$('form').on('submit', function(e) {

  e.preventDefault();
 
  reservationData.name = $('.reservation-name').val(); //grabbing input value and adding it as a properity of the reservationData object
  
  var reservationsReference = database.ref('reservations'); //create a section for reservations data in database
  
  reservationsReference.push(reservationData);// POST your reservationsData object to database using Firebase's .push() method

});

function getReservations() {
  database.ref('reservations').on('value', function (results) { // function to listen for any changes to the firebase database
    var allReservations = results.val(); //for any changes to the firebase database, get all reservations stored in the results we received
    $('.reservations').empty(); //remove any reservations that are currently being displayed in the reservations list so that we can later update the list using Handlebars
    
    for (var reservation in allReservations) { //loop through all reservations from database call
      var context = { //// Create an object literal with the data we'll pass to Handlebars
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationListItem = template(context);
      $('.reservations').append(reservationListItem);
    }
  });
}

getReservations();

function openClosed() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var now = parseFloat(hours + "." + minutes);
  console.log(now);

  if (now > 8 && now < 20) {
    $('#hours').text('We are currently OPEN.').addClass('open').removeClass('closed');
  } else {
    $('#hours').text('We are currently CLOSED.').addClass('closed').removeClass('open');
  }

}

openClosed();