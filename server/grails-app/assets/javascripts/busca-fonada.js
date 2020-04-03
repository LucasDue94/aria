$(function () {
    $('input[name=sucesso]').change(function () {
        var alteracao = $('#alteracao-form');
        var inputs = alteracao.find('input, select, textarea');
        if (this.value === 'true' && this.checked) {
            alteracao.fadeIn('fast');
            inputs.prop('disabled', false);
        } else {
            alteracao.fadeOut('fast');
            inputs.prop('disabled', true);
        }
    }).change();

    $("input[name=contatoRadio]").change(function () {
        var contato = $("input[id='questionario.contatoOutros']").parent();
        if (this.value === 'true' && this.checked) {
            contato.fadeOut('fast');
        } else if (this.value === 'false' && this.checked) {
            contato.fadeIn('fast')
        } else {
            contato.fadeOut('fast');
        }
    }).change();

    $("input[name=tomaAntibiotico]").change(function () {
        var contato = $("input[id='questionario.antibiotico']").parent();
        if (this.value === 'true' && this.checked) {
            contato.fadeIn('fast')
        } else if (this.value === 'false' && this.checked) {
            contato.fadeOut('fast');
        } else {
            contato.fadeOut('fast');
        }
    }).change();
});