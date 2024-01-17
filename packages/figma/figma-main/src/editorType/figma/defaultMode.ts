const defaultMode = () => {
  figma.showUI(__html__, {
    width: 360,
    height: 500,
  });
  figma.on('selectionchange', async () => {
    const selection = figma.currentPage.selection;
    console.log('selected', selection[0]);
    postSelection();
  });
};

async function postSelection() {
  const selected = figma.currentPage.selection;

  if (selected.length === 0) {
    figma.ui.postMessage({
      type: 'empty',
      selection: null,
    });
  }

  console.log('sdfds', await schematizeSelection(selected as any));

  figma.ui.postMessage({
    type: 'selectionchange',
    selection: await schematizeSelection(selected as any),
  });
}

async function schematizeSelection(selected: Array<any>) {
  return await Promise.all(
    selected.map(async (node) => {
      return await schematizeNode(node);
    })
  );
}

async function schematizeNode(node) {
  const { isAsset, children: child } = node;
  let structure = {},
    children = [],
    style = {
      universal: {},
    },
    resources = {
      isAsset,
      image: null,
      svg: null,
    };

  // stucture
  const structureSchema = ['id', 'name', 'type', 'characters'];
  for (const key of structureSchema) {
    structure[key] = node[key];
  }

  // style
  const style4Universal = [
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

  for (const key of style4Universal) {
    style.universal[key] = node[key];
  }

  // resources - image
  if (isAsset) {
    resources.image = await node.exportAsync({
      format: 'PNG',
      constraint: {
        type: 'SCALE',
        value: 1,
      },
    });
  }

  // children
  if (child && !isAsset) {
    children = await Promise.all(child.map(schematizeNode));
  }

  return {
    structure,
    style,
    resources,
    children,
  };
}

export default defaultMode;
