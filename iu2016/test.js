// File:src/IU.js

/**
 * @author stevesuyao@ Build-it-yourself
 */

var IU = { REVISION: '1' };

if ( typeof define === 'function' && define.amd ) {

	define( 'iu', IU );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

	module.exports = IU;

}

// Polyfills

if ( Number.EPSILON === undefined ) {

	Number.EPSILON = Math.pow( 2, - 52 );

}

//

if ( Math.sign === undefined ) {

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

	Math.sign = function ( x ) {

		return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

	};

}

if ( Function.prototype.name === undefined ) {

	// Missing in IE9-11.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

	Object.defineProperty( Function.prototype, 'name', {

		get: function () {

			return this.toString().match( /^\s*function\s*(\S*)\s*\(/ )[ 1 ];

		}

	} );

}

if ( Object.assign === undefined ) {

	// Missing in IE.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

	( function () {

		Object.assign = function ( target ) {

			'use strict';

			if ( target === undefined || target === null ) {

				throw new TypeError( 'Cannot convert undefined or null to object' );

			}

			var output = Object( target );

			for ( var index = 1; index < arguments.length; index ++ ) {

				var source = arguments[ index ];

				if ( source !== undefined && source !== null ) {

					for ( var nextKey in source ) {

						if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

							output[ nextKey ] = source[ nextKey ];

						}

					}

				}

			}

			return output;

		};

	} )();

}

//

Object.assign(IU, {

// app URL
AppURL: 'http://localhost:8080/cake',  //server ip address

//rest API
REST:{
	LOGIN: '/users/login.json',
	SIGNUP: '/users/add.json',
	LOGOUT: '/users/logout.json',
	GALAXIES: '/galaxies.json',
	QUADRANTS:'/quadrants.json',
	SYSTEMS: '/systems/systemslist/',
	ALLSYSTEMS: '/systems.json',
	PLANETS:'/planets/planetslist/',
	ADDPLANETS:'/planets/add.json',
	EDITPROFILE:'/profiels/edit/',
	SUFFIX: '.json'
	},
});

IU.App = function() {
	this.user = null;
	this.loginMessage = null;
	this.galaxies = {};
	this.quadrants = {};
};




