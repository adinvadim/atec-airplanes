modules.define(
    'slider',
    ['i-bem__dom', 'swiper', 'jquery'],
    function(provide, BEMDOM, Swiper, $) {

// .slider__slide_active - slide, whis is being sent to shopwindow,
// .slider__slide_next - slide which is located on top of shopwindow, it goes after slider__slide_next,
// .slider__slide_afterntxt - slide which goes after slider__slide_next

provide(BEMDOM.decl(this.name,
{
    onSetMod : {
        'js' : {
            'inited' : function() {
                var self = this;

                this._swiper = new Swiper('.slider__shop', $.extend({
                    direction : 'vertical',
                    loop : true,
                    initialSlide : 1,
                    slideClass : 'slider__slide',
                    slideActiveClass : 'slider__slide_next',
                    slideNextClass : 'slider__slide_afternext',
                    slidePrevClass : 'slider__slide_active',
                    bulletClass : 'slider__bullet',
                    bulletActiveClass : 'slider__bullet_active',
                    pagination: '.slider__pagination',
                    slidesPerView: 4,
                    speed : 300,
                    autoplay : 10000,
                    autoplayDisableOnInteraction : false,
                    paginationClickable: true
                }, this.params));

                this._postInit();

                this._swiper.on('slideChangeStart', this._update.bind(this));

            }
        }
    },

    _postInit : function() {
        this._swiper.slidePrev();
        this._exibitSlide();
    },

    _update : function() {
        var shopwindow = $(".slider__shopwindow");

        $('.slider-item_view_full').remove();
        this._exibitSlide();
    },

    _exibitSlide : function() {
        BEMDOM.prepend(
            this.elem('shopwindow'),
            $(".slider__slide_active").clone().addClass('slider-item_view_full').removeClass('slider-item_view_default')
        );
    }


}));

});