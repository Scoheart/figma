import props from '../../constants/props';

const defaultMode = () => {
  figma.showUI(__html__, {
    width: 400,
    height: 600,
  });
  figma.on('selectionchange', () => {
    const selected = figma.currentPage.selection;
    selected.forEach((node) => {
      const res = filterProperty(node);
      console.warn(res);
    });
    // postSelection();
  });
};
/**
 * 枚举化属性
 *
 * @function enumerableProperty
 * @description Figma节点的属性都是「不可枚举的」，该方法将属性枚举出来，方便获取到所有属性。
 * @param obj
 * @returns
 */
function enumerableProperty(obj: any) {
  const newObj = {};
  for (let property in obj) {
    newObj[property] = obj[property];
  }
  return newObj;
}

const structureList = ['id', 'name', 'type', 'characters'];
const styleList4Universal = [
  'width',
  'height',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'layoutMode',
  'itemSpacing',
  'primaryAxisSizingMode',
  'counterAxisSizingMode',
  'primaryAxisAlignItems',
  'counterAxisAlignItems',
  'fills',
];

type StructureType = {
  id: string;
  name: string;
  type: string;
  children: any[];
  characters: string;
};

type StyleType = {
  universal: any;
  web: any;
  android: any;
  ios: any;
};

type ResourcesType = {
  image: any;
  svg: any;
  video: any;
  font: any;
};

type SchemaType = {
  structure: StructureType;
  style: StyleType;
  resources: ResourcesType;
}

function filterProperty(node: any) {
  const { structure, style, resources } = {
    structure: {
      id: '',
      name: '',
      type: '',
      children: node.children.map(filterProperty),
      characters: '',
    },
    style: {
      universal: {},
      web: {},
      android: {},
      ios: {},
    },
    resources: {
      image: null,
      svg: null,
      video: null,
      font: null,
    },
  };

  const enumerableNode = enumerableProperty(node);

  // filter structure
  for (const property of structureList) {
    structure[property] = enumerableNode[property]
      ? enumerableNode[property]
      : null;
  }

  // filter style
  for (const property of styleList4Universal) {
    style.universal[property] = enumerableNode[property]
      ? enumerableNode[property]
      : null;
  }

  // filter resources

  return {
    structure,
    style,
  };
}

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
