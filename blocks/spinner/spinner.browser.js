/**
 * @module spinner
 */
modules.define(
    'spinner',
    ['i-bem__dom', 'jquery', 'BEMHTML'],
    function(provide, BEMDOM,  $, BEMHTML) {

provide(BEMDOM.decl(this.name,
{

    onSetMod : {
        js : {
            inited : function() {
            }
        }
    },

    destruct : function() {
        BEMDOM.destruct(this.domElem);
        return this;
    }

},
{
    create : function(type) {
        return BEMHTML.apply({
            block : 'spinner',
            mods : { type : type }
        })
    }
}));

});
