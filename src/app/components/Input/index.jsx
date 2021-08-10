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
        <input {...props} {...field} />
      </div>
    </>
  );
};

export { Input };
