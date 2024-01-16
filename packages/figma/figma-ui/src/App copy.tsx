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
  margin: '0 auto',
  padding: '0 12px',
  paddingTop: 24,
  maxWidth: 370,
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

const App: FC = () => {
  const [project, setProject] = useState();
  const [value, setValue] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div css={containerStyle}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        style={{ marginTop: 20 }}
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
