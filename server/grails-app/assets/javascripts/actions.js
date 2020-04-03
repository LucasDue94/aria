$(function () {
    $('.js-delete').click(function () {
        var $this = $(this);
        if ( confirm($this.data('message')) ) {
            $this.closest('form').submit();
        }
    });
});