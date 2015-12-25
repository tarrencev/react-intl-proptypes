import {
	FormattedDate,
	FormattedHTMLMessage,
	FormattedNumber,
	FormattedMessage,
	FormattedPlural,
	FormattedRelative,
	FormattedTime,
} from 'react-intl';

const ReactIntlPropTypes = {
	formattedDate: createReactIntlTypeChecker(FormattedDate),
	formattedTime: createReactIntlTypeChecker(),
	formattedRelative: createReactIntlTypeChecker(),
	formattedNumber: createReactIntlTypeChecker(),
	formattedPlural: createReactIntlTypeChecker(),
	formattedMessage: createReactIntlTypeChecker(),
	formattedHTMLMessage: createReactIntlTypeChecker(),
};

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
	if (Array.isArray(propValue)) {
		return 'array';
	}
	if (propValue instanceof RegExp) {
		// Old webkits (at least until Android 4.0) return 'function' rather than
		// 'object' for typeof a RegExp. We'll normalize this here so that /bla/
		// passes PropTypes.object.
		return 'object';
	}
	return typeof propValue;
}

function createChainableTypeChecker(validate) {
	function checkType(isRequired, props, propName, componentName, location) {
	componentName = componentName || ANONYMOUS;
	if (props[propName] == null) {
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

function createReactIntlTypeChecker(expectedType) {
	function validate(props, propName, componentName, location) {
		var propValue = props[propName];
		if (propValue !== instanceof expectedType) {
			var propType = getPropType(propValue);
			return new Error(
				`Invalid ${location} \`${propName}\` of type \`${propType}\` ` +
				`supplied to \`${componentName}\`, expected \`${immutableClassName}\`.`
			);
		}
		return null;
	}
	return createChainableTypeChecker(validate);
}

export default ReactIntlPropTypes;
