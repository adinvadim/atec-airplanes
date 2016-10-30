block('notification')(

    content()(function(){

        return  [
            {
                elem: 'content',
                content : this.ctx.content
            },
            {
                elem : 'cancel',
                attrs : { title : 'не показывать больше это сообщение'},
                content : {
                    block : 'icon',
                    mix : { block : 'notification', elem : 'icon' },
                    mods : { 'type' : 'close' },
                    svg : true
                }
            }
        ]
    }),

    js()(true)

);
