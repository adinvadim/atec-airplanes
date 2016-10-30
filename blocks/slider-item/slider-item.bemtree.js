block('slider-item')(
    content()(function() {
        var ctx = this.ctx,
            _data = ctx.data,
            type = this.mods.type;

        // console.log(typeof _data.videos != 'string');
        // if (typeof _data.videos != 'string') {
        //     _data.children = _data.videos;
        // };

        return [
            {
                block : 'link',
                url : '/' + _data.type + '/' + _data.guid,
                mix : { block: 'slider-item', elem : 'preview' },
                content : [
                    {
                        block : 'image',
                        mix : { block : 'slider-item', elem : 'image' },
                        mods : { 'ghost' : true },
                        url : _data.image || '/themes/new/_static/slider-item/placeholder.jpg'
                    },
                    _data.type && {
                        block : 'slider-item',
                        elem : 'type',
                        content : ( _data.type=='video' ) ? 'Видео' : (_data.type == 'person') ? 'Персона' : 'Категория'
                    },
                    (_data.type == 'video') && {
                        block : 'slider-item',
                        elem : 'overlay',
                        content : {
                            block : 'icon',
                            mods : { 'type' : 'play' },
                            mix : { block : 'slider-item', elem : 'icon-play' }
                        }
                    },
                    (_data.type == 'video') && {
                        block : 'slider-item',
                        elem : 'preview-info',
                        mix : { block : 'slider-item', elem : 'watched' },
                        content : 'ПРОСМОТРЕНО'
                    },
                    (_data.type == 'video') && {
                        block : 'slider-item',
                        elem : 'preview-info',
                        mix : { block : 'slider-item', elem : 'time' },
                        content : '05:33'
                    }
                ]
            },
            {
                elem : 'content',
                content : [
                    {
                        elem : 'header',
                        content : [
                            _data.title && {
                                elem : 'title',
                                content : {
                                    block : 'link',
                                    url : '/' + _data.type + '/' + _data.guid,
                                    content : _data.title || testData.title
                                }
                            }
                        ]
                    },
                    {
                        elem : 'description',
                        content : _data.description || testData.description
                    },
                    {
                        elem : 'footer',
                        content : [
                            _data.breadcrums && {
                                block : 'breadcrums',
                                data : _data.breadcrums
                            },
                            _data.eventDT && {
                                elem : 'eventDT',
                                content : _data.eventDT
                            },
                            _data.videosAvailable && {
                                elem : 'videos',
                                content : _data.videosAvailable
                            },
                            _data.subcategories && {
                                elem : 'subcategories',
                                content : _data.subcategories
                            },
                            _data.views && {
                                block : 'views',
                                mix : { block : 'slider-item', elem : 'views' },
                                content : _data.views
                            },
                            _data.viewsS && {
                                elem : 'viewsS',
                                content : _data.viewsS
                            }
                        ]
                        .filter(function(item) { return item })
                        .map(function(item) {
                            if (!Array.isArray(item.mix)) item.mix = [ item.mix ];
                            item.mix.push({ block : 'slider-item', elem : 'info-item' });
                            return item;
                        })
                    }
                ]
            }
        ]
    })
)
