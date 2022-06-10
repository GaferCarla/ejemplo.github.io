
var cantidad = 0;
(function ($, window, document, undefined) {
    var pluginName = "editable",
        defaults = {
            keyboard: true,
            dblclick: true,
            button: true,
            buttonSelector: ".edit",
            maintainWidth: true,
            dropdowns: {},
            edit: function () { },
            save: function () { },
            cancel: function () { }
        };

    function editable(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    editable.prototype = {
        init: function () {
            this.editing = false;

            if (this.options.dblclick) {
                $(this.element)
                    .css('cursor', 'pointer')
                    .bind('dblclick', this.toggle.bind(this));
            }

            if (this.options.button) {
                $(this.options.buttonSelector, this.element)
                    .bind('click', this.toggle.bind(this));
            }
        },

        toggle: function (e) {
            e.preventDefault();

            this.editing = !this.editing;

            if (this.editing) {
                this.edit();
            } else {
                this.save();
            }
        },

        edit: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var input,
                    field = $(this).data('field'),
                    value = $(this).text(),
                    width = $(this).width();

                values[field] = value;

                $(this).empty();

                if (instance.options.maintainWidth) {
                    $(this).width(width);
                }

                if (field in instance.options.dropdowns) {
                    input = $('<select></select>');

                    for (var i = 0; i < instance.options.dropdowns[field].length; i++) {
                        $('<option></option>')
                            .text(instance.options.dropdowns[field][i])
                            .appendTo(input);
                    };

                    input.val(value)
                        .data('old-value', value)
                        .dblclick(instance._captureEvent);
                } else {
                    input = $('<input type="text" />')
                        .val(value)
                        .data('old-value', value)
                        .dblclick(instance._captureEvent);
                }

                input.appendTo(this);

                if (instance.options.keyboard) {
                    input.keydown(instance._captureKey.bind(instance));
                }
            });

            this.options.edit.bind(this.element)(values);
        },

        save: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var value = $(':input', this).val();

                values[$(this).data('field')] = value;

                $(this).empty()
                    .text(value);
            });

            this.options.save.bind(this.element)(values);
        },

        cancel: function () {
            var instance = this,
                values = {};

            $('td[data-field]', this.element).each(function () {
                var value = $(':input', this).data('old-value');

                values[$(this).data('field')] = value;

                $(this).empty()
                    .text(value);
            });

            this.options.cancel.bind(this.element)(values);
        },

        _captureEvent: function (e) {
            e.stopPropagation();
        },

        _captureKey: function (e) {
            if (e.which === 13) {
                this.editing = false;
                this.save();
            } else if (e.which === 27) {
                this.editing = false;
                this.cancel();
            }
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new editable(this, options));
            }
        });
    };

})(jQuery, window, document);

editTable();

//custome editable starts
function editTable() {

    $(function () {
        var pickers = {};

        $('.addBlock').editable({

            edit: function (values) {
                $(".edit i", this)
                    .removeClass('fa-pencil')
                    .addClass('fa-save')
                    .attr('title', 'Save');

                pickers[this] = new Pikaday({

                    format: 'MMM D, YYYY'
                });
            },
            save: function (values) {
                $(".edit i", this)
                    .removeClass('fa-save')
                    .addClass('fa-pencil')
                    .attr('title', 'Edit');

                if (this in pickers) {
                    pickers[this].destroy();
                    delete pickers[this];
                }
            },
            cancel: function (values) {
                $(".edit i", this)
                    .removeClass('fa-save')
                    .addClass('fa-pencil')
                    .attr('title', 'Edit');

                if (this in pickers) {
                    pickers[this].destroy();
                    delete pickers[this];
                }
            }
        });
    });

}

$(".add-row").click(function () {
    $("#editableTable").find(".addBlock:last").after("<tbody class='addBlock'><tr><td  data-field='name'>Dominio 1</td><th ><a class='button button-small edit' title='Edit'><i class='fa fa-pencil'></i></a><a class='button button-small edit' title='Delete'><i class='fa fa-trash'></i></a></th></tr><tr><td colspan='2'><div class='row'><div class='col-md-12'><br><button class='btn btn-default pull-right add-question'><i class='fa fa-plus'></i>&nbsp;&nbsp; Añadir preguntas</button></div></div><div class='row'><div class='col-11' style='margin:0 auto; padding: 0 auto'><table class='question'><tbody class='addQuestion'><tr><th class='col-12'></th><th ></th></tr></tbody><tbody class='addQuestion'><tr><td class='col-12' data-field='question' > Pregunta</td><td ><a class='button button-small editQuestion' title='DeleteQuestion'><i class='fa fa-trash'></i></a></td></tr></tbody></table></div></div></td></tr></tbody>");
    editTable();
    console.log(cantidad);
    setTimeout(function () {
        $(this).closest('tbody').find(".addBlock tr:first th:last a[title='Edit']").click();
    }, 200);

    setTimeout(function () {
        $(this).closest('tbody').find(".addBlock tr:first th:first input[type='text']").focus();
    }, 300);

    $("#editableTable").find("a[title='Delete']").unbind('click').click(function (e) {
        var x;
        if (confirm("¿Deseas eliminar este dominio? No podrás recuperar las preguntas de este bloque") == true) {
            $(this).closest(".addBlock").remove();
        } else {

        }
    });

});

