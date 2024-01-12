import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { FC, useState } from 'react';

type Props = {
  data: any;
};

const VerticalStepper: FC<Props> = ({ data }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.node),
      });
      const d = await res.text();
      console.log(d);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      handleNext();
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>请选择待转换设计稿</StepLabel>
          <StepContent>
            {/* <div>{JSON.stringify(data)}</div> */}
            <div>
              {data && data.node && (
                <Button onClick={handleNext}>下一步</Button>
              )}
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>绑定交互事件</StepLabel>
          <StepContent>
            <Button onClick={handleNext}>下一步</Button>
            <Button onClick={() => {}}>选择事件</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>点击开始转码</StepLabel>
          <StepContent>
            <Button
              onClick={async () => {
                if (data?.node !== null) {
                  console.log(data.node);
                  fetchData();
                }
              }}
            >
              开始转换
            </Button>
            <Button onClick={handleBack}>回退</Button>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 2 && <Button onClick={handleReset}>重置</Button>}
      {loading ? <CircularProgress /> : null}
    </>
  );
};

export default VerticalStepper;
