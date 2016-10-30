/**
 * @module page
 */
modules.define(
    'page',
    ['i-bem__dom', 'i-bem', 'jquery', 'store', 'page-navigation', 'notification', 'ua', 'spinner'],
    function(provide, BEMDOM, BEM, $, store, Navigation, Notification, ua, Spinner ) {

/**
 * @exports
 * @class page
 * @bem
 */
provide(BEMDOM.decl(this.name,
{

    onSetMod : {
        js : {
            inited : function() {
                this.navigation = BEM.create('page-navigation');
                store.dispatch(this.navigation.setViewAction(this.getMod('view')));

                store.subscribe(this.onStoreChange.bind(this));

                var _adblock = this.findBlockInside('adblock');
                var self = this;

                this._addNotification('warning', 'Сайт в разработке, просим понять и простить.');

                setTimeout( function() {
                    if (_adblock && _adblock.detect()) {
                        self._addNotification('warning', 'Если вы выключите блокировщик рекламы, то сможете увидеть больше интересных видео и картинок.');
                    }
                },2000);

                if ( ua.msie && ua.version < 11) {
                    this._addNotification('error', 'IE меньше 11 версии мы не поддерживаем, поэтому сайт возможно будет работать некорректно.');
                };

            }
        }
    },

    /**
     * Render content of page
     *
     * @access public
     * @param {Object} data Data for rendering
     */
    render : function(data) {
        var html = BEMDOM.render({
            block : 'root',
            data : data,
            context : {
                block : 'page-content',
                mods : { view : this.getMod('view') }
            }
        }, true);

        BEMDOM.update(this.findBlockInside('page-content').domElem, html);
    },

    onStoreChange : function() {
        var state = store.getState();
        if (!state.view.isFetching && (state.view.name !== this.getMod('view'))) {
            this.setMod('view', state.view.name);
            this.render(state.view.data);
        }
    },

    /**
     * Create and add notification to the top of page
     *
     * @access private
     * @param {String} type
     * @param {Strint|Object} content
     * @returns {Page} this
     */
    _addNotification : function(type, content) {
        BEMDOM.prepend(
            this.domElem,
            Notification.create(type, content)
        );
        return this;
    },

    _addSpinner : function(type) {
        BEMDOM.prepend(
            this.domElem,
            Spinner.create(type)
        )
    }


}));

});
