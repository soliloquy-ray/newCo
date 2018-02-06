webpackJsonp([0],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EvtProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_evrythng__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_evrythng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_evrythng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the EvtProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EvtProvider = (function () {
    function EvtProvider(http) {
        this.http = http;
        __WEBPACK_IMPORTED_MODULE_3_evrythng__["setup"]({
            geolocation: true,
            filter: {
                method: ["ir", "2d", "qr"]
            }
        });
        this.evtApp = new __WEBPACK_IMPORTED_MODULE_3_evrythng__["App"]("HIxc1MxvO18AJQz6Cnibu9Xiv4A1h6WTH0kNtzvP4fPGoIKWGhA5Qvudi8X21b4xgMo4CtDszxrVD13f");
        console.log(this.evtApp);
    }
    EvtProvider.prototype.createUser = function (usr) {
        return this.evtApp.appUser().create({
            email: usr.email,
            password: usr.password,
            firstName: usr.firstName,
            lastName: usr.lastName
        }).then(function (appUser) {
            return appUser.validate();
        }).catch(function (err) {
            return err;
        });
    };
    EvtProvider.prototype.getUserCustomFields = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getUserContext().then(function (usr) {
                usr.$init.then(function (user) {
                    console.log(user);
                    if (typeof user.customFields !== "undefined") {
                        resolve(user.customFields);
                    }
                    else {
                        resolve(false);
                    }
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    /* return evt user context as a promise */
    EvtProvider.prototype.getUserContext = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            resolve(new __WEBPACK_IMPORTED_MODULE_3_evrythng__["User"]({
                id: localStorage.evrythngUser,
                apiKey: localStorage.evrythngApiKey
            }, _this.evtApp));
        }));
    };
    EvtProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], EvtProvider);
    return EvtProvider;
}());

//# sourceMappingURL=evt.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 187;

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 229;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, evt) {
        this.navCtrl = navCtrl;
        this.evt = evt;
    }
    HomePage.prototype.ngOnInit = function () {
        this.evt.evtApp.login({ email: "test@gmail.com", password: "pass1234" }).then(function (response) {
            console.log(response.user);
        });
    };
    HomePage.prototype.createUser = function () {
        this.evt.createUser({ "email": "test@gmail.com", "password": "pass1234", "firstName": "Bob", "lastName": "Lapprovittola" })
            .then(function (usr) {
            localStorage.evrythngApiKey = usr.evrythngApiKey;
            localStorage.evrythngUser = usr.evrythngUser;
        }, function (err) {
            console.info(err);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/raysantos/ry/newCo/newCo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<image-tracker></image-tracker>\n</ion-content>\n'/*ion-inline-end:"/Users/raysantos/ry/newCo/newCo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__["a" /* EvtProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(361);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_evt_evt__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_components_module__ = __webpack_require__(590);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_9__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_evt_evt__["a" /* EvtProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/raysantos/ry/newCo/newCo/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/raysantos/ry/newCo/newCo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 529:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_tracker_image_tracker_module__ = __webpack_require__(591);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__image_tracker_image_tracker_module__["a" /* ImageTrackerComponentModule */],
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageTrackerComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_tracker__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ImageTrackerComponentModule = (function () {
    function ImageTrackerComponentModule() {
    }
    ImageTrackerComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["d" /* IonicModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__image_tracker__["a" /* ImageTrackerComponent */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__image_tracker__["a" /* ImageTrackerComponent */]
            ]
        })
    ], ImageTrackerComponentModule);
    return ImageTrackerComponentModule;
}());

//# sourceMappingURL=image-tracker.module.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageTrackerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_blueimp_load_image__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_blueimp_load_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_blueimp_load_image__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//var sha1 = require('sha1');

