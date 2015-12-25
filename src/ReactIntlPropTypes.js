// Heavily inspired by the ReactPropTypes.js implementation found in React.js
import {
  FormattedDate,
  FormattedHTMLMessage,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelative,
  FormattedTime,
} from 'react-intl';

const ANONYMOUS = '<<anonymous>>';

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  if (Array.isArray(propValue)) {
    return 'array';
  } else if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  return typeof propValue;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName = ANONYMOUS, location) {
    if (props[propName] === null) {
      if (isRequired) {
        return new Error(
          `Required ${location} \`${propName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      }
    } else {
      return validate(props, propName, componentName, location);
    }
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createReactIntlTypeChecker(expectedType) {
  function validate(props, propName, componentName, location) {
    const propValue = props[propName];

    if (!(propValue instanceof expectedType)) {
      const propType = getPropType(propValue);

      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected \`${expectedType}\`.`
      );
    }

    return null;
  }

  return createChainableTypeChecker(validate);
}

export default {
  formattedDate: createReactIntlTypeChecker(FormattedDate),
  formattedHTMLMessage: createReactIntlTypeChecker(FormattedHTMLMessage),
  formattedMessage: createReactIntlTypeChecker(FormattedMessage),
  formattedNumber: createReactIntlTypeChecker(FormattedNumber),
  formattedPlural: createReactIntlTypeChecker(FormattedPlural),
  formattedRelative: createReactIntlTypeChecker(FormattedRelative),
  formattedTime: createReactIntlTypeChecker(FormattedTime),
};
