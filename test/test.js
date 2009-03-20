var Input = null;

function testFocus(input) {
    input.focus();
    this.assertEqual('', input.value);
    this.assert(! input.hasClassName('placeholder'));
}

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

        testFocus.bind(this)(Input);
   },

    testBlur: function(){
        var field = new TextField(Input);
        field.setPlaceholder('Hello');

        Input.blur();
        this.assertEqual('Hello', Input.value);
        this.assert(Input.hasClassName('placeholder'));
    },

    testSubmit: function () {
        var w = $('inner').contentWindow;
        var input = w.Selector.findChildElements(w.document, ['form input'])[1];
        Event.simulateMouse(input, 'click');
        this.wait(200, function () {
            this.assertMatch(/\/1\.html\?q=$/, w.location.href);
        });
    },

    testUnload: function () {
        var w = $('inner').contentWindow;
        var a = w.Selector.findChildElements(w.document, ['a'])[0];

        Event.simulateMouse(a, 'click');

        this.wait(200, function () {
            $('inner').contentWindow.history.back();
            this.wait(200, function () {
                w = $('inner').contentWindow;
                var input = w.Selector.findChildElements(w.document, ['form input'])[0];

                testFocus.bind(this)(input);
            });
        });
    }
});
