
var app,
    appConfig = {
        apiUrl: 'https://byr7m3hqxg.execute-api.us-east-1.amazonaws.com/qa',  //server ip address
        quadrantService: 'https://byr7m3hqxg.execute-api.us-east-1.amazonaws.com/qa',
        galaxyService: 'https://2fol67t42e.execute-api.us-east-1.amazonaws.com/qa',
        systemService: 'https://jptk09kqp5.execute-api.us-east-1.amazonaws.com/qa',
        pagination: 1,
        initialBatchCount: 200,
        dataCount: 500,
        dataTotal: 0,
        apiTimestamp: new Date().getTime(),

        maxDataTotal: 1500,
        lowestFrameRate: 35,
        startLoaderTimer: null,
        avgFrameRate: 100,      // set high to start

        nebulae: [
            { x: 3622, y: 1250, radius: 500, name: 'No.0',  color: 'purple' },
            { x: 6307, y: 4393, radius: 500, name: 'No.1', color: 'red' },
            { x: 5221, y: 2538, radius: 500, name: 'No.2',     color: 'red' },
            { x: 1998, y: 4595, radius: 450, name: 'No.3',   color: 'blue' },
            { x: 1604, y: 1533, radius: 500, name: 'No.4',  color: 'orange' },
            { x: 3400, y: 2929, radius: 500, name: 'No.5',  color: 'blue' },
            { x: 4729, y: 4491, radius: 500, name: 'No.6',  color: 'purple' },
            { x: 7326, y: 2190, radius: 500, name: 'No.7',  color: 'green' },

        ],


        //rest API
        REST:{
                LOGIN: '/users/login.json',
                SIGNUP: '/users/add.json',
                LOGOUT: '/users/logout.json',
                GALAXIES: '/galaxy',
                QUADRANTS:'/quadrant',
                SYSTEMS: '/system',
                ALLSYSTEMS: '/system',
                PLANETS:'/planets/planetslist/',
                ADDPLANETS:'/planets/add.json',
                EDITPLANET:'/planets/edit/',
                GETPROFILE:'/profiles/get/',
                EDITPROFILE:'/profiles/edit/',
                GETSKILLS:'/skills/skillslist/',
                GETVIDEOS:'/videos/videoslist/',
                ADDVIDEO:'/videos/add.json',
                GETVIDEO: '/videos/get/',
                DELVIDEO:'/videos/delete/',
                EDITVIDEO: '/videos/edit/',
                GETROCKETS:'/rockets/rocketslist/',
                ADDROCKET:'/rockets/add.json',
                DELROCKET:'/rockets/delete/',
                GETHOTROCKET:'/rockets/gethottest.json',
                ADDSKILL:'/skills/add.json',
                DELSKILL:'/skills/delete/',
                SUFFIX: '.json'
            },

        tileRows: 20,
        tileCols: 25,
        tileDebug: false,
        eps: 0.5,

        constraints1 :{
            email: {
              // Email is required
              presence: true,
              // and must be an email (duh)
              email: true
            },
            password: {
              // Password is also required
              presence: true,
              // And must be at least 5 characters long
              length: {
                minimum: 6
              }
            },
            "confirm-password": {
              // You need to confirm your password
              presence: true,
              // and it needs to be equal to the other password
              equality: {
                attribute: "password",
                message: "^The passwords does not match"
              }
            },
            /*username: {
              // You need to pick a username too
              presence: true,
              // And it must be between 3 and 20 characters long
              length: {
                minimum: 3,
                maximum: 20
              },
              format: {
                // We don't allow anything that a-z and 0-9
                pattern: "[a-z0-9]+",
                // but we don't care if the username is uppercase or lowercase
                flags: "i",
                message: "can only contain a-z and 0-9"
              }
            },*/
            /*birthdate: {
              // The user needs to give a birthday
              presence: true,
              // and must be born at least 18 years ago
              date: {
                latest: moment().subtract(18, "years"),
                message: "^You must be at least 18 years old to use this service"
              }
            },
            country: {
              // You also need to input where you live
              presence: true,
              // And we restrict the countries supported to Sweden
              inclusion: {
                within: ["SE"],
                // The ^ prevents the field name from being prepended to the error
                message: "^Sorry, this service is for Sweden only"
              }
            },
            zip: {
              // Zip is optional but if specified it must be a 5 digit long number
              format: {
                pattern: "\\d{5}"
              }
            },
            }*/
          }

    },

    bounds = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    },
    useParallax = true,
    showHover = false,
    stretchBounds = false,
    showSpecificStar = false,
    starId = null,

    // Test Dada

    testPlanetsData1 = [{"id":1, 'user_id':1, "system_id":1, "image_url":"", "name":"", "planet_edge": 1, image_url:'../img/stars/planet1.png' },
                      {"id":2,  'user_id':2,  "system_id":1, "image_url":"", "name":"", "planet_edge": 2, image_url:'../img/stars/planet2.png' },
                      {"id":3,   'user_id':3, "system_id":1, "image_url":"", "name":"", "planet_edge": 5, image_url:'../img/stars/planet3.png' },

                    ];

    testPlanetsData2 = [{"id":4,'user_id':4, "system_id":2, "image_url":"", "name":"", "planet_edge": 3, image_url:'../img/stars/planet4.png' },
                      {"id":5,  'user_id':5, "system_id":2, "image_url":"", "name":"", "planet_edge": 6, image_url:'../img/stars/planet5.png' },
                      {"id":6,  'user_id':6, "system_id":2, "image_url":"", "name":"", "planet_edge": 7, image_url:'../img/stars/planet6.png' },
                    ];

    //testData = [{"id":1064,"name":"RIP George","url":"http://bit.ly/1nfbZ5k","x":3622,"y":1163,"age":0,"cS":false}],
    testSystemData = [  {"id":1,"name":"No.1","x":3622,"y":1163,"age":0, "Planet":testPlanetsData1 },
                        {"id":2,"name":"No.2","x":6728,"y":4388,"age":0, "Planet":[] },
                        {"id":3,"name":"No.3","x":5221,"y":2538,"age":0, "Planet":[] },
                        {"id":4,"name":"No.4","x":1998,"y":4595,"age":0, "Planet":[] },
                        {"id":5,"name":"No.5","x":1604,"y":1533,"age":0, "Planet":[] },
                        {"id":6,"name":"No.6","x":3400,"y":2929,"age":0, "Planet":[] },
                        {"id":7,"name":"No.7","x":4729,"y":4491,"age":0, "Planet":[] },
                        {"id":8,"name":"No.8","x":7326,"y":2190,"age":0, "Planet":[] },
                        {"id":9,"name":"No.9","x":1000,"y":1000,"age":0, "Planet":[] }
                     ];

    testSystemData2 = [ {"id":11,"name":"No.11","x":1000,"y":1000,"age":0, "Planet":testPlanetsData2 },
                        {"id":12,"name":"No.12","x":2000,"y":1500,"age":0, "Planet":[] },
                        {"id":13,"name":"No.13","x":3000,"y":2000,"age":0, "Planet":[] },
                        {"id":14,"name":"No.14","x":4000,"y":2500,"age":0, "Planet":[] },
                        {"id":15,"name":"No.15","x":5000,"y":3000,"age":0, "Planet":[] },
                        {"id":16,"name":"No.16","x":6000,"y":3500,"age":0, "Planet":[] },
                        {"id":17,"name":"No.17","x":7000,"y":4000,"age":0, "Planet":[] },
                        {"id":18,"name":"No.18","x":8000,"y":4500,"age":0, "Planet":[] },
                     ];

    testSystemData3 = [
                        {"id":19,"name":"No.18","x":3000,"y":3000,"age":0, "Planet":[] },
                     ];

    //testSystemData = [  {"id":1,"name":"1","x":3622,"y":1163,"age":0}];
    testGalaxyData = [{"id":1, "quadrantId":1, "name":"Galaxy01","description": "here is the galxy description", "x":-50,"y":-50,"age":0,"systems":testSystemData,},
                      {"id":2, "quadrantId":1, "name":"Galaxy02","description": "here is the galxy description", "x":260,"y":50,"age":0,"systems":testSystemData2},
                      //{"id":3, "quadrantId":1, "name":"Galaxy03","description":hereis is the galxy description", "x":100,"y":150,"age":0,"systems":testSystemData},
                      {"id":4, "quadrantId":1, "name":"Galaxy04","description": "here is the galxy description", "x":150,"y":-110,"age":0,"systems":testSystemData},
                     // {"id":5, "quadrantId":1, "name":"Galaxy05","description":hereis is the galxy description", "x":120,"y":-180,"age":0,"systems":testSystemData},
                      {"id":6, "quadrantId":1, "name":"Galaxy06","description": "here is the galxy description", "x":-150,"y":-220,"age":0,"systems":testSystemData2},
                      {"id":7, "quadrantId":1, "name":"Galaxy07","description": "here is the galxy description", "x":-220,"y":-80,"age":0,"systems":testSystemData},
                     // {"id":8, "quadrantId":1, "name":"Galaxy08","description":hereis is the galxy description", "x":-140,"y":20,"age":0,"systems":testSystemData},
                      //{"id":9, "quadrantId":1, "name":"Galaxy09","description":hereis is the galxy description", "x":-100,"y":120,"age":0,"systems":testSystemData},
                      {"id":10,"quadrantId":2, "name":"Galaxy10","description": "here is the galxy description","x":70,"y":200,"age":0,"systems":testSystemData2},
                      {"id":11,"quadrantId":2, "name":"Galaxy11","description": "here is the galxy description","x":0,"y":0,"age":0,"systems":testSystemData3},
                      {"id":12,"quadrantId":2, "name":"Galaxy12","description": "here is the galxy description","x":40,"y":-70,"age":0,"systems":testSystemData2},
                      {"id":13,"quadrantId":2, "name":"Galaxy13","description": "here is the galxy description","x":-70,"y":100,"age":0,"systems":testSystemData},
                      //{"id":14,"quadrantId":2, "name":"Galaxy14","description":heres is the galxy description","x":-50,"y":-50,"age":0,"systems":testSystemData},
                     // {"id":15,"quadrantId":2, "name":"Galaxy15","description":heres is the galxy description","x":100,"y":120,"age":0,"systems":testSystemData},
                      //{"id":16,"quadrantId":2, "name":"Galaxy16","description":heres is the galxy description","x":-220,"y":120,"age":0,"systems":testSystemData},
                      //{"id":17,"quadrantId":2, "name":"Galaxy17","description":heres is the galxy description","x":-120,"y":-200,"age":0,"systems":testSystemData},
                      {"id":18,"quadrantId":2, "name":"Galaxy18","description": "here is the galxy description","x":-200,"y":-80,"age":0,"systems":testSystemData2},
                      //{"id":19,"quadrantId":2, "name":"Galaxy19","description "hereis is the galxy description","x":-140,"y":20,"age":0,"systems":testSystemData},
                     // {"id":20,"quadrantId":2, "name":"Galaxy20","description "hereis is the galxy description","x":120,"y":-60,"age":0,"systems":testSystemData},
                      {"id":21,"quadrantId":3, "name":"Galaxy21","description": "here is the galxy description","x":90,"y":-130,"age":0,"systems":testSystemData},
                      {"id":22,"quadrantId":3, "name":"Galaxy22","description": "here is the galxy description","x":70,"y":200,"age":0,"systems":testSystemData2},
                      {"id":23,"quadrantId":4, "name":"Galaxy23","description": "here is the galxy description","x":0,"y":0,"age":0,"systems":testSystemData},
                      {"id":24,"quadrantId":4, "name":"Galaxy24","description": "here is the galxy description","x":70,"y":100,"age":0,"systems":testSystemData2},
                      {"id":25,"quadrantId":5, "name":"Galaxy25","description": "here is the galxy description","x":100,"y":0,"age":0,"systems":testSystemData},
                      {"id":26,"quadrantId":5, "name":"Galaxy26","description": "here is the galxy description","x":-100,"y":-200,"age":0,"systems":testSystemData2},
                      {"id":27,"quadrantId":6, "name":"Galaxy27","description": "here is the galxy description","x":0,"y":0,"age":0,"systems":testSystemData},
                      {"id":28,"quadrantId":6, "name":"Galaxy28","description": "here is the galxy description","x":70,"y":100,"age":0,"systems":testSystemData2},
                      {"id":29,"quadrantId":7, "name":"Galaxy29","description": "here is the galxy description","x":0,"y":0,"age":0,"systems":testSystemData},
                      {"id":30,"quadrantId":7, "name":"Galaxy30","description": "here is the galxy description","x":70,"y":100,"age":0,"systems":testSystemData2},
                      {"id":31,"quadrantId":8, "name":"Galaxy31","description": "here is the galxy description","x":0,"y":0,"age":0,"systems":testSystemData},
                      {"id":32,"quadrantId":8, "name":"Galaxy32","description": "here is the galxy description","x":70,"y":100,"age":0,"systems":testSystemData2},
                      ];

testRocketsData = [
                    {'id': 1, 'planet_id': 1, 'img_url': '../img/rockets/default01.png' },
                    {'id': 2, 'planet_id': 1, 'img_url': '../img/rockets/default02.png' },
                    {'id': 3, 'planet_id': 1, 'img_url': '../img/rockets/default03.png' },
                    {'id': 4, 'planet_id': 2, 'img_url': '../img/rockets/default01.png' },
                    {'id': 5, 'planet_id': 2, 'img_url': '../img/rockets/default02.png' },
                    {'id': 6, 'planet_id': 3, 'img_url': '../img/rockets/default03.png' },
                  ];

testVideosData = [ {'id': 1, 'planet_id': 1, 'youtube_url': '438fndL6pJ0' },
                   {'id': 2, 'planet_id': 1, 'youtube_url': 'qlGQoxzdwP4' },
                   {'id': 3, 'planet_id': 1, 'youtube_url': 'bpOSxM0rNPM' },
                   {'id': 4, 'planet_id': 2, 'youtube_url': 'jXTh94h5O9c' },
                   {'id': 5, 'planet_id': 2, 'youtube_url': '6Ksa1wtK5zo' },
                   {'id': 6, 'planet_id': 3, 'youtube_url': 'qlGQoxzdwP4' },
                  ];

testSkillsData = [ {'id':1, 'planet_id':1, 'name': 'blender', 'type':'3D Deisng', 'level': 4.0 },
                   {'id':2, 'planet_id':1, 'name': 'PowerPoint', 'type':'Document Edit', 'level': 5.0 },
                   {'id':3, 'planet_id':1, 'name': 'Scratch', 'type':'Programming', 'level': 3.5 },
                   {'id':4, 'planet_id':1, 'name': 'MineCraft', 'type':'Programming', 'level': 4.0 },
                   {'id':5, 'planet_id':1, 'name': 'Lego', 'type':'Robot Engineering', 'level': 3.0 },
                   {'id':6, 'planet_id':2, 'name': 'Lego', 'type':'Robot Engineering', 'level': 5.0 },
                   {'id':7, 'planet_id':2, 'name': 'Guitar', 'type':'Instrument', 'level': 4.5 },
                 ];

testUserData = [  {'id':1, 'website':'stevesuyao.com', 'avatar':'../img/avatars/a1.png', 'name': 'Steve', 'email':'stevesuyao@gmail.com', 'hometown': 'Beijing', 'school':'NEU', 'hobbies':'soccer','heros':'optimus prime', 'interests':'web development', 'goal':'world peace'},
                  {'id':2, 'website':'build-it-yourself.com', 'avatar':'../img/avatars/a2.png', 'name': 'John', 'email':'', 'hometown': 'Boston', 'school':'', 'hobbies':'','heros':'', 'interests':'', 'goal':''}
                ];

$(function(){
    app = new App(appConfig);
});

/* App */

function App(config) {
    this.$elem = $('body');

    this.config = config;

    this.user = null;
    this.hasSignup = false;

    var self = this;
    starId = self.getUrlStarId();

    if (starId) {
        $('body').addClass('star-url');
    }

    //this.framerate = $('#framerate');
    this.timeSinceLastFrame = 0;

    this.enableMapAnimation = false;

    this.universe = 'qudrant';

    this.arrTimeSinceLastFrame = [];
    this.lastFrameTime = new Date().getTime();

    this.initMaps();
    this.initScreens();
    this.initMenu();
    this.initBranding();
    this.initCursor();
    //this.initAudio();
    this.initSharing();
    this.initHandlers();

    this.go('front');
    //this.go('navigating');
    //this.go('star-creation');

    this.triggerMapAnimation();

    /*Temp */



    /*if (Modernizr.touch) {
        return;
    }*/

/*    this.starMap.requestStars(function(){
        // Once the star data is loaded, check if we
        // have a star ID in the URL and show the star.

        var starData = starId && self.starMap.findStarData(starId);

        if (starData) {

            showSpecificStar = true;

            self.tileMap.center(starData.x, starData.y);

            setTimeout(function() {

                self.tileMap.center(starData.posX, starData.posY);
                self.screenStarSharing.setStarData(starData);

                setTimeout(function() {

                    self.tileMap.center(starData.posX, starData.posY);
                    self.go('star-sharing');



                }, 5500);

            }, 100);
        }
    });*/


};

App.prototype.initSharing = function(){
    this.$sharing = this.$elem.find('nav.sharing');
    this.$embed = this.$sharing.find('.embed');

    var $body = this.$elem;

    this.$sharing.hover(function() {
        $body.toggleClass('custom-cursor');
    });

    this.$embed.hover(function() {
        $(this).toggleClass('open');
    });
};

App.prototype.initMenu = function(){
    this.menu = new Menu(this)
};


App.prototype.initScreens = function(){
    this.$screens = this.$elem.find('section.screen');

    this.screenFront        = new ScreenFront(this);
    this.screenDirections   = new ScreenDirections(this);
    this.screenNavigating   = new ScreenNavigating(this);
    this.screenStarCreation = new ScreenStarCreation(this);
    this.screenStarSharing  = new ScreenStarSharing(this);
    this.screenWhy          = new ScreenWhy(this);
    this.screenPlanet       = new ScreenPlanet(this);
    this.screenMessage      = new ScreenMessage(this);
    this.screenTravelspace  = new ScreenTravelspace(this);
    this.screenProjectForm = new ScreenProjectForm(this);


    this.screenControllers = [
        this.screenFront,
        this.screenDirections,
        this.screenNavigating,
        this.screenStarCreation,
        this.screenStarSharing,
        this.screenWhy,
        this.screenStarShowing,
        this.screenMessage,
        this.screenProjectForm
    ];
};

App.prototype.initBranding = function(){
    var self = this;
    var $body = this.$elem;

    this.$branding = this.$elem.find('.branding');


    this.$branding.find('.why-name-a-star').click(function(e){
        var whyScreenIndex = self.getScreenIndex('why');
        if (self.screenIndex != whyScreenIndex) {
            self.go(whyScreenIndex);
        } else {
            self.back();
        }
        e.preventDefault();
    });

    this.$branding.hover(function() {
        $body.toggleClass('custom-cursor');
    })
};

App.prototype.initMaps = function(){
    this.nebulae = new Nebulae(this);// create instance of Nebulae

    this.tileMap = new TileMap(this);  // create instance of TileMap(backgroundimage)
    this.systemMap = new SystemMap(this);
    //this.starMap = new StarMap(this);
    this.galaxyMap = new GalaxyMap(this);
    this.miniMap = new MiniMap(this);

    //this.nebulae.initMiniMapMarkers();
    this.planetinfopage = new PlanetInfoPage($('.planet-data.planetpage'));
    this.rocketSlider = new Slider($('.planet-data.rocket .slider-wrap'),'Rocket');
    this.videoSlider = new VideoSlider($('.planet-data.proj .slider-wrap'),'Project');
    this.biopage =  new BioPage($('.planet-data.bio'));
    this.skillpage = new SkillPage($('.planet-data.skill'));
};

App.prototype.initCursor = function(){
    if (navigator.userAgent.indexOf('MSIE') != -1 ) return;
    if(Modernizr.touch) return;
    var self = this;

    this.$elem.addClass('custom-cursor');
    this.$cursor = this.$elem.find('.cursor');

    $(document).mousemove(function(e){
        if (e.pageX && e.pageY) {
            self.$cursor.css({ left: e.pageX, top: e.pageY });
            self.$cursor.show();
        }

        var closeable = !!$(e.target).closest('.closeable').length;
        var inContent = !!$(e.target).closest('.content').length;

        if (closeable && !inContent) {
            self.$cursor.addClass('close');
        } else {
            self.$cursor.removeClass('close');
        }
    });

    $(document).mousedown(function(){
        self.$cursor.addClass('cursor-clicked');
    });

    $(document).mouseup(function(){
        self.$cursor.removeClass('cursor-clicked');
    });
};

App.prototype.initAudio = function(){
    this.audio = new Audio(this);
};

App.prototype.triggerMapAnimation = function(){
    var self = this;
     //console.log('triggerMapAnimation')
    this.animationFrameId = window.requestAnimationFrame(function(){

        var now = new Date().getTime();
        self.timeSinceLastFrame = now - self.lastFrameTime;

        // Maintain array of frame times and output an average
        self.arrTimeSinceLastFrame.push(self.timeSinceLastFrame);
        if (self.arrTimeSinceLastFrame.length > 30) {
            self.arrTimeSinceLastFrame.shift();
        }
        var sum = 0;
        for(var i = 0; i < self.arrTimeSinceLastFrame.length; i++){
            sum += parseInt(self.arrTimeSinceLastFrame[i], 10); //don't forget to add the base
        }
        var avg = Math.round(1000 / (sum/self.arrTimeSinceLastFrame.length));
        //self.framerate.text(avg);

        if (Math.abs(appConfig.avgFrameRate - avg) > 5) {
            appConfig.avgFrameRate = avg;
        }

        self.lastFrameTime = now;

        self.triggerMapAnimation();
    });



    this.control.update();
    this.tileMap.update();
    this.miniMap.update();
    //if(!this.enableMapAnimation) return;
   //this.starMap.update();
    this.galaxyMap.update();
    this.systemMap.update();
    this.nebulae.update();
};

