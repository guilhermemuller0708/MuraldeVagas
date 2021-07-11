import { useState } from 'react';
import { TextField } from '@material-ui/core';

const Filter = () => {
  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <TextField
        label="Procurar vaga"
        value={filter}
        onChange={handleChange}
        variant="outlined"
        fullWidth={true}
      />
    </>
  );
};

export { Filter };
