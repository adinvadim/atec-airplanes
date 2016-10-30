block('link-tag')(
    replace()(function(){
        var ctx = this.ctx,
            _data = ctx.data,
            view = ctx.mods && ctx.mods.view || {};

        return {
            block : 'link',
            mix : [
                this.ctx.mix,
                view && { block : 'link-tag', mods : { 'view' : view } }
            ],
            content : ctx.content
        }
    })
)