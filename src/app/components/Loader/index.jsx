import { CircularProgress } from '@material-ui/core';
import './index.scss';

const Loader = () => {
  return (
    <div className="wrapper-loading">
      <CircularProgress disableShrink />
    </div>
  );
};

export default Loader;
