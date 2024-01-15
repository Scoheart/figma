import { FC } from 'react';
import { css } from '@emotion/react';
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
const containerStyle = css({
  margin: '10px auto',
  paddingTop: 30,
  maxWidth: 370,
  height: '100vh',
  border: '1px solid #cccccc',
  display: 'flex',
  justifyContent: 'center',
});

const App: FC = () => {
  return (
    <div css={containerStyle}>
      <Stack spacing={2}>
        <FormControl size="small">
          <AddCircleOutline
            sx={{
              width: 36,
              height: 36,
            }}
          />
          <InputLabel id="project-input-label">project</InputLabel>
          <Select labelId="project-input-label" label="project">
            <ListSubheader>Vue</ListSubheader>
            <MenuItem>Ten</MenuItem>
            <MenuItem>Ten</MenuItem>
            <ListSubheader>React</ListSubheader>
            <MenuItem>sdfds</MenuItem>
          </Select>
          <FormHelperText>Select a project</FormHelperText>
        </FormControl>
      </Stack>
    </div>
  );
};

export default App;
