import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';

import { setFilters } from '../../../../../redux/board/slice';

import './index.scss';

const SideBar = () => {
  const dispatch = useDispatch();

  const { field, order, requirements } = useSelector(
    ({ board }) => ({
      field: board.filter.field,
      order: board.filter.order,
      requirements: board.filter.requirements
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
        <div>
          <Typography>Salário desejado</Typography>
          <Slider
            min={0}
            max={10000}
            defaultValue={0}
            step={500}
            valueLabelDisplay="auto"
            onChange={handleChangeSalary}
          />
        </div>
        {/* <div className="select-order">
          <FormControl>
            <InputLabel>Ordenar por campo</InputLabel>
            <Select value={field} onChange={handleChange} name="field">
              <MenuItem value="area">Área</MenuItem>
              <MenuItem value="titulo">Título</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="select-order">
          <FormControl>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={order} onChange={handleChange} name="order">
              <MenuItem value="ASC">Ascendente</MenuItem>
              <MenuItem value="DESC">Descendente</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="select-order">
          <FormControl>
            <InputLabel>Requisitos</InputLabel>
            <Select
              value={requirements}
              onChange={handleChange}
              name="requirements"
              multiple
            >
              <MenuItem value="javascript">javascript</MenuItem>
              <MenuItem value="spring">spring</MenuItem>
            </Select>
          </FormControl>
        </div> */}
      </div>
    </>
  );
};

export { SideBar };
