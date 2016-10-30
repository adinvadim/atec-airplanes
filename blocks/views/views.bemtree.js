block('views')(
    content()(function(){
        var ctx = this.ctx;

        return [
            { 
                block : 'icon',
                mix : { block : 'views', elem : 'icon' },
                mods : { 'type' : 'eye' },
                // svg : true
            },
            ctx.content
        ]
    })
)