App.prototype.cancelMapAnimation = function(){
    if (this.animationFrameId) {
        window.cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
    }
};

App.prototype.go = function(n){
    var self = this;

    if (n == 'navigating') {
        setTimeout(function(){
            showHover = true;
        }, 1200);
    }

    if (typeof n === 'undefined') n = 0;
    if (typeof n === 'string') n = this.getScreenIndex(n);


    var $oldScreen = this.getActiveScreen();
    var $newScreen = this.getScreen(n);

    //console.log(n);
   // console.log(this.$screens.index($oldScreen));
    var transitionDuration = parseFloat($oldScreen.css('transition-duration'));

    if (this.$screens.index($oldScreen) == n){ console.log('???');return;}

    $newScreen.show();

    // Add a tiny delay after switching the new screen to
    // display block otherwise in some situations the
    // transition just immediately skips to its end state.
    setTimeout(function(){
        self.showScreen($oldScreen, $newScreen);
    }, 10);

    // Set the previously showing screen to display: none once its anim
    // has finished so it doesn't block clicks if it's on top.
    setTimeout(function(){
        self.hideScreen($oldScreen);
    }, 10 + (1000 * transitionDuration));

    this.screenIndexPrevious = this.screenIndex;
    this.screenIndex = n;
    //console.log(this.screenIndex);

    if (this.screenIndexPrevious != this.screenIndex) {
        this.callIfExists(this.screenControllers[this.screenIndexPrevious], 'leaveScreen');
    }

    this.callIfExists(this.screenControllers[this.screenIndex], 'enterScreen');


};

App.prototype.callIfExists = function(object, method){
    if (object && object[method]) object[method]();
};

App.prototype.next = function() {
    var idx = this.screenIndex + 1;
    var max = this.$screens.length - 1;
    this.go(Math.min(idx, max));
};

App.prototype.prev = function() {
    var idx = this.screenIndex - 1;
    var min = 0;
    this.go(Math.max(idx, min));
};

App.prototype.back = function() {
    this.go(this.screenIndexPrevious);
};

App.prototype.showScreen = function($oldScreen, $newScreen){
    $oldScreen.removeClass('screen-active');
    $newScreen.addClass('screen-active');
};

App.prototype.hideScreen = function($oldScreen){
    $oldScreen.hide();
};

App.prototype.getActiveScreen = function() {
    return this.$screens.filter('.screen-active');
};

App.prototype.getScreen = function(n) {
    return this.$screens.eq(n);
};

App.prototype.getScreenIndex = function(name) {
    var m = this.$screens.index(this.$screens.filter('.screen-' + name));
    //console.log(this.$screens);

    return this.$screens.index(this.$screens.filter('.screen-' + name));

};

App.prototype.getUrlStarId = function(){
    var id = false;

    var m = location.hash.match(/star-(\d+)/);
    if (m) id = m[1];

    return id;
};

App.prototype.setUrlStarId = function(id){

    return;

    if (id == 'reset') {
        //alert('reset');
        location.hash = '';
        return;
    }

    if (!isNaN(+id)) {
        location.hash = 'star-' + id;
    }
};

App.prototype.pointDelta = function(p1, p2) {
    var x = p1.x - p2.x;
    var y = p1.y - p2.y;
    return Math.sqrt(x * x + y * y);
};

App.prototype.log = function(message) {
    /*if (typeof console != 'undefined' && console.log) {
        if (location.hostname && location.hostname == 'localhost') {
            console.log(message);
        }
    }*/
    console.log(message);
};

App.prototype.initHandlers = function(){
        this.control = new SlideControls(this);
};

App.prototype.showPlanet = function(cx,cy,userID,planetID){
      var self = this;
      self.universe = 'planet';
      var nx = 1.25 * app.halfWinW - cx;
      var ny = app.winH - 180 - cy;
      self.systemMap.activePlanet.addClass('onClick');
      self.control.clickPlanet(nx,ny);
      self.go('star-showing');
      self.menu.showPlanet();
      self.showPlanetPages(userID,planetID);
};

App.prototype.showPlanetPages = function(userID,planetID){
     this.planetinfopage.requestData(this.systemMap.activePlanet);
     this.biopage.requestData(userID);
     this.skillpage.requestData(planetID);
     this.videoSlider.requestData(planetID);
     this.rocketSlider.requestData(planetID);
     this.screenPlanet.show();
};

App.prototype.closePlanetPage = function(){
     this.screenPlanet.leave();
     this.biopage.empty();
     this.skillpage.empty();
     this.videoSlider.empty();
     this.rocketSlider.empty();
};

// make base64 password
App.prototype.make_base_auth = function(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
};

App.prototype.login =  function(a,b,callback){  // a, b are dom id text

     var self = this;
     var username = $("#"+a).val();
     var password = $("#"+b).val();
     var h = self.make_base_auth(username, password);
     $.ajax( {
        url: self.config.apiUrl +　self.config.REST.LOGIN,
        type: 'POST',

       beforeSend: function (xhr){
           xhr.setRequestHeader('Authorization', h);
        },

        success: function( data) {
          console.log(data);
          if(data.message.user) {
            self.user = data.message.user;
            self.miniMap.decoMarker(self.user.Planet);

          }
          self.message = data.message.text;
          if (typeof callback === "function") {
              callback();
          }
            //console.log(data);
        },
        error: function(status){
          //To-do: add server error warning!

          console.log('Server Error');
        }
    });
};

App.prototype.refreshLogin = function(a,b,callback){

     var self = this;
     var username = $("#"+a).val();
     var password = $("#"+b).val();
     // var h = self.make_base_auth(username, password);
     $.ajax( {
        url: self.config.apiUrl +　self.config.REST.LOGIN,
        type: 'POST',

       // beforeSend: function (xhr){
       //     xhr.setRequestHeader('Authorization', h);
       //  },

        success: function( data) {
          console.log(data);
          if(data.message.user){
            self.user = data.message.user;
            self.miniMap.decoMarker(self.user.Planet);
            self.message = data.message.text;
            if (typeof callback === "function") {
                callback();
            }
          }

        },
        error: function(status){
          //To-do: add server error warning!

          console.log('Server Error');
        }
    });

};

App.prototype.logout = function(callback){
    var self = this;

    $.ajax( {
          url: self.config.apiUrl +　self.config.REST.LOGOUT,
          success: function( data) {
            self.user = null;
            self.message = data.message.text;
            if (typeof callback === "function") {
              callback();
            }
            console.log(data);
          },
          error: function(status){

            console.log('Server Error');
          }
      });

};

App.prototype.signup = function(a,b,callback){
     var self = this;
     var username = $("#" + a).val();
       var password = $("#" + b).val();
       var _data = {};
       _data.User = {};
       _data.User.username = username;
       _data.User.password = password;
       _data.User.role = 'author'; // to-do: add admin page

      $.ajax( {
          url: self.config.apiUrl +　self.config.REST.SIGNUP,
          type: 'POST',
          data:_data,

          success: function( data) {
              console.log(data);
              self.message = data.message.text;
              if (typeof callback === "function" ) {
                if(data.message.type === 'success') {
                  callback(true);
                  self.hasSignup = true;
                }
                else callback(false);
              }
          },
          error: function(status){

            console.log(status);
          }
      });

};

App.prototype.createPlanet = function($form,system_id, planet_edge,callback){
  var self = this;
  //var fe = $( "#" + form_id )[0];
  var fe = $form[0];
  var fd = new FormData(fe);
  fd.append("data[Planet][system_id]",system_id);
  fd.append("data[Planet][planet_edge]",planet_edge);

  self.screenStarCreation.$elem.addClass('state-loading');

  $.ajax({
    url: self.config.apiUrl +　self.config.REST.ADDPLANETS,
    type: "POST",
    data: fd,
    processData: false,  // tell jQuery not to process the data
    contentType: false,   // tell jQuery not to set contentType
    beforeSend: function(){
    $('#preloader').addClass('active');
    },
    success: function(data){
            console.log(data);
            if (typeof callback === "function" ) {
                if(data.message.type === 'success') {
                  self.message = data.message.text;
                  self.currentPlanet = data.message.planet.Planet;
                  self.user.Planet = data.message.planet.Planet;
                  callback(true);
                }
                else {
                  if(data.message.text.user_id) self.message = "You can only have one planet." ;
                  else if(data.message.text.name) self.message = "Please name your planet first.";
                  else if(data.message.text.photo) self.message = "Please choose a photo, jpg/png format only and the size should not be larger than 2MB."
                  callback(false);

                }
              }

    },
    error: function(status){
          console.log(status);
    },
    complete: function(){
      $('#preloader').removeClass('active');
      console.log('complete');
      self.screenStarCreation.$elem.removeClass('state-loading');
      barLoading($('#create-planet-bar'), 0);
    }
  }).uploadProgress(function(e){
          if (e.lengthComputable) {
          var percentage = Math.round((e.loaded * 100) / e.total);
          barLoading($('#create-planet-bar'), percentage);
        }

    });

};



App.prototype.serverError = function(){


};

App.prototype.loginMessage = function(dom1,dom2){
      if(!this.user){
      //$('#error-login').text('invalid username or password, please try again');
         $(document.body).removeClass('loggedin');
       if(dom2) dom2.val('');
        $('#user-welcome').text("");
        $('#username').val('');
      }
      else {
        dom2.val('');
        var wt = 'Weclome: ' + this.user.username;
        $('#user-welcome').text(wt);
        $('#username').val(this.user.username);
        if(this.screenMessage){
          this.screenMessage.changeMessage(this.message);
          this.screenMessage.enterScreen();
        }
        else{ console.log('no instance of ScreenMessage') }
      };
       if(dom1) dom1.text(this.message);
       else console.log(this.message);
};

App.prototype.signupMessage = function(dom,b){
     if(b) {
        $(document.body).removeClass('signup');
        if(this.screenMessage){
          this.screenMessage.changeMessage(this.message);
          this.screenMessage.enterScreen();
        }
        else{ console.log('no instance of ScreenMessage') }
      }
      else
      {
        if(dom) dom.text(this.message);
        else console.log(this.message);
     }
};

App.prototype.handleFormSubmit = function(form,input,constraints){
      var self = this;
     // validate the form aainst the constraints
    var errors = validate(form, constraints);
    //console.log(errors);
    // then we update the form to reflect the results
    self.menu.showErrors(form, errors || {});
    if (!errors) {
      self.signup('email','new-password',function(b){self.signupMessage($('#email-error'),b)});
    }
};





/* Menu */
function Menu(app){
    this.app = app;
    var self = this;
    this.$menu = this.app.$elem.find('.menus'); //  main container
    this.$menus = this.app.$elem.find('.menu'); // array
    this.$top = this.$menu.find('.menu-top');
    this.$left = this.$menu.find('.menu-left');
    this.$bottom = this.$menu.find('.branding');
    this.$right = this.$menu.find('.menu-right');
    this.$signup = this.$menu.find('.menu-signup');
    this.$signupForm = document.querySelector("form#signup");
    this.$signupInputs =  this.$signupForm.querySelectorAll("input");

    this.init();

    $(document.body).on('enterGalaxy',this.postionComponet)
                     .on('enterQudrant',this.postionComponet);

    this.$menu.hover(function() {
        app.$elem.toggleClass('custom-cursor');
    });

};

Menu.prototype.init = function(){

    var self = this;

    $('.btn-toggle').on('click', function(e){
            e.preventDefault();

            var t = $(e.target).parent().parent();
            var o = t.index('.menu');

            // make sure show only one menu when click
            self.$menus.each(function(){
                                if($(this).index() !== o) $(this).addClass('hide');
                            });

            t.toggleClass('hide');

           if(self.$menus.not('.hide').length === 0 && o !== 2){//self.app.universe === 'planet'){ // make sure minimap will show on 'planet' page
            self.$right.removeClass('hide');
            }

            if(self.app.universe === 'planet'){
                self.quitPlanet();

               //$(document.body).trigger('quitePlanet');

            }
            if($(document.body).hasClass('signup')){
                $(document.body).removeClass('signup');
                if(t.hasClass('menu-signup')) self.$left.removeClass('hide');
            }

    });

    $('.menu-bar a').on('click',function(e){
        e.preventDefault();
        if($(e.target).hasClass('active')) return;
        $('.menu-bar a').removeClass('active');
        $(e.target).addClass('active');
        var n = $(e.target).index('.menu-bar a');
        $('.planet-data').removeClass('active');
        $('.planet-data:eq('+ n +')').addClass('active');

        app.videoSlider.stopVideo();
    });


    $('.btn-back').on('click',function(e){
        e.preventDefault();
        if(self.app.universe === 'qudrant') return;
        if(self.app.universe === 'galaxy') {
            self.app.universe = 'qudrant';
            $(document.body).trigger('enterQudrant');
        }
        if (self.app.universe === 'planet'){
            //self.app.universe = 'galaxy';
           self.quitPlanet();
        }
        //console.log(app.universe);
/*        self.app.videoSlider.emptySlides();
        self.app.rocketsSlider.emptySlides();*/
    });

    $('.menu-left-screen .btn-login').on('click',function(e){
      e.preventDefault();
      //$('#error-login').text('invalid username or password, please try again');
      app.login('username','password', function(){
                                                  app.loginMessage($('#error-login'),$('#password'));
                                                  app.menu.afterLogin(app.user);
                                                });

    });

    $('.branding .btn-login').on('click',function(e){
        e.preventDefault();
        if(app.user){
          app.message = "You have already logged in!"
          app.screenMessage.enterScreen();
          return;
        }
        if( app.menu.$left.hasClass('hide') ){
          app.menu.$left.removeClass('hide');
          app.menu.$right.addClass('hide');
          app.menu.$top.addClass('hide');
          return;
        }

        app.login('username','password', function(){
                                                  app.loginMessage($('#error-login'),$('#password'));
                                                  app.menu.afterLogin(app.user);
                                                });
    });

    $('.menu-left-screen .input').on('change',function(e){
        e.preventDefault();
        $('#error-login').text('');
    });

    $('.btn-logout').on('click',function(e){
        e.preventDefault();
        app.logout(function(){
                              app.loginMessage($('#error-login'),$('#username'));
                              //app.menu.afterLogin(app.user);
                              //app.miniMap.decoMarker(false);
                              $('.here').removeClass('here');
                              });
    });

    $('.btn-signup').on('click',function(e){
        e.preventDefault();
        if(app.user === null) app.menu.signup();
        else $('#error-login').text('please logout, then signup. ');
    });

    // signup form event
    this.$signupForm.addEventListener("submit", function(ev){
      ev.preventDefault();
      app.handleFormSubmit(app.menu.$signupForm, app.menu.$signupInputs, appConfig.constraints1);
    });

    // signup inputs validation
    for (var i = 0; i < this.$signupInputs.length; ++i) {
        this.$signupInputs.item(i).addEventListener("change", function(ev) {
          var errors = validate(app.menu.$signupForm, appConfig.constraints1) || {};
          app.menu.showErrorsForInput(this, errors[this.name]);
        });
      }
};

Menu.prototype.postionComponet = function(){
    $('.btn-back').toggleClass('hide');
    app.menu.$right.addClass('hide');

};

Menu.prototype.afterLogin = function(b){
    if( b!== null ) {
      this.$left.addClass('hide');
       this.$right.removeClass('hide');
      $(document.body).addClass('loggedin');
    }
    else{
       $(document.body).removeClass('loggedin');
    }

};

Menu.prototype.forceLogin = function(){
    this.$left.removeClass('hide');
    this.$right.addClass('hide');
    this.$top.addClass('hide');
    $('#error-login').text('To create your planet, please login first.')
};

Menu.prototype.quitPlanet = function(){
    if(this.$left.hasClass('hide'))this.$right.removeClass('hide');
    this.$top.addClass('hide');
    this.app.systemMap.quitPlanet();
};

Menu.prototype.showPlanet = function(){
   this.$top.removeClass('hide');
   this.$left.addClass('hide');
   this.$right.addClass('hide');

};

Menu.prototype.closeMenu = function(){
    this.$menu.addClass('close');
};

Menu.prototype.openMenu = function(){
    this.$menu.removeClass('close');

};

Menu.prototype.signup = function(){
  $(document.body).addClass('signup');
  this.$signup.removeClass('hide');

};

  // Shows the errors for a specific input
Menu.prototype.showErrorsForInput = function(input, errors) {
        var self = this;
        // This is the root of the input
        var formGroup = closestParent(input.parentNode, "form-group")
          // Find where the error messages will be insert into
          , messages = formGroup.querySelector(".messages");
        // First we remove any old messages and resets the classes
        this.resetFormGroup(formGroup);
        // If we have errors
        if (errors) {
          // we first mark the group has having errors
          formGroup.classList.add("has-error");
          // then we append all the errors
          _.each(errors, function(error) {
          self.addError(messages, error);
          });
        } else {
          // otherwise we simply mark it as success
          formGroup.classList.add("has-success");
        }
};

// Updates the inputs with the validation errors
Menu.prototype.showErrors = function(form, errors) {
        var self = this;
        // We loop through all the inputs and show the errors for that input
        _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
          // Since the errors can be null if no errors were found we need to handle
          // that
          self.showErrorsForInput(input, errors && errors[input.name]);
        });
};

// Adds the specified error with the following markup
      // <p class="help-block error">[message]</p>
Menu.prototype.addError = function(messages, error) {
       /* var block = document.createElement("p");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerText = error;
        messages.appendChild(block);*/
        $(messages).text(error);
};

Menu.prototype.resetFormGroup = function(formGroup) {
  // Remove the success and error classes
  formGroup.classList.remove("has-error");
  formGroup.classList.remove("has-success");
  // and remove any old messages
/*  _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
    el.parentNode.removeChild(el);
  });*/
    _.each(formGroup.querySelectorAll(".messages"), function(el) {
    $(el).text('');
  });
};






/* Audio */

function Audio(app) {
    this.app = app;

    var self = this;

    try {
        this.initBackgroundClip();
        this.initStarClips();
        this.initStarCreationClip();
        this.initEnterNebulaClip();

        // Toggle mute button
        $('#toggle-mute').on('click', function(e){
            self.toggleMute(e);
        });

    } catch (e) {
        // Seeing an 'out of stack space' error from Howler.js in IE.
        this.app.log(e.message);
    }
};

Audio.prototype.toggleMute = function(e){
    e.preventDefault();
    $(e.target).toggleClass('muted');
    ($(e.target).hasClass('muted')) ? Howler.mute() : Howler.unmute();
};

Audio.prototype.initBackgroundClip = function(){
    var urls = this.urls.background;
    this.backgroundClipFullVolume = 0.3;
    this.backgroundClip = new Howl({ urls: urls, volume: this.backgroundClipFullVolume, loop: true });
    this.fadeAndPlayBackgroundClip();
};

Audio.prototype.fadeAndPlayBackgroundClip = function(){
    var self = this;
    var clip = this.backgroundClip;
    if (clip) {
        clip.play(function(){
            clip.fade(0, self.backgroundClipFullVolume, 10000);
        });
    }
};

Audio.prototype.fadeAndStopBackgroundClip = function(){
    var self = this;
    var clip = this.backgroundClip;
    if (clip) {
        clip.fade(this.backgroundClip.fullVolume, 0, 3000, function(){
            clip.stop();
        });
    }
};

Audio.prototype.initStarClips = function(){
    this.starClipFullVolume = 0.1;
    this.starClips = [];

    for (var i = 0; i < 7; i++) {
        var urls = this.urls.stars[i];
        this.starClips[i] = new Howl({ urls: urls, volume: this.starClipFullVolume });
    }
};

Audio.prototype.playStarClip = function(i){
    var clip = this.starClips && this.starClips[i];
    if (clip) clip.play();
};

Audio.prototype.initStarCreationClip = function(){
    var urls = this.urls.starCreation;
    this.starCreationClipFullVolume = 0.5;
    this.starCreationClip = new Howl({ urls: urls, volume: this.starCreationClipFullVolume });
};

Audio.prototype.playStarCreationClip = function(n){
    var clip = this.starCreationClip;
    if (clip) clip.play();
};

Audio.prototype.initEnterNebulaClip = function(){
    var urls = this.urls.enterNebula;
    this.enterNebulaClipFullVolume = 0.2;
    this.enterNebulaClip = new Howl({ urls: urls, volume: this.enterNebulaClipFullVolume });
};

Audio.prototype.playEnterNebulaClip = function(n){
    var clip = this.enterNebulaClip;
    if (clip) clip.play();
};

Audio.prototype.urls = {
    background:   ['http://localhost:8080/audio/bg.mp3'],
    enterNebula:  ['http://localhost:8080/audio/stardust.mp3'],
    starCreation: ['http://localhost:8080/audio/protostar-2.mp3'],
    stars: [
        ['http://localhost:8080/audio/tinkle-7.mp3'],
        ['http://localhost:8080/audio/tinkle-6.mp3'],
        ['http://localhost:8080/audio/tinkle-5.mp3'],
        ['http://localhost:8080/audio/tinkle-4.mp3'],
        ['http://localhost:8080/audio/tinkle-3.mp3'],
        ['http://localhost:8080/audio/tinkle-2.mp3'],
        ['http://localhost:8080/audio/tinkle-1.mp3'],
    ]
};

/* Screen: Front */

