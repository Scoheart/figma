import { FC, useEffect, useState } from 'react';
import { Button, Flex, Tabs, Typography } from 'antd';
import type { TabsProps } from 'antd';
import Test from './pages/Test';
import Code from './pages/Code';
const { Title } = Typography;
const onChange = (key: string) => {
  console.log(key);
};

const jsxDemo = () => {
  return (
    <>
      <Button onClick={() => {
        console.log(window)
        console.log(globalThis)
        console.log(parent)
      }}> 打印 </Button>
    </>
  );
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '容器生成',
    children: <Test />,
  },
  {
    key: '2',
    label: '代码转换',
    children: <Code />,
  },
  {
    key: '3',
    label: '组件标注',
    children: jsxDemo(),
  },
  {
    key: '4',
    label: '数据模型绑定',
    children: 'Content of Tab Pane 3',
  },
];

const App: FC<any> = () => {
  const [selection, setSelection] = useState<any>([]);
  useEffect(() => {
    window.addEventListener('message', (event) => {
      window.selection = event.data;
    });
  }, []);
  return (
    <>
      <Flex justify="center" align="center">
        <Title level={2} style={{ color: '#0095FF' }}>
          Figma D2C Plugin UI
        </Title>
      </Flex>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default App;
