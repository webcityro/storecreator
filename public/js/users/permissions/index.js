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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/users/permissions/index.js":
/*!*************************************************!*\
  !*** ./resources/js/users/permissions/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

new Vue({
  el: '#permissionsApp',
  data: {
    form: new Form({
      type: 'basic',
      displayName: '',
      slug: '',
      description: '',
      resource: '',
      resourceCRUD: ['create', 'read', 'update', 'delete']
    }),
    typeOptions: [{
      text: trans('permission.basic'),
      value: 'basic'
    }, {
      text: trans('permission.crud'),
      value: 'crud'
    }],
    resourceCRUDoptions: [{
      text: trans('generic.create'),
      value: 'create'
    }, {
      text: trans('generic.read'),
      value: 'read'
    }, {
      text: trans('generic.update'),
      value: 'update'
    }, {
      text: trans('generic.delete'),
      value: 'delete'
    }],
    resourceCRUDtableFields: [{
      key: 'displayName',
      label: trans('formLabels.displayName')
    }, {
      key: 'slug',
      label: trans('formLabels.slug')
    }, {
      key: 'description',
      label: trans('formLabels.description')
    }],
    permissionRow: null
  },
  methods: {
    add: function add() {
      var _this = this;

      this.form.validate({
        fields: this.form.type == 'basic' ? {
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
          }
        } : {
          resource: {
            label: trans('generic.resource'),
            rules: {
              required: true,
              lengthRange: [3, 30],
              alpha: true
            }
          },
          resourceCRUD: {
            label: trans('formLabels.actions'),
            rules: {
              required: true
            }
          }
        }
      });
      this.form.post('permissions.store').then(function (data) {
        console.log('added', data);
        Event.emit('scAddDisplayRow', data.added);

        _this.$refs.permissionFormModal.hide();
      })["catch"](function (_ref) {
        var _ref$added = _ref.added,
            added = _ref$added === void 0 ? false : _ref$added,
            _ref$failed = _ref.failed,
            failed = _ref$failed === void 0 ? false : _ref$failed,
            _ref$alreadyExists = _ref.alreadyExists,
            alreadyExists = _ref$alreadyExists === void 0 ? false : _ref$alreadyExists;
        console.log('error', added);

        if (added) {
          Event.emit('scAddDisplayRow', added);
        } else if (failed || alreadyExists) {
          var keys = Object.keys(failed || alreadyExists);

          for (var i in _this.resourceCRUDoptions) {
            if (keys.indexOf(_this.resourceCRUDoptions[i].value) === -1) {
              delete _this.resourceCRUDoptions[i];
            }
          }
        } else _this.$refs.permissionFormModal.hide();
      });
    },
    edit: function edit(row) {
      this.permissionRow = row;
      this.form.displayName = this.permissionRow.item.display_name;
      this.form.slug = this.permissionRow.item.name;
      this.form.description = this.permissionRow.item.description;
      this.$refs.permissionFormModal.show();
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
      this.form.put(['permissions.update', {
        permission: this.permissionRow.item.id
      }]).then(function (data) {
        Event.emit('scUpdateDisplayRow', {
          index: _this2.permissionRow.index,
          data: data
        });

        _this2.cancelForm();
      })["catch"](function (error) {
        console.log('error', error);

        if (error.message) {
          _this2.cancelForm();
        }
      });
    },
    cancelForm: function cancelForm() {
      this.form.reset();
      this.$refs.permissionFormModal.hide();
    }
  },
  computed: {
    permissionFormTitle: function permissionFormTitle() {
      return this.permissionRow ? trans('permission.editFormTitle', {
        permission: this.permissionRow.item.display_name
      }) : trans('permission.addFormTitle');
    },
    resourceCRUDtableItems: function resourceCRUDtableItems() {
      if (this.form.resource.length < 3) {
        return [];
      }

      var rows = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.resourceCRUDoptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var crud = _step.value;

          if (this.form.resourceCRUD.indexOf(crud.value) > -1) {
            rows.push({
              displayName: crud.text + ' ' + this.ucFirst(this.form.resource),
              slug: crud.text.toLowerCase() + '-' + this.form.resource.toLowerCase().replace(/\s+/g, '-'),
              description: trans('permission.crudTableDesc', {
                action: crud.text.toUpperCase(),
                resource: this.ucFirst(this.form.resource)
              })
            });
          }
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

      return rows;
    }
  }
});

/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** multi ./resources/js/users/permissions/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Andy\Google_Drive\wamp\www\storecreator\resources\js\users\permissions\index.js */"./resources/js/users/permissions/index.js");


/***/ })

/******/ });