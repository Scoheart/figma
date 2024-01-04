import { Button, Flex } from 'antd';
import { FC, useEffect } from 'react';

const Test: FC<any> = () => {
  useEffect(() => {
    window.onmessage = (event) => {
      console.log('onmessage');
      console.log(event.data);
    };
  }, []);
  const handleTransform = () => {
    console.log(window);
    console.log(parent);
    parent.postMessage(
      {
        pluginMessage: {
          type: 'transform',
          data: {
            name: 'test',
          },
        },
      },
      '*'
    );
  };

  return (
    <>
      <Flex align="center" justify="center">
        <Button onClick={handleTransform}>生成List容器</Button>
      </Flex>
    </>
  );
};

export default Test;