function ScreenFront(app) {
    var self = this;

    this.app = app;

    this.$elem = this.app.$elem.find('section.screen-front');
    this.$btn = this.$elem.find('#rocket-front');
    this.$btn2 = this.$elem.find('#start-btn');

    this.message = [
        "We're looking for a few intelligent life forms, smart ladies and hairy chested men",
        "to help us evolve a far out universe where art, nature and technology live in harmony.",
        "Many planets are barren and waiting for eager builders to bring them to life.",
        "If you have the right stuff, we want you!",
        "Claim a planet.Invite an alien avatar.And park your collection of rockets.",
        "Post your bio and skill sets.Display your projects.Earn space money."
    ];

    this.currMessage = 0;

   /* if (Modernizr.touch) {
        this.$btn.add('.sharing, #toggle-mute, .why-name-a-star, .cursor').remove();
        this.$elem
            .find('p').remove().end()
            .find('.content').append('<p>This experience allows you to create stars and share them with the world, but is not supported <span class="no-wrap">for touch devices.</span></p>');
    }*/

    // if(Modernizr.touch) {
    //   self.$elem[0].addEventListener( 'touchstart', self.touchstart, false );
    // }

    function start(e){
      e.preventDefault();
        setTimeout(function(){
            //self.cancelDiamondAnimation();
            self.app.menu.openMenu();
            self.app.control.enabled = true;
            self.app.go('navigating');
            // self.app.refreshLogin('username','password', function(){
            //                                       app.loginMessage($('#error-login'),$('#password'));
            //                                       app.menu.afterLogin(app.user);
            //                                     });
        }, 3000);
        self.$elem.remove();
        //self.leaveScreen();


        self.app.screenTravelspace.startEffect();
        self.app.initHandlers();
    };

    this.$btn.click(start);
    this.$btn2.click(start);

    $('#astronaut').on('click', function(){
        console.log(self.currMessage);
        if(self.currMessage !== self.message.length) return;
        self.currMessage = 0;
        self.showMessage(self.message);

      });



};

ScreenFront.prototype.touchstart = function(e){
  e.preventDefault();
};

ScreenFront.prototype.getHotRocket = function(){
      var url = appConfig.apiUrl + appConfig.REST.GETHOTROCKET;
      $.ajax( {
          url: url,
          success: function( data) {
            console.log(data.rockets.Rocket);
            var rocket = "/cake/app/webroot/files/rocket/photo/" + data.rockets.Rocket.id + "/" + data.rockets.Rocket.photo;
            $('#rocket-front').find('image').attr('xlink:href', rocket);
          },
          error: function(status){
            console.log('server error');
          }
      });
};

ScreenFront.prototype.enterScreen = function(){
   console.log('enterScreenFront');
   // this.getHotRocket();
   var self = this;
    setTimeout(function() {
        $('#parallax').parallax();
        $('#footer-ground').css({'z-index': 0});
        self.showMessage(self.message);

    }, 2000)
};

ScreenFront.prototype.showMessage = function(){
        var self = this;
        var message = this.message;
        $("#app-desciption").lbyl({
            content: message[self.currMessage],
            speed: 50, //time between each new letter being added
            type: 'show', // 'show' or 'fade'
            fadeSpeed: 500, // Only relevant when the 'type' is set to 'fade'
            finished: function(){
                self.currMessage++;
                if(self.currMessage === message.length) {return;};
                setTimeout(function(){
                    self.showMessage(message);
                }, 500)
            }
        });

};

ScreenFront.prototype.leaveScreen = function(){
   console.log('leaveScreen');
   //this.$elem.removeClass('active');
};


//////////////////////////////////////////////

function ScreenPlanet(app) {
    var self = this;

    this.app = app;

    this.$elem = this.app.$elem.find('section.screen-star-showing'); // mask layer
    this.$container = $('.planet-info-container');

    this.savedCenter = {x:0, y:0};

/*    this.$elem.click(function(e){
         e.preventDefault();

        self.app.systemMap.$galaxy.removeClass('clickOnPlanet');
        self.app.universe = 'galaxy';
        self.app.systemMap.steadySystem(self.app.systemMap.clickedSystem);
        self.app.systemMap.quitPlanet();
        self.app.go('navigating');
        //self.app.contorl.clickPlanet(self.savedCenter.x, self.savedCenter.y);

    });*/

    /*this.$content.hover(function() {
        $body.toggleClass('custom-cursor');
    });*/
};

ScreenPlanet.prototype.show = function(){
    this.$container.addClass('active');
};

ScreenPlanet.prototype.leave = function(){
    this.$container.removeClass('active');
};



/* Screen: TravelSpace */
function ScreenTravelspace(app){
    var self = this;
    this.app = app;
    this.$elem = this.app.$elem.find('div.screen-effect');
    this.$layerWrap = $('<div/>').attr('id', 'layers');
    this.initElements();
    $(document.body)
        .on('enterGalaxy', this.onEnterGalaxy)
        .on('enterQudrant',this.onEnterGalaxy);

};

ScreenTravelspace.prototype.initElements = function(){
    var self = this;
    var layers = 5,
        $layer,
        stars,
        $star;

    while (layers) {
      $layer = $('<div/>').addClass('layer layer-'+ layers);
      stars = 50;

      // Stick a bunch of svg stars on each layer
      while (stars) {
        $star = $('<span/>').addClass('star');

        // Randomise the position, size, and opacity (colour defined in CSS)
        $star.css({
          left: self.randomInt(1, 100) +'%',
          top: self.randomInt(1, 100) +'%',
          transform: 'scale('+ self.randomNum(0, 1) +')',
          opacity: self.randomNum(0.6, 1)
        });

        $layer.append($star);
        stars--;
      }
      self.$layerWrap.prepend($layer);
      layers--;
    }

    this.$elem.append(self.$layerWrap);
    this.$layerWrap.hide();
};

ScreenTravelspace.prototype.destroyElements = function(){
  //this.$layerWrap.remove();
  this.$layerWrap.hide();
  this.app.menu.$right.removeClass('hide');
};

ScreenTravelspace.prototype.startEffect = function(){
    var self = this;
    //this.initElements();
    this.$layerWrap.show();
   setTimeout(function(){
        self.endEffect();
    }, 2500);
};

ScreenTravelspace.prototype.endEffect = function(){
   this.destroyElements();
};

ScreenTravelspace.prototype.randomInt = function(min, max) {
    return Math.floor((Math.random() * max) + min);
};

  //Returns random number

ScreenTravelspace.prototype.randomNum = function(min, max) {
    return Math.max((Math.random() * max), min).toFixed(1);
};

ScreenTravelspace.prototype.onEnterGalaxy = function(){
    app.screenTravelspace.startEffect();

};

/* Screen: Message */
function ScreenMessage(app){
  var self = this;
  this.app = app;
  this.$elem = this.app.$elem.find('section.screen-message');
  this.$message = $('#app-message');

};

ScreenMessage.prototype.changeMessage = function(str){
    this.$message.text(str);
    this.app.message = str;
};

ScreenMessage.prototype.enterScreen = function(){
     var self = this;
     this.$message.text(this.app.message);
     this.$elem.show();
     this.$elem.addClass('screen-active');
      setTimeout(function(){
        self.leaveScreen();
    }, 2000);
};

ScreenMessage.prototype.leaveScreen = function(){
    this.$elem.removeClass('screen-active');
    this.$elem.hide();
};

/* Screen: Project-Form */
function ScreenProjectForm(app){
  var self = this;
  this.app = app;
  this.$elem = this.app.$elem.find('section.screen-project-form');
  this.$form = $('#Videoform');
  this.$form2 = $('#VideoEditform');
  this.initHandlers();
}

ScreenProjectForm.prototype = {
  constructor: ScreenProjectForm,

  enterScreen: function(mode){
    var self = this;
    this.$elem.show();
    this.$elem.addClass('screen-active');
    this.changeMode(mode);
  },

  leaveScreen: function(){
    this.$elem.removeClass('screen-active');
    this.$elem.hide();
    $('#Videoform').hide();
    $('#DelConfirm').hide();
    $('#Editform').hide();
  },

  emptyForm: function(){
    this.$elem.find('input').val("");
    this.$elem.find('textarea').val("");
    barRecover($('#video-submit'));
    barRecover($('#video-edit-submit'));
    $('#videoError').text("");
    $('#video-edit-submit').hide();
    this.$form2.find('span').css({'text-decoration':'none'});
  },

  changeMode: function(m){
     switch (m){
      case 'ADD':
        $('#Videoform').show();
        break;
      case 'EDIT':
         $('#Editform').show();
         //$('#video-edit-submit').hide();
         break;
      case 'DEL':
         $('#DelConfirm').show();
        break;
      default:
         console.log('nothing happend')

     }
  },

  addProject: function(planet_id){
      var self = this;
      console.log(planet_id);
      var link = $("#videolink").val();
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      //var fileRenamer = (?!\.\w*$)\. ;
      var match = false;
      if(link!== null && link !== "") match = link.match(regExp);

      var fe = $('#Videoform')[0];
      var fd = new FormData(fe);

      fd.set('data[Video][planet_id]',planet_id);
      fd.set('_method',"POST");

      if (match && match[2].length == 11) {
            console.log(match[2]);
           fd.set('data[Video][youtube_url]', match[2]);
            for (var pair of fd.entries()) {
              console.log(pair);
            }
      }
      else {
        console.log('not a valid youtube link');
      }

      barStart($('#video-submit'));

        $.ajax({
              //url: "http://localhost:8080/cake/videos/add.json",
              url: appConfig.apiUrl + appConfig.REST.ADDVIDEO,
              type:"POST",
              data:fd,
              processData: false,  // tell jQuery not to process the data
              contentType: false,   // tell jQuery not to set contentType
              success:function(data){
                console.log(data);
                if(data.message.type === 'success'){
                    barSuccess($('#video-submit'));
                    app.videoSlider.redraw(planet_id);
                    self.leaveScreen();
                    self.emptyForm();
                }
                else {
                  var em = 'error: ';
                  //if(data.message.text.photo)
                   // em += data.message.text;
                   em += "please make sure your file size is not larger 8 MB ";

                  barError($('#video-submit'), em);
                }

              },
              error: function(status){
                console.log(status);
              }

            }).uploadProgress(function(e) {  // use jquery progress plugin
                 // tracking uploading
              if (e.lengthComputable) {
               var percentage = Math.round((e.loaded * 100) / e.total);
               barLoading($('#video-submit'),percentage);
              }
            });

  },

  delProject: function(id,planet_id){
    var self = this;
    var url = appConfig.apiUrl + appConfig.REST.DELVIDEO + id + appConfig.REST.SUFFIX;
    $.ajax({
      url: url,
      type:"POST",
      success:function(data){
        console.log(data);
        self.leaveScreen();
        app.videoSlider.redraw(planet_id);
      },
      error: function(status){
        console.log(status);
      }

    });

  },

  editProject: function(id, planet_id, pos){
    var self = this;
    var url = appConfig.apiUrl + appConfig.REST.EDITVIDEO + id + appConfig.REST.SUFFIX;

    var link = $("#videolink2").val();
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = link.match(regExp);
    var fe = $('#VideoEditform')[0];
    fd = new FormData(fe);

    if (match && match[2].length === 11)  fd.set('data[Video][youtube_url]', match[2]);
    else {
      //fd.delete('data[Video][youtube_url]')
      fd.set('data[Video][youtube_url]',"");
      console.log('not a valid youtube link');
      $('#videoError').text('not a valid youtube link');
    };

    if($('#projectPhoto2').val() === "") fd.delete('data[Video][photo]');
    if($('#projectPDF2').val() === "") fd.delete('data[Video][pdf]');
    if($('#projectPPT2').val() === "") fd.delete('data[Video][ppt]');
    if($('#projectPhoto2').val() === "" && $('#projectPDF2').val() === "" && $('#projectPPT2').val() === "") fd.delete('data[Video][file_url]');

    barStart($('#video-edit-submit'));
    fd.set('_method',"POST");
    $.ajax({
      url: url,
      type:"POST",
      data:fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success:function(data){
        console.log(data);
         if(data.message.type === 'success'){
                    barSuccess($('#video-edit-submit'));
                    app.videoSlider.redraw(planet_id, pos);
                    self.leaveScreen();
                    self.emptyForm();
                }
                else {
                  var em = 'error: ';
                    //em += data.message.text;
                    em += "please make sure your file size is not larger 8 MB ";

                  barError($('#video-edit-submit'), em);
                }
      },
      error: function(status){
        console.log(status);
      }

    }).uploadProgress(function(e) {  // use jquery progress plugin
                 // tracking uploading
              if (e.lengthComputable) {
               var percentage = Math.round((e.loaded * 100) / e.total);
               barLoading($('#video-edit-submit'),percentage);
              }
        });

  },

  getProject: function(id){
    var self = this;
    var url = appConfig.apiUrl + appConfig.REST.GETVIDEO + id + appConfig.REST.SUFFIX;
    $.ajax({
      url: url,
      type:"POST",
      success:function(data){
        console.log(data);
        var photoN = (data.message.video.Video.photo === null || data.message.video.Video.photo === "") ? 'No Photo yet' : data.message.video.Video.photo;
        var pdfN = (data.message.video.Video.pdf === null || data.message.video.Video.pdf === "") ? 'No PDF file yet' : data.message.video.Video.pdf;
        var pptN = (data.message.video.Video.ppt === null || data.message.video.Video.ppt === "") ? 'No PPT file yet' : data.message.video.Video.ppt;

        $('#getPhotoName').text(photoN);
        $('#getPdfName').text(pdfN);
        $('#getPPTName').text(pptN);
        $('#videoname').val(data.message.video.Video.name);
        $('#videoDes').val(data.message.video.Video.description);
        if(data.message.video.Video.youtube_url !== null && data.message.video.Video.youtube_url !== "" ) $('#videolink2').val("https://www.youtube.com/watch?v=" + data.message.video.Video.youtube_url);
       //$('#video-edit').hide();

      },
      error: function(status){
        console.log(status);
      }

    });
  },

  initHandlers: function(){
    var self = this;
    $('#video-submit').click(function(e){
      e.preventDefault();
      self.addProject(app.systemMap.activePlanet.attr('data-id'));
    });

    $('#video-edit-submit').click(function(e){
      e.preventDefault();
      var id = app.videoSlider.getSlideId();
      var pid = app.systemMap.activePlanet.attr('data-id');
      var pos = app.videoSlider.pos;
      self.editProject(id,pid,pos);
    })

    this.$elem.click(function(e){

      if($(e.target).hasClass('screen')) self.leaveScreen();
    });

    this.$elem.find('input').on('change',function(e){
          e.preventDefault();
          barRecover($('#video-submit'));
          barRecover($('#video-edit-submit'));
          $('#video-edit-submit').show();

          if($(this).attr('type') === 'file') {
            var i = $(this).attr('id');
            $('.' + i).css({'text-decoration':'line-through'});
          }

          if($(this).attr('id') === 'videolink2') $('#videoError').text("");

    });

    this.$elem.find('textarea').on('change',function(e){
          e.preventDefault();
          barRecover($('#video-submit'));
          barRecover($('#video-edit-submit'));
          $('#video-edit-submit').show();
    });

    $('#confirm-no').click(function(e){
      e.preventDefault();
      self.leaveScreen();
    });

    $('#confirm-yes').click(function(e){
      e.preventDefault();
      var id = app.videoSlider.getSlideId();
      var pid = app.systemMap.activePlanet.attr('data-id');
      self.delProject(id,pid);
    });

  },
}

/* Screen: Directions */

function ScreenDirections(app) {
    var self = this;

    this.app = app;

    this.$elem = this.app.$elem.find('section.screen-directions');
    this.$list = this.$elem.find('li');

    this.$elem.click(function(e){
        e.preventDefault();
        self.app.go('navigating');
        console.log('screenDirections.$elem');
        setTimeout(function(){
            self.$elem.remove();
        }, 2000);
    });
};

ScreenDirections.prototype.enterScreen = function() {

    var self = this;

    // We previously enabled navigation on ScreenNavigating but
    // we now allow it one screen earlier for a gentler intro.
    this.app.navigating = true;

    this.timeoutId = setTimeout(function(){
        self.app.go('navigating');

        setTimeout(function(){
            self.$elem.remove();
        }, 2000);
    }, 5000);
};

ScreenDirections.prototype.leaveScreen = function() {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }
};



/* Screen: Navigating */

function ScreenNavigating(app) {
    var self = this;

    this.app = app;

    // This screen is unusual in that the <section> element is just sized
    // for the mini-map in the bottom-left to prevent it blocking hovers
    // for the individual star elements in the star map...
    // this.$elem = this.app.$elem.find('section.screen-navigating');

    // ...so use the tile map content as the clickable area instead:
    this.$elem = this.app.tileMap.$inner;

/*    this.$elem.click(function(e){

        var $star = $(e.target).closest('.star');

        if ($star.length) {
            self.handleStarSharing($star);
        } else {
            self.handleStarCreation(e.pageX, e.pageY);
            //console.log($star);
        }

        e.preventDefault();
        console.log('self.$elem');
    });*/
};

ScreenNavigating.prototype.handleStarSharing = function($star){
    var self = this;

    stretchBounds = true;

    var starId = $star.attr('id');
   // var starData = this.app.starMap.findStarData(starId);

    this.leaveScreen();

    this.app.tileMap.animateCenter(starData.x, starData.y, function(){
        self.app.setUrlStarId(starId);
        self.app.screenStarSharing.setStarData(starData);
        self.app.go('star-sharing');
    });
};

ScreenNavigating.prototype.handleStarCreation = function(x, y){
    var self = this;

    stretchBounds = true;

    var starPos = this.app.tileMap.translatePageToMap({ x: x, y: y });

    this.leaveScreen();
/*    this.app.tileMap.animateCenter(starPos.x, starPos.y, function(){
        self.app.screenStarCreation.setStarPosition(starPos);
        self.app.go('star-creation');
    });*/
     self.app.screenStarCreation.setStarPosition(starPos);
     self.app.go('star-creation');
};

ScreenNavigating.prototype.enterScreen = function(){
    var self = this;

    // If we temporarily moved off the edge
    // of the map to center on a star location,
    // move us back in line:

    var p = this.app.tileMap.$inner.position();
    var x = this.app.tileMap.constrainX(p.left);
    var y = this.app.tileMap.constrainY(p.top);

    if (x != p.left || y != p.top) {
        this.app.tileMap.animateTo(x, y, function(){ self.app.navigating = true; });
    } else {
        this.app.navigating = true;
    }

    $(document.body).trigger('startedNavigating');
};

ScreenNavigating.prototype.leaveScreen = function(){
    this.app.navigating = false;

    $(document.body).trigger('stoppedNavigating');
};

/* Screen: Star Creation */

function ScreenStarCreation(app) {
    var self = this;

    this.app = app;

    this.isSubmitting = false;

    var $body = this.app.$elem;
    this.$elem = this.app.$elem.find('section.screen-star-creation');
    this.$content = this.$elem.find('.content');

    this.$form = this.$content.find('form');

    this.$name = this.$form.find('#name');
    this.$xpos = this.$form.find('#x');
    this.$ypos = this.$form.find('#y');

    this.$btn = this.$elem.find('a.btn');

    // this.$form.submit(function(e){
    //     if (self.isSubmitting) {
    //         return false;
    //     }
    //     self.isSubmitting = true;
    //     self.submit();
    //     e.preventDefault();
    // });

    this.$btn.click(function(e){
        //self.$form.submit();
        e.preventDefault();
        self.app.createPlanet(self.$form, self.app.system_id,self.app.planet_edge, function(b){
                                                                                                if(self.app.screenMessage){
                                                                                                  self.app.screenMessage.changeMessage(self.app.message);
                                                                                                  self.app.screenMessage.enterScreen();
                                                                                                 };
                                                                                                 if(b){
                                                                                                  setTimeout(function(){
                                                                                                              var x = self.app.systemMap.activePlanet.parent().offset().left;
                                                                                                              var y = self.app.systemMap.activePlanet.parent().offset().top;
                                                                                                              var id = self.app.systemMap.activePlanet.data('user');
                                                                                                              var planetID = self.app.systemMap.activePlanet.attr('data-id');
                                                                                                              $(document.body).addClass('editMode')
                                                                                                              self.app.showPlanet(x,y,id,planetID)
                                                                                                            }, 2600);
                                                                                                  self.app.systemMap.changePlanetImage(self.app.currentPlanet.image_url, self.app.currentPlanet.photo);
                                                                                                  };
                                                                                                });
    });

    this.$elem.click(function(e){
        // If the clicked element is outside the main
        // content go back to the navigation screen.
        // if (self.$content.get(0) != $(e.target).closest('.content').get(0)) {

        //     stretchBounds = false;

        //     if (Modernizr.csstransforms3d) {
        //         // If we are using 3d translates then we need to animate back to left: 0 top: 0
        //         app.tileMap.animateTo(0, 0, function(){
        //             self.app.go('navigating');
        //         });
        //     } else {
        //         self.app.go('navigating');
        //     }
        // }

        if (self.$content.get(0) != $(e.target).closest('.content').get(0) && !self.$elem.hasClass('state-loading') ) {
          /*self.app.systemMap.$galaxy.removeClass('clickOnPlanet');
          self.app.universe = 'galaxy';
          self.app.systemMap.steadySystem(self.app.systemMap.clickedSystem);
          self.app.go('navigating');*/
        self.app.menu.quitPlanet();
       }
        //e.preventDefault();


    });

    this.$content.hover(function() {
        $body.toggleClass('custom-cursor');
    });
};

ScreenStarCreation.prototype.submit = function(){
    var self = this;
    var data = this.$form.serialize();
    var $content = this.$content;

    this.loadingProgress();

    self.app.log('Submitting star data...');

/*    $.ajax(this.app.config.apiUrl, { data: data, type: 'POST' })
        .done(function(data){

            self.app.log('Submitted star data:');
            self.app.log(data);

            var starData = self.app.starMap.createStarData(data.id, data.x, data.y, data.name, 1, data.url);
            if (starData) {
                starData.elem = self.app.starMap.createStarElem(starData);
            }

            self.app.log('Created star elem with data:');
            self.app.log(starData);

            $content.addClass('fade-out');

            self.playCreationAnimation(function(){
                self.app.screenStarSharing.setStarData(starData);
                $content.removeClass('fade-out');
                self.app.go('star-sharing');
            });

            self.loadingComplete();

            setTimeout(function(){
                self.isSubmitting = false;
            }, 5000);
        })
        .fail(function(data){

            self.$content.addClass('fail');
            setTimeout(function(){
                self.$content.removeClass('fail');
            }, 1000);

            self.app.log('An error occurred while submitting the star data:');
            self.app.log(data.statusText);
            self.loadingComplete();

            setTimeout(function(){
                self.isSubmitting = false;
            }, 5000);
        });*/
};

