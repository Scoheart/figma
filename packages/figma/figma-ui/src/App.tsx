import { FC, useState } from 'react';
import { css } from '@emotion/react';
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
const containerStyle = css({
  margin: '10px auto',
  paddingTop: 30,
  maxWidth: 370,
  border: '1px solid #cccccc',
});

const flexStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const steps = [
  {
    label: '请新建或者选择一个项目',
  },
  {
    label: '选择待转换图层',
  },
  {
    label: '转化完成',
  },
];

const data = [
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
];

const App: FC = () => {
  const [value, setValue] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [project, setProject] = useState([]);
  return (
    <div css={containerStyle}>
      <Drawer variant="persistent" anchor="left" open={true}>
        <div>hello</div>
      </Drawer>
      <SwipeableDrawer
        anchor="bottom"
        onClose={() => {}}
        onOpen={() => {}}
      ></SwipeableDrawer>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        <AddCircleOutline sx={{ width: 32, height: 32 }} />
        <FormControl size="small" required fullWidth>
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
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        <Stepper orientation="vertical" activeStep={activeStep}>
          {steps.map(({ label }) => {
            return (
              <Step>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Button
                    onClick={() => {
                      setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }}
                  >
                    继续
                  </Button>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Stack>
    </div>
  );
};

export default App;
