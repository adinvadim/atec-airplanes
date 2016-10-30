module.exports = {
    express : {
        port : '8080',
        cacheTTL : 30000
    },
    gls : {
        port : '8081'
    },
    bem : {
        bundles :  ['site-index', 'video-index', 'video-view', 'category-index', 'category-view']
    },
    staticFolder : './static',
    settings : {
        baseUrl : 'http://atec/'
    },
    log : {
        server : {
            transport : 'Console',
            view : {
                level : 'verbose',
                prettyPrint : true,
                colorize : true,
                timestamp : true,
                label : 'server'
            }
        },
        browser : {
            transport : 'Console',
            view : {
                level : 'verbose',
                prettyPrint : true,
                colorize : true,
                timestamp : true,
                label : 'browser'
            }
        }
    }
};
