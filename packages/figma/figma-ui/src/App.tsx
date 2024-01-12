import { Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import VerticalStepper from './components/VerticalStepper';

const App: FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      console.log('listen to event data', event.data);
      setData(event.data.pluginMessage);
    });
  });
  return (
    <>
      <Typography
        variant="h5"
        style={{ textAlign: 'center', marginBottom: 20 }}
      >
        Figma Netdisk D2C
      </Typography>
      <VerticalStepper data={data} />
    </>
  );
};

export default App;
