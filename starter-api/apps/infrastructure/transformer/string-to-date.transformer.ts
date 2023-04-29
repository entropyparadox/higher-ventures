export const StringToDateTransformer = ({ value }) =>
  value ? new Date(value) : value;
