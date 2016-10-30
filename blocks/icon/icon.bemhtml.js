block('icon')(
    match(function(){ return this.ctx.svg })(
            def()(function() {
                this.mods = this.mods || {};
                Object.assign(this.mods, { 'svgInside' : true});
                return applyNext();
            }),

            content()(function() {
            return {
                block : 'svg',
                svgID : 'icon_type_' + this.ctx.mods.type
            }
        })
    )
)