IU.App.prototype = {

	login: function(a,b,callback){  // a, b are dom id text
		 

		 var self = this;

		 var username = $("#"+a).val();
	     var password = $("#"+b).val(); 

	     //todo:  input data validation

	     var h = this.make_base_auth(username, password);
	     console.log(h);
		$.ajax( {
		    url: IU.AppURL + IU.REST.LOGIN ,
		    type: 'POST',
		    
		   beforeSend: function (xhr){ 
		       xhr.setRequestHeader('Authorization', h); 
		    },

		    success: function( data) {
		    	if(data.message.user) self.user = data.message.user;
		        self.loginMessage = data.message.text;
		        callback;
		        console.log(data);
		    },
		    error: function(status){
		    	//To-do: add server error warning!
		    	console.log(status);
		    }
		} );


	},

	signup: function(a,b,callback){
		 var self = this;
		 var username = $("#" + a).val();
	     var password = $("#" + b).val();
	     var _data = {};
	     _data.User = {};
	     _data.User.username = username;
	     _data.User.password = password;
	     _data.User.role = 'author'; // to-do: add admin page

	     //todo:  add data validation
	     if(username !== "" && password !== ""){
	     
			$.ajax( {
			    url: IU.AppURL + IU.REST.SIGNUP,
			    type: 'POST',
			    //dataType: 'json',
			    data:_data,
			    
			    success: function( data) {
			        console.log(data);
			        this.message = data.message.text;
			    },
			    error: function(data){

			    	console.log(data);
			    }
			});

		}  else console.log('username or password should not be blank! ');

	},

	// base64 password
	make_base_auth: function(user, password) {
	  var tok = user + ':' + password;
	  var hash = btoa(tok);
	  //console.log("Basic " + hash); 
	  return "Basic " + hash;
	},

	logout : function(){
		var self = this;
		$.ajax( {
			    url: IU.AppURL + IU.REST.LOGOUT,
			    
			    success: function( data) {
			    	self.user = null;
			        console.log(data.message.text);
			    },
			    error: function(data){

			    	console.log('error');
			    }
			});

	},

	init: function(dom1,dom2,dom3){  // dom is $(domClass or domID)
		var self = this;
		this.galaxyContainer = dom1;
		this.systemContainer = dom2;
		this.backBtn = dom3;
		this.backBtn.bind('click',function(e){  
			e.preventDefault();
			self.leaveSystems();
		});

	},

	getGalaxies: function(callback){
		var self = this;
     
			$.ajax( {
			    url: IU.AppURL + IU.REST.GALAXIES,
			    
			    success: function( data) {
			    	self.galaxies = data.galaxies;
			        console.log('read all galaxies');
			        console.log(self.galaxies);
			        callback();
			    },
			    error: function(data){

			    	console.log('server error');
			    }
			});

	},

	getAllSystems: function(){
		var self = this;
		$.ajax({
			url: IU.AppURL + IU.REST.ALLSYSTEMS,
			success:function(data){
				self.allsystems = data.systems;
				console.log(self.allsystems);
			},
			error: function(data){
				console.log('server error')

			}
		});

	},

	getQuadrants: function(){
		var self = this;
		$.ajax({
			url: IU.AppURL + IU.REST.QUADRANTS,
			success:function(data){
				self.quadrants = data.quadrants;
				console.log(self.quadrants);
			},
			error: function(data){
				console.log('server error')

			}
		});

	},

	drawGalaxies: function(){  // domClass or domID name
	 var self = this;
      if(this.galaxies === {} || this.galaxyContainer.length === 0){
      	console.log('data error or not found dom container');
      	return;
      }
      
      this.systemContainer.hide();
      this.galaxyContainer.show(); // todo: add transition effect
     
      $.each(this.galaxies,function(i){
      	self.galaxyContainer.append('<div class="galaxy" data-id="'+ this.Galaxy.id +'" title="' + this.Galaxy.name + '"></div>');
          
      });
      
       $('.galaxy').click(function(e){self.getSystems($(this).attr('data-id'))});
	},

	getSystems: function(galaxy_id){
			var self = this;
			$.ajax( {
			    url: IU.AppURL + IU.REST.SYSTEMS + galaxy_id + IU.REST.SUFFIX,		    
			    success: function( data) {
			    	self.systems = data.systems;
			        //if(self.systems[0]) console.log('read all systems in galaxy: ' + self.systems[0].Galaxy.name);
			        console.log(self.systems);
			        //self.drawSystems();
			    },
			    error: function(data){

			    	console.log('server error');
			    }
			});
	},

	editProfile:function(profile_id){
		var self = this;
		$.ajax({
			url: IU.AppURL + IU.REST.EDITPROFILE + profile_id + IU.REST.SUFFIX,
			success: function(data){
				//self.profile = data.profile;
				console.log(data);

			},
			error: function(status){
				console.log(status)
			}
		});


	},

	getPlanets: function(system_id){
			var self = this;
			$.ajax( {
			    url: IU.AppURL + IU.REST.PLANETS + system_id + IU.REST.SUFFIX,		    
			    success: function( data) {
			    	self.planets = data.planets;
			        //if(self.systems[0]) console.log('read all systems in galaxy: ' + self.systems[0].Galaxy.name);
			        console.log(self.planets);
			        //self.drawSystems();
			    },
			    error: function(data){

			    	console.log('server error');
			    }
			});
	},

	addPlanet: function(){
		var self = this;
		 var _data = {};
	     // _data.Planet = {};
	     // _data.Planet.name = 'test';
		$.ajax({
			url: IU.AppURL + IU.REST.ADDPLANETS,
			type: 'POST',
			data: _data,
			success: function(data){
			    console.log(data);
			},
			error: function(data){
				console.log('server error');
			}

		});

	},

	drawSystems: function(){
		var self = this;
		 self.galaxyContainer.hide(); // todo: add transition effect
         self.systemContainer.show();
         self.backBtn.show();
         
         $.each(self.systems, function(i){

            self.systemContainer.append('<div class="star" data-id="'+this.System.id+ '" title="' + this.System.name +'"></div>');
            var n = this.System.planet_amount;
            for(var j = 0; j<n; j++){
            	//var speed = Math.floor(Math.random()*11) + 1;  // todo: add random
            	var speed = j+1;
            	var ro = ' style="transform:rotate('+ (Math.floor(Math.random()*360) + 1)+'deg)"';
                var style = 'style= "margin-top:'+ (80 + j * 25 ) + 'px;margin-left:'+ (j *0 ) + 'px"';  // pos
                //console.log(style);
            	$(".star").eq(i).append('<div class="planet  r-'+speed +'"'+ro+'><div class="mars" '+ style +'></div></div>');
            }

         });

	},

	leaveSystems: function(){
          var self = this;
          self.systemContainer.hide();
          self.backBtn.hide();
          self.galaxyContainer.show();
          self.systemContainer.empty();
          self.systems =  null;

	},

	drawUniverseBackground: function(domClass){ // stars-bg
  		$( "div" ).remove( ".bg-star" ); // clear first
  		var w = 2 * $(window).width();
  		var h = $(window).height();
    	for (i = 0; i < 300; i++) {
	    	rand = Math.random();
	    	rand2 = Math.random();
	    	$(domClass).append('<div class="bg-star" style="top:' + h * .999 * rand + 'px; left:' + w * .999 * rand2 + 'px;"></div>');
  		}
	}

}