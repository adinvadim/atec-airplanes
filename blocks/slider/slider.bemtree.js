block('slider')(
    match(function() { return this.ctx.data != null; })(
        content()(function() {
            var ctx = this.ctx,
                _data = ctx.data;

            return [
                {
                    elem : 'shopwindow',
                    mix : { block : 'row', elem : 'col', elemMods : {'xsw': 12, 'mw' : 7, 'lw' : 7 }},
                    content : [
                        {
                            elem : 'controls',
                            content : [
                                {
                                    elem: 'pagination'
                                }
                            ]
                        }
                    ]
                },
                {
                    elem : 'shop',
                    mix : { block : 'row', elem : 'col', elemMods : {'xsw': 0, 'mw' : 7, 'lw' : 5 }},
                    content : [
                        {
                            elem : 'slides',
                            content : _data.slides.map(function(slide) {
                                return {
                                    block : 'slider-item',
                                    mix : { block : 'slider', elem : 'slide' },
                                    cls : 'swiper-slide',
                                    mods : { 'view' : 'default' },
                                    data : Object.assign(slide, {
                                        type : 'video',
                                        description : 'Lorem ipsum dolor',
                                        // breadcrums : ['СМИ', 'ХипХоп'],
                                        views : '34 '
                                    })
                                }
                            })
                        }
                    ]
                }
            ]
        })
    )
)
