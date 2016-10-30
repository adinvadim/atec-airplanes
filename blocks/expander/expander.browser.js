modules.define(
    'expander',
    ['i-bem__dom', 'jquery', 'events'],
    function(provide, BEMDOM, $, events) {
        provide(BEMDOM.decl(this.name,
            {
                onSetMod : {
                    'js' : {
                        'inited' : function() {

                        }
                    }
                },

                _change : function(e) {
                    button = this.findElem('button', true);
                    content = this.findElem('content', true);
                    this.toggleMod('expanded');
                    this.toggleMod(content, 'expanded');
                    this.toggleMod(button, 'clicked');

                    if (this.hasMod('expanded')) {
                        this._updateButton(this.params.opened);
                    } else {
                        this._updateButton(this.params.closed);
                    }
                },

                _updateButton(content) {
                    BEMDOM.update(
                        this.findElem('button'),
                        content
                    )
                }
            },

            {

                live : function() {
                    var ptp = this.prototype;
                    this.liveBindTo('button', 'click', ptp._change);
                }
            }

        ))
    }
)