ScreenStarCreation.prototype.loadingProgress = function(){
    this.$btn.html(this.$btn.html().replace('Create', 'Loading'));
};

ScreenStarCreation.prototype.loadingComplete = function(){
    this.$btn.html(this.$btn.html().replace('Loading', 'Create'));
};

ScreenStarCreation.prototype.addClassWithDelay = function($elem, className, delay){
    // Just a helper method as an alternative to a stack of nested setTimeouts.
    $elem.delay(delay || 0).queue(function(){ $(this).addClass(className).dequeue(); });
};

ScreenStarCreation.prototype.playCreationAnimation = function(callback){
    var self = this;

    this.$starPreview = this.$elem.find('.star-preview');
    this.$starCreationAnim = $('<div class="star-creation"><div class="gas"></div><div class="newstar"></div></div>');

    var nebula = this.app.nebulae.nearest(this.starPosition.x, this.starPosition.y);
    if (nebula) {
        this.$starCreationAnim.addClass('color-' + nebula.color);
    } else {
        this.$starCreationAnim.addClass('color-no-color');
    }

    this.$starPreview.append(this.$starCreationAnim);
    this.$starPreview.addClass('star-preview-off');

    this.app.audio.playStarCreationClip();

    this.addClassWithDelay(this.$starCreationAnim, 'stage-two',   10);
    this.addClassWithDelay(this.$starCreationAnim, 'stage-three', 500);
    this.addClassWithDelay(this.$starCreationAnim, 'stage-four',  800);
    setTimeout(function() {
        $('body').addClass('stage-flash');

        setTimeout(function() {
        $('body').addClass('stage-flash-on');

            setTimeout(function() {
            $('body').removeClass('stage-flash-on');

                setTimeout(function() {
                $('body').removeClass('stage-flash');
                }, 1200);

            }, 100);

        }, 2);

    }, 3400);
    this.addClassWithDelay(this.$starCreationAnim, 'stage-five',  1800);
    this.addClassWithDelay(this.$starCreationAnim, 'stage-six',   430);

    this.$starCreationAnim.delay(2000);
    this.$starCreationAnim.queue(function(){
        self.$starCreationAnim.remove();
        self.$starPreview.removeClass('star-preview-off');
        callback();
    });
};

ScreenStarCreation.prototype.setStarPosition = function(position) {
    this.starPosition = position;
};

ScreenStarCreation.prototype.enterScreen = function(){
    if (!this.starPosition) return;

    this.$xpos.val(this.starPosition.x);
    this.$ypos.val(this.starPosition.y);
    this.$name.val('');

    this.$name.focus();
};

/* Screen: Star Sharing */

function ScreenStarSharing(app) {
    var self = this;

    this.app = app;

    var $body = this.app.$elem;
    this.$elem = this.app.$elem.find('section.screen-star-sharing');
    this.$name = this.$elem.find('h1');
    this.$brandNew = this.$elem.find('h2');
    this.$link = this.$elem.find('#bitly');
    this.$content = this.$elem.find('.content');
    this.$fbshare = this.$elem.find('.star-share-fb a');
    this.$twshare = this.$elem.find('.star-share-tw a');
    this.$gpshare = this.$elem.find('.star-share-gp a');

    this.$elem.find('#bitly').on('click', function(e){
        e.preventDefault();
        var el = document.getElementById('bitly');
        selectElementText(el);
    });

    this.$elem.click(function(e){
        // If the clicked element is outside the main
        // content go back to the navigation screen.
        if (self.$content.get(0) != $(e.target).closest('.content').get(0)) {

            self.$elem.addClass('screen-closing');

            stretchBounds = false;

            if (Modernizr.csstransforms3d) {

                if (showSpecificStar) {

                    showSpecificStar = false;
                    self.app.go('navigating');
                    self.$elem.removeClass('screen-closing');

                } else {

                    // If we are using 3d translates then we need to animate back to left: 0 top: 0
                    app.tileMap.animateTo(0, 0, function(){
                        self.app.go('navigating');
                        self.$elem.removeClass('screen-closing');
                    });
                }

            } else {

                setTimeout(function(){
                    self.app.go('navigating');
                    self.$elem.removeClass('screen-closing');
                }, 300);
            }
        }
    });
    this.$content.hover(function() {
        $body.toggleClass('custom-cursor');
    });
};

ScreenStarSharing.prototype.setStarData = function(data){
    this.starData = data;
};

ScreenStarSharing.prototype.enterScreen = function(){
    if (!this.starData) return;

    var linkText = this.starData.url || '';

    var urlMatch = linkText.match(/:\/\/(.*)/);
    if (urlMatch) linkText = urlMatch[1];

    this.$name.text(this.starData.name);
    //this.$link.attr({ href: this.starData.url });
    this.$link.text(linkText);
    this.$brandNew.hide();

    var shareUrl = encodeURIComponent(this.starData.url);
    var tweetHref = "https://twitter.com/intent/tweet?tw_p=tweetbutton&url="+ shareUrl +"&text=Here%27s%20a%20star%20created%20especially%20for%20you%20and%20the%20world%20to%20see%20with%20Diamonds%20in%20the%20Sky.";
    var competitionTweetHref = "https://twitter.com/intent/tweet?tw_p=tweetbutton&url="+ shareUrl +"&text=I%27ve%20found%20the%20diamond%20in%20the%20sky.%20%23DiamondsInTheSky";
    var fbHref = "http://www.facebook.com/sharer/sharer.php?u="+shareUrl;
    var gpHref = "https://plus.google.com/share?url="+shareUrl;

    // Is this the competition star or a normal star?
    if (this.starData.cs) {
        this.$twshare.attr('href', competitionTweetHref);
    } else {
        this.$twshare.attr('href', tweetHref);
    }
    this.$fbshare.attr('href', fbHref);
    this.$gpshare.attr('href', gpHref);
};

/* Screen: Why? */

function ScreenWhy(app) {
    var self = this;

    this.app = app;

    this.$elem = this.app.$elem.find('section.screen-why');
    this.$elem.click(function(e){
        self.app.back();
        e.preventDefault();
        console.log('screenWhy.$elem');
    });
};

/* Nebulae */

function Nebulae(app) {
    this.app = app;

    this.$elem = this.app.$elem.find('.nebula-indicator');
    this.$name = this.$elem.find('.name');
    this.$desc = this.$elem.find('.c');

    this.nebulae = []; //this.app.config.nebulae;
    this.old_nebulae = [];
    //this.nebulae = this.app.config.nebulae;
    this.currentNebula;
    this.requestData();
};

Nebulae.prototype.requestData = function(){
  var self = this;
  var url = appConfig.quadrantService + appConfig.REST.QUADRANTS;
  console.log('requst quadrant url', url);
  $.ajax(url)
      .done(function(data){
        _.forEach(data, (i) => {
          self.nebulae.push(i)
        })
        console.log('retrive quadrants data', data);
        self.requestDataDone();
      })
      .fail(function(data){
          console.warn('Server error, failed to get quadrants.');
      });
};

Nebulae.prototype.requestDataDone = function(){
    this.initMiniMapMarkers(this.nebulae);
};

Nebulae.prototype.initMiniMapMarkers = function(data) {
    for (var i = 0; i < data.length; i++) {
        var nebula = data[i];
        this.app.miniMap.addMarker(nebula.x, nebula.y, nebula.id);

    }
};

Nebulae.prototype.nearest = function(x, y) {
    var result = false;

    var nebula, distance;
    var point = { x:x, y:y };

    for (var i = 0; i < this.nebulae.length; i++) {
        nebula = this.nebulae[i];
        distance = this.app.pointDelta(point, nebula);

        if (distance < nebula.radius) {
            result = nebula; break;
        }
    }

    return result;
};

Nebulae.prototype.update = function() {
    if (this.app.navigating ) {

        var p = this.app.tileMap.translatePageToMap({ x: this.app.pageX, y: this.app.pageY });

        var nebula = this.nearest(p.x, p.y);
        if (nebula) {
            if (nebula != this.currentNebula) {
                //this.app.audio.playEnterNebulaClip();

                this.showIndicator(nebula.name, nebula.description);
            }
            this.currentNebula = nebula;
        } else {
            this.hideIndicator();
            this.currentNebula = false;
        }

    } else {
        this.hideIndicator();
    }

};

Nebulae.prototype.changeData = function(data,radius){
   //app.nebulae.old_nebulae = $.extend(true, [], app.nebulae.nebulae); //copy current nebulae
   app.nebulae.old_nebulae = app.nebulae.nebulae.slice(0);
   if(radius){
	   for(var i = 0; i < data.length; i++){
	     data[i]['radius'] = radius;

	   }
   }
   app.nebulae.nebulae = data;  // change nebulae

};

Nebulae.prototype.showIndicator = function(name,des) {
    des = des || null;
    var self = this;
    if (!this.timeoutId) {
        this.timeoutId = setTimeout(function(){
            self.hideIndicator();
        }, 5000);
    }

    if (name) this.$name.text(name);
    if(des !== null )this.$desc.text('"' + des + '"');
    else this.$desc.text("");
    this.$elem.addClass('nebula-indicator-on');
};

Nebulae.prototype.hideIndicator = function() {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }

    this.$elem.removeClass('nebula-indicator-on');
};

/* MiniMap */

function MiniMap(app) {
    this.app = app;

    this.$elem = this.app.$elem.find('.mini-map');

    this.xScale = this.$elem.width()  / this.app.tileMap.innerW;
    this.yScale = this.$elem.height() / this.app.tileMap.innerH;

    this.initElements();
    //this.initHandlers();
};

MiniMap.prototype.initElements = function() {
    var self = this;
    this.$shim = $('<div class="mini-map-shim">');

    this.$elem.append(this.$shim);
        $(window).resize(function(e){
        self.size();
    }).resize();
};

MiniMap.prototype.scalePoint = function(x, y){
    var self = this;
    var p = {x:0, y:0};
    var dx = x - self.$elem.offset().left;
    var dy = y - self.$elem.offset().top;
    var newX = Math.floor(dx / self.xScale);  // new center
    var newY = Math.floor(dy / self.yScale);
    p.x = self.app.halfWinW - newX;
    p.y = self.app.halfWinH - newY;

    p.x = this.app.tileMap.constrainX(p.x);
    p.y = this.app.tileMap.constrainY(p.y);

    return p;

};



MiniMap.prototype.addMarker = function(x, y, id) {
    id = id || -1;
    $marker = $('<div class="mini-map-marker"></div>');
    $marker.attr('data-pos',id);
    $marker.css({ left: x * this.xScale, top: y * this.yScale });
    if(this.app.user) {

      if(this.app.universe === 'qudrant' && id === this.app.user.Planet.qudrant_id) {
        $marker.addClass('here');
      }
      if(this.app.universe === 'galaxy' && id === this.app.user.Planet.system_id){
        $marker.addClass('here');
      }
    }

    //hardcode inactive qudrant!
    if(this.app.universe === 'qudrant'){
      if(id !== "1") $marker.css({background: "#464444"});
      else $marker.css({'box-shadow':"rgba(255, 255, 255, 0.62) 0px 0px 9px 5px"});
    }

    this.$elem.append($marker);
};

MiniMap.prototype.decoMarker = function(data){
  if (!data){
      $(".mini-map-marker").removeClass('here');
      return;
  }
  if(this.app.universe === 'qudrant') {
    $( ".mini-map-marker[data-pos=" + data.qudrant_id + "]").addClass('here');
    $(".star[data-id=" + data.qudrant_id + "]").addClass('here');
    return;
  }
  if(this.app.universe === 'galaxy'){
    $( ".mini-map-marker[data-pos=" + data.system_id + "]").addClass('here');
    return;
  }
  return;
};

MiniMap.prototype.emptyMarkers = function() {
    $('.mini-map-marker').remove();
};

MiniMap.prototype.size = function(){
    var w = this.xScale * this.app.winW;
    var h = this.yScale * this.app.winH;
    this.$shim.css({ width: w, height: h });
};

MiniMap.prototype.update = function(){
    if (!this.app.navigating) return;

    var m = this.app.tileMap;
    var dx = parseInt(m.$inner.css('left'));
    var dy = parseInt(m.$inner.css('top'));


    //var x = Math.round(this.xScale * -m.$inner.oldY);
    //var y = Math.round(this.yScale * -m.$inner.oldX);
    var x = Math.round(this.xScale * (-m.$inner.oldX - dx));
    var y = Math.round(this.yScale * (-m.$inner.oldY - dy));

    // hard code the bounds of minimap indicator
    x = this.app.tileMap.clamp(x,0,178);
    y = this.app.tileMap.clamp(y,0,110);
    this.$shim.css({ left: x, top: y });

};

/*SystemMap*/

function SystemMap(app){
    this.app = app;
    this.systemData = [];
    this.$elem = this.app.tileMap.$inner;
    //this.orbits = [{'mercury','venus','earth','mars','jupiter','saturn','uranus','neptune'];
    this.orbits = [ {"class":"mercury", "occupied": false, "order" : -1},
                    {"class":"venus", "occupied": false,   "order" : -1},
                    {"class":"earth", "occupied": false,   "order" : -1},
                    {"class":"mars", "occupied": false,    "order" : -1},
                    {"class":"jupiter", "occupied": false,"order" : -1},
                    {"class":"saturn", "occupied": false,  "order" : -1},
                    {"class":"uranus", "occupied": false,  "order" : -1},
                    {"class":"neptune", "occupied": false, "order" : -1},
                  ];

    this.systemLookup = {};
    this.initElements();


    $(document.body)
        .on('enterGalaxy', this.onStartedNavigating)
        .on('enterQudrant', this.onEnterQudrant);
        //.on('quitPlanet', this.quitPlanet);

};

SystemMap.prototype.initElements = function(){
    this.$inner = $('<div id="universe" class="scale-stretched">');
    this.$galaxy = $('<div id="galaxy">');
    /*this.$system = $('<div id="solar-system" class="earth">');*/
    /*this.$orbit = $('<div class="orbit">');*/
    this.$elem.append(this.$inner);
    this.$inner.append(this.$galaxy);
};

SystemMap.prototype.initHandlers = function(){
 /*   var elem = document.getElementsByClassName('planet');
     this.hammer =  new Hammer(elem);
    this.hammer.on('tap',function(e){
        console.log(e.target);

    })*/

};

SystemMap.prototype.onStartedNavigating = function(e){

    //console.log(this);

    // Schedule regular loading of stars until we max out or frame rate drops too low
/*    if (!appConfig.startLoaderTimer) {

        appConfig.startLoaderTimer = setInterval(function(){

            app.starMap.requestStars();

        }, 1000);
    }*/
    // $('#area').text('system');
    app.nebulae.hideIndicator();
    setTimeout(function(){
        app.systemMap.requestSystems(app.activeGalaxyID);
        $('#area').text('system');
    }, 2000);

};

SystemMap.prototype.onEnterQudrant = function(){
    var self = this;
    $('#area').text('qudrant');
     app.systemMap.$galaxy.empty();
     app.systemMap.systemData = [];
     app.miniMap.emptyMarkers();
     app.nebulae.changeData(app.nebulae.old_nebulae);
     app.nebulae.initMiniMapMarkers(app.nebulae.nebulae);
     app.nebulae.hideIndicator();

};

SystemMap.prototype.requestSystems = function(galaxyID){
  console.warn('dk', galaxyID);
     /*ajax call here to retrive data*/
    var self = this;
    var url = appConfig.systemService + appConfig.REST.SYSTEMS + '/' + galaxyID;
    console.warn('url', url);
    $.ajax(url)
        .done(function(data){
            console.log('retrive systems', data);
            // var tmp=[];
            // _.map(data, )
            // for(var i = 0; i  < data.systems.length;i++){
            //     data.systems[i].System.x = parseInt(data.systems[i].System.x);
            //     data.systems[i].System.y = parseInt(data.systems[i].System.y);
            //     data.systems[i].System.age = parseInt(data.systems[i].System.age);
            //     data.systems[i].System.Planet = data.systems[i].Planet;
            //     tmp.push(data.systems[i].System);
            //
            // }
            self.requestSystemsDone(data, self.app.nebulae.changeData);
        })
        .fail(function(data){
            console.log('Internal Server Error');
        });
/*     var data;
   testGalaxyData.forEach(function(i){if(i.id == galaxyID){data = i}});
     this.requestSystemsDone(data.systems,app.nebulae.changeData);*/
};

SystemMap.prototype.requestSystemsDone = function(data,callback){

    _.forEach(data, (d) => this.createSystemData(d.id, d.x, d.y, d.name, d.age, d.planetAmount, d.imagePath, d.photo, d.description))
    // for (var d, i = 0; i < data.length; i++) {
    //     d = data[i];
    //     // d.age = d.age || Math.random();
    //     //console.log(d.Planet);
    //     d.age = Math.random();
    //     var dd = this.createSystemData(d.id, d.x, d.y, d.name, d.age, d.Planet, d.image_url, d.photo, d.description);
    //
    // }

    this.createSystems(this.systemData);
    if (typeof callback === "function") {
        callback(this.systemData,400);
        //console.log('callback');
      }

};

SystemMap.prototype.createSystemData = function(id, x, y, name, age, planet,url,starphoto, des) {
    var p = this.app.tileMap.translateMapToPage({ x: x, y: y });

    var systemData = { id:id, x:x, y:y, name:name, age:age, planet:planet, url:url, photo:starphoto, description:des};
    var tileData = this.app.tileMap.tileAtPoint(p.x, p.y);

    if (tileData) {
        //var nebula = this.app.nebulae.nearest(x, y);
        //if (nebula) starData.color = nebula.color;    // we can change system sun color by this function

        //var ageClass = this.getAgeClass(starData.age);
        //var colorClass = this.getColorClass(starData.color);

        //starData.classNames = ageClass + ' ' + colorClass;
       //systemData.orbits = [];
       systemData.orbits = $.extend(true, [], this.orbits);    // create orbits array for building elements
        if(planet.length > 0){
            for(var i = 0; i <　systemData.planet.length; i++ ){
                var n =  parseInt(systemData.planet[i].planet_edge);
                systemData.orbits[n].occupied = true;
                systemData.orbits[n].order = i;
            }
        }

        systemData.r = tileData.r;
        systemData.c = tileData.c;
        systemData.posX = x;
        systemData.posY = y;

        tileData.systems.push(systemData);
        this.systemData.push(systemData);
        this.systemLookup[id] = { r: tileData.r, c: tileData.c, i: (tileData.systems.length - 1) };

        return systemData;
    }
};

SystemMap.prototype.createSystemElem = function(data){
    var self = this;
    var system = $('<div class="solar-system" class="earth">');


    for(var r, i = 0; i < data.orbits.length; i++){

        r = self.createOrbitsElem(data, i);
        system.append(r);
    };
    var sun = $('<div class ="sun">');
    if(data.photo !== null){
    	var url = './img/stars/' + data.photo;
    	sun.css({backgroundImage: 'url('+ url +')', 'box-shadow': "none"});
    }
    system.append(sun);
    return system;
};

SystemMap.prototype.createOrbitsElem = function(data, i){
        var orbit = $('<div class="orbit">');
        var pos = $('<div class = "pos">');
        var planet = $('<div class="planet"><span></span></div>');

        var d = data.orbits[i].class;
        var o = data.orbits[i].order;  // planet's order in data.planet array
        orbit.addClass(d);
            if (o !== -1 ) {
               var pid = data.planet[o].id;
               var uid = data.planet[o].user_id;
               planet.attr('data-id', pid);
               planet.data('user',uid);
               planet.data('des', data.planet[o].description);
               planet.data('name', data.planet[o].name);
               var url  = self.app.config.apiUrl + '/app/webroot/files/planet/photo/'+ pid + '/' + encodeRFC5987ValueChars(data.planet[o].photo);
               planet.data('url',url);
               planet.css({ backgroundImage: 'url('+ url +')' });
               planet.find('span').text(data.planet[o].name);
               orbit.addClass('occupied');
            }
            else {
              orbit.addClass('empty');
              planet.attr('data-edge',i);
            }

            pos.append(planet);
            orbit.append(pos);
            return orbit;
};


SystemMap.prototype.createSystems = function(data){
    this.app.miniMap.emptyMarkers();
    for(var i = 0; i < data.length; i++){
        var s = this.createSystemElem(data[i]);
        s.addClass("s"+ i);
        s.attr('data-id', data[i].id);
        s.attr('order',i);
       /* if (Modernizr.csstransforms3d) {
        s.css(Modernizr.prefixed('transform'), 'translateX('+data[i].x+'px) translateY('+data[i].y+'px) translateZ(0)');
        } else {
            s.css({ left: data[i].x, top: data[i].y });
         }*/
        s.css({ left: data[i].x, top: data[i].y });
        this.app.miniMap.addMarker(data[i].x, data[i].y, data[i].id);
        this.$galaxy.append(s)
        data[i]["elem"] =  s;
    };

    this.initPlanetHandlers();

};

SystemMap.prototype.changePlanetImage = function(id,image_url){
     var self = this;
     var url  = self.app.config.apiUrl + '/app/webroot/files/planet/photo/'+ id + '/' + image_url;
     self.activePlanet.attr('data-id', id);
     self.activePlanet.data('user',self.app.user.id);
     self.activePlanet.data('url',url);
     self.activePlanet.data('name',self.app.user.Planet.name);
     self.activePlanet.parents('.orbit').removeClass('empty').addClass('occupied');
     self.activePlanet.css({backgroundImage: 'url('+ url +')'});
     self.activePlanet.find('span').text(self.app.user.Planet.name);

     //tile.elem.css({ backgroundImage: 'url(./img/tiles/final-creation-canvas_r' + (tile.r+1) + '_c' + (tile.c+1) + '.jpg)' });

};

