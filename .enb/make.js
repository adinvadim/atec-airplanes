var env = process.env.NODE_ENV,
    isDev = env === 'development';
    isDev = true;

var techs = {
        // essential
        fileProvider: require('enb/techs/file-provider'),
        fileMerge: require('enb/techs/file-merge'),

        // optimization
        borschik: require('enb-borschik/techs/borschik'),

        // css
        stylus: require('enb-stylus/techs/stylus'),

        postcss: require('enb-postcss/techs/enb-postcss'),

        // js
        browserJs: require('enb-js/techs/browser-js'),

        bemtree: require('enb-bemxjst/techs/bemtree'),

        // bemhtml
        bemhtml: require('enb-bemxjst/techs/bemhtml'),
        bemjsonToHtml: require('enb-bemxjst/techs/bemjson-to-html')
    },
    enbBemTechs = require('enb-bem-techs'),
    levels = [
        { path: 'libs/bem-core/common.blocks', check: false },
        { path: 'libs/bem-core/desktop.blocks', check: false },
        { path: 'libs/bem-components/common.blocks', check: false },
        { path: 'libs/bem-components/desktop.blocks', check: false },
        { path: 'libs/bem-forms/common.blocks', check: false },
        { path: 'libs/bem-history/common.blocks', check: false },
        { path: 'libs/bem-stat-counters/common.blocks', check: false },
        { path : 'node_modules/bem-grid/common.blocks' },
        'blocks'
    ],
    postcssPlugins = [
        require('postcss-partial-import'),
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')(),
        require('postcss-inline-svg')(),
        require('postcss-hexrgba')(),
        require('postcss-initial')(),
        require('lost'),

        require('precss')(),

        require('postcss-simple-vars')({
          variables: {
            columns: '12',
            maxWidth: '1200px',
            gutter: '0px',
            flex: 'flex'
          },
          silent: true
        }),

        require('postcss-for')(),

        require('postcss-calc')({
            precision : 10
        }),
        require('postcss-reporter')()
        // require('postcss-browser-reporter')({
        //     selector: 'body:before'
        // })
    ];

    if (isDev) {
        levels = levels.concat('dev.blocks');
    } else {
        postcssPlugins = postcssPlugins.concat([
            require('cssnano')
        ])
    }

module.exports = function(config) {
    var isProd = process.env.YENV === 'production';

    config.nodes('bundles/*', function(nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [enbBemTechs.levels, { levels: levels }],
            [techs.fileProvider, { target: '?.bemdecl.js' }],
            //[enbBemTechs.bemjsonToBemdecl],
            [enbBemTechs.deps],
            [enbBemTechs.files],

            [techs.postcss, {
                comments : true,
                sourcemap : true,
                //source : '?.css',
                plugins : postcssPlugins,
                target: '?.min.css',
                parser : require('postcss-scss'),
            }],

             //bemtree
             [techs.bemtree, { sourceSuffixes: ['bemtree', 'bemtree.js'], cache: !isDev}],

            // bemhtml
            [techs.bemhtml, { sourceSuffixes: ['bemhtml', 'bemhtml.js'], cache: !isDev }],

             //html
            //[techs.bemjsonToHtml],

            // client bemhtml
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemhtml.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemhtml'
            }],
            [enbBemTechs.deps, {
                target: '?.bemhtml.deps.js',
                bemdeclFile: '?.bemhtml.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemhtml.deps.js',
                filesTarget: '?.bemhtml.files',
                dirsTarget: '?.bemhtml.dirs'
            }],
            [techs.bemhtml, {
                target: '?.browser.bemhtml.js',
                filesTarget: '?.bemhtml.files',
                sourceSuffixes: ['bemhtml', 'bemhtml.js']
            }],

            // client bemtree
            [enbBemTechs.depsByTechToBemdecl, {
                target: '?.bemtree.bemdecl.js',
                sourceTech: 'js',
                destTech: 'bemtree'
            }],
            [enbBemTechs.deps, {
                target: '?.bemtree.deps.js',
                bemdeclFile: '?.bemtree.bemdecl.js'
            }],
            [enbBemTechs.files, {
                depsFile: '?.bemtree.deps.js',
                filesTarget: '?.bemtree.files',
                dirsTarget: '?.bemtree.dirs'
            }],
            [techs.bemtree, {
                target: '?.browser.bemtree.js',
                filesTarget: '?.bemtree.files',
                sourceSuffixes: ['bemtree', 'bemtree.js']
            }],

            // js
            [techs.browserJs, {
                includeYM: true,
                sourceSuffixes: ['vanilla.js', 'js', 'browser.js', 'source.browser.js'],
                compress : !isDev,
                iife : true
            }],
            [techs.fileMerge, {
                target: '?.js',
                sources: ['?.browser.js', '?.bemhtml.js', '?.bemtree.js']
            }]

            // borschik
            //[techs.borschik, { source: '?.js', target: '?.min.js'}],
            //[techs.borschik, { source: '?.css', target: '?.min.css', minify: !isDev }]
        ]);

        nodeConfig.addTargets([ '?.bemtree.js', '?.bemhtml.js', '?.min.css', '?.js']);
    });
};
