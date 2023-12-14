const createJSONSchema = (node: SceneNode) => {
  const { id, type, name, children = [] } = node as any;

  // const bytes = await node.exportAsync({ format: 'SVG_STRING' })

  const {
    width,
    height,
    layoutSizingHorizontal,
    layoutSizingVertical,
    // padding
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    // border
    topLeftRadius,
    topRightRadius,
    bottomLeftRadius,
    bottomRightRadius,
    strokeBottomWeight,
    strokeTopWeight,
    strokeLeftWeight,
    strokeRightWeight,
    // display:flex
    layoutMode,
    itemSpacing,
    counterAxisAlignItems,
    primaryAxisAlignItems,
    //background
    fills = [],
    // font
    characters = "",
    fontSize,
    fontWeight,
    fontName,
  } = node as any;

  const JSONSchema = {
    id,
    name,
    type,
    characters,
    style: {
      width,
      height,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      topLeftRadius,
      topRightRadius,
      bottomLeftRadius,
      bottomRightRadius,
      strokeBottomWeight,
      strokeTopWeight,
      strokeLeftWeight,
      strokeRightWeight,
      layoutMode,
      layoutSizingHorizontal,
      layoutSizingVertical,
      itemSpacing,
      counterAxisAlignItems,
      primaryAxisAlignItems,
      backgroundColor: {},
      fontSize,
      fontWeight,
      fontName,
    },
    children: children.map(createJSONSchema),
  };

  if (fills.length > 0) {
    const { color = {}, opacity } = fills[0];
    if (color !== undefined) {
      const { r, g, b } = color;
      JSONSchema.style.backgroundColor = { r, g, b, opacity };
    }
  }
  // console.log(fontName)
  return JSONSchema;
};

// const exstractFrameNode = (node: FrameNode) => {
//   const {
//     width,
//     height,
//     // padding
//     paddingTop,
//     paddingRight,
//     paddingBottom,
//     paddingLeft,
//     // border
//     topLeftRadius,
//     topRightRadius,
//     bottomLeftRadius,
//     bottomRightRadius,
//     strokeBottomWeight,
//     strokeTopWeight,
//     strokeLeftWeight,
//     strokeRightWeight,
//     // display:flex
//     layoutMode,
//     layoutSizingHorizontal,
//     layoutSizingVertical,
//     itemSpacing,
//     counterAxisAlignItems,
//     primaryAxisAlignItems,
//     //background
//     fills = [],
//   } = node as any;
// };

const inspectMode = () => {
  figma.showUI(__html__);
  console.log(figma.currentPage);
  figma.on("selectionchange", () => {
    if (figma.currentPage.selection[0]) {
      const selection = figma.currentPage.selection[0];
      figma.ui.postMessage(createJSONSchema(selection));
      console.log("current Node", selection);
      console.log(createJSONSchema(selection));
    }
  });
  figma.ui.onmessage = (event) => {
    console.log("figma main message");
    console.log(event.data);
  };
};

export default inspectMode;
