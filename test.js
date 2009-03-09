var Input = null;

new Test.Unit.Runner({
    setup: function () {
        Input = new Element('input', { type: 'text' });
        $('sandbox').appendChild(Input);
    },

    teardown: function () {
        Input.remove();
    },

    testNew: function(){
        var field = new TextField(Input);
        this.assert(field);
    },

    testFocus: function(){
        var field = new TextField(Input);
        field.setPlaceholder('Hello');

        Input.focus();
        this.assertEqual('', Input.value);
        this.assert(! Input.hasClassName('placeholder'));
    },

    testBlur: function(){
        var field = new TextField(Input);
        field.setPlaceholder('Hello');

        Input.blur();
        this.assertEqual('Hello', Input.value);
        this.assert(Input.hasClassName('placeholder'));
    }
});
