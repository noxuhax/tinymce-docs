### `link_assume_external_targets`

Set whether {{site.productname}} should prepend a `http://` prefix if the supplied URL does not contain a protocol prefix.

- `false`: users are prompted to prepend `http://` when the URL entered starts with `www` and does not have a protocol. Other URLs are added without prompt.
- `true`: URLs are assumed to be external. Users are prompted to prepend a `http://` prefix when the protocol is not specified.
- `'http'`: URLs are assumed to be external. URLs without a protocol prefix are prepended a `http://` prefix.
- `'https'`: URLs are assumed to be external. URLs without a protocol prefix are prepended a `https://` prefix.

**Default Value:** `false`

**Possible Values:** `true`, `false`, `'http'`, `'https'`

#### Example: Using `link_assume_external_targets`

```js
tinymce.init({
  selector: 'textarea',  // change this value according to your HTML
  plugins: 'link',
  menubar: 'insert',
  toolbar: 'link',
  link_assume_external_targets: true
});
```

