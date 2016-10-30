block('input').mod('has-clear', true)(

    elem('buttons').content()(function() {
        return [applyNext(), { elem : 'clear' }];
    }),

    elem('box').content()(function() {
        return [this.ctx.content];
    })
)
