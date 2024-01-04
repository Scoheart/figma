type ToHTMLDivElement = FrameNode;

const transformToHTML = (node: SceneNode): CodegenResult[] => {
  console.log(node);
  if (node.type === "FRAME") {
    console.log(node);
  }

  return [
    {
      title: "HTML",
      language: "HTML",
      code: "dsfdsf",
    },
  ];
};

export default transformToHTML;
