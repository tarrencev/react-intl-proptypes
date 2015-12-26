# react-intl-proptypes
[![Build Status](https://travis-ci.org/tarrencev/react-intl-proptypes.svg)](https://travis-ci.org/tarrencev/react-intl-proptypes)

PropType validators for ReactIntl components, i.e. `<FormattedMessage />`.

## Installation

```sh
$ npm install react-intl-proptypes
```

## Example

```js
  import ReactIntlPropTypes from 'react-intl-proptypes';
  
  propTypes = {
    title: ReactIntlPropTypes.formattedMessage.isRequired,
  }
```
