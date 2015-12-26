import 'intl';
import { assert } from 'chai';
import React from 'react';
import {
  FormattedDate,
  FormattedHTMLMessage,
  FormattedMessage,
  FormattedNumber,
  FormattedPlural,
  FormattedRelative,
  FormattedTime,
} from 'react-intl';

import {
  formattedDate,
  formattedHTMLMessage,
  formattedMessage,
  formattedNumber,
  formattedPlural,
  formattedRelative,
  formattedTime,
} from '../ReactIntlPropTypes';

function typeCheckFail(declaration, value, message) {
  const props = { testProp: value };
  const error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  assert.ok(error instanceof Error);
}

function typeCheckPass(declaration, value) {
  const props = { testProp: value };
  const error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  assert.notOk(error);
}

describe('ReactIntlPropTypes', () => {
  describe('Primitive Types', () => {
    it('should not warn for valid values', () => {
      typeCheckPass(formattedDate, <FormattedDate value={ new Date() } />);
      typeCheckPass(formattedHTMLMessage, <FormattedHTMLMessage id="id" />);
      typeCheckPass(formattedMessage, <FormattedMessage id="id" />);
      typeCheckPass(formattedNumber, <FormattedNumber value={ 0 } />);
      typeCheckPass(formattedPlural, <FormattedPlural value="yes" other="no" />);
      typeCheckPass(formattedRelative, <FormattedRelative value="id" />);
      typeCheckPass(formattedTime, <FormattedTime value={ 10 } />);
    });
    it('should not warn when undefined and not required', () => {
      typeCheckPass(formattedDate, null);
      typeCheckPass(formattedHTMLMessage, null);
      typeCheckPass(formattedMessage, null);
      typeCheckPass(formattedNumber, null);
      typeCheckPass(formattedPlural, null);
      typeCheckPass(formattedRelative, null);
      typeCheckPass(formattedTime, null);
    });
    it('should warn for invalid values', () => {
      typeCheckFail(formattedDate, 'cat');
      typeCheckFail(formattedHTMLMessage, 'cat');
      typeCheckFail(formattedMessage, 'cat');
      typeCheckFail(formattedNumber, 'cat');
      typeCheckFail(formattedPlural, 'cat');
      typeCheckFail(formattedRelative, 'cat');
      typeCheckFail(formattedTime, 'cat');
    });
    it('should warn when undefined and is required', () => {
      typeCheckFail(formattedDate.isRequired, null);
      typeCheckFail(formattedHTMLMessage.isRequired, null);
      typeCheckFail(formattedMessage.isRequired, null);
      typeCheckFail(formattedNumber.isRequired, null);
      typeCheckFail(formattedPlural.isRequired, null);
      typeCheckFail(formattedRelative.isRequired, null);
      typeCheckFail(formattedTime.isRequired, null);
    });
  });
});
