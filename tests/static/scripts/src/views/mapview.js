// Generated by CoffeeScript 1.6.2
(function() {
  var MapView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MapView = (function(_super) {
    __extends(MapView, _super);

    function MapView() {
      _ref = MapView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapView.prototype.settings = {
      zoomLevel: {
        'wide': 4,
        'default': 10,
        'close': 14,
        'tight': 21,
        'increment': 1
      }
    };

    MapView.prototype.model = Location;

    MapView.prototype.mapOptions = {
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      minZoom: 1,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      panControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT
      }
    };

    MapView.prototype.googlemap = function(id) {
      var _this = this;

      this.gmap = new google.maps.Map(document.getElementById(id), this.mapOptions);
      google.maps.event.addListener(this.gmap, 'click', function(event) {
        return _this.handleMapClick(event);
      });
      return this.gmap;
    };

    MapView.prototype.marker = function() {
      return new google.maps.Marker();
    };

    MapView.prototype.infowindow = function() {
      return new google.maps.InfoWindow();
    };

    MapView.prototype.mappoint = function(latitude, longitude) {
      return new google.maps.LatLng(latitude, longitude);
    };

    MapView.prototype.markerFromMapLocation = function(map, location) {
      var markerSettings;

      markerSettings = {
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true
      };
      return new google.maps.Marker(markerSettings);
    };

    MapView.prototype.updateInfoWindow = function(text, location, map) {
      var infowindow;

      this.map = map != null ? map : this.googlemap();
      infowindow = this.infowindow();
      infowindow.setContent(text);
      infowindow.setPosition(location);
      return infowindow.open(map);
    };

    MapView.prototype.setUserPlaceFromLocation = function(location) {
      return this.userPlace = location;
    };

    MapView.prototype.showInfowindowFormAtLocation = function(map, marker, location) {
      if (this.userInfowindow != null) {
        this.userInfowindow.close();
      }
      this.userInfowindow = this.infowindow();
      this.userInfowindow.setContent(document.getElementById('iwcontainer').innerHTML);
      this.userInfowindow.setPosition(location);
      return this.userInfowindow.open(map);
    };

    MapView.prototype.clearMapMarker = function(marker) {
      marker.setMap(null);
      return marker = null;
    };

    MapView.prototype.initialize = function() {
      return this.userMapsMarker = null;
    };

    return MapView;

  })(Backbone.View);

}).call(this);
