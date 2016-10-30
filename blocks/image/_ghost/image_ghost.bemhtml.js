block('image').mod('ghost', true)(
    tag()('div'),
    attrs()(function() {
        return this.extend(applyNext(), {
            style : 'background-image: url(' + this.ctx.url +');'
        });
    })
)