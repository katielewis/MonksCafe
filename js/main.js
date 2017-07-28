function initMap() {
  var monksLocation = {lat: 37.788084, lng: -122.440861};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: monksLocation,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: monksLocation,
    map: map
    });
}