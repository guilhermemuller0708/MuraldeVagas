import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { setFilters } from '../../../../../redux/board/slice';

import './index.scss';

const SideBar = ({ closeFilterFullScreen }) => {
  const dispatch = useDispatch();

  const { order, salary } = useSelector(
    ({ board }) => ({
      order: board.filter.order,
      salary: board.filter.salary
    }),
    shallowEqual
  );

  const handleChange = (event) => {
    dispatch(
      setFilters({
        [event.target.name]: event.target.value
      })
    );
  };

  const handleChangeSalary = (_, value) => {
    dispatch(
      setFilters({
        salary: value
      })
    );
  };

  return (
    <>
      <div>
        <div className="close-filter-full-screen">
          <button onClick={closeFilterFullScreen}>
            <Close />
          </button>
        </div>
      </div>
      <div>
        <div>
          <Typography>Salário desejado</Typography>
          <Slider
            min={0}
            max={10000}
            defaultValue={2000}
            step={500}
            value={salary}
            valueLabelDisplay="auto"
            onChange={handleChangeSalary}
          />
        </div>
        <div className="select-order">
          <FormControl>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={order} onChange={handleChange} name="order">
              <MenuItem value="ASC">Ascendente</MenuItem>
              <MenuItem value="DESC">Descendente</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Typography>Desejavel na vaga</Typography>
          <TextField
            name="desirable"
            fullWidth
            onChange={handleChange}
            variant="filled"
          />
        </div>
        <div>
          <Typography>Empresa</Typography>
          <TextField
            name="company"
            fullWidth
            onChange={handleChange}
            variant="filled"
          />
        </div>
      </div>
    </>
  );
};

export { SideBar };
