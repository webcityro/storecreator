/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/users/profile.js":
/*!***************************************!*\
  !*** ./resources/js/users/profile.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#profileApp',
  data: {
    profileForm: new Form({
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      email: user.email
    }),
    userInfo: {
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      email: user.email
    },
    passwordForm: new Form({
      currentPassword: '',
      newPassword: ''
    })
  },
  mounted: function mounted() {
    this.profileForm.clear = false;
  },
  methods: {
    saveProfile: function saveProfile() {
      var _this = this;

      this.profileForm.validate({
        groups: [{
          fields: [{
            field: 'firstName',
            label: trans('formLabels.firstName')
          }, {
            field: 'lastName',
            label: trans('formLabels.lastName')
          }],
          rules: {
            required: true,
            lengthRange: [2, 191],
            maxLength: 191,
            alpha: true
          }
        }, {
          fields: [{
            field: 'sex',
            label: trans('formLabels.sex')
          }],
          rules: {
            required: true
          }
        }],
        fields: {
          email: {
            label: trans('formLabels.email'),
            rules: {
              required: true,
              email: true
            }
          }
        }
      });
      this.profileForm.put('profile.update').then(function (updatedUser) {
        user = updatedUser;
        _this.userInfo.firstName = user.firstName;
        _this.userInfo.lastName = user.lastName;
        _this.userInfo.sex = user.sex;
        _this.userInfo.email = user.email;

        _this.$refs.editProfileModal.hide();

        _this.profileForm.errors.runed = false;
      })["catch"](function (error) {
        console.log('error', error);
      });
    },
    savePassword: function savePassword() {
      var _this2 = this;

      this.passwordForm.validate({
        groups: [{
          fields: [{
            field: 'currentPassword',
            label: trans('formLabels.currentPassword')
          }, {
            field: 'newPassword',
            label: trans('formLabels.newPassword')
          }],
          rules: {
            required: true,
            minLength: 6
          }
        }]
      });
      this.passwordForm.put('users.changePassword').then(function (updatedUser) {
        _this2.$refs.changePasswordModal.hide();

        _this2.passwordForm.errors.runed = false;
      })["catch"](function (error) {
        console.log('error', error);
      });
    },
    cancelProfile: function cancelProfile() {
      this.profileForm = new Form({
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        email: user.email
      });
      this.$refs.editProfileModal.hide();
    },
    cancelPassword: function cancelPassword() {
      this.passwordForm.reset();
      this.$refs.changePasswordModal.hide();
    }
  }
});

/***/ }),

/***/ 4:
/*!*********************************************!*\
  !*** multi ./resources/js/users/profile.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Andy\Google_Drive\wamp\www\storecreator\resources\js\users\profile.js */"./resources/js/users/profile.js");


/***/ })

/******/ });