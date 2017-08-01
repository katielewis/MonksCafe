// google maps api
function initMap() {
  var monksLocation = {lat: 37.788084, lng: -122.440861};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: monksLocation,
    scrollwheel: false,
    styles: [
            {elementType: 'geometry', stylers: [{color: '#f5f5f5'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f5f5'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#616161'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#e5e5e5'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9e9e9e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#757575'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#dadada'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#dadada'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#616161'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#e5e5e5'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#eeeeee'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#c9c9c9'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9e9e9e'}]
            }
          ] 
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
//$('.reservation-day li').on('click', function() {
 // reservationData.day = $(this).text(); //grabbing the text from the li and adding it as a property of the reservationData object
  //$('.dropdown-toggle').text(reservationData.day); //getting choice to show on button
//});

$('form').on('submit', function(e) {

  e.preventDefault();

  formValidation();


});


function formValidation() {

  reservationData.day = $('#dropdown').val();// grabbing value of dropdown

  reservationData.name = $('.reservation-name').val(); //grabbing input value and adding it as a properity of the reservationData object
  
  var dayText = reservationData.day.length;
  var nameText = reservationData.name.length;

  console.log(dayText);
  console.log(nameText);

  if (dayText > 0 && nameText > 0) {
  
    var reservationsReference = database.ref('reservations'); //create a section for reservations data in database
  
    reservationsReference.push(reservationData);// POST your reservationsData object to database using Firebase's .push() method

    $('#formConfirm').text('Yay, you are all set!').addClass('open').removeClass('closed');

  } else {  

    $('#formConfirm').text('Oops! You need to fill out the whole form.').addClass('closed').removeClass('open');

  } 
}
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

  //does not account for time zone difference...

  if (now > 8 && now < 18) {
    $('#hours').text('We are currently OPEN.').addClass('open').removeClass('closed');
  } else {
    $('#hours').text('We are currently CLOSED.').addClass('closed').removeClass('open');
  }

}

openClosed();


// istagram
var token = '198214635.d774ddc.417cc94ea317435c9952d0f8859ea1c3', // learn how to obtain it below
    userid = self, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 3; // how much photos do you want to get
 
$.ajax({
  url: 'https://api.instagram.com/v1/users/self/media/recent', // or /users/self/media/recent for Sandbox
  dataType: 'jsonp',
  type: 'GET',
  data: {access_token: token, count: num_photos},
  success: function(data){
    console.log(data);
    for( x in data.data ){
      $('#rudr_instafeed').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>'); // data.data[x].images.low_resolution.url - URL of image, 306х306
      // data.data[x].images.thumbnail.url - URL of image 150х150
      // data.data[x].images.standard_resolution.url - URL of image 612х612
      // data.data[x].link - Instagram post URL 
    }
  },
  error: function(data){
    console.log(data); // send the error notifications to console
  }
});