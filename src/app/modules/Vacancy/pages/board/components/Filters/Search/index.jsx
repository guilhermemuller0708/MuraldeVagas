import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { TextField } from '@material-ui/core';

import { setFilters } from '../../../../../redux/board/slice';

const Search = () => {
  const dispatch = useDispatch();

  const { search } = useSelector(
    ({ board }) => ({
      search: board.filter.search
    }),
    shallowEqual
  );

  const handleChange = (event) => {
    dispatch(
      setFilters({
        search: event.target.value
      })
    );
  };

  return (
    <>
      <TextField
        placeholder="Procurar vaga"
        value={search}
        onChange={handleChange}
        variant="outlined"
        fullWidth={true}
      />
    </>
  );
};

export { Search };