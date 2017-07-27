function initMap() {
  var monksLocation = {lat: 40.8054491, lng: -73.9654415};
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