SystemMap.prototype.initPlanetHandlers = function(){
    var self = this;

    function onClick(e){
        e.preventDefault();
        e.stopPropagation(); // stops the event from bubbling up the event chain. we have touchstart event on app.control

        self.activePlanet = $(this); // save the clicked dom element
        console.log(this);
        //self.app.screenPlanet.saveTileCenter();
        self.$galaxy.addClass('clickOnPlanet'); // pause planet animation

        var cx = $(this).parent().offset().left;   // do not use e.target!
        var cy = $(this).parent().offset().top;

        var sn = $(this).parent().parent().parent().attr('order'); // get systemData array order
        self.clickedSystem = self.systemData[sn];  // get systemData

        if(self.activePlanet.attr('data-id')){ // if the planet has been occupied (has data-id)
            // open the planet page
            //$('.orbit').hide();
            //$('#sun').hide();

            self.app.universe = 'planet';
            var planetID = self.activePlanet.attr('data-id');
            var userID = self.activePlanet.data('user');
            if(self.app.user !== null && self.app.user.id === userID) $(document.body).addClass('editMode');
            else $(document.body).removeClass('editMode');
            self.app.showPlanet(cx,cy,userID,planetID);
        }
        else{

            if(self.app.user === null){  // force login
                self.app.menu.forceLogin();
                self.$galaxy.removeClass('clickOnPlanet');
                return;
              }

            if(self.app.user.Planet.id !== null){  // each user can only have one planet!
               //self.app.message = 'You can only have one planet.';
               self.app.screenMessage.changeMessage('You can only have one planet.');
               self.app.screenMessage.enterScreen();
               self.$galaxy.removeClass('clickOnPlanet');
               return;
            }

            //$(document.body).addClass('editMode');
            self.app.system_id = parseInt($(this).parents('.solar-system').attr('data-id')); // get systemid
            self.app.planet_edge = parseInt($(this).attr('data-edge')); // get planet_edge
            self.handlePlanetCreation(cx,cy,app.halfWinW,app.halfWinH);  //center the planet
            $('.menu-right').addClass('hide');

        }

    }


    if(Modernizr.touch) $('.planet').on('touchstart', onClick);
    else $('.planet').on('click', onClick);

};

SystemMap.prototype.quitPlanet = function(){
     this.app.universe = 'galaxy';
     this.$galaxy.removeClass('clickOnPlanet');
     this.steadySystem(this.clickedSystem);
     this.$galaxy.find('.planet.onClick').removeClass('onClick');
     this.app.go('navigating');
     this.app.closePlanetPage();
};

SystemMap.prototype.handlePlanetCreation = function(x,y, px, py){

    var self = this;

    stretchBounds = true;
    // caculate the distance between the planet and certain point on screen.
    var dx = px - x;
    var dy = py - y;

    //var planetPos = self.app.tileMap.translatePageToMap({ x: x, y: y });

   // this.leaveScreen();
/*    this.app.tileMap.animateCenter(starPos.x, starPos.y, function(){
        self.app.screenStarCreation.setStarPosition(starPos);
        self.app.go('star-creation');
    });*/
    //console.log(x + ':' + y);
    self.app.control.clickPlanet(dx,dy);

    self.app.go('star-creation');
};



SystemMap.prototype.update = function(){
    if(this.systemData.length < 1 || this.app.universe === 'planet' ) return;
    this.updateActiveSystems();
};

SystemMap.prototype.applyParallax = function(system, useParallax) {

    if (useParallax) {

        var dx = system.x - this.app.tileMap.centerX;
        var dy = system.y - this.app.tileMap.centerY;
        var dh = Math.sqrt(dx * dx + dy * dy);

        var maxDistance = Math.max(this.app.halfWinW, this.app.halfWinH);

        var a = Math.atan2(dy, dx);
        var v = 300 * (0.1 + 2*system.age) * (Math.min(maxDistance, dh) / maxDistance);

        var vx = v * Math.cos(a);
        var vy = v * Math.sin(a);

    } else {
        var vx = 0;
        var vy = 0;
    }

   //console.log(system.age);

    system.parallaxX = Math.floor(system.x + vx);
    system.parallaxY = Math.floor(system.y + vy);
    //console.log(system.x +':' + vx +':' + system.parallaxX);

    this.positionSystem(system, system.parallaxX, system.parallaxY);
};

SystemMap.prototype.steadySystem = function(system){  //caculate system.x/system.y from css, avoid parallax effect
        var maxDistance = Math.max(this.app.halfWinW, this.app.halfWinH);
       var a = 300 * (0.1 + 2*system.age) / maxDistance;
       system.x = ( system.parallaxX + a * this.app.tileMap.centerX ) / (1 + a);
       system.y = ( system.parallaxY + a * this.app.tileMap.centerY ) / (1 + a);

};

SystemMap.prototype.positionSystem = function(system, x, y){

/*  if (Modernizr.csstransforms3d) {
        $(system).css(Modernizr.prefixed('transform'), 'translateX('+x+'px) translateY('+y+'px) translateZ(0)');
    } else {
        $(system).css({ left: x, top: y });
    }*/
     system.elem.css({ left: x, top: y });
    system.posX = x;
    system.posY = y;
};

SystemMap.prototype.updateActiveSystems = function(){
    var system, tile;

    // No need to remove them from the DOM now - we are just setting them to hidden when they are outside the current viewport
    // for (var i = 0; i < this.app.tileMap.removeTiles.length; i++) {
    //     tile = this.app.tileMap.removeTiles[i];
    //     for (var j = 0; j < tile.stars.length; j++) {
    //         star = tile.stars[j];
    //         star.elem && star.elem.remove();
    //         star.elem = null;
    //     }
    // }

    for (var i = 0; i < this.app.tileMap.activeTiles.length; i++) {
        tile = this.app.tileMap.activeTiles[i];
        for (var j = 0; j < tile.systems.length; j++) {

            system = tile.systems[j];
            //system.elem = system.elem;// || this.createStarElem(star);


            // Is this active star actually within the viewport?
            if (system.posX < bounds.x1 || system.posX > bounds.x2 || system.posY < bounds.y1 || system.posY > bounds.y2) {

                system.elem.hide();
               //console.log(bounds);

            } else {

                //if (!Modernizr.touch) this.applyParallax(system, useParallax);
                system.elem.show();

            }
        }
    }
};


/* GalaxyMap */
function GalaxyMap(app) {
    this.app = app;

    this.$elem = this.app.tileMap.$inner;
    this.data = [];
    this.allGalaxys = [];
    this.galaxysInDomIDs = [];

    this.nearbyTiles = [];
    this.galaxyLookup = {};

    this.initElements();
    this.requestData();

    // schedule extra star loading for performant machines
    $(document.body)
        .on('startedNavigating', this.onStartedNavigating)
        .on('stoppedNavigating', this.clearStarLoadingTimer)
        .on('enterGalaxy',this.onEnterGalaxy)
        .on('enterQudrant',this.onStartedNavigating);
};

GalaxyMap.prototype.initElements = function(){
    this.$galaxys = $('<div id="star-map-stars" class="star-map-stars">');
    this.$elem.append(this.$galaxys);
};

GalaxyMap.prototype.initHandlers = function(el){
    if(Modernizr.touch){  //touch device
        // DOUBLE TAP
       var timer = 0;
      el.on('touchstart', function() {
                                        if(timer === 0) {
                                            timer = 1;
                                            //el.addClass('hover');
                                            timer = setTimeout(function(){ //el.removeClass('hover');
                                                                            timer = 0; }, 600);
                                        }
                                        else {
                                            app.galaxyMap.enterGalaxy(el);
                                            //el.removeClass('hover');
                                            timer = 0;
                                        }
                                    });

    }
    else  el.on('click',function(){ app.galaxyMap.enterGalaxy(el); });

   // el.hover(function(){app.audio.playStarClip(Math.round(Math.random(0,1) * 6));})

};

GalaxyMap.prototype.enterGalaxy = function(el){
    app.activeGalaxyID = el.attr('data-id');
    console.warn(app.activeGalaxyID);
  $(document.body).trigger('enterGalaxy');
};

GalaxyMap.prototype.onStartedNavigating = function(e){
        if(app.universe !== 'qudrant') return;
      console.log('create-galaxyMap');
    //console.log(this);

    // Schedule regular loading of stars until we max out or frame rate drops too low
/*    if (!appConfig.startLoaderTimer) {

        appConfig.startLoaderTimer = setInterval(function(){

            app.starMap.requestStars();

        }, 1000);
    }*/
     app.galaxyMap.requestDataDone(app.galaxyMap.data);

};

GalaxyMap.prototype.onEnterGalaxy = function(){
        app.universe = 'galaxy';
        //app.galaxyMap.$galaxys.hide();
        app.galaxyMap.$galaxys.empty();
        app.galaxyMap.allGalaxys.length = 0;
};

GalaxyMap.prototype.onEnterQudrant = function(){
        app.universe = 'qudrant';
        //app.galaxyMap.$galaxys.show();
};

GalaxyMap.prototype.clearStarLoadingTimer = function(e){
    //clearInterval(appConfig.startLoaderTimer);
};

GalaxyMap.prototype.requestData = function(callback){
    var self = this;
    var url = appConfig.galaxyService + appConfig.REST.GALAXIES;

    this.app.log('Retrieving Galaxy data...');

    $.ajax(url)
        .done(function(data){
            _.forEach(data, (i) => {
              self.data.push(i);
            })
            // for(var i=0; i < data.galaxies.length; i++){
            //    data.galaxies[i].Galaxy.x = parseInt(data.galaxies[i].Galaxy.x);
            //    data.galaxies[i].Galaxy.y = parseInt(data.galaxies[i].Galaxy.y);
            //    data.galaxies[i].Galaxy.age = parseInt(data.galaxies[i].Galaxy.age);
            //    data.galaxies[i].Galaxy.id = parseInt(data.galaxies[i].Galaxy.id);
            //    data.galaxies[i].Galaxy.quadrantId = parseInt(data.galaxies[i].Galaxy.quadrantId);
            //    self.data.push(data.galaxies[i].Galaxy);
            // }
            console.log('get galaxies:', self.data);

            if (typeof callback === "function") callback();
        })
        .fail(function(data){
            self.requestStarsFail(data);
        });
};

GalaxyMap.prototype.requestDataDone = function(data){
    _.forEach(data, (d) => {
      const age = Math.random() * .5;
      this.createGalaxyData(d.id, d.quadrantId, d.x, d.y, d.name, d.description || '', age, d.imagePath, d.photo, d.active)
    })
};

GalaxyMap.prototype.requestStarsFail = function(data){
    // TODO: Notify the user that an error occurred.
    this.app.log('An error occurred while requesting the star data:');
    this.app.log(data.statusText);

    //this.clearStarLoadingTimer();
};

GalaxyMap.prototype.createPlaceholderStars = function(){
    var totalTiles = this.app.tileMap.cols * this.app.tileMap.rows;
    var starsPerTile = 8;
    var totalStars = totalTiles * starsPerTile;

    var h = this.app.tileMap.$inner.height();
    var w = this.app.tileMap.$inner.width();

    for (var i = 0; i < totalStars; i++) {
        var name = btoa(('' + Math.random()).substring(2, 8));
        var age = Math.random();

        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);

        this.createGalaxyData(i, x, y, name, age);
    }
};

GalaxyMap.prototype.createGalaxyData = function(id, qid, x, y, name, text, age, url, cs, active) { // url: image_url; cs: image file name
    // var nebula = this.app.nebulae.nebulae[qid - 1];
    var nebula = _.find(this.app.nebulae.nebulae, (i) => i.id === qid); // find quadrant
    var nx = nebula.x + x;
    var ny = nebula.y - y;
    var p = this.app.tileMap.translateMapToPage({ x: nx, y: ny });

    var galaxyData = { id:id, qid:qid, x:nx, y:ny, name:name, description:text, age:age, url:url, cs:cs, active:active };
    var tileData = this.app.tileMap.tileAtPoint(p.x, p.y);


    if (tileData) {
        //var nebula = this.app.nebulae.nearest(x, y);
        if (nebula) galaxyData.color = nebula.color;
        var ageClass = this.getAgeClass(galaxyData.age);
        var colorClass = this.getColorClass(galaxyData.color);

        galaxyData.classNames = ageClass + ' ' + colorClass;
        galaxyData.r = tileData.r;
        galaxyData.c = tileData.c;

        tileData.galaxys.push(galaxyData);
        this.allGalaxys.push(galaxyData);

        this.galaxyLookup[id] = { r: tileData.r, c: tileData.c, i: (tileData.stars.length - 1) };

        return galaxyData;
    }
};

GalaxyMap.prototype.createGalaxyElem = function(data) {

/*    if($.inArray(data.id, this.starsInDomIDs) >= 0) {
        return $('#star-map-stars').find('[data-id="'+data.id+'"]');
    }*/

    var $galaxy = $('<div class="star" data-id="'+data.id+'">');
    var $body = $('<b></b>');
    var $name = $('<i></i>');
    var $text = $('<i></i>');
    if(this.app.user && data.id == this.app.user.Planet.galaxy_id) $galaxy.addClass('here');

  /*  if (data.cs) {
        $galaxy.addClass('competition-star');
        $body.addClass('age-one');
    }*/

    $galaxy.append($body);
    $galaxy.append($name.text(data.name));
    $galaxy.append($text.text(data.description));

    $body.addClass(data.classNames);

   if (Modernizr.csstransforms3d) {
        $galaxy.css(Modernizr.prefixed('transform'), 'translateX('+data.x+'px) translateY('+data.y+'px) translateZ(0)');
    } else {
        $galaxy.css({ left: data.x, top: data.y });
   }
   // add background image
    if(data.cs !== null){
    	var url = './img/' + data.url + '/' + data.cs;
    	$galaxy.css({backgroundImage:'url(' + url + ')'});
    }

    // disable $galaxy which is not active
    if(!data.active) $galaxy.css({opacity: .3});


    $galaxy.posX = data.x;
    $galaxy.posY = data.y;

    $galaxy.attr({ id: data.id });
    $galaxy.data({ text: $text });

    this.$galaxys.append($galaxy);
    if(data.active) this.initHandlers($galaxy);  // add click event to each'.star' elements
    // maintain array of star ids in the DOM
    this.galaxysInDomIDs.push(data.id);

    return $galaxy;
};

GalaxyMap.prototype.getAgeCategory = function(age) {

    var fl = Math.floor((1 - age) * 3);
   // console.log(age + ':' + fl);
    return Math.max(fl, 0);
};

GalaxyMap.prototype.getAgeClass = function(age) {
    var ageNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    var ageClass = ageNames[this.getAgeCategory(age)];
    return 'age-' + ageClass;
};

GalaxyMap.prototype.getColorClass = function(color) {
    var colorNames = ['blue', 'orange', 'purple', 'green', 'red', 'no-color'];
    var colorClass = color || 'no-color';

    // From time to time a random atypical color should be returned.
    // TODO: Base this on some aspect of the star data instead (e.g.
    // the age, name or url) so a given star is always the same color.

    /*if (Math.random() > 0.9) {
        colorClass = colorNames[Math.floor(colorNames.length * Math.random())];
    }*/

    return 'color-' + colorClass;
};

GalaxyMap.prototype.findGalaxyData = function(id) {

    var result = false;

    var lookup = this.galaxyLookup[id];
    if (lookup) {

        var rData = this.app.tileMap.tileMatrix[lookup.r];
        if (rData) {

            var cData = rData[lookup.c];
            if (cData) {

                var galaxy = cData.galaxys[lookup.i];
                if (galaxy) result = galaxy;

            }
        }
    }

    return result;
};

GalaxyMap.prototype.applyParallax = function(galaxy, useParallax) {
    if (useParallax) {


        var dx = galaxy.x - this.app.tileMap.centerX;
        var dy = galaxy.y - this.app.tileMap.centerY;
        var dh = Math.sqrt(dx * dx + dy * dy);

        var maxDistance = Math.max(this.app.halfWinW, this.app.halfWinH);

        var a = Math.atan2(dy, dx);
         var v = 600 * (0.1 + 2*galaxy.age) * (Math.min(maxDistance, dh) / maxDistance);
        //var v = 600 * (0.1 + 2*Math.random()) * (Math.min(maxDistance, dh) / maxDistance);

        var vx = v * Math.cos(a);
        var vy = v * Math.sin(a);

    } else {
        var vx = 0;
        var vy = 0;
    }


    galaxy.parallaxX = Math.floor(galaxy.x + vx);
    galaxy.parallaxY = Math.floor(galaxy.y + vy);

    //star.elem.css({ left: star.parallaxX, top: star.parallaxY });
    this.positionGalaxy(galaxy, galaxy.parallaxX, galaxy.parallaxY);
};

GalaxyMap.prototype.positionGalaxy = function(galaxy, x, y) {

    if (Modernizr.csstransforms3d) {
        galaxy.elem.css(Modernizr.prefixed('transform'), 'translateX('+x+'px) translateY('+y+'px) translateZ(0)');
    } else {
        galaxy.elem.css({ left: x, top: y });
    }

    galaxy.posX = x;
    galaxy.posY = y;
};

GalaxyMap.prototype.update = function(){
     if(this.app.universe !== 'qudrant') return;
    this.updateActiveGalaxys();
    //this.updateNearbyGalaxys();

};

GalaxyMap.prototype.updateActiveGalaxys = function(){
    var galaxy, tile;

    // No need to remove them from the DOM now - we are just setting them to hidden when they are outside the current viewport
    // for (var i = 0; i < this.app.tileMap.removeTiles.length; i++) {
    //     tile = this.app.tileMap.removeTiles[i];
    //     for (var j = 0; j < tile.stars.length; j++) {
    //         star = tile.stars[j];
    //         star.elem && star.elem.remove();
    //         star.elem = null;
    //     }
    // }

    for (var i = 0; i < this.app.tileMap.activeTiles.length; i++) {
        tile = this.app.tileMap.activeTiles[i];
        for (var j = 0; j < tile.galaxys.length; j++) {

            galaxy = tile.galaxys[j];
            galaxy.elem = galaxy.elem || this.createGalaxyElem(galaxy);


            // Is this active star actually within the viewport?
            if (galaxy.posX < bounds.x1 || galaxy.posX > bounds.x2 || galaxy.posY < bounds.y1 || galaxy.posY > bounds.y2) {

               // galaxy.elem.hide();

            } else {

                this.applyParallax(galaxy, useParallax);
               // galaxy.elem.show();
            }
        }
    }
};

GalaxyMap.prototype.updateNearbyGalaxys = function(){
    var tile, galaxy, distance;

    var tileAtPoint = this.app.tileMap.tileAtPoint(this.app.pageX, this.app.pageY);
    var grid = this.app.tileMap.adjacentTileGrid(tileAtPoint.r, tileAtPoint.c);

    for (var i = 0; i < this.nearbyTiles.length; i++) {
        tile = this.nearbyTiles[i];

        if (!this.app.navigating || (tile.r < grid.r1 || tile.r > grid.r2 || tile.c < grid.c1 || tile.c > grid.c2)) {
            for (var j = 0; j < tile.galaxys.length; j++) {
                galaxy = tile.galaxys[j];
                if (galaxy.elem) {
                    galaxy.elem.css({ borderColor: 'transparent' });
                    galaxy.elem.data('text').css({ opacity: 0 });
                }
                galaxy.hovered = false;
            }
        }
    }

    this.nearbyTiles = [];

    if (this.app.navigating && showHover) {

        var p = this.app.tileMap.translatePageToMap({ x: this.app.pageX, y: this.app.pageY });
        for (var r = grid.r1; r <= grid.r2; r++) {
            for (var c = grid.c1; c <= grid.c2; c++) {
                tile = this.app.tileMap.tileMatrix[r][c];

                for (var i = 0; i < tile.galaxys.length; i++) {
                    galaxy = tile.galaxys[i];

                    distance = this.app.pointDelta(p, { x: galaxy.parallaxX, y: galaxy.parallaxY });

                    this.fadeStyleForNearbyStar(galaxy, distance);
                    this.playSoundForNearbyStar(galaxy, distance);
                }

                this.nearbyTiles.push(tile);
            }
        }

    }

};

GalaxyMap.prototype.fadeStyleForNearbyStar = function(star, distance) {
    // Gradually fade stars in based on their distance from the cursor.

    var maxDistance = 300;
    var rgbAlpha = Math.pow((maxDistance - distance) / maxDistance, 3);

    if (rgbAlpha > 0 && star.elem) {
        star.elem.css({ borderColor: 'rgba(255,255,255, ' + rgbAlpha + ')' });
        star.elem.data('text').css({ opacity: rgbAlpha });
    }
};

GalaxyMap.prototype.playSoundForNearbyStar = function(star, distance) {
    // If we're close enough to a given star play an audio clip.
    // The size isn't anything specific, just feels about right.

    if (distance <= 40) {
        if (star.hovered == false) {
            this.app.audio.playStarClip(this.getAgeCategory(star.age));
        }
        star.hovered = true;
    } else {
        star.hovered = false;
    }
};


/* StarMap */

