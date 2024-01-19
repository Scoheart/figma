import {
  Button,
  CircularProgress,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
type propsType = {
  node: any;
  setShowHome: Function;
};
const D2C: FC<propsType> = ({ node, setShowHome }) => {
  const [data, setData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(node);
  }, [node]);

  const fetchData = async (data: any) => {
    try {
      setLoading(true);
      convertArrayToBase64(data);
      console.log(data);
      const res = await fetch('http://localhost:8080/d2c/html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
            <div>
              {data?.length !== 0 && (
                <Button onClick={handleNext}>下一步</Button>
              )}
            </div>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>点击开始转码</StepLabel>
          <StepContent>
            <Button
              onClick={async () => {
                if ((data?.length !== 0) !== null) {
                  fetchData(data);
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
      <Button
        onClick={() => {
          setShowHome((prev: any) => !prev);
        }}
      >
        返回主页
      </Button>
    </>
  );
};

function convertArrayToBase64(dataArray: any) {
  dataArray.forEach((data: any) => {
    convertObjectToBase64(data);
  });
}

function convertObjectToBase64(data: any) {
  const { resources, children } = data;

  if (resources.image instanceof Uint8Array) {
    resources.image = uint8ArrayToBase64(resources.image);
  }

  if (children.length > 0) {
    children.forEach((child: any) => {
      convertObjectToBase64(child);
    });
  }
}

function uint8ArrayToBase64(uint8Array: any) {
  let binaryString = '';
  uint8Array.forEach((byte: any) => {
    binaryString += String.fromCharCode(byte);
  });
  return btoa(binaryString);
}

export default D2C;
