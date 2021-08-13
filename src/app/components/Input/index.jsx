import './index.scss';

const Input = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = 'text',
  ...props
}) => {
  return (
    <>
      <div className="wrapper-input">
        {label ? <span>{label}</span> : ''}
        <input {...props} type={type} {...field} />
        {touched[field.name] && errors[field.name] ? (
          <code>{errors[field.name]}</code>
        ) : null}
      </div>
    </>
  );
};

export { Input };
