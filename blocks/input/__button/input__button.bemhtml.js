block('input').elem('button')(
    tag()('button'),
    attrs()(function() {
        var ctx = this.ctx,
            attrs = {
                role : 'button',
                tabindex : ctx.tabIndex,
                title : ctx.title
            };

        return attrs;

    })
)
