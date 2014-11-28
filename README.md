jPulse jQuery plugin
====================

jPulse is a jQuery plugin to add «pulse-like» effect to an element.

Check out the `html/index.html` file to see how it works and instructions how to use it.

jPulse is tested and works with jQuery 1.9.1.

Installation
------------

### Via bower

```
bower install --S jPulse
```

### Directly

```
<script src="path/to/jPulse/dist/jQuery.jPulse.min.js"></script>
```

Usage
-----

Invoke `jPulse` on the element to which the pulsating effect should be applied.

```javascript
$( "elt" ).jPulse( { /* options */ } );
```

To disable the effect:

```javascript
$( "elt" ).jPulse( "disable" );
```

To enable the effect (for instance, after having disabled it):

```javascript
$( "elt" ).jPulse( "enable", /* options */ } );
```

About the author
------------

The author of this plugin is Davis Miculis, follow on Twitter - [@DavisMiculis](https://twitter.com/DavisMiculis)

Leave me some feedback and show me some of your content where have you used my plugin. :)
