modules.define( 'jquery__pickadate', ['jquery'], function(provide, $) {

window.jQuery = jQuery = $;
/* borschik:include:../../libs/pickadate/lib/picker.js */
/* borschik:include:../../libs/pickadate/lib/picker.date.js */

jQuery.extend( jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
    monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
    weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
    weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
    today: 'сегодня',
    clear: 'удалить',
    close: 'закрыть',
    firstDay: 1,
    format: 'd mmmm yyyy г.',
    formatSubmit: 'yyyy/mm/dd'
});

provide($);

})
