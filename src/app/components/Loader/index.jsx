import { CircularProgress } from '@material-ui/core';
import './index.scss';

const Loader = ({ className = '' }) => {
  return (
    <div className={`wrapper-loading ${className}`}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
