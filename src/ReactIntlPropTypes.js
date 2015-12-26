import ReactElement from 'react/lib/ReactElement';

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

function getComponentName(componentClass) {
  return componentClass && componentClass.name || ANONYMOUS;
}

function createReactIntlTypeChecker(expectedComponent) {
  function validate(props, propName, componentName, location) {


    const actualComponent = props[propName].type;
    if (!ReactElement.isValidElement(props[propName]) || actualComponent !== expectedComponent) {
      const expectedComponentName = getComponentName(expectedComponent);
      const actualComponentName = getComponentName(actualComponent);

      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${actualComponentName}\` ` +
        `supplied to \`${componentName}\`, expected \`${expectedComponentName}\`.`
      );
    }

    return null;
  }

  return createChainableTypeChecker(validate);
}

export const formattedDate = createReactIntlTypeChecker(FormattedDate);
export const formattedHTMLMessage = createReactIntlTypeChecker(FormattedHTMLMessage);
export const formattedMessage = createReactIntlTypeChecker(FormattedMessage);
export const formattedNumber = createReactIntlTypeChecker(FormattedNumber);
export const formattedPlural = createReactIntlTypeChecker(FormattedPlural);
export const formattedRelative = createReactIntlTypeChecker(FormattedRelative);
export const formattedTime = createReactIntlTypeChecker(FormattedTime);
