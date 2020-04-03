$(function() {
    var radios =  $('.checklist-item input[type=radio]');
    var checkboxes = $('.checklist-item input[type=checkbox]').not('.complemento input[type=checkbox]');

    radios.change(function() {
        var valoresSecs = $(this).closest('.checklist-item').find('.complemento');

        if (valoresSecs.length > 0 ) {
            if (this.value === 'true' && this.checked) {
                valoresSecs.find('input, textArea, select')
                    .prop('disabled', false)
                    .prop('required', true);
                valoresSecs.fadeIn('fast');
            } else if (this.value === 'false' || this.value === 'null' && this.checked) {
                valoresSecs.find('input, textArea, select')
                    .prop('disabled', true)
                    .prop('required', false);

            }
        }
    });

    checkboxes.change(function() {
        var valoresSecs = $(this).closest('.checklist-item').find('.complemento');

        if (this.checked) {
            valoresSecs.fadeIn('fast');
        } else {
            valoresSecs.fadeOut('fast');
        }

        valoresSecs.find('input, textArea').prop('disabled', !this.checked);
    });

    var confimacoes = $('input[name=confirmacoes]');
    confimacoes.change(function () {
        var todasSelecionadas = true;

        confimacoes.each(function () {
            todasSelecionadas = todasSelecionadas && this.checked;
        });

        $('input[name=confimacoesQuestao]').each(function () {
            this.checked = this.value === todasSelecionadas.toString();
        });
    });
    confimacoes.change();

    var materiaisArray = $('.js-materiais input');
    var materiais = $($.grep(materiaisArray, function (item) {
        return item.value === 'true';
    }));
    materiaisArray.change(function () {
        var todosNaoSeAplica = true;
        var naoSeAplica = $($.grep(materiaisArray, function (item) {
            return item.value === 'null';
        }));

        naoSeAplica.each(function () {
           todosNaoSeAplica = todosNaoSeAplica && this.checked;
        });

        var materiaisCheck = $('input[name=materiaisCheck]');
        if (!todosNaoSeAplica) {
            var itensObrigatorios = true;
            materiais.each(function () {
                if (this.name === 'materiaisCanulacao' || this.name === 'materiaisTemperatura') {
                    var name = this.name;
                    var sim = $.grep(materiaisArray, function (item) {
                        return item.name === name && item.value === 'true';
                    });

                    itensObrigatorios = itensObrigatorios && sim[0].checked;
                }
            });

            materiaisCheck.each(function () {
                this.checked = this.value === itensObrigatorios.toString();
            });
        } else {
            materiaisCheck.each(function () {
                this.checked = this.value === 'null';
            });
        }
    });
    materiais.change();

    $.merge(radios, checkboxes).change();

    $('#btn-print').click(function () {
       window.print();
    });

    $('input[name=totalPecas]').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190, 32, 107]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});