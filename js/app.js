var foodplaces = [
  {
	name : 'Pho Dai Loi #2',
	lat : 33.865206,
	lon : -84.305052,
	order :  1,
	cuisine : 'Vietnamese',
	status : true
  },
  {
	name : 'Taqueria Del Sol',
	lat : 33.787378,
	lon : -84.412928,
	order :  2,
	cuisine : 'GOOD Tex Mex',
	status : true
  },
  {
	name : 'TWO Urban Licks',
	lat : 33.768498,
	lon : -84.361257,
	order :  3,
	cuisine : 'Classy American',
	status : true
  },
  {
	name : 'King of Pops',
	lat : 33.763779,
	lon : -84.358858,
	order :  4,
	cuisine : 'Popsicles',
	status : true
  },
  {
	name : 'The Greater Good BBQ',
	lat : 33.876289,
	lon : -84.379854,
	order :  5,
	cuisine : 'BBQ',
	status : true
  },
];

var map;
var markers = [];

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  //center: {lat: 33.755, lng: -84.390},
	  center: {lat: 33.800, lng: -84.390},
	  zoom: 12,
	  disableDefaultUI: true
	});

	setMarkers(map, foodplaces);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function setMarkers(map, foodplaces) {
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

	setMapOnAll(null);
	markers = [];

	for (var i = 0; i < foodplaces.length; i++) {
		var foodplace = foodplaces[i];
		if (foodplace.status) {
		    var marker = new google.maps.Marker({
		      position: {lat: foodplace.lat, lng: foodplace.lon},
		      map: map,
		      icon: image,
		      shape: shape,
		      title: foodplace.name,
		      zIndex: foodplace.order
		    });
		    markers.push(marker);
		}
	}
};

var foodplaceModel = function(data){
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lon = ko.observable(data.lon);
	this.order = ko.observable(data.order);
	this.cuisine = ko.observable(data.cuisine);
};


var ViewModel = function () {
	var self = this;

	self.foodList = ko.observableArray([]);
	foodplaces.forEach(function(foodplace){
		self.foodList.push(new foodplaceModel(foodplace));
	});

	self.currentFood = ko.observable(this.foodList()[0]);

	self.setFood = function(clickedFood) {
		self.currentFood(clickedFood);
	};

	self.input = ko.observable("");

	self.search = function(value){
		self.foodList.removeAll();
		for (var place in foodplaces){
			foodplaces[place].status = false;
		}
		for (var place in foodplaces){
			if (foodplaces[place].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.foodList.push(foodplaces[place]);
				foodplaces[place].status = true;
			}
			else if (foodplaces[place].cuisine.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
				self.foodList.push(foodplaces[place]);
				foodplaces[place].status = true;
			}
		}
		setMarkers(map, foodplaces);
	}

	self.input.subscribe(this.search);

};

ko.applyBindings(new ViewModel)



