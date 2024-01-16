import {
  Avatar,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { FC } from 'react';

const projectDataMock = [
  {
    id: 1,
    name: 'Baidu Demo',
    framwork: 'Vue',
  },
  {
    id: 2,
    name: 'Netdisk Project',
    framwork: 'Vue',
  },
  {
    id: 3,
    name: 'UI Demo',
    framwork: 'React',
  },
  {
    id: 4,
    name: 'UI Demo 2',
    framwork: 'React',
  },
];

const projectJSX = () => {
  const projectType = [];
  return (
    <>
      {projectDataMock.map(({ id, name, framwork }) => {
        return (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        );
      })}
    </>
  );
};

const ProjectSelect: FC = () => {
  return (
    <>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        <Avatar src="/netdisk.svg">N</Avatar>
        <FormControl size="small" required sx={{ width: 200 }}>
          <InputLabel id="project-input-label">project</InputLabel>
          <Select
            labelId="project-input-label"
            label="project"
            value={value}
            onChange={(evt) => {
              setValue(evt.target.value);
              console.log(evt.target.value);
            }}
          >
            <ListSubheader>Vue</ListSubheader>
            <MenuItem value={2}>Netdisk Project</MenuItem>
            <MenuItem value={1}>Baidu Demo</MenuItem>
            <ListSubheader>React</ListSubheader>
            <MenuItem value={3}>UI Demo</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
};

export default ProjectSelect;