/*function StarMap(app) {
    this.app = app;

    this.$elem = this.app.tileMap.$inner;

    this.allStars = [];
    this.starsInDomIDs = [];

    this.nearbyTiles = [];
    this.starLookup = {};

    this.initElements();

    // schedule extra star loading for performant machines
    $(document.body)
        .on('startedNavigating', this.onStartedNavigating)
        .on('stoppedNavigating', this.clearStarLoadingTimer);
}

StarMap.prototype.initElements = function(){
    this.$stars = $('<div id="star-map-stars" class="star-map-stars">');
    this.$elem.append(this.$stars);
};

StarMap.prototype.onStartedNavigating = function(e){

    console.log('trigger-StartedNavigating');
    //console.log(this);

    // Schedule regular loading of stars until we max out or frame rate drops too low
    if (!appConfig.startLoaderTimer) {

        appConfig.startLoaderTimer = setInterval(function(){

            app.starMap.requestStars();

        }, 1000);
    }
     app.starMap.requestStarsDone(testData);
}

StarMap.prototype.clearStarLoadingTimer = function(e){
    clearInterval(appConfig.startLoaderTimer);
}

StarMap.prototype.requestStars = function(callback){
    var self = this;

    this.app.log('Retrieving star data...');

    if (appConfig.avgFrameRate < appConfig.lowestFrameRate) {
        self.clearStarLoadingTimer();
        return;
    }

    if (appConfig.dataTotal >= appConfig.maxDataTotal) {
        // got the max amount of stars, don't want this universe to be too crowded
        self.clearStarLoadingTimer();
        return;
    }

    var count = (!appConfig.dataTotal) ? appConfig.initialBatchCount : appConfig.dataCount,
        url = this.app.config.apiUrl + '?page='+appConfig.pagination+'&count='+count+'&timestamp='+appConfig.apiTimestamp;
        console.log(url);

    var strId = self.app.getUrlStarId();
    if (strId) {
        url += '&id='+starId;
    }

    $.ajax(url)
        .done(function(data){
            self.requestStarsDone(data);
            if (typeof callback === "function") callback();
        })
        .fail(function(data){
            self.requestStarsFail(data);
        });
};

StarMap.prototype.requestStarsDone = function(data){
    //console.log(data);
    //this.app.log('Retrieved star data:');
    //this.app.log(data);

    appConfig.dataTotal = appConfig.dataTotal + data.length;
    appConfig.pagination = Math.floor((appConfig.dataTotal / appConfig.dataCount) + 1);

    if (data.length < appConfig.dataCount){
        this.clearStarLoadingTimer();
    }

    for (var d, i = 0; i < data.length; i++) {
        d = data[i];
        // d.age = d.age || Math.random();
        d.age = Math.random();
        var dd = this.createStarData(d.id, d.x, d.y, d.name, d.age, d.url, d.cS);
    }
};

StarMap.prototype.requestStarsFail = function(data){
    // TODO: Notify the user that an error occurred.
    this.app.log('An error occurred while requesting the star data:');
    this.app.log(data.statusText);

    this.clearStarLoadingTimer();

    //window.location.href = 'http://';
};

StarMap.prototype.createPlaceholderStars = function(){
    var totalTiles = this.app.tileMap.cols * this.app.tileMap.rows;
    var starsPerTile = 8;
    var totalStars = totalTiles * starsPerTile;

    var h = this.app.tileMap.$inner.height();
    var w = this.app.tileMap.$inner.width();

    for (var i = 0; i < totalStars; i++) {
        var name = btoa(('' + Math.random()).substring(2, 8));
        var age = Math.random();

        var x = Math.floor(Math.random() * w);
        var y = Math.floor(Math.random() * h);

        this.createStarData(i, x, y, name, age);
    }
};

StarMap.prototype.createStarData = function(id, x, y, name, age, url, cs) {
    var p = this.app.tileMap.translateMapToPage({ x: x, y: y });

    var starData = { id:id, x:x, y:y, name:name, age:age, url:url, cs:cs };
    var tileData = this.app.tileMap.tileAtPoint(p.x, p.y);

    if (tileData) {
        var nebula = this.app.nebulae.nearest(x, y);
        if (nebula) starData.color = nebula.color;

        var ageClass = this.getAgeClass(starData.age);
        var colorClass = this.getColorClass(starData.color);

        starData.classNames = ageClass + ' ' + colorClass;
        starData.r = tileData.r;
        starData.c = tileData.c;

        tileData.stars.push(starData);

        this.allStars.push(starData);

        this.starLookup[id] = { r: tileData.r, c: tileData.c, i: (tileData.stars.length - 1) };

        return starData;
    }
};

StarMap.prototype.createStarElem = function(data) {

    if($.inArray(data.id, this.starsInDomIDs) >= 0) {
        return $('#star-map-stars').find('[data-id="'+data.id+'"]');
    }

    var $star = $('<div class="star" data-id="'+data.id+'">');
    var $body = $('<b></b>');
    var $text = $('<i></i>');

    //console.log(data);

    if (data.cs) {
        $star.addClass('competition-star');
        $body.addClass('age-one');
    }

    // $star.append($body);
    // $star.append($text.text(data.name));

    $body.addClass(data.classNames);

    //$star.css({ top: data.y, left: data.x });
    if (Modernizr.csstransforms3d) {
        $star.css(Modernizr.prefixed('transform'), 'translateX('+data.x+'px) translateY('+data.y+'px) translateZ(0)');
    } else {
        $star.css({ left: data.x, top: data.y });
    }
    $star.posX = data.x;
    $star.posY = data.y;

    $star.attr({ id: data.id });
    $star.data({ text: $text });

    this.$stars.append($star);

    // maintain array of star ids in the DOM
    this.starsInDomIDs.push(data.id);

    return $star;
};

StarMap.prototype.getAgeCategory = function(age) {

    var fl = Math.floor((1 - age) * 7);
    return Math.max(fl, 0);
};

StarMap.prototype.getAgeClass = function(age) {
    var ageNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    var ageClass = ageNames[this.getAgeCategory(age)];
    return 'age-' + ageClass;
};

StarMap.prototype.getColorClass = function(color) {
    var colorNames = ['blue', 'orange', 'purple', 'green', 'red', 'no-color'];
    var colorClass = color || 'no-color';

    // From time to time a random atypical color should be returned.
    // TODO: Base this on some aspect of the star data instead (e.g.
    // the age, name or url) so a given star is always the same color.

    if (Math.random() > 0.9) {
        colorClass = colorNames[Math.floor(colorNames.length * Math.random())];
    }

    return 'color-' + colorClass;
};

StarMap.prototype.findStarData = function(id) {

    var result = false;

    var lookup = this.starLookup[id];
    if (lookup) {

        var rData = this.app.tileMap.tileMatrix[lookup.r];
        if (rData) {

            var cData = rData[lookup.c];
            if (cData) {

                var star = cData.stars[lookup.i];
                if (star) result = star;

            }
        }
    }

    return result;
};

StarMap.prototype.applyParallax = function(star, useParallax) {
    if (useParallax) {


        var dx = star.x - this.app.tileMap.centerX;
        var dy = star.y - this.app.tileMap.centerY;
        var dh = Math.sqrt(dx * dx + dy * dy);

        var maxDistance = Math.max(this.app.halfWinW, this.app.halfWinH);

        var a = Math.atan2(dy, dx);
         var v = 600 * (0.1 + 2*star.age) * (Math.min(maxDistance, dh) / maxDistance);
        //var v = 600 * (0.1 + 2*Math.random()) * (Math.min(maxDistance, dh) / maxDistance);

        var vx = v * Math.cos(a);
        var vy = v * Math.sin(a);

    } else {
        var vx = 0;
        var vy = 0;
    }


    star.parallaxX = Math.floor(star.x + vx);
    star.parallaxY = Math.floor(star.y + vy);

    //star.elem.css({ left: star.parallaxX, top: star.parallaxY });
    this.positionStar(star, star.parallaxX, star.parallaxY);
};

StarMap.prototype.positionStar = function(star, x, y) {

    if (Modernizr.csstransforms3d) {
        star.elem.css(Modernizr.prefixed('transform'), 'translateX('+x+'px) translateY('+y+'px) translateZ(0)');
    } else {
        star.elem.css({ left: x, top: y });
    }

    star.posX = x;
    star.posY = y;
}

StarMap.prototype.update = function(){
    this.updateActiveStars();
    this.updateNearbyStars();

};

StarMap.prototype.updateActiveStars = function(){
    var star, tile;

    // No need to remove them from the DOM now - we are just setting them to hidden when they are outside the current viewport
    // for (var i = 0; i < this.app.tileMap.removeTiles.length; i++) {
    //     tile = this.app.tileMap.removeTiles[i];
    //     for (var j = 0; j < tile.stars.length; j++) {
    //         star = tile.stars[j];
    //         star.elem && star.elem.remove();
    //         star.elem = null;
    //     }
    // }

    for (var i = 0; i < this.app.tileMap.activeTiles.length; i++) {
        tile = this.app.tileMap.activeTiles[i];
        for (var j = 0; j < tile.stars.length; j++) {

            star = tile.stars[j];
            star.elem = star.elem || this.createStarElem(star);


            // Is this active star actually within the viewport?
            if (star.posX < bounds.x1 || star.posX > bounds.x2 || star.posY < bounds.y1 || star.posY > bounds.y2) {

                star.elem.hide();

            } else {

                this.applyParallax(star, useParallax);
                star.elem.show();
            }
        }
    }
};

StarMap.prototype.updateNearbyStars = function(){
    var tile, star, distance;

    var tileAtPoint = this.app.tileMap.tileAtPoint(this.app.pageX, this.app.pageY);
    var grid = this.app.tileMap.adjacentTileGrid(tileAtPoint.r, tileAtPoint.c);

    for (var i = 0; i < this.nearbyTiles.length; i++) {
        tile = this.nearbyTiles[i];

        if (!this.app.navigating || (tile.r < grid.r1 || tile.r > grid.r2 || tile.c < grid.c1 || tile.c > grid.c2)) {
            for (var j = 0; j < tile.stars.length; j++) {
                star = tile.stars[j];
                if (star.elem) {
                    star.elem.css({ borderColor: 'transparent' });
                    star.elem.data('text').css({ opacity: 0 });
                }
                star.hovered = false;
            }
        }
    }

    this.nearbyTiles = [];

    if (this.app.navigating && showHover) {

        var p = this.app.tileMap.translatePageToMap({ x: this.app.pageX, y: this.app.pageY });
        for (var r = grid.r1; r <= grid.r2; r++) {
            for (var c = grid.c1; c <= grid.c2; c++) {
                tile = this.app.tileMap.tileMatrix[r][c];

                for (var i = 0; i < tile.stars.length; i++) {
                    star = tile.stars[i];

                    distance = this.app.pointDelta(p, { x: star.parallaxX, y: star.parallaxY });

                    this.fadeStyleForNearbyStar(star, distance);
                    this.playSoundForNearbyStar(star, distance);
                }

                this.nearbyTiles.push(tile);
            }
        }

    }

};

StarMap.prototype.fadeStyleForNearbyStar = function(star, distance) {
    // Gradually fade stars in based on their distance from the cursor.

    var maxDistance = 300;
    var rgbAlpha = Math.pow((maxDistance - distance) / maxDistance, 3);

    if (rgbAlpha > 0 && star.elem) {
        star.elem.css({ borderColor: 'rgba(255,255,255, ' + rgbAlpha + ')' });
        star.elem.data('text').css({ opacity: rgbAlpha });
    }
};

StarMap.prototype.playSoundForNearbyStar = function(star, distance) {
    // If we're close enough to a given star play an audio clip.
    // The size isn't anything specific, just feels about right.

    if (distance <= 40) {
        if (star.hovered == false) {
            //this.app.audio.playStarClip(this.getAgeCategory(star.age));
        }
        star.hovered = true;
    } else {
        star.hovered = false;
    }
};*/


/* swip&pan  control */
function SlideControls(app){
    this.app = app;
    this.point = app.tileMap.desPoint;
    this.animateTo = {};
    this.speed = 0;
    this.direction = 0;
    //this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.enabled = false;   // stop/start event
    this.mode = -1;  // 0:pan & swip  1: animateto
    /*this.velocityMutiplier = 1.5;
    this.maxVelocity = 25;
    this.minVelocity = 15;*/
    //this.animateSpeed = 25;
    this.stop = true;
    this.fps = ( appConfig.avgFrameRate !== undefined ) ? appConfig.avgFrameRate : 30;
    this.eps = ( appConfig.eps !== undefined ) ? appConfig.eps : 0.5;
    this.speedFactor = .5;

    //this.velocity = { x:0, y:0 };
    this.startPos = {x:0,y:0}; // mouse postion when mouse down
    this.deltaPos = {x:0,y:0};
    this.endPos = {x:0,y:0};
    this.tileStartPos = {x:0,y:0};


    this.initHandlers();

};

SlideControls.prototype.initHandlers = function(){
    var self = this;

   this.app.tileMap.$elem[0].addEventListener( 'mousedown', self.onMouseDown, false );
   this.app.tileMap.$elem[0].addEventListener( 'touchstart', self.touchstart, false );
   this.app.tileMap.$elem[0].addEventListener( 'touchend', self.touchend, false );
   this.app.tileMap.$elem[0].addEventListener( 'touchmove', self.touchmove, false );

   this.app.miniMap.$elem[0].addEventListener('click',self.clickMinimap,false);
   this.app.miniMap.$elem[0].addEventListener('touchstart', self.touchMinimap,false);


};

SlideControls.prototype.onMouseDown = function(e){

    if(!app.control.enabled) return;
     app.control.mode = 0;
     app.control.startPos.x = e.clientX;
     app.control.startPos.y = e.clientY;
     app.control.tileStartPos.x = app.tileMap.desPoint.x;
     app.control.tileStartPos.y = app.tileMap.desPoint.y;

     app.tileMap.$elem[0].addEventListener('mousemove',app.control.onMouseMove,false);
     app.tileMap.$elem[0].addEventListener('mouseup', app.control.onMouseUp,false);
     // console.log('onMouseDown')
};



SlideControls.prototype.onMouseMove  = function(e){
    if(!app.control.enabled) return;
    app.control.endPos.x = e.clientX;
    app.control.endPos.y = e.clientY;
    app.control.deltaPos.x = app.control.startPos.x - e.clientX;
    app.control.deltaPos.y = app.control.startPos.y - e.clientY;
    app.control.startPos.x = app.control.endPos.x;
    app.control.startPos.y = app.control.endPos.y;

    app.control.caculateVelocity(app.control.deltaPos.x, app.control.deltaPos.y);


};

SlideControls.prototype.onMouseUp = function (e){
    // console.log('onMouseUp');
    app.control.stop = true;
    app.control.deltaPos.x = 0;
    app.control.deltaPos.y = 0;

    app.tileMap.$elem[0].removeEventListener( 'mousemove', app.control.onMouseMove, false );
    app.tileMap.$elem[0].removeEventListener( 'mouseup', app.control.onMouseUp, false );
};

SlideControls.prototype.touchstart = function(e){
    e.preventDefault();
    if(!app.control.enabled) return;
     app.control.mode = 0;
     app.control.startPos.x = event.touches[ 0 ].pageX;
     app.control.startPos.y = event.touches[ 0 ].pageY;
     app.control.tileStartPos.x = app.tileMap.desPoint.x;
     app.control.tileStartPos.y = app.tileMap.desPoint.y;
     //console.log( app.control.tileStartPos.x + ':'+ app.control.tileStartPos.y);
};

SlideControls.prototype.touchmove = function(e){
    e.preventDefault();
    if(!app.control.enabled) return;
    app.control.endPos.x = event.touches[ 0 ].pageX;
    app.control.endPos.y = event.touches[ 0 ].pageY;
    app.control.deltaPos.x = app.control.startPos.x - event.touches[ 0 ].pageX;
    app.control.deltaPos.y = app.control.startPos.y - event.touches[ 0 ].pageY;
    app.control.startPos.x = app.control.endPos.x;
    app.control.startPos.y = app.control.endPos.y;

    app.control.caculateVelocity(app.control.deltaPos.x, app.control.deltaPos.y);
    //console.log(app.control.deltaPos.x + ':' + app.control.deltaPos.y);
};

SlideControls.prototype.touchend = function (e){
    e.preventDefault();
    app.control.stop = true;
    app.control.deltaPos.x = 0;
    app.control.deltaPos.y = 0;

};

SlideControls.prototype.clickMinimap = function(e){

    if(!app.control.enabled) return;
     app.control.mode = 1;
     app.control.animateTo = app.miniMap.scalePoint(e.clientX, e.clientY);
};

SlideControls.prototype.touchMinimap = function(e){

    if(!app.control.enabled) return;
     app.control.mode = 1;
     app.control.animateTo = app.miniMap.scalePoint(e.touches[ 0 ].pageX, e.touches[ 0 ].pageY);
     console.log(e.touches[0]);
};

SlideControls.prototype.clickPlanet = function(x, y){  // x, y are the page pos of the planet
     app.control.mode = 1;
     // caculate the distance to the page center/specific point
     // var dx = app.halfWinW - x;
     // var dy = app.halfWinH - y;

     // caculate new Center
     var newX = app.tileMap.centerX - x;
     var newY = app.tileMap.centerY - y;

    app.control.animateTo.x = app.halfWinW - newX;
    app.control.animateTo.y = app.halfWinH - newY;



};


SlideControls.prototype.caculateDiretion = function(dx,dy){
    var a = Math.atan2(dy,dx);
    return a;
};

SlideControls.prototype.caculateDistance = function(dx,dy){
    var dh = Math.sqrt(dx * dx + dy * dy);
    return dh;
};

SlideControls.prototype.caculateVelocity = function(x,y){
     /* var dx = x * 1000 / this.fps;
        var dy = y * 1000 / this.fps;
        var dh = Math.sqrt(dx * dx + dy * dy);
        this.direction = Math.atan2(dy, dx);
        var clampedDistance = Math.max(dh,this.minVelocity);
        this.speed = this.velocityMutiplier * dh;
        //this.deltaPos.x = x;
        //this.deltaPos.y = y;
    */
        this.direction = this.caculateDiretion(x,y);
        var dh = this.caculateDistance(x,y);

    if(!Modernizr.touch){
        this.deltaPos.x = x/this.app.winW * this.app.tileMap.$inner.width()  * this.speedFactor;
        this.deltaPos.y = y/this.app.winH * this.app.tileMap.$inner.height()  * this.speedFactor;
    }
    else{
        this.deltaPos.x = x/this.app.winW * 2 * this.app.tileMap.$inner.width()  * 0.6;
        this.deltaPos.y = y/this.app.winH * 2 * this.app.tileMap.$inner.height()  * 0.6;
     }

};

SlideControls.prototype.pan = function(p){

    this.tileStartPos.x += this.deltaPos.x;
    this.tileStartPos.y += this.deltaPos.y;
    //this.tileStartPos.x = this.app.tileMap.constrainX(this.tileStartPos.x);
    //this.tileStartPos.y = this.app.tileMap.constrainY(this.tileStartPos.y);

        /*p.x += (this.tileStartPos.x - p.x) *0.08;
        p.y += (this.tileStartPos.y - p.y) * 0.08;*/

    p.x = this.easing(this.tileStartPos.x, p.x, 0.08);
    p.y = this.easing(this.tileStartPos.y, p.y, 0.08);

};

SlideControls.prototype.easing = function(d,s,easeAmount){
       var distance = d - s;
        if( Math.abs(distance) <= 0.01) {distance = 0; return d;}
        //console.log(distance);
        var p = s + distance * easeAmount;
        return p;
      //s += (d - s) * easeAmount;
};

SlideControls.prototype.animate = function(p){

    var f = (Modernizr.touch)? 0.16 : 0.08;
    p.x = this.easing(this.animateTo.x, p.x, f);
    p.y = this.easing(this.animateTo.y, p.y, f);

    //console.log(p);

};

SlideControls.prototype.update = function(){
       if(!this.enabled || this.mode === -1 ) return;


       if(this.mode === 0 ) {//pan mode

              this.pan(this.point);

        }
        else {

            this.animate(this.point);
        }
};

/* Planet */

function Planet(app){
    this.app = app;
    //this.$elem =


};

/* TileMap */

function TileMap(app) {
    this.app = app;

    this.debug = this.app.config.tileDebug;
    this.$elem = this.app.$elem.find('.universe');
    this.desPoint = {x:0,y:0};

    this.activeTiles = [];
    //this.control = new SlideControls(this.desPoint,this.$elem[0]);


    this.initElements();
    this.initHandlers();

    if (!starId) {
        this.randomisePosition();
    }

    $(document.body)
        .on('enterGalaxy',this.onEnterGalaxy)
        .on('enterQudrant', this.onEnterQudrant);
};

TileMap.prototype.randomisePosition = function(){
    // Start in a random position every page load
    var arrStartPositions = [ [6307, 4393], [5221, 2538], [3622, 1250], [1998, 4595], [1604, 1533], [1604, 1533] ],
       // key = Math.floor(Math.random()*arrStartPositions.length),
       key = 2;
        coords = arrStartPositions[key];


    // hard coded mousemove at propsed center
    this.app.pageX = this.app.halfWinW;//coords[0];
    this.app.pageY = this.app.halfWinH;//coords[1];

    // Set initial screen to specific place
    this.center(coords[0], coords[1]);
    //this.updateMapPosition(true);


};

TileMap.prototype.onEnterGalaxy = function(){
    app.tileMap.$inner.addClass('inSystem');
    app.tileMap.$tiles.hide();
    for(var i = 0; i < app.tileMap.tileMatrix.length; i++){
            for(var j = 0; j <　app.tileMap.tileMatrix[i].length; j++){
                app.tileMap.tileMatrix[i][j].galaxys.length = 0;
            }
    }

};

TileMap.prototype.onEnterQudrant = function(){
    app.tileMap.$inner.removeClass('inSystem');
    app.tileMap.$tiles.show();
    for(var i = 0; i < app.tileMap.tileMatrix.length; i++){
            for(var j = 0; j <　app.tileMap.tileMatrix[i].length; j++){
                app.tileMap.tileMatrix[i][j].systems.length = 0;
            }
    }

};

