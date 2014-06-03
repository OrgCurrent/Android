
# rework-mixins

  [Rework](https://github.com/visionmedia/rework) CSS mixins.

## Example

  Using all mixing:

```js
var rework = require('rework');
var mixins = require('rework-mixins');

var css = rework('some css here')
  .use(rework.mixin(mixins))
  .toString();
```

  Or specific mixing:

```js
var rework = require('rework');
var mixins = require('rework-mixins');

var css = rework('some css here')
  .use(rework.mixin({
    overflow: mixins.overflow
  }))
  .toString();
```

## Mixins

  - [overflow: ellipsis](#overflow-ellipsis)
  - [border-radius](#border-radius)
  - [absolute](#absolute--relative--fixed)
  - [relative](#absolute--relative--fixed)
  - [fixed](#absolute--relative--fixed)
  - [opacity](#opacity-n)
  - [size](#size)

## opacity: n

  Add microsoft junk:

```css
a {
  opacity: 0.5;
}

ul {
  opacity: 1 !important;
}
```

yields:

```css
a {
  opacity: 0.5;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
  filter: alpha(opacity=50)
}

ul {
  opacity: 1 !important;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100) !important;
  filter: alpha(opacity=100) !important
}
```

## overflow: ellipsis

  `mixins.overflow`:

```css
h1 {
  overflow: ellipsis
}
```

yields:

```css
h1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
```

## border-radius

  `mixins.border-radius`:

```css
button {
  border-radius: top 5px bottom 10px
}
```

yields:

```css
button {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
```

## absolute | relative | fixed

  `mixins.{absolute,relative,fixed}`:

```css
#logo {
  absolute: top left
}
```

yields:

```css
#logo {
  position: absolute;
  top: 0;
  left: 0
}
```

```css
#logo {
  fixed: top 5px left 10px
}
```

yields:

```css
#logo {
  position: fixed;
  top: 5px;
  left: 10px
}
```

## size

  `mixins.size`:

```css
#logo {
  size: 100px 50px
}
#icon {
  size: 32px
}
```

yields:

```css
#logo {
  width: 100px;
  height: 50px
}
#icon {
  width: 32px;
  height: 32px
}
```

## License

  MIT
