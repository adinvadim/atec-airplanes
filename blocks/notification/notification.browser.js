modules.define(
    'notification',
    ['i-bem__dom', 'jquery', 'BEMHTML', 'cookie'],
    function(provide, BEMDOM, $, BEMHTML, cookie) {

/**
 * Generate the hash code of string
 *
 * @access public
 * @param {String} str
 * @returns {Number}
 */
var generateHashCode = function (str) {
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
}

var Notification = BEMDOM.decl(this.name,
{
    onSetMod : {
        'js' : {
            'inited' : function() {
                this.content = this.elem('content').text();
                this.type = this.getMod('type');
                if (cookie.get('vps_notification_' + generateHashCode(this.type + this.content)) === Notification._DESTRUCTED) {
                    this._destructNotification();
                }
                this.bindTo('cancel','click',this._onCancelClick);
            }
        }
    },

    /**
     * Destrcut notification and set to the cookied DESTRUCTED const
     *
     * @returns {Notification} this
     */
    _destructNotification : function() {
        cookie.set('vps_notification_' + generateHashCode(this.type + this.content), Notification._DESTRUCTED, {
            path : '/',
            expires : 30
        });
        BEMDOM.destruct(this.domElem);
        return this;
    },

    /**
     * On cancel click handler
     *
     * @access private
     * @param {Event} e
     */
    _onCancelClick : function(e) {
        var element = $(e.target);
        var self = this;
        var events = [
            'animationend',
            'webkitAnimationEnd',
            'oanimationend',
            'MSAnimationEnd'
        ].join(' ')
        this.setMod('closed');
        this.domElem.on(events, function (e) {
            self._destructNotification();
        })
    },

},
{
    /**
     * Destructed const code
     * @constant
     * @type String
     */
    _DESTRUCTED : '1',

    /**
     * Create notification
     *
     * @access public
     * @param {String} type Type of notification (warning, error, success)
     * @param {String|Object} content Content of notification
     * @returns {Notifiction}
     */
    create : function(type, content) {
        if (cookie.get('vps_notification_' + generateHashCode(type + content)) === this._DESTRUCTED) {
            return null;
        }
        return  BEMHTML.apply({
            block : 'notification',
            mods : { type : type },
            content:  content
        })
    }

});

provide(Notification);

});
