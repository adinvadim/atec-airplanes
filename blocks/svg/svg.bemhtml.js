block('svg')(

    replace()(function() {
        var url = '/themes/new/_static/svg.svg' || this.ctx.svgSprite;
        return {
            tag : 'svg',
            mods : this.ctx.mods || {},
            attrs : {
                'xmlns' : 'http://www.w3.org/2000/svg'
            },
            content : {
                tag : 'use',
                attrs : {
                    'xlink:href' : url + '#' + this.ctx.svgID,
                    'xmlns:xlink' : 'http://www.w3.org/1999/xlink'
                }
            }
        }
    })
)