/**
 * Generated class for the ImageTrackerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ImageTrackerComponent = (function () {
    function ImageTrackerComponent(loader, evt, app) {
        this.loader = loader;
        this.evt = evt;
        this.app = app;
        this.tstamp = Date.now();
        //cloudName:string = 'demoengmntprty';
        this.cygHistory = [];
        this.cloudName = 'cloudstrife';
        this.uploadPreset = 'iqx9xm8u';
        this.photoProg = [];
        this.canAddTodaysPhoto = false;
        this.uploaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.isLoggedIn = false;
        console.log('Hello ImageTrackerComponent Component');
        this.text = 'Hello World';
        /*let d = new Date();
        this.tstamp = d.setDate(d.getDate() - 1);*/
    }
    ImageTrackerComponent.prototype.ngOnInit = function () {
        return;
    };
    ImageTrackerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /*setTimeout(()=>{
            this.slider.slideTo(this.photoProg.length+1);
        },300);*/
        var self = this;
        this.evt.getUserCustomFields().then(function (cF) {
            self.photoProg = cF.photoHistory || [];
            if (self.photoProg.length < 1) {
                _this.fetchCYGfromStorage();
            }
            else {
                localStorage.cygHistory = JSON.stringify(self.photoProg);
            }
            self.uploaded.emit(false);
            setTimeout(function () {
                self.slider.slideTo(self.photoProg.length - 1);
            }, 500);
            //console.log(cF,this.today);
            self.canUploadPhoto();
        });
    };
    /* transfer to EVT service */
    ImageTrackerComponent.prototype.patchEVTUserCF = function () {
        var self = this;
        this.evt.getUserCustomFields().then(function (cF) {
            var nCF = cF || {};
            nCF.photoHistory = self.photoProg;
            console.log(nCF);
            return nCF;
        })
            .catch(console.info)
            .then(function (cF) {
            var upData = {
                customFields: cF
            };
            console.log(upData);
            self.evt.getUserContext().then(function (usr) {
                console.log(usr);
                usr.update(upData).then(console.log).catch(console.info);
            })
                .catch(console.info);
        })
            .catch(console.info);
    };
    ImageTrackerComponent.prototype.canUploadPhoto = function () {
        var self = this;
        self.canIHasToday().then(function (i) {
            console.log(i);
            if (i) {
                self.canAddTodaysPhoto = true;
                if (localStorage.debugMode === '1') {
                    self.canAddTodaysPhoto = true;
                    self.tstamp = self.getNextAvailablePushDate();
                }
                //console.log('shouldve used ',self.getNextAvailablePushDate());
            }
            else {
                self.canAddTodaysPhoto = true;
            }
        });
    };
    ImageTrackerComponent.prototype.canIHasToday = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (typeof localStorage.cygHistory == "undefined" || localStorage.cygHistory === "{}") {
                resolve(false);
            }
            else {
                var localCpy = JSON.parse(localStorage.cygHistory);
                resolve(localCpy.find(function (val) {
                    var v1 = self.toLocaleDateString(val.timestamp);
                    var v2 = self.toLocaleDateString(self.tstamp);
                    //console.log(v1,v2,v1==v2);
                    return v1 == v2;
                }));
            }
        });
    };
    ImageTrackerComponent.prototype.sliderChanged = function (event) {
        if (event === void 0) { event = null; }
        if (this.slider.isBeginning()) {
            this.slider.lockSwipeToPrev(true);
            this.slider.lockSwipeToNext(false);
        }
        else if (this.slider.isEnd()) {
            this.slider.lockSwipeToNext(true);
            this.slider.lockSwipeToPrev(false);
        }
        else {
            this.slider.lockSwipeToPrev(false);
            this.slider.lockSwipeToNext(false);
        }
    };
    ImageTrackerComponent.prototype.unlockSlides = function () {
        this.slider.lockSwipeToNext(false);
        this.slider.lockSwipeToPrev(false);
    };
    ImageTrackerComponent.prototype.takePhotoAction = function ($event) {
        return;
    };
    /* initiate picture */
    ImageTrackerComponent.prototype.takePic = function ($event) {
        var self = this;
        if ($event.target.files && $event.target.files[0]) {
            self.uploadFile($event.target.files[0]);
        }
    };
    // *********** Upload file to Cloudinary ******************** //
    ImageTrackerComponent.prototype.uploadFile = function (file) {
        var load = this.loader.create({
            spinner: 'crescent',
            dismissOnPageChange: true,
            showBackdrop: true,
            content: "Please wait...",
            enableBackdropDismiss: true
        });
        load.present();
        var self = this;
        var url = "https://api.cloudinary.com/v1_1/" + self.cloudName + "/image/upload";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        __WEBPACK_IMPORTED_MODULE_3_blueimp_load_image__["parseMetaData"](file, function (data) {
            var oren = 0;
            if (data.exif) {
                oren = data.exif.get('Orientation');
            }
            __WEBPACK_IMPORTED_MODULE_3_blueimp_load_image__(file, function (img) {
                var base64data = img.toDataURL("image/jpeg");
                //let img_src = base64data.replace(/^data\:image\/\w+\;base64\,/, '');
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // File uploaded successfully
                        var response = JSON.parse(xhr.responseText);
                        console.log(response);
                        self.photoProg.push({ photoUrl: response.secure_url, timestamp: self.tstamp });
                        self.patchEVTUserCF();
                        self.unlockSlides();
                        setTimeout(function () {
                            self.slider.slideTo(self.photoProg.length - 1);
                            localStorage.cygHistory = JSON.stringify(self.photoProg);
                            self.uploaded.emit(true);
                            self.canAddTodaysPhoto = true;
                        }, 500);
                        load.dismiss();
                    }
                };
                var pid = file.name;
                fd.append('file', base64data);
                fd.append('public_id', pid);
                fd.append('timestamp', self.tstamp.toString());
                fd.append('tags', 'browser_upload');
                fd.append('upload_preset', self.uploadPreset);
                /* no longer need signed uploads */
                //let secret = "uJkQIneMpHgAJkqho1NLFroqGUg"
                //let secret = "BBImHLi3cw-Y_NynlbMU3HYyhH0";
                //fd.append('api_key', '572517737342669'); // 299675785887213 Optional - add tag for image admin in Cloudinary
                //let signed = sha1('public_id='+pid+'&timestamp='+self.tstamp+secret);
                //fd.append('signature', signed); // Optional - add tag for image admin in Cloudinary
                xhr.send(fd);
            }, {
                canvas: true,
                orientation: oren,
                maxWidth: 400,
                maxHeight: 400
            });
        });
    };
    ImageTrackerComponent.prototype.toLocaleDateString = function (dt) {
        return new Date(parseInt(dt)).toLocaleDateString();
    };
    ImageTrackerComponent.prototype.getNextAvailablePushDate = function () {
        var dy = eval(localStorage.cygHistory).sort(this.compare);
        var tmpD = new Date().setDate(new Date(dy[dy.length - 1]['timestamp']).getDate() + 1);
        tmpD = new Date(tmpD).setMonth(new Date(dy[dy.length - 1]['timestamp']).getMonth());
        return tmpD;
    };
    ImageTrackerComponent.prototype.compare = function (a, b) {
        if (a.timestamp < b.timestamp)
            return -1;
        if (a.timestamp > b.timestamp)
            return 1;
        return 0;
    };
    ImageTrackerComponent.prototype.fetchCYGfromStorage = function () {
        if (localStorage.cygHistory && localStorage.cygHistory !== "{}" && JSON.parse(localStorage.cygHistory)) {
            this.photoProg = JSON.parse(localStorage.cygHistory);
        }
    };
    ImageTrackerComponent.prototype.getPhotoCount = function () {
        return this.photoProg.length;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('Slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Slides */])
    ], ImageTrackerComponent.prototype, "slider", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], ImageTrackerComponent.prototype, "uploaded", void 0);
    ImageTrackerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'image-tracker',template:/*ion-inline-start:"/Users/raysantos/ry/newCo/newCo/src/components/image-tracker/image-tracker.html"*/'<!-- Generated template for the ImageTrackerComponent component -->\n<div>\n  <p class="title">Image Tracker</p>\n  <ion-slides slidesPerView="auto" spaceBetween="13" zoom="false" (ionSlideDidChange)="sliderChanged($event)" #Slides>\n	<ion-slide *ngFor = "let pho of photoProg; let i=index;let x;">\n		<p class="dayctr">Day {{i+1}}</p>\n		<div class="photo-main"><!-- [ngStyle]="{\'background-image\':\'url(\'+pho+\')\'}" -->\n			<img class="i{{i}}" [src]="pho?.photoUrl"/>\n		</div>\n	</ion-slide>\n	<ion-slide class="more-pic" *ngIf="canAddTodaysPhoto">\n		<p class="dayctr">Day {{photoProg?.length+1}}</p>\n		<div class="photo-main" >\n   	 		<input type="file" accept="image/*" (tap)="takePhotoAction($event)" (change)="takePic($event)" capture="camera" /> <!--  [disabled]="!canAddTodaysPhoto || !isLoggedIn" -->\n   	 	</div>\n	</ion-slide>\n	<ion-slide class="buffer">\n		<p class="dayctr">Day {{photoProg?.length+1}}</p>\n		<div class="photo-main"></div>\n	</ion-slide>\n  </ion-slides>\n</div>\n'/*ion-inline-end:"/Users/raysantos/ry/newCo/newCo/src/components/image-tracker/image-tracker.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_evt_evt__["a" /* EvtProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */]])
    ], ImageTrackerComponent);
    return ImageTrackerComponent;
}());

//# sourceMappingURL=image-tracker.js.map

/***/ })

},[337]);
//# sourceMappingURL=main.js.map