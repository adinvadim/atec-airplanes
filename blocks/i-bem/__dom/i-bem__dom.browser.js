modules.define(
    'i-bem__dom',
    ['BEMTREE', 'BEMHTML', 'jquery', 'vow'],
    function(provide, BEMTREE, BEMHTML, $, Vow, BEMDOM) {

function renderHtml(bemjson){
    return BEMDOM.append($(document.createElement('div')), BEMHTML.apply(bemjson));
}

function processBemjson(data){
    return BEMTREE.apply(data);
}

provide(BEMDOM.decl(this.name, {}, {
    renderHtml : renderHtml,

    processBemjson : processBemjson,

    render : function(bemjson, useBemtree) {
        var newBemjson;

        if (useBemtree) {
            try {
                newBemjson = processBemjson(bemjson);
            } catch (err) {
                console.error('BEMTREE error', err.stack);
                return
            }
        }
        try {
            html = BEMHTML.apply(newBemjson);
        } catch (err) {
            console.error('BEMHTML error', err.stack);
            return;
        }
        return html;
    }
}))
});