TileMap.prototype.initElements = function(){
    this.rows = this.app.config.tileRows;
    this.cols = this.app.config.tileCols;

    this.$outer = this.$elem;
    this.$inner = $('<div class="tile-map">');
    this.$outer.append(this.$inner);

    this.$tiles = $('<div class="tile-map-tiles">');
    this.$inner.append(this.$tiles);

    if (this.debug) {
        this.$tiles.addClass('tile-grid-on');
    }

    this.app.winW = $(window).width();
    this.app.winH = $(window).height();

    this.app.halfWinW = this.app.winW / 2;
    this.app.halfWinH = this.app.winH / 2;

    this.app.pageX = this.app.halfWinW;
    this.app.pageY = this.app.halfWinH;

    this.innerW = this.$inner.width();
    this.innerH = this.$inner.height();

    this.tileW = this.innerW / this.cols;
    this.tileH = this.innerH / this.rows;

    this.centerX = this.innerW / 2;
    this.centerY = this.innerH / 2;

    this.tileMatrix = [];

    for (var r = 0; r < this.rows; r++) {
        this.tileMatrix[r] = [];

        for (var c = 0; c < this.cols; c++) {
            var $tile = $('<div class="tile">');

            $tile.text(r + ',' + c);
            $tile.css({ top: r * this.tileH, left: c * this.tileW });

            this.$tiles.append($tile);
            this.tileMatrix[r][c] = { r: r, c: c, elem: $tile, loaded: false, stars: [], systems:[], galaxys:[]}; // !important
        }
    }
};

TileMap.prototype.initHandlers = function(){
    var self = this;

    $(window).resize(function(e){
        self.app.winW = $(window).width();
        self.app.winH = $(window).height();

        self.app.halfWinW = self.app.winW / 2;
        self.app.halfWinH = self.app.winH / 2;

        self.innerW = self.$inner.width();
        self.innerH = self.$inner.height();

        self.minX = -(self.innerW - self.app.winW);
        //console.log('self.minX=' + self.minX );
        self.maxX = 0;

        self.minY = -(self.innerH - self.app.winH);
        self.maxY = 0;
    }).resize();

};

TileMap.prototype.translatePageToMap = function(p1) {
    var p2 = this.$inner.position();
    p1.x -= p2.left;
    p1.y -= p2.top;
    return p1;
};

TileMap.prototype.translateMapToPage = function(p1) {
    var p2 = this.$inner.position();
    p1.x += p2.left;
    p1.y += p2.top;
    return p1;
};

TileMap.prototype.tileAtPoint = function(x, y){
    var tile = false;

    var p = this.translatePageToMap({ x: x, y: y });
    var c = Math.floor(p.x / this.tileW);
    var r = Math.floor(p.y / this.tileH);

    var rData = this.tileMatrix[r];
    if (rData) {
        var cData = rData[c];
        if (cData) tile = cData;
    }

    return tile;
};

TileMap.prototype.visibleTileGrid = function(){
    // Return min-max coords for all tiles which are either partially or
    // fully within the current viewport, plus a buffer along each edge.
    var grid = {};

    // Find the rows and cols at each edge of the viewport
    var p1 = this.translatePageToMap({ x: 0, y: 0 });
    var p2 = this.translatePageToMap({ x: this.app.winW, y: this.app.winH });

    grid.r1 = Math.floor(p1.y / this.tileH);
    grid.r2 = Math.floor(p2.y / this.tileH);
    grid.c1 = Math.floor(p1.x / this.tileW);
    grid.c2 = Math.floor(p2.x / this.tileW);

    // Add a buffer of off-screen tiles along each edge when still,
    // or a double-width buffer in the direction of movement.
    var vy = this.innerVY || 0;
    var vx = this.innerVX || 0;

    grid.r1 += (vy != 0) ? (vy > 0) ?  0 : -2 : -1;
    grid.r2 += (vy != 0) ? (vy > 0) ?  2 :  0 :  1;
    grid.c1 += (vx != 0) ? (vx > 0) ?  0 : -2 : -1;
    grid.c2 += (vx != 0) ? (vx > 0) ?  2 :  0 :  1;

    // Sanitise the result so we aren't returning rows or cols that don't exist.
    grid.r1 = Math.max(grid.r1, 0);
    grid.r2 = Math.min(grid.r2, this.rows - 1);
    grid.c1 = Math.max(grid.c1, 0);
    grid.c2 = Math.min(grid.c2, this.cols - 1);

    return grid;
};

TileMap.prototype.adjacentTileGrid = function(r, c) {
    var grid = {};

    grid.r1 = r - 1;
    grid.r2 = r + 1;
    grid.c1 = c - 1;
    grid.c2 = c + 1;

    grid.r1 = Math.max(grid.r1, 0);
    grid.r2 = Math.min(grid.r2, this.rows - 1);
    grid.c1 = Math.max(grid.c1, 0);
    grid.c2 = Math.min(grid.c2, this.cols - 1);

    return grid;
};

TileMap.prototype.update = function(){
    this.updateActiveTiles();
    this.updateMapPosition();
};

TileMap.prototype.updateActiveTiles = function(){
    var tile;
    var grid = this.visibleTileGrid();

    this.removeTiles = [];

    for (var i = 0; i < this.activeTiles.length; i++) {
        tile = this.activeTiles[i];
        if (tile.r < grid.r1 || tile.r > grid.r2 || tile.c < grid.c1 || tile.c > grid.c2) {
            tile.elem.hide();
            this.removeTiles.push(tile);
        }
    }

    this.activeTiles = [];

    for (var r = grid.r1; r <= grid.r2; r++) {
        for (var c = grid.c1; c <= grid.c2; c++) {
            tile = this.tileMatrix[r][c];
            tile.elem.show();

            if (tile.loaded == false) {
                tile.loaded = true;
                tile.elem.css({ backgroundImage: 'url(./img/tiles/final-creation-canvas_r' + (tile.r+1) + '_c' + (tile.c+1) + '.jpg)' });
            }

            this.activeTiles.push(tile);
        }
    }
};


TileMap.prototype.updateMapPosition = function(bypass){
    // if (!this.app.navigating && !bypass) return;

    //var newY = Math.round(this.constrainY(this.desPoint.y));
    //var newX = Math.round(this.constrainX(this.desPoint.x));

    var newY = this.constrainY(this.desPoint.y);
    var newX = this.constrainX(this.desPoint.x);

    this.positionTileMap(newX, newY);

    //$(document.body).trigger('onMapPositionUpdate');
};


TileMap.prototype.positionTileMap = function(x, y) {

    if (Modernizr.csstransforms3d) {
        // var tr = 'transform'
        // if(Modernizr.touch) {tr = '-webkit-transform';console.log(tr);}
        // this.$inner.css(tr, 'translateX('+Math.round(x)+'px) translateY('+Math.round(y)+'px) translateZ(0)');
        this.$inner.css(Modernizr.prefixed('transform'), 'translateX('+Math.round(x)+'px) translateY('+Math.round(y)+'px) translateZ(0)');
    } else {
        this.$inner.css({ left: x, top: y });
    }
    this.$inner.oldX = parseFloat(x, 10);
    this.$inner.oldY = parseFloat(y, 10);

    this.desPoint.x = this.$inner.oldX;
    this.desPoint.y = this.$inner.oldY;

    this.centerX = this.app.halfWinW - x;
    this.centerY = this.app.halfWinH - y;

    this.setBounds(this.centerX, this.centerY);
};

TileMap.prototype.center = function(x, y) {

    this.centerX = x;
    this.centerY = y;
    x = this.app.halfWinW - x;
    y = this.app.halfWinH - y;

    this.to(x, y);
};

TileMap.prototype.to = function(x, y) {

    this.positionTileMap(x, y);
};

TileMap.prototype.setBounds = function(x, y){

    // the image center is  tilemap Center; bounds screen size plus 400 (200 per side)
 /*   bounds.x1 = -x - this.app.winW/2  - 200;
    bounds.y1 = -y - this.app.winH;
    bounds.x2 = bounds.x1 + this.app.winW + 200;
    bounds.y2 = bounds.y1 + this.app.winH + 200;*/
    bounds.x1 = x - this.app.winW/2 - 200;
    bounds.y1 = y - this.app.winH/2 - 200;
    bounds.x2 = x +　this.app.winW/2 + 200;
    bounds.y2 = y + this.app.winH/2 + 200;

};

TileMap.prototype.animateCenter = function(x, y, callback) {

    x = this.app.halfWinW - x;
    y = this.app.halfWinH - y;

/*    if (Modernizr.csstransforms3d) {

        x = -(this.$inner.oldX - x);
        y = -(this.$inner.oldY - y);

        this.offsetX = x;
        this.offsetY = y;
    }*/

    this.animateTo(x, y, callback);

};

TileMap.prototype.animateTo = function(x, y, callback) {

    var self = this;

    this.$inner.animate({ left: x, top: y }, {
        duration: 600,
        complete: callback || function(){console.log(self.centerX);},
        progress: function(){

            // TileMap.updateMapPosition doesn't run unless we're in
            // navigating mode, so we need to update the center coords
            // used by StarMap.applyParallax here instead.

            /*var position = self.$inner.position();
            self.centerX = self.app.halfWinW - position.left;
            self.centerY = self.app.halfWinH - position.top;*/
            //self.centerX = self.app.halfWinW - x;
            //self.centerY = self.app.halfWinH - y;
            //self.setBounds(x, y);
        }
    });
};

TileMap.prototype.constrainX = function(x) {
    var dx = parseInt(this.$inner.css('left'));
    return this.clamp(x, this.minX - dx, this.maxX - dx);
};

TileMap.prototype.constrainY = function(y) {
    var dy = parseInt(this.$inner.css('top'));
    return this.clamp(y, this.minY - dy, this.maxY - dy);
};

TileMap.prototype.clamp = function(val, min, max) {
    val = Math.max(val, min);
    val = Math.min(val, max);
    return val;
};

/* Slider */

function Slider(dom,name){
  this.$container = (dom[0] !== undefined ) ? dom : $(document.body);
  this.name = name;
  this.$elem = $('<ul class="slider">');
  this.pos = 0; // current position
  this.totalSlides = 0;
  this.sliderWidth = 0;
  this.initHandlers();
};


Slider.prototype.initHandlers = function(){
  var self = this;
   // click file input
  $('#projects-rocket').on('click',function(e){
      $('#rocket-error').text('')
      var label = this.nextElementSibling;
      label.querySelector( 'span' ).innerHTML = 'Choose a rocket image...';
  });
  // file input change
  $('#projects-rocket').on('change',function(e){
     $('#rocket-error').text('')
     var label = this.nextElementSibling;
     var labelVal = label.innerHTML;
     var fileName = '';
      if( this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      else
        fileName = e.target.value.split( '\\' ).pop();

      if( fileName )
        label.querySelector( 'span' ).innerHTML = fileName;
      else
        label.innerHTML = labelVal;
  });

  // upload image file
  $('#btn-addRocket').on('click',function(e){
      e.preventDefault();
     self.addRocket(app.systemMap.activePlanet.attr('data-id'));

  });

  // delete rocket

    $('#btn-delRocket').on('click',function(e){
      e.preventDefault();
     self.delRocket(self.getSlideId(),app.systemMap.activePlanet.attr('data-id'));

  });
};

Slider.prototype.addRocket = function(planet_id){
    if($('#projects-rocket').val() === "" ){
       //console.log('please choose a file first.')
       $('#rocket-error').text('error: please choose a file first.');
       return;
    }
    var self = this;
    var fe = $( "#rocketForm" )[0];
    var fd = new FormData(fe);

    self.$container.parent().addClass('state-loading');

    fd.append("data[Rocket][planet_id]",planet_id);
    var url = app.config.apiUrl +　app.config.REST.ADDROCKET;
    $.ajax({
      url: url,
      type: "POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success: function(data){
              if(data.message.type === 'success'){
                  self.redraw(planet_id);
                  $('#projects-rocket').val("");
                   var label =  $('#projects-rocket')[0].nextElementSibling;
                    label.querySelector( 'span' ).innerHTML = 'Choose a rocket image...';
              }
              else{
                console.log(data);
                $('#rocket-error').text(data.message.text.photo[0]);
              }
      },
      error: function(status){
        console.log(status);
      },
      complete: function(){
        self.$container.parent().removeClass('state-loading');
        barLoading($('#upload-rocket-bar'), 0);
      }
    }).uploadProgress(function(e) {  // use jquery progress plugin
    // tracking uploading
    if (e.lengthComputable) {
     var percentage = Math.round((e.loaded * 100) / e.total);
     barLoading($('#upload-rocket-bar'),percentage);
    }
  });

/*     for (var pair of fd.entries()) {
      console.log(pair[0]);
      console.log(pair[1]);
  }*/

};

Slider.prototype.delRocket = function(id,planet_id){
      var self = this;
      console.log(id);
      var url = app.config.apiUrl +　app.config.REST.DELROCKET + id + app.config.REST.SUFFIX;

      self.$container.parent().addClass('state-loading');

      $.ajax({
        url: url,
        type:"POST",
        success:function(data){
            if(data.message.type === 'success'){
                    self.redraw(planet_id);
                }
                else{
                  console.log(data);
                }
        },
        error: function(status){
          console.log(status);
        },
    }).progress(function(e) {  // use jquery progress plugin
         barLoading($('#upload-rocket-bar'),100);
    });
};

Slider.prototype.requestData =  function(planetID){

    // put ajax call here
  // var data = selectOfflineData(testRocketsData,planetID,true)
      var self = this;
      $.ajax( {
          url: app.config.apiUrl +　app.config.REST.GETROCKETS + planetID + app.config.REST.SUFFIX,
          success: function( data) {

              //console.log(data.rockets);
              self.requestDataDone(data.rockets);

          },
          error: function(status){

            console.log('server error');
          }
      });

};

Slider.prototype.requestDataDone = function(data){
      if(!$('.planet-info-container').hasClass('active')) return;
      this.caculateSliderWidth(data.length);
      this.createSlides(data);
      this.createButtons(data.length);
      this.$container.parent().removeClass('state-loading'); // show delete button after redraw!
};

Slider.prototype.caculateSliderWidth = function(n){
   this.sliderWidth = this.$container.width();
   this.totalSlides = n;
   this.$elem.width(this.sliderWidth * n);
};

Slider.prototype.createSlides = function (data){
  var self = this;
  if(data.length > 0){
       for(var i = data.length - 1; i >= 0; i--){
           var sli = $('<li>');
           sli.data({ID: data[i].Rocket.id});
           var url  = app.config.apiUrl + '/app/webroot/files/rocket/photo/'+ data[i].Rocket.id + '/' + encodeRFC5987ValueChars(data[i].Rocket.photo);   // data[i].img_url;
           var img = $('<img src =' + url + '>');
           var n = i+1;
           var text = $('<span>'+ this.name + ' ' + n +'</span>' );
           sli.append(img).append(text);
           this.$elem.append(sli);
       }

       this.$container.append(this.$elem);
       $('#btn-delRocket').removeClass('noData');


       // redraw after editing
       if(self.pos !== 0) {

        self.$elem.css('left', -(self.sliderWidth * self.pos));
       }

    }
    else{
      var noData = $('<span class="noData">No Data</span>');
      this.$container.append(noData);
       $('#btn-delRocket').addClass('noData');
    }
};

Slider.prototype.createButtons = function(n){
      if(n < 2) return;
      var self = this;
      var bNext = $('<div class="btns next">');
      var bPrev = $('<div class="btns previous">');
      this.$container.append(bNext).append(bPrev);

      function slideRight(){
            self.pos++;
            if(self.pos==self.totalSlides){ self.pos = 0; }
            self.$elem.css('left', -(self.sliderWidth * self.pos));
      };

      function slideLeft(){
            self.pos--;
            if(self.pos==-1){ self.pos = self.totalSlides-1; }
            self.$elem.css('left', -(self.sliderWidth * self.pos));
      };

      bNext.click(slideRight);
      bPrev.click(slideLeft);
};

Slider.prototype.empty = function(){
   this.$elem.css('left',0);
    this.$elem.empty();
    this.$container.empty();
};

Slider.prototype.redraw = function(planet_id, pos){
    pos = pos || 0;
    this.empty();
    this.pos = pos;
    this.requestData(planet_id);
};

Slider.prototype.getSlideId = function(){
      var id = this.$elem.children().eq(this.pos).data('ID'); // ul nth child
      return id;
};


/*Slider.prototype.slideLeft = function (){
    this.pos--;
    if(this.pos==-1){ this.pos = this.totalSlides-1; }
    this.$elem.css('left', -(this.sliderWidth * this.pos));

};

Slider.prototype.slideRight = function(){
    console.log(this);
    this.pos++;
    if(this.pos==this.otalSlides){ this.pos = 0; }
    this.$elem.css('left', -(this.sliderWidth * this.pos));
};*/

/* videoSlider inherit from slider*/

function VideoSlider(dom, name){
      this.$formBtn = $('#btn-addVideo');
      this.$delBtn = $('#btn-delVideo');
      this.$editBtn = $('#btn-editVideo');
      Slider.call(this, dom, name);


};

VideoSlider.prototype = Object.create(Slider.prototype);

// Set the "constructor" property to refer to Child
VideoSlider.prototype.constructor = VideoSlider;

VideoSlider.prototype.requestData =  function(planetID){

    // put ajax call here
    // var data = selectOfflineData(testVideosData,userID,true)
    // this.requestDataDone(data);
    var self = this;
      $.ajax( {
          url: app.config.apiUrl +　app.config.REST.GETVIDEOS + planetID + app.config.REST.SUFFIX,
          success: function( data) {

              console.log(data.videos);
              self.requestDataDone(data.videos);

          },
          error: function(status){

            console.log('server error');
          }
      });

};

VideoSlider.prototype.getBackgroundImage = function(id){
    var url = 'url(https://i.ytimg.com/vi_webp/' + id + '/hqdefault.webp)';
    return url;
};

VideoSlider.prototype.createSingleSlide = function(i,vid,id,name,photo,pdf,ppt,des){
      var self = this;
      var sli = $('<li>');
      var btnPlay = $('<div class="play">');
      var img_url; // put default back image url here.


      if(vid !== null && vid !== "") img_url  = this.getBackgroundImage(vid);
      if(photo !== null) img_url = 'url(' + app.config.apiUrl + '/app/webroot/files/video/photo/'+ id + '/' + photo + ')';

      var desText = $('<span class="project-des">'+ des + '</span>' );

      var n = i + 1;
      var titleText = $('<span class="project-title">'+ self.name + ' ' + n + ': ' + name + '</span>' );

      var desBtn = $('<a class="btn des-btn">');
      var pdfBtn = $('<a class="btn pdf-btn">');
      var pptBtn = $('<a class="btn ppt-btn">');

      var Btns = $('<div class="btn-menu">');
      if(pdf !== null) {
       pdfBtn.attr("href", app.config.apiUrl + '/app/webroot/files/video/pdf/'+ id + '/' + pdf).attr("download",pdf);
       Btns.append(pdfBtn);
      };

      if(ppt !== null) {
        pptBtn.attr("href", app.config.apiUrl + '/app/webroot/files/video/ppt/'+ id + '/' + ppt).attr("download", ppt);
        Btns.append(pptBtn);
      };

      if(des !== null && des !== "") Btns.append(desBtn);

      sli.css('background-image', img_url).data({ID: id});
      sli.append(Btns);

      if(vid !== null && vid !== "") {
        sli.attr('id',vid);
        btnPlay.data({ID: vid})
        $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + vid + "&key=AIzaSyA_cxz6n5dCd0nqf7yWHtdKupo3zUZi3ho",
               function(dd){
                  if(name === null ||　name === "") {
                    titleText = $('<span class="project-title">'+ self.name + ' ' + n + ': ' + dd.items[0].snippet.title + '</span>' );
                    sli.append(titleText);
                  }
                  sli.append(btnPlay);//.append(text)
               });
      }
      if(name !== null && name !== "") sli.append(titleText);
      sli.append(desText);
      self.$elem.append(sli);
};

VideoSlider.prototype.createSlides = function(data){  //rewrite createSlides method
      //var ytApiKey = "AIzaSyA_cxz6n5dCd0nqf7yWHtdKupo3zUZi3ho"; // youtube data api v3 apikey
      var self = this;
      if(data.length > 0) {
          for(var i = data.length - 1; i >= 0; i--){
                var videoId = data[i].Video.youtube_url;
                var id = data[i].Video.id;
                var photo = data[i].Video.photo;
                var pdf = data[i].Video.pdf;
                var ppt = data[i].Video.ppt;
                var name = data[i].Video.name;
                var des = data[i].Video.description;
                this.createSingleSlide(i,videoId,id,name,photo,pdf,ppt,des);
          }

      this.$container.append(this.$elem);
      this.$delBtn.removeClass('noData');

        if(self.pos !== 0)  self.$elem.css('left', -(self.sliderWidth * self.pos));
    }
    else {
      var noData = $('<span class="noData">No Data</span>');
      this.$container.append(noData);
      this.$delBtn.addClass('noData');
    }
};

/*VideoSlider.prototype.createVideo = function(){
    var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
    // if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

    // The height and width of the iFrame should be the same as parent
    var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height()});
    iframe.attr('allowfullscreen','');

    // Replace the YouTube thumbnail with YouTube HTML5 Player
    $(this).addClass('active').append(iframe);

};*/

