export const StringToBooleanTransformer = ({ value }) =>
  value === 'true' || value === true ? true : false;
