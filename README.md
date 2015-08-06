# PostCSS Nested Smacss [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds smacss naming conventions to nested postcss files..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/snide/postcss-nested-smacss.svg
[ci]:      https://travis-ci.org/snide/postcss-nested-smacss

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-nested-smacss') ])
```

See [PostCSS] docs for examples for your environment.
