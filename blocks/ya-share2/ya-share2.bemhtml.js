block('ya-share2')(

    js()(true),

    attrs()(function() {
         var ctx = this.ctx,
             attrs = {
                 'data-services' : (ctx.services || []).join(','),
                 'data-counter' : ctx.counter,
                 'data-copy' : ctx.copy,
                 'data-description' : ctx.description,
                 'data-image' : ctx.image,
                 'data-lang' : ctx.lang || 'ru',
                 'data-limit' : ctx.limit,
                 'data-size' : ctx.size,
                 'data-title' : ctx.title,
                 'data-url' : ctx.url
             };
         return attrs;
     })

);
