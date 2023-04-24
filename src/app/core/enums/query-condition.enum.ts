export enum QueryCondition {
  Equal = '==',
  NotEqual = '!=',
  GreaterThan = '>',
  GreaterThanOrEqual = '>=',
  LessThan = '<',
  LessThanOrEqual = '<=',
  Contains = 'Contains',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
  In = 'In',
  On = 'On',
}

export type QueryConditionModel<Model> = {
  [key in keyof Model]?: QueryCondition;
};