function myFunction() {

}

$("#editableTable").find("a[title='Delete']").unbind('click').click(function (e) {
    var x;
    if (confirm("¿Deseas eliminar este dominio? No podrás recuperar las preguntas de este bloque") == true) {
        $(this).closest(".addBlock").remove();
    } else {

    }
});


//-----------------------------------------------------------------------------------

function test(campo) {
    $(".question" + campo).find("tbody:last").after("<tbody class='addQuestion'><tr><td class='col-12' data-field='question' > Pregunta</td><td ><a class='button button-small editQuestion' title='DeleteQuestion'><i class='fa fa-trash'></i></a></td></tr></tbody>");
    editTable();

    setTimeout(function () {
        $(this).closest('tbody').find(".addQuestion tr:first th:first input[type='text']").focus();
    }, 300);

    $(".question" + campo).find("a[title='DeleteQuestion']").unbind('click').click(function (e) {
        var x;
        if (confirm("¿Deseas eliminar esta pregunta?") == true) {
            $(this).closest(".addQuestion").remove();
        } else {

        }
    });
}

function agregar() {
    $("#editableTable").find(".addBlock:last").after("<tbody class='addBlock'><tr><td  data-field='name'>Dominio 1</td><th ><a class='button button-small edit' title='Edit'><i class='fa fa-pencil'></i></a><a class='button button-small edit' title='Delete'><i class='fa fa-trash'></i></a></th></tr><tr><td colspan='2'><div class='row'><div class='col-md-12'><br><button class='btn btn-default pull-right add-question' onclick='test(" + cantidad + ")'><i class='fa fa-plus'></i>&nbsp;&nbsp; Añadir preguntas</button></div></div><div class='row'><div class='col-11' style='margin:0 auto; padding: 0 auto'><table class='question" + cantidad + "'><tbody class='addQuestion'><tr><th class='col-12'></th><th ></th></tr></tbody><tbody class='addQuestion'><tr><td class='col-12' data-field='question' > Pregunta</td><td ><a class='button button-small editQuestion' title='DeleteQuestion'><i class='fa fa-trash'></i></a></td></tr></tbody></table></div></div></td></tr></tbody>");
    console.log(cantidad);
    cantidad = cantidad + 1;
    editTable();
    setTimeout(function () {
        $(this).closest('tbody').find(".addBlock tr:first th:last a[title='Edit']").click();
    }, 200);

    setTimeout(function () {
        $(this).closest('tbody').find(".addBlock tr:first th:first input[type='text']").focus();
    }, 300);

    $("#editableTable").find("a[title='Delete']").unbind('click').click(function (e) {
        var x;
        if (confirm("¿Deseas eliminar este dominio? No podrás recuperar las preguntas de este bloque") == true) {
            $(this).closest(".addBlock").remove();
        } else {

        }
    });
}

//-----------------------------------------------------------------------------------

$(".add-question").click(function () {
    $(".question").find("tbody:last").after("<tbody class='addQuestion'><tr><td class='col-12' data-field='question' > Pregunta</td><td ><a class='button button-small editQuestion' title='DeleteQuestion'><i class='fa fa-trash'></i></a></td></tr></tbody>");
    editTable();

    setTimeout(function () {
        $(this).closest('tbody').find(".addQuestion tr:first th:first input[type='text']").focus();
    }, 300);

    $(".question").find("a[title='DeleteQuestion']").unbind('click').click(function (e) {
        var x;
        if (confirm("¿Deseas eliminar esta pregunta?") == true) {
            $(this).closest(".addQuestion").remove();
        } else {

        }
    });

});

function myFunction() {

}

$(".question").find("a[title='DeleteQuestion']").unbind('click').click(function (e) {
    var x;
    if (confirm("¿Deseas eliminar esta pregunta?") == true) {
        $(this).closest(".addQuestion").remove();
    } else {

    }
});

