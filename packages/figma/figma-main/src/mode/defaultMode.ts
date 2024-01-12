import props from '../constants/props';

const defaultMode = () => {
  figma.showUI(__html__, {
    width: 400,
    height: 600,
  });
  figma.on('selectionchange', () => {
    postSelection();
  });

  async function postSelection() {
    if (figma.currentPage.selection.length === 0) {
      figma.ui.postMessage({
        type: 'empty',
        node: null,
      });
      return;
    }

    console.warn(figma.currentPage.selection);

    const nodeTreeCollection = await Promise.all(
      figma.currentPage.selection.map(async (node) => {
        return await figmaNodeTreeGeneration(node);
      })
    );

    figma.ui.postMessage({
      type: 'selectionchange',
      node: nodeTreeCollection,
    });
  }
};

/**
 * 复制所有属性
 *
 * @function cloneAllProps
 * @description Figma节点的属性都是「不可枚举的」，所以需要一层拷贝来让插件能够获取节点到所有属性,同时还能仅筛选出所需要的属性。
 * @param {any} rootNode 根节点
 * @returns {any} 返回复制后的属性
 */
function cloneAllProps(rootNode: any): any {
  const newObj: any = {};
  for (const prop of props) {
    newObj[prop] = rootNode[prop];
  }
  if (__DEV__) {
    console.log('newObj', newObj);
  }
  return newObj;
}

/**
 * Figma节点树生成
 *
 * @function figmaNodeTreeGeneration
 * @param {any} rootNode Figma树的根节点
 * @param {any} options 选项参数，可选
 * @returns {any} 清洗后的Figma节点树
 */
async function figmaNodeTreeGeneration(
  rootNode: any,
  options?: any
): Promise<any> {
  const { type, children, isAsset, name } = rootNode;

  if (isAsset === true) {
    return {
      id: rootNode.id,
      name: 'static',
      width: rootNode.width,
      height: rootNode.height,
      isAsset,
      assets: await rootNode.exportAsync({
        format: 'PNG',
        constraint: {
          type: 'SCALE',
          value: 1,
        },
      }),
    };
  }

  return {
    ...cloneAllProps(rootNode),
    id: rootNode.id,
    type: type,
    data: 'metadata',
    children:
      children && children.length > 0
        ? await Promise.all(children.map(figmaNodeTreeGeneration))
        : [],
  };
}

export default defaultMode;
