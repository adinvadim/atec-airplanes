/**
 * @module store__config
 */
modules.define('store__config',
        ['redux-logger', 'objects'],
        function(provide, createLogger, objects, storeHelpers) {


    var middlewares = storeHelpers._middlewares.concat([

            createLogger({ collapsed : true })

    ])
    provide(objects.extend({}, storeHelpers, {

        _middlewares : middlewares

    }))
});
