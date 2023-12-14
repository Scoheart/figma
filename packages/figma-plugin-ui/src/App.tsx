import React, { useState } from "react";
import type { TabsProps } from "antd";
import CodeHighlighter from "./CodeHighlighter";
import {
  Button,
  Flex,
  Modal,
  Result,
  Select,
  Space,
  Spin,
  Tabs,
  Typography,
  message,
} from "antd";
function copyToClipboard(code: string) {
  // 创建一个临时的文本输入框
  const tempInput = document.createElement("input");
  // 将要复制的文本设置为输入框的值
  tempInput.value = code;
  // 将输入框添加到文档中
  document.body.appendChild(tempInput);
  // 选中输入框中的文本
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // 兼容移动端
  // 执行复制命令
  document.execCommand("copy");
  // 从文档中移除临时输入框
  document.body.removeChild(tempInput);
  message.info("复制成功");
}
//@ts-ignore
function createDOMElement(node) {
  if (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "VECTOR"
  ) {
    const frameElement = document.createElement("div");
    // insert class
    //@ts-ignore
    // frameElement.classList.add([node.name]);
    // insert styles
    for (const key in node.style) {
      //@ts-ignore
      frameElement.style[key] = node.style[key];
    }
    if (node.style.layoutMode === "HORIZONTAL") {
      frameElement.style.display = "flex";
      frameElement.style.justifyContent = "center";
      frameElement.style.alignItems = "center";
    } else if (node.style.layoutMode === "VERTICAL") {
      frameElement.style.display = "flex";
      frameElement.style.flexDirection = "column";
      frameElement.style.justifyContent = "center";
      frameElement.style.alignItems = "center";
    }
    // 递归处理子节点
    //@ts-ignore
    node.children.forEach((childNode) => {
      const childElement = createDOMElement(childNode);
      frameElement.appendChild(childElement);
    });
    return frameElement;
  } else if (node.type === "TEXT") {
    const textElement = document.createElement("p");
    textElement.textContent = node.textContent;
    return textElement;
  } else {
    // 处理其他类型的节点
    const otherElement = document.createElement("div");
    //@ts-ignore
    node.children.forEach((childNode) => {
      const childElement = createDOMElement(childNode);
      otherElement.appendChild(childElement);
    });
    return otherElement;
  }
}

const { Title } = Typography;

const App: React.FC = () => {
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [figmaData, setFigmaData] = useState();
  const [codeSnippet, setCodeSnippet] = useState<string>("");
  onmessage = (evt) => {
    // console.log("React Antd Demo", evt.data.pluginMessage);
    setFigmaData(evt.data.pluginMessage);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsLoading(true);
    // 开始转换代码
    setTimeout(() => {
      const dom = createDOMElement(figmaData);
      setCodeSnippet(dom.outerHTML);
      setIsLoading(false);
      setIsFinish(true);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "代码转设计稿",
      children: (
        <Flex justify="center">
          <Button
            onClick={() => {
              showModal();
            }}
          >
            开始转换代码
          </Button>
        </Flex>
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <Flex gap={40} vertical>
        <Flex justify="center" align="center">
          <Title level={2} style={{ color: "#0095FF" }}>
            网盘 Figma D2C
          </Title>
        </Flex>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Modal
          title="Settings"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Flex justify="center" align="center" vertical>
            <Title level={4}>代码转换设置</Title>
            <Flex justify="center" align="center">
              <Space>
                <Typography>待转换语言</Typography>
                <Select
                  defaultValue="html"
                  style={{ width: 120 }}
                  options={[
                    { value: "html", label: "HTML" },
                    { value: "vue", label: "Vue" },
                    { value: "react", label: "React" },
                    { value: "swift", label: "SwiftUI" },
                    { value: "compose", label: "ComposeUI" },
                    { value: "fultter", label: "Fultter" },
                  ]}
                />
              </Space>
            </Flex>
          </Flex>
        </Modal>
        {isLoading && (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        )}
        {isFinish && (
          <Result
            status="success"
            title="转换完成!"
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => copyToClipboard(codeSnippet)}
              >
                复制代码
              </Button>,
              <Button key="buy">重试</Button>,
            ]}
          />
        )}
        {codeSnippet && (
          <div>
            <CodeHighlighter code={codeSnippet} language={"html"} />
          </div>
        )}
      </Flex>
    </>
  );
};

export default App;
