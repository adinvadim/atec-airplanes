modules.define(
    'ellipsis-wrapper',
    ['i-bem__dom', 'jquery','ellipsis'],
    function(provide, BEMDOM,  Ellipsis) {


provide(BEMDOM.decl(this.name,
{

    onSetMod : {
        js : {
            inited : function() {
                $(".ellipsis-wrapper").dotdotdot({
                    ellipsis : ' ...',
                    watch : 'window'
                });
            }
        }
    }

}));

});
