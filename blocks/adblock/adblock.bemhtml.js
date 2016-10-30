block('adblock')(


    js()(true),

    content()(function() {
        return {
            elem : 'detect'
        }
    }),

    elem('detect')(

        tag()('img'),

        attrs()({ src : '/img/advert.gif' })

    )

)
