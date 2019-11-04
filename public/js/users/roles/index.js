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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/users/roles/index.js":
/*!*******************************************!*\
  !*** ./resources/js/users/roles/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#rolesApp',
  data: {
    form: new Form({
      displayName: '',
      slug: '',
      description: '',
      permissions: []
    }),
    roleRow: null
  },
  methods: {
    add: function add() {
      var _this = this;

      this.form.validate({
        fields: {
          displayName: {
            label: trans('formLabels.displayName'),
            rules: {
              required: true,
              lengthRange: [3, 30]
            }
          },
          slug: {
            label: trans('formLabels.slug'),
            rules: {
              required: true,
              lengthRange: [3, 35],
              alnum: '-'
            }
          },
          description: {
            label: trans('formLabels.description'),
            rules: {
              lengthRange: [3, 191]
            }
          },
          permissions: {
            label: trans('formLabels.displayName'),
            rules: {
              required: true
            }
          }
        }
      });
      this.form.post('roles.store').then(function (data) {
        Event.emit('scAddDisplayRow', data);

        _this.cancelForm();
      })["catch"](function (error) {});
    },
    edit: function edit(row) {
      this.roleRow = row;
      this.form.displayName = this.roleRow.item.display_name;
      this.form.slug = this.roleRow.item.name;
      this.form.description = this.roleRow.item.description;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.roleRow.item.permissions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;
          this.form.permissions.push(p.id);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.$refs.roleFormModal.show();
    },
    update: function update() {
      var _this2 = this;

      this.form.validate({
        fields: {
          displayName: {
            label: trans('formLabels.displayName'),
            rules: {
              required: true,
              lengthRange: [3, 30]
            }
          },
          description: {
            label: trans('formLabels.description'),
            rules: {
              lengthRange: [3, 191]
            }
          }
        }
      });
      this.form.put(['roles.update', {
        role: this.roleRow.item.id
      }]).then(function (data) {
        Event.emit('scUpdateDisplayRow', {
          index: _this2.roleRow.index,
          data: data
        });

        _this2.cancelForm();
      })["catch"](function (error) {
        if (error.message) {
          _this2.cancelForm();
        }
      });
    },
    cancelForm: function cancelForm() {
      this.form.reset();
      this.$refs.roleFormModal.hide();
    }
  },
  computed: {
    roleFormTitle: function roleFormTitle() {
      return this.roleRow ? trans('role.editFormTitle', {
        role: this.roleRow.item.display_name
      }) : trans('role.addFormTitle');
    }
  }
});

/***/ }),

/***/ 6:
/*!*************************************************!*\
  !*** multi ./resources/js/users/roles/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Andy\Google_Drive\wamp\www\storecreator\resources\js\users\roles\index.js */"./resources/js/users/roles/index.js");


/***/ })

/******/ });