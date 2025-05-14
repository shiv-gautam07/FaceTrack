import { ErrorMessage, useField } from 'formik';
import { Input } from '../Input';

const FormikInput = ({
  id,
  name,
  disabled = false,
  maxLength = 1024,
  helpText = '',
  label = '',
  labelHelpContent = null,
  required = false,
  ...rest
}) => {
  const [field, meta] = useField(name);

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
      <Input
        id={id}
        name={field.name}
        disabled={disabled}
        value={field.value || ''}
        onChange={field.onChange}
        className={
          meta.touched && meta.error
            ? 'focus:outline-0 focus:ring-0 focus:border-[1px] focus:border-red-600  border-[1px] border-red-600'
            : ''
        }
        maxLength={maxLength}
        required={required}
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

export default FormikInput;
