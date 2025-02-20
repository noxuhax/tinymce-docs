## `rtc_token_provider`

The RTC plugin and the RTC service uses [JSON Web Tokens (JWT)](https://jwt.io/introduction/) to authenticate the user. The user's token should include:

* A unique user ID (`sub`).
* A relative expiration time (`exp`).

The `rtc_token_provider` function will be called one or more times to refresh the token before it expires. For production usage, {{site.companyname}} recommends a token provider with a dynamic request that produces a new JWT token with an updated `exp` claim.

For information on generating and serving JWTs for {{site.productname}} RTC, see: [Real-time Collaboration (RTC) JWT Authentication Setup]({{site.baseurl}}/rtc/jwt-authentication/).

{% if plugincode != "rtc" %}
Required plugin
: [Real-time Collaboration (`rtc`)]({{site.baseurl}}/plugins/premium/rtc/)
{% endif %}

Type
: Function (Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise))

Input parameters
: | Field | Type | Description |
|-------|:----:|-------------|
| `documentId` | `string` | The document ID from the [`rtc_document_id`](#rtc_document_id) option. |

Return data
: | Field | Type | Description |
|-------|:----:|-------------|
| `token` | `string` | A generated JWT token. This token should be signed with a private key as described in [JWT authentication]({{site.baseurl}}/rtc/jwt-authentication/#jwtendpointrequirements). |

### Required JWT claims

| Field | Type | Description |
|-------|:----:|-------------|
| `sub` | `string` | The unique user ID (If `sub` is the same for two clients, the server will trust them as if they are the same user). |
| `exp` | `integer` | A timestamp indicating the token expiry date and time. |

### Optional JWT claims

| Field | Type | Description |
|-------|:----:|-------------|
| `https://claims.tiny.cloud/rtc/document` | `string` | The document ID that this JWT can access. If omitted, the JWT will be able to access any document on the same account. |
| `https://claims.tiny.cloud/rtc/role` | `string` | The possible role values are: `editor` or `viewer`. `viewer` will put the editor into readonly mode and `editor` (default) will let the user edit the document. |

### Example: Using `rtc_token_provider`

This example shows the minimum required configuration for the Real-time Collaboration plugin, including the `rtc_token_provider` option.

```js
tinymce.init({
  selector: 'textarea#rtc-example',
  plugins: 'rtc',
  rtc_document_id: 'unique-document-id',
  rtc_encryption_provider: () => Promise.resolve({ key: 'a secret key' }),
  rtc_token_provider: ({ documentId }) =>
    fetch('/getJwtToken', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ documentId }),
    })
    .then((response) => response.json())
    .then(({ jwt })) => ({ token: jwt })
    .catch((error) => console.log('Failed to return a JWT\n' + error))
});
```
