import { Button, Flex, message } from "antd";
import { FC, useEffect } from "react";

const Test: FC<any> = () => {
  useEffect(() => {
    window.onmessage = (event) => {
      console.log("onmessage");
      console.log(event.data);
    };
  }, []);
  const handleTransform = () => {
    console.log(window);
    console.log(parent);
    parent.postMessage(
      {
        pluginMessage: {
          type: "transform",
          data: {},
        },
      },
      "*",
    );
  };

  return (
    <>
      <Flex align="center" justify="center">
        <Button onClick={handleTransform}>开始转换代码</Button>
      </Flex>
    </>
  );
};

export default Test;
