**Stacked Strips** is a jQuery Plugin developed by [One Ltd](http://oneltd.co.uk).

## About:
**Stacked Strips** is a lightweight jQuery plugin that enables you to stack HTML elements on top of one another as you scroll down the page, for a smart modern user experience.

You can view the demo site for this plugin [here](http://oneltd-dev.co.uk/stacked-strips).

## Dependencies:
- jQuery

## Installation:
- Ensure jQuery is called prior to any jQuery plugins.
- Import the 'js/jquery.stacked-strips.js' file into your project.
- Ensure you have added the contents of 'src/sass/required-styles' to your stylesheet (or lines 125 - 136 of /css/style.css) if you prefer.

## Standard Usage:
- Stacked Strips can be called on any HTML element, though there must be at least 2 of the element types in the document or else the script will not run.
- Basic example: `$('element').stacked_strips();`
- [More examples](#examples).

## Customisation parameters:
There are several parameters that can be changed to alter the behaviour of **Stacked Strips** :

`strip_size`: either `'full'` which stretches the element to the screen size or a pixel value. Default: `'full'`.

`active_position`: a `number` value (in percentage) of how far into the strip an 'active' class is added, this allows you to add animations when a strip comes into view. Default: `50`.

`after_class`: `true` or `false` - whether to add a class to the previous strip when a strip becomes active. This allows you to animate the previous slide away as the new one comes into view. Default: `false`.

Please note that these options must be passed as an object to the `stacked_strips` method as below:

## Examples
Here are some additional examples of passing customisation parameters to the plugin.

**Passing Inline Parameters:**
```
$('element').stacked_strips({active_position: 60, after_class: true});
```

**Passing Parameters Through a Variable:**
```
var options = {
active_position: 60,
after_class: true,
}; 
$('element').stacked_strips(options);
```
