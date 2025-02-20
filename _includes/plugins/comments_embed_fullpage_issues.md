## Using Comments embedded mode with the Full Page plugin

{% include DEPRECATED/fullpage.md %}

Developers have to be cautious when deciding the order in which the plugins are added in the plugins list.

Comments can cause an issue if the [Full Page]({{site.baseurl}}/plugins/opensource/fullpage/) plugin `fullpage` appears before Comments plugin `tinycomments` in the plugin list, and `tinycomments` is configured to use `embedded mode`.

The order that the plugins appear affects the order that the `getContent` hooks are processed in. This creates an issue with `tinycomments` working as expected since the `fullpage` plugin adds outer `<html>` elements before `tinycomments` adds its comment data. This leads to the comment data being in the wrong place. The consequence of this situation is that when a saved document is re-opened, the comment data is lost (but the highlights are still there).

For a workaround, please ensure that `tinycomments` is listed before `fullpage` in the plugins list. This should result in `tinycomments` working properly.
