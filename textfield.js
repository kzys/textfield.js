var TextField = Class.create({
    initialize: function (element) {
        this._element = $(element);
        this._placeholder = '';
        this._changed = this._element.value != '';

        ['focus', 'blur', 'change'].each(function (s) {
            this._element.observe(s, this['_' + s].bindAsEventListener(this));
        }.bind(this));

        Event.observe(window, 'unload', this._unload.bindAsEventListener(this));

        var form = TextField.formOf(element);
        if (! form) {
            return;
        }
        $(form).observe('submit', function () {
            if (! this._changed) {
                this._element.value = '';
            }
        }.bindAsEventListener(this));
    },

    _focus: function () {
        if (! this._changed) {
            this._element.value = '';
        }
        this._showPlaceholder(false);
    },

    _blur: function () {
        if (this._element.value == '') {
            this._changed = false;
        }

        this._showPlaceholder(true);
    },

    _change: function () {
        this._changed = true;
    },

    _unload: function () {
        if (! this._changed) {
            this._element.value = '';
        }
    },

    setPlaceholder: function (str) {
        this._placeholder = str;
        this._showPlaceholder(true);
    },

    _showPlaceholder: function (flag) {
        if (flag && ! this._changed) {
            this._element.value = this._placeholder;
            this._element.addClassName('placeholder');
        } else {
            this._element.removeClassName('placeholder');
        }
    }
});

TextField.formOf = function (input) {
    var node = input;
    while ((node = node.parentNode) != null) {
        if (node.tagName == 'FORM') {
            return node;
        }
    }
    return null;
};
