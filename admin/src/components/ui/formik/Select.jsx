import { ErrorMessage, useField } from 'formik';
import Select from 'react-select';

const FormikSelect = ({
  id,
  name,
  disabled = false,
  label = '',
  labelHelpContent = null,
  required = false,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const renderLabel = () => {
    if (label) {
      return (
        <div className="mb-2 block flex items-center">
          <label htmlFor={id} className="text-sm font-medium text-blue-900">
            {label}
          </label>
          {required ? (
            <label className="text-red-900 text-sm font-medium">*</label>
          ) : null}
          {labelHelpContent}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderLabel()}
      <Select
        id={id}
        required
        name={field.name}
        defaultValue={meta.initialValue}
        value={field.value}
        isDisabled={disabled}
        onChange={val => {
          helpers.setValue(val);
          onChange(val);
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
        {...rest}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm mt-2"
      />
    </div>
  );
};

export default FormikSelect;
