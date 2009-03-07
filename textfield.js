var TextField = Class.create({
    initialize: function (element) {
        this._element = $(element);
        this._placeholder = '';
        this._changed = this._element.value != '';

        this._element.observe('focus', this._onfocus.bindAsEventListener(this));
        this._element.observe('blur',  this._onblur.bindAsEventListener(this));
        this._element.observe('change', function () {
            this._changed = true;
        }.bindAsEventListener(this));
    },

    _onfocus: function () {
        if (! this._changed) {
            this._element.value = '';
        }
        this._showPlaceholder(false);
    },

    _onblur: function () {
        if (this._element.value == '') {
            this._changed = false;
        }

        this._showPlaceholder(true);
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

