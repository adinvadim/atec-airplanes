block('root').replace()(function() {
    var ctx = this.ctx,
    // пробрасываем data вглубь по дереву
        data = this.data = ctx.data;
    // console.log('data in root : ');
    // console.log(data);


    // если задан context — требуется отрендерить не целую страницу, а лишь эту конкретную часть
    if(ctx.context) return ctx.context;


    // иначе рендерим весь page целиком
    return {
        block : 'page',
        mods : { view : this.data.view }
    };
});
