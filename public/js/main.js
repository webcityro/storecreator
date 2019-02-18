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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 281);
/******/ })
/************************************************************************/
/******/ ({

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(282);


/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_sideNavigation_vue__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_sideNavigation_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_sideNavigation_vue__);
__webpack_require__(283);


var expendSideNavbar = true;

window.appHeader = new Vue({
   el: '#appHeader',

   data: {
      expendSideNavbar: expendSideNavbar
   },

   watch: {
      expendSideNavbar: function expendSideNavbar() {
         if (!Auth) {
            return;
         }
         window.appNavbar.expendSideNavbar = this.expendSideNavbar;
      }
   }
});

if (Auth) {
   window.appNavbar = new Vue({
      el: '#column-left',

      data: {
         expendSideNavbar: expendSideNavbar
      },

      components: {
         'sc-side-navigation': __WEBPACK_IMPORTED_MODULE_0__components_sideNavigation_vue___default.a
      },

      mounted: function mounted() {}
   });
}

/***/ }),

/***/ 283:
/***/ (function(module, exports) {

window.appFlash = new Vue({
   el: '#appFlash',

   data: {
      type: '',
      message: '',
      timeout: 10000,
      show: false
   },

   methods: {},

   watch: {
      show: function show() {
         var _this = this;

         if (this.show) {
            setTimeout(function () {
               return _this.show = false;
            }, this.timeout);
         }
      }
   },

   created: function created() {
      var _this2 = this;

      window.Event.on('scFlashMessage', function (event) {
         _this2.type = event.type;
         _this2.message = event.message;
         _this2.timeout = event.timeout || _this2.timeout;
         _this2.show = true;
      });
   }
});

window.flashMessage = function (type, msg, time) {
   window.Event.emit('scFlashMessage', { message: msg, type: type, timeout: time });
};

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(285)
/* template */
var __vue_template__ = __webpack_require__(289)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/sideNavigation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b169456", Component.options)
  } else {
    hotAPI.reload("data-v-7b169456", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sideNavItem_vue__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sideNavItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__sideNavItem_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        scSideNavItem: __WEBPACK_IMPORTED_MODULE_0__sideNavItem_vue___default.a
    },

    data: function data() {
        return {};
    },
    mounted: function mounted() {},


    computed: {
        extend: function extend() {
            return this.$parent.expendSideNavbar;
        }
    }
});

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(4)
/* script */
var __vue_script__ = __webpack_require__(287)
/* template */
var __vue_template__ = __webpack_require__(288)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/sideNavItem.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a25d5f8", Component.options)
  } else {
    hotAPI.reload("data-v-2a25d5f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
   props: {
      label: { requred: true, type: String },
      icon: { type: String },
      url: { default: false },
      extended: { default: false, type: Boolean }
   },

   data: function data() {
      return {
         show: false
      };
   },


   methods: {},

   mounted: function mounted() {}
});

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", [
    _c(
      "a",
      {
        staticClass: "parent",
        attrs: { href: _vm.url },
        on: {
          click: function($event) {
            _vm.show = !_vm.show
          }
        }
      },
      [
        _vm.icon ? _c("i", { class: _vm.icon }) : _vm._e(),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.label))])
      ]
    ),
    _vm._v(" "),
    _c(
      "ul",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.extended || _vm.show,
            expression: "!extended || show"
          }
        ]
      },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2a25d5f8", module.exports)
  }
}

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { attrs: { id: "menu" } },
    [
      _vm.Auth.can("read-users|read-acl")
        ? _c(
            "scSideNavItem",
            {
              attrs: {
                label: _vm.trans("generic.users"),
                extended: _vm.extend,
                icon: "fa fa-user fa-fw"
              }
            },
            [
              _vm.Auth.can("read-users")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("user.accountsTitle"),
                      url: _vm.laroute.route("users.index")
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-acl")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("permission.title"),
                      url: _vm.laroute.route("permissions.index")
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-acl")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("role.title"),
                      url: _vm.laroute.route("roles.index")
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.Auth.can("read-categories")
        ? _c("scSideNavItem", {
            attrs: {
              label: _vm.trans("generic.categories"),
              extended: _vm.extend,
              icon: "fa fa-folder-open fa-fw"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.Auth.can("read-attributes|read-attribute-groups|read-templates")
        ? _c(
            "scSideNavItem",
            {
              attrs: {
                label: _vm.trans("generic.attributes"),
                extended: _vm.extend,
                icon: "fa fa-tags fa-fw"
              }
            },
            [
              _vm.Auth.can("read-attribues")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.attributes"), url: "" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-attribue-groups")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("generic.attributeGroups"),
                      url: ""
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-templates")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.templates"), url: "" }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.Auth.can("read-products|read-products-from-feeds|read-added-price")
        ? _c(
            "scSideNavItem",
            {
              attrs: {
                label: _vm.trans("generic.products"),
                extended: _vm.extend,
                icon: "fa fa-box fa-fw"
              }
            },
            [
              _vm.Auth.can("read-products")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.products"), url: "" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-products-from-feeds")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("generic.productsFromFeeds"),
                      url: ""
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-added-price")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.addedPrice"), url: "" }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.Auth.can("read-stores")
        ? _c(
            "scSideNavItem",
            {
              attrs: {
                label: _vm.trans("generic.system"),
                extended: _vm.extend,
                icon: "fa fa-cog fa-fw"
              }
            },
            [
              _vm.Auth.can(
                "read-stores|read-units-of-measurement|read-mapping|read-errors"
              )
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.stores"), url: "" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-units-of-measurement")
                ? _c("scSideNavItem", {
                    attrs: {
                      label: _vm.trans("generic.unitsOfMeasurement"),
                      url: ""
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-mapping")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.mapping"), url: "" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.Auth.can("read-errors")
                ? _c("scSideNavItem", {
                    attrs: { label: _vm.trans("generic.errors"), url: "" }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b169456", module.exports)
  }
}

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ });