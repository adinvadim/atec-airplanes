modules.define(
    'adblock',
    ['i-bem__dom', 'jquery'],
    function(provide, BEMDOM, $) {
provide(BEMDOM.decl(this.name,
{

    detect : function() {
        var _detected = false;

        $(this.elem('detect')).attr("class").split(' ').forEach(function(item) {
            if (item !== 'adblock__detect') { _detected = true; }
        });

        return _detected = _detected || this.elem('detect').css('display') === 'none';
    }

}));

});