({
    mustDeps : [
        {
            block : 'swiper',
        }
    ],
    shouldDeps : [
        {
            block : 'slider',
            elems : [
                'slides',
                'slide',
                'footer',
                'controls'
            ]
        },
        'jquery',
        {
            block : 'slider-item',
            mods : {
                'view' : ['default', 'full']
            }
        }
    ]
})
