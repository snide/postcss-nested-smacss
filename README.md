# PostCSS Nested Smacss [![Build Status][ci-img]][ci]

[PostCSS] plugin that adds smacss naming conventions to nested postcss files..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/snide/postcss-nested-smacss.svg
[ci]:      https://travis-ci.org/snide/postcss-nested-smacss

```css
@module top {
  content: "primary module";
  color: #FFF;

  @element inner_element {
    content: "element in module";

      @state state-of-element {
      content: "state of element";

      @element element_in_state {
        content: "element in state, under element";
      }

      .regular-class {
        content: "something should still exist";
      }
    }

    @submodule sub-of-inner-element, another-sub {
      content: "submodule of element";

      @element element_in_sub {
        content: "Child element under state, under module.";
      }

      @state state-of-sub {
        content: "state of submodule";
      }
    }
  }

  @state state-of-module {
    content: "state of module";

    @element element_inside_state {
      content: "Child element under state, under module.";
    }

    .regular-class {
      content: "something should still exist";
    }
  }
}
```

```css
```

## Usage

```js
postcss([ require('postcss-nested-smacss') ])
```

See [PostCSS] docs for examples for your environment.
