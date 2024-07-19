import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';

interface ChipFilterProps {
  chips: string[];
  selectedChips: string[];
  handleCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  getChipColor: (Chip: string) => string;
}

const ChipFilter: React.FC<ChipFilterProps> = ({
  chips: chips,
  selectedChips,
  handleCheckboxChange,
  getChipColor,
}) => {
  return (
    <Box
      alignItems="center"
      justifyContent="left"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.23)',
        padding: '10px',
        position: 'relative',
        width: '100%',
      }}
    >
      <FormLabel
        component="legend"
        sx={{
          position: 'absolute',
          top: '-10px',
          left: '10px',
          backgroundColor: 'white',
        }}
      >
        Type d'emplacement
      </FormLabel>
      <FormControl component="fieldset">
        <FormGroup row={true}>
          {chips.map((type) => (
            <Box key={type} display="flex" alignItems="left" mr={-2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedChips.includes(type)}
                    onChange={handleCheckboxChange}
                    value={type}
                    icon={
                      <Chip
                        label={type}
                        size="small"
                        sx={{
                          backgroundColor: 'transparent',
                          color: 'black',
                          border: '1px solid black',
                          height: '24px',
                          width: '44px',
                        }}
                      />
                    }
                    checkedIcon={
                      <Chip
                        label={type}
                        size="small"
                        sx={{
                          backgroundColor: getChipColor(type),
                          color: 'black',
                          border: '1px solid black',
                          height: '24px',
                          width: '44px',
                        }}
                      />
                    }
                  />
                }
                label={undefined}
              />
            </Box>
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ChipFilter;
