block('page')(

    content()(function() {
        var data = this.data;
        // console.log(data);
        return [
            {
                block : 'header',
                data: data.menu
            },
            {
                block : 'page-content',
                mods : { view : this.mods.view },
            },
            {
                block : 'footer'
            },
            {
                block : 'adblock'
            },
            // {
            //     block : 'yandex-metrica',
            //     params : {
            //             id : data.settings.yandexkey,
            //             webvisor : true,
            //             clickmap : true,
            //             trackLinks : true,
            //             accurateTrackBounce : true
            //         }
            // },
            // {
            //     block : 'google-analytics',
            //     params : {
            //         id : data.settings.googlekey
            //     }
            // }
        ];
    }),

    /** Options and ctx of page block */
    def()(function() {
        var data = this.data;
        /**
         * Og meta tags
         *
         * @access private
         * @param {Object} data
         * @returns {Array} Array of elems with meta tag og
         */
        // function _ogMetaTags(data) {
        //     var result = [];
        //     for(var key in data) {
        //         if(!data.hasOwnProperty(key)) continue;
        //         result.push({
        //             elem : 'meta',
        //             attrs : {
        //                 property : 'og:' + key,
        //                 content : data[key]
        //             }
        //         });
        //     }
        //     return result;
        // }

        var ctx = {
            block : 'page',
            title : data.title,
            js : true,
            mods : { view : data.view },
            head : [
                data.meta && [
                    { elem : 'meta', attrs : { name : 'description', content : data.meta.description } },
                    { elem : 'meta', attrs : { name : 'keywords', content : data.meta.keywords } },
                    { elem : 'meta', attrs : { name : 'author', content : data.meta.author } },
                ],
                // http://www.favicon-generator.org/
                { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
                { elem : 'meta', attrs : { 'http-equiv' : 'content-language', lang : data.language } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/android-icon-36x36.png', sizes : '36x36' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/android-icon-48x48.png', sizes : '48x48' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-72x72.png', sizes : '72x72' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/android-icon-96x96.png', sizes : '96x96' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-144x144.png', sizes : '144x144' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-192x192.png', sizes : '192x192' } },

                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-57x57.png', sizes : '57x57' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-60x60.png', sizes : '60x60' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-72x72.png', sizes : '72x72' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-76x76.png', sizes : '76x76' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-114x114.png', sizes : '114x114' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-120x120.png', sizes : '120x120' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/android-icon-144x144.png', sizes : '144x144' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-152x152.png', sizes : '152x152' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/apple-icon-180x180.png', sizes : '180x180' } },

                // http://realfavicongenerator.net/
                { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/favicon-16x16.png', sizes : '16x16' } },
                { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/favicon-32x32.png', sizes : '32x32' } },
                // { elem : 'link', attrs : { rel : 'icon', type : 'image/png', href : 'themes/new/_static/favicon/favicon-96x96.png', sizes : '96x96' } },
                { elem : 'link', attrs : { rel : 'shortcut icon', href : 'themes/new/_static/favicon/favicon.ico' } },
                // _ogMetaTags(data.og)
            ],
            styles : [
                { elem : 'css', url : `/themes/new/${data.view}/${data.view}.min.css` }
            ],
            scripts : [
                { elem : 'js', url : `/themes/new/${data.view}/${data.view}.js` },
                { elem : 'js', content : 'window.__DEBUG__ = ' + data.isDev },
                { elem : 'js', content : 'window.__DATA__ = ' + JSON.stringify(data) }
            ]
        }
        return applyNext({ ctx : ctx })
    })
);
