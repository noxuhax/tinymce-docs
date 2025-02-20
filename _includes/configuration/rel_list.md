### `rel_list`

This option lets you specify a list of `rel` values for the `link` dialog. These values gets applied to the `rel` attribute. Each `rel` item must be defined as an object with a `title` and a `value`. For example: `{title: 'No Referrer', value: 'noreferrer'}`. When the dialog is submitted, the `value` of the selected `rel` item will be set as the link's `rel` attribute.

#### Example: Using `rel_list`

```js
tinymce.init({
  selector: 'textarea',  // change this value according to your HTML
  plugins: 'link',
  menubar: 'insert',
  toolbar: 'link',
  rel_list: [
    {title: 'No Referrer', value: 'noreferrer'},
    {title: 'External Link', value: 'external'}
  ]
});
```

