import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import { setFilters } from '../../../../../redux/vacancy/slice';

import './index.scss';

const SideBar = () => {
  const dispatch = useDispatch();

  const { field, order } = useSelector(
    ({ vacancy }) => ({
      field: vacancy.filter.field,
      order: vacancy.filter.order
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

  const handleChangeSalary = (event, value) => {
    dispatch(
      setFilters({
        salary: value
      })
    );
  };

  return (
    <>
      <div>
        <div>
          <Typography>Salário desejado</Typography>
          <Slider
            min={0}
            max={10000}
            defaultValue={2000}
            step={500}
            valueLabelDisplay="auto"
            onChange={handleChangeSalary}
          />
        </div>
        <div className="select-order">
          <FormControl>
            <InputLabel>Ordenar por campo</InputLabel>
            <Select value={field} onChange={handleChange} name="field">
              <MenuItem value="area">Área</MenuItem>
              <MenuItem value="titulo">Título</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="select-order">
          <FormControl>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={order} onChange={handleChange} name="order">
              <MenuItem value="ASC">ASC</MenuItem>
              <MenuItem value="DESC">DESC</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export { SideBar };
