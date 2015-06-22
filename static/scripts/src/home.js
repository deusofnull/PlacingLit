// Generated by CoffeeScript 1.7.1
(function() {
  var Home,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Home = (function() {
    function Home() {
      this.useGeocodedLocation = __bind(this.useGeocodedLocation, this);
      this.geocoderSearch = __bind(this.geocoderSearch, this);
      this.ENTER_KEY = 13;
      this.elements = {
        cityInput: $('#gcf'),
        authorInput: $('#authorq'),
        mapButtons: $('#hpbuttons').find('a')
      };
    }

    Home.prototype.geocoderSearch = function() {
      var deferred, geocoder, location;
      deferred = $.Deferred();
      location = this.elements.cityInput.val();
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': location
      }, deferred.resolve);
      return deferred.promise();
    };

    Home.prototype.attachEvents = function() {
      this.elements.cityInput.on('keydown', (function(_this) {
        return function(event) {
          if ((event.which === _this.ENTER_KEY) || (event.keyCode === _this.ENTER_KEY)) {
            event.preventDefault();
            return _this.geocoderSearch().then(_this.useGeocodedLocation);
          }
        };
      })(this));
      return this.elements.authorInput.on('keydown', (function(_this) {
        return function(event) {
          if ((event.which === _this.ENTER_KEY) || (event.keyCode === _this.ENTER_KEY)) {
            event.preventDefault();
            return _this.reloadWithFilteredMap('author', _this.elements.authorInput.val());
          }
        };
      })(this));
    };

    Home.prototype.suggestAuthors = function() {
      var authorInput, authors;
      authors = [];
      authorInput = this.elements.authorInput;
      return $.ajax({
        url: "/places/authors",
        success: function(data) {
          $.each(data, function(key, value) {
            return authors.push(value.author.toString());
          });
          return authorInput.typeahead({
            source: authors
          });
        }
      });
    };

    Home.prototype.updateMapLinksWithLocation = function(position) {
      var lat, lng;
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      return this.elements.mapButtons.attr('href', 'map?lat=' + lat + '&lng=' + lng);
    };

    Home.prototype.getUserLocation = function() {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(updateMapLinksWithLocation, positionError);
      }
    };

    Home.prototype.positionError = function(error) {
      console.log('error', error);
      return console.log('client ip', window.REMOTE_ADDR);
    };

    Home.prototype.useGeocodedLocation = function(results, status) {
      var location, position;
      if (status === google.maps.GeocoderStatus.OK) {
        position = results[0].geometry.location;
        location = {
          lat: position[Object.keys(position)[0]],
          lng: position[Object.keys(position)[1]]
        };
        return this.reloadWithLocatedMap(location);
      } else {
        return alert("geocode was not successful: " + status);
      }
    };

    Home.prototype.reloadWithLocatedMap = function(location) {
      return this.relocateWindowToMap('/map/' + location.lat + ',' + location.lng);
    };

    Home.prototype.reloadWithFilteredMap = function(filter, value) {
      return this.relocateWindowToMap('/map/filter/' + filter + '/' + value);
    };

    Home.prototype.relocateWindowToMap = function(path) {
      var mapUrl;
      mapUrl = window.location.protocol + '//' + window.location.host + path;
      return window.location = mapUrl;
    };

    return Home;

  })();

  $(function() {
    var home;
    home = new Home();
    home.attachEvents();
    home.suggestAuthors();
    new PlacingLit.Views.RecentPlaces;
    new PlacingLit.Views.Countview;
    return $('.carousel').carousel();
  });

}).call(this);
