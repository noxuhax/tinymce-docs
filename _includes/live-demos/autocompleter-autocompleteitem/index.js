var specialChars = [
  { text: 'exclamation mark', value: '!' },
  { text: 'at', value: '@' },
  { text: 'hash', value: '#' },
  { text: 'dollars', value: '$' },
  { text: 'percent sign', value: '%' },
  { text: 'caret', value: '^' },
  { text: 'ampersand', value: '&' },
  { text: 'asterisk', value: '*' }
];
tinymce.init({
  selector: 'textarea#autocompleter-autocompleteitem',
  height: 250,
  setup: function (editor) {
    var onAction = function (autocompleteApi, rng, value) {
      editor.selection.setRng(rng);
      editor.insertContent(value);
      autocompleteApi.hide();
    };

    var getMatchedChars = function (pattern) {
      return specialChars.filter(function (char) {
        return char.text.indexOf(pattern) !== -1;
      });
    };

    /* An autocompleter that allows you to insert special characters */
    editor.ui.registry.addAutocompleter('specialchars', {
      ch: ':',
      minChars: 1,
      columns: 'auto',
      onAction: onAction,
      fetch: function (pattern) {
        return new tinymce.util.Promise(function (resolve) {
          var results = getMatchedChars(pattern).map(function (char) {
            return {
              type: 'autocompleteitem',
              value: char.value,
              text: char.text,
              icon: char.value
            }
          });
          resolve(results);
        });
      }
    });
  }
});