VideoSlider.prototype.createButtons = function(n){  // add play button event here

      var self = this;

      function createVideo(){
              var parent = $(this).parent();
              //console.log(parent[0].id);
             if(parent.hasClass('active')) return;
            var iframe_url = "https://www.youtube.com/embed/" + parent[0].id + "?autoplay=1&autohide=1";
            // if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

            // The height and width of the iFrame should be the same as parent
            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': parent.width(), 'height': parent.height()});

            // Replace the YouTube thumbnail with YouTube HTML5 Player
            parent.addClass('active').append(iframe);
            //self.$container.append(iframe);

      }

      //this.$elem.find('li').click(createVideo);
      this.$elem.on('click','.play', createVideo);
      //console.log(this.$elem.find('li'));

      if(n < 2) return;

      var bNext = $('<div class="btns next">');
      var bPrev = $('<div class="btns previous">');
      this.$container.append(bNext).append(bPrev);

      function slideRight(){
            self.pos++;
            if(self.pos==self.totalSlides){ self.pos = 0; }
            self.$elem.css('left', -(self.sliderWidth * self.pos));
            stopVideo();
      };

      function slideLeft(){
            self.pos--;
            if(self.pos==-1){ self.pos = self.totalSlides-1; }
            self.$elem.css('left', -(self.sliderWidth * self.pos));
            stopVideo();
      };

      function stopVideo(){
            var el = self.$elem.find('.active');
            var iframe = $(el).find('iframe');
              $(el).removeClass('active');
              $(iframe).remove();
      }

      bNext.click(slideRight);
      bPrev.click(slideLeft);

      $('.des-btn').click(function(e){
        e.preventDefault();
        var parent = $(this).parent().parent();
        $(parent[0]).find(".project-des").toggleClass('active');
      })

};

VideoSlider.prototype.stopVideo = function(){
    var el = this.$elem.find('.active');
    if(el.length === 0 ) return;
    var iframe = $(el).find('iframe');
    $(el).removeClass('active');
    $(iframe).remove();

};

VideoSlider.prototype.initHandlers = function(){
  var self = this;
  this.$formBtn.on('click',function(e){
      e.preventDefault();
      //self.addVideo(app.systemMap.activePlanet.attr('data-id'));
      app.screenProjectForm.enterScreen('ADD');

  });

  this.$delBtn.on('click',function(e){
      e.preventDefault();
      var id = self.getSlideId();
      var pid = app.systemMap.activePlanet.attr('data-id');
      //self.delVideo(id,pid);
      app.screenProjectForm.enterScreen('DEL');
  });

  this.$editBtn.on('click',function(e){
    e.preventDefault();
    var id = self.getSlideId();
    var pid = app.systemMap.activePlanet.attr('data-id');
    app.screenProjectForm.enterScreen('EDIT');
    app.screenProjectForm.getProject(id);

  });

};

VideoSlider.prototype.addVideo = function(planet_id){
	 var self = this;
   var link = $("#projects-video").val();
   $("#projects-video").val(null); // empty input value after click
   var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
   var match = link.match(regExp);
   if (match && match[2].length == 11) {
        console.log(match[2]);
        var _data = {};
        _data.Video = {};
        _data.Video.youtube_url = match[2];
        _data.Video.planet_id = planet_id;

    $.ajax({
          //url: "http://localhost:8080/cake/videos/add.json",
          url: appConfig.apiUrl + appConfig.REST.ADDVIDEO,
          type:"POST",
          data:_data,
          success:function(data){
            console.log(data);
            self.redraw(planet_id);
          },
          error: function(status){
            console.log(status);
          }

        });

  }
  else {
        //error
    console.log('not a valid youtube link');
  }
};

VideoSlider.prototype.delVideo = function(id,planet_id){
    var self = this;
    var url = appConfig.apiUrl + appConfig.REST.DELVIDEO + id + appConfig.REST.SUFFIX;
    $.ajax({
      url: url,
      type:"POST",
      success:function(data){
        console.log(data);
        self.redraw(planet_id);
      },
      error: function(status){
        console.log(status);
      }

    });

};

// VideoSlider.prototype.getVideo = function(id){
//   var self = this;
//   var url = appConfig.apiUrl + appConfig.REST.GETVIDEO + id + appConfig.REST.SUFFIX;
//   $.ajax( {
//           url: url,
//           success: function( data) {
//             console.log(data.message);

//           },
//           error: function(status){

//             console.log('server error');
//           }
//       });
// };

/* Page Class*/
// function Page(dom){
//     this.$container = this.$container = (dom[0] !== undefined ) ? dom : $(document.body);
//     //this.requestData(0);
// };

// function Page.requestData = function(url){
//     //Ajax call with url

//     //test it with offline data

//     this.requestDataDone(0)
// };

/* PlanetPage */
function PlanetInfoPage(dom){
   this.$container = (dom[0] !== undefined ) ? dom : $(document.body);
   this.$form = $("#planetInfoForm");
   this.$btn = $('<div class="btn btn-submit">Sumit Change</div>');
   this.initHandlers();
};

PlanetInfoPage.prototype.initHandlers = function(){
    var self = this;
          // preview  planet image
    $('#planetinfo-photo').on('change',function(e){
          e.preventDefault();
          var url = URL.createObjectURL(e.target.files[0]);
          //console.log(url);
          $('#planet-image').css({backgroundImage:'url(' + url + ')'});
          barRecover($('#submit-planet-info'));
    });

    $('#planet-name').on('change',function(e){
        e.preventDefault();
        barRecover($('#submit-planet-info'));
    });

    $('#planet-description').on('change',function(e){
        e.preventDefault();
        barRecover($('#submit-planet-info'));
    });

     $('#submit-planet-info').on('click',function(e){
        e.preventDefault();
        self.editPlanet(app.systemMap.activePlanet.attr('data-id'));
     })
};

PlanetInfoPage.prototype.editPlanet = function(planet_id){
    var self = this;
    var fe =  $("#planetInfoForm")[0];
    var fd = new FormData(fe);
    for (var pair of fd.entries()) {
      console.log(pair);
    }

    var url = app.config.apiUrl +　app.config.REST.EDITPLANET + planet_id + app.config.REST.SUFFIX;

    barStart($('#submit-planet-info'));

    $.ajax({
      url: url,
      type:"POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success:function(data){
        console.log(data);
        if(data.message.type === 'success'){
          self.updatePlanet(app.systemMap.activePlanet, data);
          barSuccess($('#submit-planet-info'));
        } else{
          var em = 'error: ';
          if(data.message.text.photo)  em += data.message.text.photo[0];

          barError($('#submit-planet-info'), em);
        }

      },
      error: function(status){
        console.log(status);
      }
    }).uploadProgress(function(e){
          if (e.lengthComputable) {
          var percentage = Math.round((e.loaded * 100) / e.total);
          barLoading($('#submit-planet-info'), percentage);
        }

    });
};

PlanetInfoPage.prototype.updatePlanet = function(planetDom,data){
    var url = self.app.config.apiUrl + '/app/webroot/files/planet/photo/'+ data.message.planet.Planet.id + '/' + data.message.planet.Planet.photo;
    planetDom.data('url',url);
    planetDom.css({backgroundImage: 'url(' + url +')'});
    planetDom.data('name',data.message.planet.Planet.name);
    planetDom.data('des',data.message.planet.Planet.description);
    planetDom.find('span').text(data.message.planet.Planet.name);
    //TODO: UPDATA OTHER DOM ELEMENT
};

PlanetInfoPage.prototype.requestData = function(dom){
  this.editMode($(document.body).hasClass('editMode'));  // editmode or not
  if(dom.data('url')) $('#planet-image').css({ backgroundImage: 'url('+ dom.data('url') +')' });
  else $('#planet-image').css({ backgroundImage: 'url(../iu2016/img/avatars/mask.jpg)' });
  $('#planet-name').val(dom.data('name'));
  console.log(dom.data('name'));
  $('#planet-description').val(dom.data('des'));
};

PlanetInfoPage.prototype.editMode = function(b){
  if(b){
      $('#planet-name').attr('disabled',false);
      $('#planet-description').attr('disabled',false);
      $('#submit-planet-info').hide();
  } else {
      $('#planet-name').attr('disabled',true);
      $('#planet-description').attr('disabled',true);

  }

};


/* BioPage */

function BioPage(dom){
  this.$container = (dom[0] !== undefined ) ? dom : $(document.body);
  this.$form = $("<form id='bioForm'>");
  //this.$btn = $('<div class="btn btn-submit">Submit Changes</div>');
  this.$btn = $('<button class="progress-button btn btn-submit" id="submit-bio-info" data-style="rotate-back" data-perspective="" data-horizontal=""><span class="progress-wrap"><span class="b-content">Submit Changes</span><span class="progress"><span class="progress-inner notransition" style="width: 0px; opacity: 1;"></span></span></span></button>');
  this.initHandlers();

};

BioPage.prototype.initHandlers = function(){
        var self = this;
        $('.btn-addWeb').on('click',function(){
            if($('#web_link').val() === "" || $('#web_link').val() === null ){
              console.log('please enter your web address');
              return;
            }
            self.editWeblink();
        });

};

BioPage.prototype.editProfile = function(){
      var self = this;
      var fe = $('#bioForm')[0];
      fd = new FormData(fe);
      // for (var pair of fd.entries()) {
      //    console.log(pair);
      // }
      if($('#avatarPhoto').val() === "") {  // if file input is empty
        fd.delete('data[Profile][photo]');
        fd.delete('data[Profile][avatar_url]');
      }

      barStart($('#submit-bio-info'));

      $.ajax({
          url: app.config.apiUrl +　app.config.REST.EDITPROFILE + app.user.Profile.id + app.config.REST.SUFFIX,
          type:"POST",
          data: fd,
          processData: false,  // tell jQuery not to process the data
          contentType: false,   // tell jQuery not to set contentType
          success:function(data){
            console.log(data);
            if(data.message.type === 'success'){
              barSuccess($('#submit-bio-info'));
            }
            else{
               var em = 'error: ';
              if(data.message.text.photo)  em += data.message.text.photo[0];
              barError($('#submit-bio-info'),em);
            }

          },
          error: function(status){
            console.log(status);
          }

      }).uploadProgress(function(e) {  // use jquery progress plugin
    // tracking uploading
    if (e.lengthComputable) {
     var percentage = Math.round((e.loaded * 100) / e.total);
     barLoading($('#submit-bio-info'),percentage);
    }
  });

};

BioPage.prototype.editWeblink = function(){
       var self = this;
       var link = $("#web_link").val();
       //$("#web_link").val(null); // empty input value after click
        var urlNoProtocol = link.replace(/^https?\:\/\//i, ""); // taking off the http or https

        var _data = {};
        _data.Profile = {};
        _data.Profile.website = urlNoProtocol;

        $.ajax({
        url: app.config.apiUrl +　app.config.REST.EDITPROFILE + app.user.Profile.id + app.config.REST.SUFFIX,
        type:"POST",
        data: _data,
        success:function(data){
          console.log(data);
          self.renderWeb(data.message.profile.Profile);
        },
        error: function(status){
          console.log(status);
        }

    });
};

BioPage.prototype.requestData = function(userID){
    var self = this;
    //console.log(userID);
    //var data = selectOfflineData(testUserData,userID);

   console.log( $('#submit-bio-info'));

    var url = appConfig.apiUrl + appConfig.REST.GETPROFILE + userID + appConfig.REST.SUFFIX;
    console.log(url);
    $.ajax( {
          url: url,
          success: function( data) {
            console.log(data.message);
              self.requestDataDone(data.message.profile.Profile);

              //self.drawSystems();
          },
          error: function(status){

            console.log('server error');
          }
      });
};

BioPage.prototype.requestDataDone = function(data){
        if(!$('.planet-info-container').hasClass('active')) return;// if the container is closed, no need to continue rendering;
        this.renderAvatar(data);
        //this.renderList(this.recreateData(data));
        this.renderList(data);
        this.renderWeb(data);

};

BioPage.prototype.renderAvatar = function(data){
     var el = $('<div class="avatar mask"><div class="btn-avatar"> Modify your avatar image<input type="file" id="avatarPhoto" name="data[Profile][photo]" class="serif" accept="image/png, image/jpeg, image/gif"></div><input type="hidden" name="data[Profile][avatar_url]" value="" id="avatarImageUrl"></div>');
     if(data.photo !== null) {
       var url = self.app.config.apiUrl + '/app/webroot/files/profile/photo/'+ data.id + '/' + encodeRFC5987ValueChars(data.photo);
       el.css({backgroundImage:'url('+ url + ')'});
     }
     this.$form.append(el);
};

BioPage.prototype.renderList = function(objData){
      var self = this;
     var el = $('<ul class="list">');
     for (var prop in objData){
          if(prop !== 'id' && prop !== 'user_id' && prop !== 'website' && prop !== 'avatar_url' && prop !== 'photo'){
              var li = $('<li>');
              var content = (objData[prop] === null || objData[prop] === "null") ? "" : objData[prop];
             // console.log(content);
              var input = $('<input class="gate" id="' + prop +'" name="data[Profile][' + prop +']"' +'type="text" placeholder="please edit" disabled ="true" value="'+ content + '">');
              var label = $('<label for="'+ prop +'">' + prop + ':</label>');
              //if(prop === 'email')
              if($(document.body).hasClass('editMode')) input.prop('disabled',false);
              li.append(input).append(label);
              el.append(li);
          }
      };
     this.$form.append(el);
     this.$form.append(this.$btn);
     this.$container.append(this.$form);
     this.$btn.hide();

    // input change
    this.$form.find('ul input').on('change',function(e){
      e.preventDefault();
      barRecover(self.$btn);
    });

    // submit form
    this.$btn.on('click',function(e){
        e.preventDefault();
        self.editProfile();
    });

    // preview avatar image
       $('#avatarPhoto').on('change',function(e){
          e.preventDefault();
          var url = URL.createObjectURL(e.target.files[0]);
          $('.bio .avatar.mask').css({backgroundImage:'url(' + url + ')'});
          barRecover(self.$btn);
    });

};

BioPage.prototype.renderWeb = function(data){
    if(data.website !== null && data.website !== "") {
      $('.planet-data.web').find('.nodata').remove();
      $("#web_link").val(data.website);
        setTimeout(function(){
             if(Modernizr.touch) $('.planet-data.web iframe').attr({ scrolling: 'no'});
             if($('.planet-info-container').hasClass('active')){  // notice the 1.5s delay, we need to make sure the planet-info-container is still open
                $('.planet-data.web iframe').attr({src: 'http://' + data.website});
                $('.planet-data.web a').attr("href", 'http://' + data.website).text('Visit ' + data.website);
              }
        }, 1500);
      }
    else renderNodata($('.planet-data.web'));
};


BioPage.prototype.empty = function(){
    this.$container.empty();
    this.$form.empty();
    $('.planet-data.web iframe').attr({src: ''});
    $('.planet-data.web').find('.nodata').remove();
    $('.planet-data.web a').text("")
};

/*BioPage.prototype.recreateData = function(data){  // convert obj to array
        var array = $.map(data, function(value, index){
            var obj = {};
            obj.title = index;
            obj.value = value;
            return obj});
        return array;

};*/


/* Skill Page */
function SkillPage(dom){
  this.$container = (dom !== undefined ) ? dom : $(document.body);
  this.$form = $('.addSkillForm');
  this.$formBtn = $('.btn-addSkill');
  this.initHandlers();
};

SkillPage.prototype.initHandlers = function(){
  var self = this;
  this.$formBtn.on('click',function(e){
      self.addSkill(app.systemMap.activePlanet.attr('data-id'));
  })

};

SkillPage.prototype.requestData = function(planetID){
    //var data = selectOfflineData(testSkillsData,planetID,true)
    //this.requestDataDone(data);
    console.log('planetID： ' + planetID);
      var self = this;
      $.ajax( {
          url: app.config.apiUrl +　app.config.REST.GETSKILLS+ planetID + app.config.REST.SUFFIX,
          success: function( data) {

              console.log(data.skills);
              self.requestDataDone(data.skills);

          },
          error: function(status){

            console.log('server error');
          }
      });
};

SkillPage.prototype.requestDataDone = function(data){
     if(!$('.planet-info-container').hasClass('active')) return;
     this.renderList(data);

};

SkillPage.prototype.renderList = function(data){
     var self = this;
     var el = $('<ul class="skill-content">');
     if(data.length < 1) renderNodata(this.$container);
     for(var i = 0; i <data.length; i++){
        var li = $('<li>');
        li.attr('data-id',data[i].Skill.id);
        var name = $('<span>'+ data[i].Skill.name + '</span>');
        var type = $('<span>' + data[i].Skill.type + '</span>');
        var level = $('<span>');
        var rating = $('<span class = "rating">');
        var btn = $('<span class="btn btn-delSkill">&ensp;</span>');
        // add button event
        btn.click(function(e){
                 var dom = $(this).parent();
                 var id = dom.attr('data-id');
                 self.delSkill(id,dom);
           })

        rating.attr({'data-level':data[i].Skill.level});
        //var level = $('<span><span class ="rating" data-level ='+ data[i].level +' ></span></span>');
        rating.rateYo( {rating: data[i].Skill.level,
                    starWidth: "16px",
                    readOnly: true
                    })
       level.append(rating);
        li.append(type).append(name).append(level).append(btn);
        el.append(li);
     }
     this.$container.append(el);

};

SkillPage.prototype.empty = function(){
    var self = this;
    $('.skill-content').remove();
    self.$container.find('.nodata').remove();
};

SkillPage.prototype.addSkill = function(planet_id){
    var self = this;
    var fe = self.$form[0];
    var fd = new FormData(fe);
    fd.append("data[Skill][planet_id]", planet_id);

    $.ajax({
      url: app.config.apiUrl +　app.config.REST.ADDSKILL ,
      type:"POST",
      data: fd,
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType
      success:function(data){
        console.log(data);
        if(data.message.type === 'error') self.showError();
        else{
         app.skillpage.$form.find('input').val('');
         self.addList(data.message.skill);
        }

      },
      error: function(status){
        console.log(status);

      }

    });

};

SkillPage.prototype.delSkill = function(id, dom){
  var self = this;
   $.ajax({
      url: app.config.apiUrl +　app.config.REST.DELSKILL + id + app.config.REST.SUFFIX,
      type:"POST",
      success:function(data){
        console.log(data);
        dom.remove();
        //to-do: remove btn event
      },
      error: function(status){
        console.log(status);
      }

    });

};

SkillPage.prototype.addList = function(data){
        var self = this;
        var el = $('.skill-content');
        var li = $('<li>');
         li.attr('data-id',data.Skill.id);
        var name = $('<span>'+ data.Skill.name + '</span>');
        var type = $('<span>' + data.Skill.type + '</span>');
        var level = $('<span>');
        var rating = $('<span class = "rating">');
        var btn = $('<span class="btn btn-delSkill">&ensp;</span>');
        // add del button event
         btn.click(function(e){
                  var dom = $(this).parent();
                 var id = dom.attr('data-id');
                 self.delSkill(id,dom);

          })

        rating.attr({'data-level':data.Skill.level});
        //var level = $('<span><span class ="rating" data-level ='+ data[i].level +' ></span></span>');
        rating.rateYo( {rating: data.Skill.level,
                    starWidth: "16px",
                    readOnly: true
                    })
       level.append(rating);
        li.append(type).append(name).append(level).append(btn);
        el.append(li);
        var tmp = self.$container.find('.nodata');
        tmp.hide(); // hide nodata dom
};

SkillPage.prototype.showError = function(){
   $('#skillerror').text('input error.').css({'height':'30px'});
       setTimeout(function(){
           $('#skillerror').text('').css({'height':'0px'});
        }, 1500);
};



// SkillPage.prototype.renderRatingStar = function(){
//     $('.rating').rateYo( {rating: $(this).attr('data-level'),
//                     starWidth: "16px",
//                     readOnly: true
//                     })
// }

/* public functions */
function renderNodata(dom){
    var el = $('<div class ="nodata" >No Data </data>');
    dom.append(el);

};

/*  temp function */

function selectOfflineData(data, planetID, userTable){
    var result = [];
    var item = 'planet_id';
    if(!userTable) item = 'id';
  data.forEach(function(i){if(i[item] == planetID){result.push(i)}});
   return result;
};

// Recusively finds the closest parent that has the specified class
function closestParent(child, className) {
  if (!child || child == document) {
    return null;
  }
  if (child.classList.contains(className)) {
    return child;
  } else {
    return closestParent(child.parentNode, className);
  }
};

function showSuccess() {
  // We made it \:D/
  console.log('Success');
  //alert("Success!");
};

//special encoding required within UTF-8 Content-Disposition and Link server response header parameters (e.g., UTF-8 filenames):
function encodeRFC5987ValueChars (str) {
    return encodeURIComponent(str).
        // Note that although RFC3986 reserves "!", RFC5987 does not,
        // so we do not need to escape it
        replace(/['()]/g, escape). // i.e., %27 %28 %29
        replace(/\*/g, '%2A').
            // The following are not required for percent-encoding per RFC5987,
            // so we can allow for a little better readability over the wire: |`^
            replace(/%(?:7C|60|5E)/g, unescape);
};

// progressbar-button
function barStart(dom){
   dom.addClass('state-loading');
   dom.find('.progress-inner').removeClass('notransition');
   dom.attr('disabled',true);
};

function barLoading(dom,val){
   var w = {width:0};
   w.width = val + '%';
   dom.find('.progress-inner').css(w);
};

function barSuccess(dom){
   dom.removeClass('state-loading');
   dom.addClass('message');
   dom.find('.progress-inner').css({width:0});
   dom.find('.progress-inner').addClass('notransition');
   dom.find('.b-content').text('successfully update!');
    // setTimeout(function(){
    //         dom.hide();
    //     }, 1200);

};

function barError(dom,errMessage){
   dom.removeClass('state-loading');
   dom.addClass('message');
   dom.find('.progress-inner').css({width:0});
   dom.find('.progress-inner').addClass('notransition');
   dom.find('.b-content').text(errMessage);
};

function barRecover(dom){
     if(dom.hasClass('state-loading')) return;
    dom.removeClass('message');
    dom.attr('disabled',false);
    dom.find('.b-content').text('Submit Changes');
    dom.show();
};




/* requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * MIT license */

(function() {
    //console.log('wocacoacoaocoaodaocoacoc');
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// Selects text inside an element node.
function selectElementText(el) {
    removeTextSelections();
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
    }
};

// Deselects all text in the page.
function removeTextSelections() {
    if (document.selection) document.selection.empty();
    else if (window.getSelection) window.getSelection().removeAllRanges();
};
