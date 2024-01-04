import props from '../constants/props';

const inspectMode = () => {
  figma.showUI(__html__);
  figma.on('selectionchange', function () {
    postSelection();
  });

  async function postSelection() {
    const selection = figma.currentPage.selection;
    console.log('selection', selection);
    if (selection) {
      selection.forEach(function (node) {
        console.log('after', figmaNodeTreeCleansing(node, null));
      });
    }
  }
};
/**
 * 复制所有属性
 *
 * @param rootNode 根节点
 * @returns 返回复制后的属性
 */
function cloneAllProps(rootNode: any) {
  const newObj: any = {};
  for (const prop of props) {
    newObj[prop] = rootNode[prop];
  }
  return newObj;
}

/**
 * Figma节点树清洗函数
 *
 * @param rootNode Figma树的根节点
 * @param options 选项参数，可选
 * @returns 清洗后的Figma节点树
 */
function figmaNodeTreeCleansing(rootNode: any, options?: any): any {
  return {
    ...cloneAllProps(rootNode),
    type: rootNode.type,
    data: 'data',
    children:
      rootNode.children.length > 0
        ? rootNode.children.map(figmaNodeTreeCleansing)
        : [],
  };
}

export default inspectMode;
