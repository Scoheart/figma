function defaultMode() {
  console.log(figma.mode, figma.editorType);
  console.log("默认模式");
  figma.showUI(__html__);
}

export default defaultMode;
