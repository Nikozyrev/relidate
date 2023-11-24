import * as validators from './validators';

const DEFAULT_MSG = 'Not valid';

type validatorInfo = {
  msg: string;
};

const validatorsMap = new Map<Function, validatorInfo>([
  [validators.required, { msg: 'Required' }],
  [validators.minLength, { msg: 'Min length' }],
  [validators.maxLength, { msg: 'Max length' }],
]);

export const getDefaultMsg = (func?: Function) =>
  !func ? DEFAULT_MSG : validatorsMap.get(func)?.msg || DEFAULT_MSG;
