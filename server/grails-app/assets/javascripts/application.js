// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better
// to create separate JavaScript files as needed.
//
//= require jquery-2.2.0.min
//= require bootstrap.min
//= require jquery.mask.min
//= require_self

if (typeof jQuery !== 'undefined') {
    (function($) {
        $(document).ajaxStart(function() {
            $('#spinner').fadeIn();
        }).ajaxStop(function() {
            $('#spinner').fadeOut();
        }).ready(function () {
            var tempo = $('input[type=time]');
            if (tempo.prop('type') === 'text') {
                tempo.mask('00:00', { placeholder: '__:__' });
            }

            var data = $('input[type=date]');
            if (data.prop('type') === 'text') {
                data.each(function(i, campoData) {
                    var dataValue = campoData.value;
                    if (dataValue != null && typeof dataValue !== 'undefined' && dataValue.length > 0) {
                        dataValue = dataValue.substr(8, 2) + '/' +
                            dataValue.substr(5, 2) + '/' +
                            dataValue.substr(0, 4);

                        campoData.value = dataValue;
                    }
                });

                data.mask('00/00/0000', { placeholder: '__/__/____' });
            } else {
                data.each(function () {
                    var $this = $(this);
                    var dataValue = $this.attr('value');
                    if (dataValue.length > 10) {
                        this.value = dataValue.substr(0, 10);
                    }

                    if (dataValue != null && typeof dataValue !== 'undefined' && dataValue.length > 0) {
                        dataValue = dataValue.substr(6, 4) + '-' +
                            dataValue.substr(3, 2) + '-' +
                            dataValue.substr(0, 2);

                        $this.val(dataValue);
                    }
                });
            }

            $('.app-menu-icon').click(function () {
                var $this = $(this);
                var menu = $this.closest('.app-menu-container').find('.app-menu');
                if (menu.css('transform') === 'matrix(0, 0, 0, 0, 0, 0)') {
                    menu.css('transform', 'scale(1)');
                } else {
                    menu.css('transform', 'scale(0)');
                }

                $('<div>').css('position', 'absolute')
                    .css('width', '100%')
                    .css('height', '100%')
                    .css('top', '0')
                    .css('left', '0')
                    .click(function () {
                        menu.css('transform', 'scale(0)');
                        $(this).remove();
                    })
                    .appendTo('body');
            });
        });
    })(jQuery);
}