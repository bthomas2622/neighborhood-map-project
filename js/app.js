var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 33.755, lng: -84.390},
	  zoom: 12
	});

  setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var foodplaces = [
  ['Pho Dai Loi #2', 33.865206, -84.305052, 1],
  ['Taqueria Del Sol', 33.787378, -84.412928, 2],
  ['TWO Urban Licks', 33.768498, -84.361257, 3],
  ['King of Pops', 33.763779, -84.358858, 4],
  ['The Greater Good BBQ', 33.876289, -84.379854, 5]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'img/face.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(25, 35),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 35)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 35, 25, 35, 25, 1],
    type: 'poly'
  };

  for (var i = 0; i < foodplaces.length; i++) {
    var foodplace = foodplaces[i];
    var marker = new google.maps.Marker({
      position: {lat: foodplace[1], lng: foodplace[2]},
      map: map,
      icon: image,
      shape: shape,
      title: foodplace[0],
      zIndex: foodplace[3]
    });
  }
}
