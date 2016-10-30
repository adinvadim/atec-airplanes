/**
 * @module menu-item
 */

modules.define('menu-item',  function(provide, MenuItem) {

/**
 * @exports
 * @class menu-item
 * @bem
 *
 */
MenuItem.decl({ block : this.name, modName : 'type', modVal : 'link'}, {

    getUrl : function() {
        return this._url || (this._url = this.findBlockInside('link').getUrl());
    }
});

provide(MenuItem);

})
