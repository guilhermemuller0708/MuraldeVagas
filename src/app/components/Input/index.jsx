import './index.scss';

const Input = ({ label, ...props }) => {
  return (
    <>
      <div className="wrapper-input">
        {label ? <span>{label}</span> : ''}
        <input {...props} />
      </div>
    </>
  );
};

export { Input };
