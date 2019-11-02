(function () {

    var laroute = (function () {

        var routes = {

            absolute: false,
            rootUrl: 'http://127.0.0.1:8000',
            routes : [{"host":null,"methods":["GET","HEAD"],"uri":"api\/user","name":null,"action":"Closure"},{"host":null,"methods":["GET","HEAD"],"uri":"auth\/login","name":"auth.login","action":"SC\Http\Controllers\Auth\AuthController@getLogin"},{"host":null,"methods":["POST"],"uri":"auth\/login","name":null,"action":"SC\Http\Controllers\Auth\AuthController@postLogin"},{"host":null,"methods":["POST"],"uri":"auth\/password\/forget","name":"auth.password.forget","action":"SC\Http\Controllers\Auth\ForgetPasswordController@sendResetLinkEmail"},{"host":null,"methods":["GET","HEAD"],"uri":"auth\/password\/reset\/{token}","name":"auth.password.reset","action":"SC\Http\Controllers\Auth\ResetPasswordController@showResetForm"},{"host":null,"methods":["POST"],"uri":"auth\/password\/reset\/{token}","name":null,"action":"SC\Http\Controllers\Auth\ResetPasswordController@reset"},{"host":null,"methods":["GET","HEAD"],"uri":"\/","name":"home","action":"SC\Http\Controllers\HomeController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"users","name":"users.index","action":"SC\Http\Controllers\Users\UserController@index"},{"host":null,"methods":["POST"],"uri":"users","name":"users.store","action":"SC\Http\Controllers\Users\UserController@store"},{"host":null,"methods":["PUT","PATCH"],"uri":"users\/{user}","name":"users.update","action":"SC\Http\Controllers\Users\UserController@update"},{"host":null,"methods":["DELETE"],"uri":"users\/{user}","name":"users.destroy","action":"SC\Http\Controllers\Users\UserController@destroy"},{"host":null,"methods":["PUT"],"uri":"users\/change_password","name":"users.changePassword","action":"SC\Http\Controllers\Users\UserController@changePassword"},{"host":null,"methods":["GET","HEAD"],"uri":"profile\/{user?}","name":"users.show","action":"SC\Http\Controllers\Users\UserController@show"},{"host":null,"methods":["PUT"],"uri":"profile\/update","name":"profile.update","action":"SC\Http\Controllers\Users\UserController@updateProfile"},{"host":null,"methods":["GET","HEAD"],"uri":"users\/permissions","name":"permissions.index","action":"SC\Http\Controllers\Users\PermissionsController@index"},{"host":null,"methods":["POST"],"uri":"users\/permissions","name":"permissions.store","action":"SC\Http\Controllers\Users\PermissionsController@store"},{"host":null,"methods":["PUT","PATCH"],"uri":"users\/permissions\/{permission}","name":"permissions.update","action":"SC\Http\Controllers\Users\PermissionsController@update"},{"host":null,"methods":["GET","HEAD"],"uri":"users\/roles","name":"roles.index","action":"SC\Http\Controllers\Users\RolesController@index"},{"host":null,"methods":["POST"],"uri":"users\/roles","name":"roles.store","action":"SC\Http\Controllers\Users\RolesController@store"},{"host":null,"methods":["PUT","PATCH"],"uri":"users\/roles\/{role}","name":"roles.update","action":"SC\Http\Controllers\Users\RolesController@update"},{"host":null,"methods":["GET","HEAD"],"uri":"system\/stores","name":"stores.index","action":"SC\Http\Controllers\System\StoresController@index"},{"host":null,"methods":["POST"],"uri":"system\/stores","name":"stores.store","action":"SC\Http\Controllers\System\StoresController@store"},{"host":null,"methods":["PUT","PATCH"],"uri":"system\/stores\/{store}","name":"stores.update","action":"SC\Http\Controllers\System\StoresController@update"},{"host":null,"methods":["DELETE"],"uri":"system\/stores\/{store}","name":"stores.destroy","action":"SC\Http\Controllers\System\StoresController@destroy"},{"host":null,"methods":["PUT"],"uri":"system\/stores\/activate\/{store}","name":"stores.activate","action":"SC\Http\Controllers\System\StoresController@activate"},{"host":null,"methods":["GET","HEAD"],"uri":"auth\/logout","name":"auth.logout","action":"SC\Http\Controllers\Auth\AuthController@getLogout"},{"host":null,"methods":["POST"],"uri":"ajax\/saved_states\/save\/{id?}","name":"ajax.saveState.save","action":"SC\Http\Controllers\System\AjaxController@saveCurrentState"},{"host":null,"methods":["POST"],"uri":"ajax\/saved_states\/current\/{savedState?}","name":"ajax.saveState.setCurrent","action":"SC\Http\Controllers\System\AjaxController@setCurrentState"},{"host":null,"methods":["GET","HEAD"],"uri":"test\/form","name":"test.form","action":"SC\Http\Controllers\Test\FormTestsController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"test\/form\/all_categories","name":"test.getCategories","action":"SC\Http\Controllers\Test\FormTestsController@getCategories"},{"host":null,"methods":["GET","HEAD"],"uri":"test\/form\/all_products","name":"test.getProducts","action":"SC\Http\Controllers\Test\FormTestsController@getProduct"},{"host":null,"methods":["GET","HEAD"],"uri":"test\/form\/get_total","name":"test.getTotal","action":"SC\Http\Controllers\Test\FormTestsController@getTotal"},{"host":null,"methods":["POST"],"uri":"test\/form","name":"test.form.store","action":"SC\Http\Controllers\Test\FormTestsController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"ajax\/system\/stores\/first","name":"ajax.stores.getFirst","action":"SC\Http\Controllers\System\StoresController@getFirst"},{"host":null,"methods":["GET","HEAD"],"uri":"js\/global.js","name":"assets.global","action":"Closure"}],
            prefix: '',

            route : function (name, parameters, route) {
                route = route || this.getByName(name);

                if ( ! route ) {
                    return undefined;
                }

                return this.toRoute(route, parameters);
            },

            url: function (url, parameters) {
                parameters = parameters || [];

                var uri = url + '/' + parameters.join('/');

                return this.getCorrectUrl(uri);
            },

            toRoute : function (route, parameters) {
                var uri = this.replaceNamedParameters(route.uri, parameters);
                var qs  = this.getRouteQueryString(parameters);

                if (this.absolute && this.isOtherHost(route)){
                    return "//" + route.host + "/" + uri + qs;
                }

                return this.getCorrectUrl(uri + qs);
            },

            isOtherHost: function (route){
                return route.host && route.host != window.location.hostname;
            },

            replaceNamedParameters : function (uri, parameters) {
                uri = uri.replace(/\{(.*?)\??\}/g, function(match, key) {
                    if (parameters.hasOwnProperty(key)) {
                        var value = parameters[key];
                        delete parameters[key];
                        return value;
                    } else {
                        return match;
                    }
                });

                // Strip out any optional parameters that were not given
                uri = uri.replace(/\/\{.*?\?\}/g, '');

                return uri;
            },

            getRouteQueryString : function (parameters) {
                var qs = [];
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        qs.push(key + '=' + parameters[key]);
                    }
                }

                if (qs.length < 1) {
                    return '';
                }

                return '?' + qs.join('&');
            },

            getByName : function (name) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                        return this.routes[key];
                    }
                }
            },

            getByAction : function(action) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].action === action) {
                        return this.routes[key];
                    }
                }
            },

            getCorrectUrl: function (uri) {
                var url = this.prefix + '/' + uri.replace(/^\/?/, '');

                if ( ! this.absolute) {
                    return url;
                }

                return this.rootUrl.replace('/\/?$/', '') + url;
            }
        };

        var getLinkAttributes = function(attributes) {
            if ( ! attributes) {
                return '';
            }

            var attrs = [];
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    attrs.push(key + '="' + attributes[key] + '"');
                }
            }

            return attrs.join(' ');
        };

        var getHtmlLink = function (url, title, attributes) {
            title      = title || url;
            attributes = getLinkAttributes(attributes);

            return '<a href="' + url + '" ' + attributes + '>' + title + '</a>';
        };

        return {
            // Generate a url for a given controller action.
            // laroute.action('HomeController@getIndex', [params = {}])
            action : function (name, parameters) {
                parameters = parameters || {};

                return routes.route(name, parameters, routes.getByAction(name));
            },

            // Generate a url for a given named route.
            // laroute.route('routeName', [params = {}])
            route : function (route, parameters) {
                parameters = parameters || {};

                return routes.route(route, parameters);
            },

            // Generate a fully qualified URL to the given path.
            // laroute.route('url', [params = {}])
            url : function (route, parameters) {
                parameters = parameters || {};

                return routes.url(route, parameters);
            },

            // Generate a html link to the given url.
            // laroute.link_to('foo/bar', [title = url], [attributes = {}])
            link_to : function (url, title, attributes) {
                url = this.url(url);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given route.
            // laroute.link_to_route('route.name', [title=url], [parameters = {}], [attributes = {}])
            link_to_route : function (route, title, parameters, attributes) {
                var url = this.route(route, parameters);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given controller action.
            // laroute.link_to_action('HomeController@getIndex', [title=url], [parameters = {}], [attributes = {}])
            link_to_action : function(action, title, parameters, attributes) {
                var url = this.action(action, parameters);

                return getHtmlLink(url, title, attributes);
            }

        };

    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return laroute;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = laroute;
    }
    else {
        window.laroute = laroute;
    }

}).call(this);

