import * as React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

type SelectFilter<T> = {
  options: T[];
  optionLabelHandler: (option: T) => string;
  onChangeHandler: (value: React.SetStateAction<string>) => void;
  label: string;
};
export const SelectFilter = <T,>({
  options: options,
  optionLabelHandler: optionLabelHandler,
  onChangeHandler: onChangeHandler,
  label,
}: SelectFilter<T>) => {
  const [optionName, setOptionName] = React.useState('');

  return (
    <Box sx={{ width: '100%', alignContent: 'flex-start' }}>
      <Autocomplete
        id="combo-box-demo"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={`Choisissez un ${label}`}
          />
        )}
        options={options}
        getOptionLabel={optionLabelHandler}
        value={
          options.find(
            (option) => optionLabelHandler(option) === optionName
          ) || null
        }
        onChange={(_event, newValue) => {
          setOptionName(newValue ? optionLabelHandler(newValue) : '');
          onChangeHandler(
            newValue ? optionLabelHandler(newValue) : ''
          );
        }}
        noOptionsText="Aucune option"
        fullWidth
      />
    </Box>
  );
};
