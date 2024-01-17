import { Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import yidSvg from '../public/yid.svg';
import Home from './page/Home';
const App: FC = () => {
  const [node, setNode] = useState<any>(null);

  useEffect(() => {
    window.onmessage = (event) => {
      const { selection } = event.data.pluginMessage;
      setNode(selection);
    };
  }, []);

  const pushServer = () => {
    fetch('http://localhost:8080/d2c/html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(node),
    });
  };

  return <Home />;
};

export default App;
