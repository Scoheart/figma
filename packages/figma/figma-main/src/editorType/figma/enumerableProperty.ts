function enumerableProperty4All(node) {
  const { children } = node;
  if (children) {
    return {
      ...enumerableProperty(node),
      children: children.map(enumerableProperty4All),
    };
  }
  return enumerableProperty(node);
}

function enumerableProperty(obj: any) {
  const newObj = Object.assign({}, obj);
  for (let property in obj) {
    newObj[property] = obj[property];
  }
  return newObj;
}

async function schematize(enumerableNode) {
  const { isAsset, children } = enumerableNode;
  let structure = {},
    style = {
      universal: {},
    },
    resources = {};

  // stucture
  const structureSchema = ['id', 'name', 'type', 'characters'];
  for (const key of structureSchema) {
    structure[key] = enumerableNode[key];
  }

  if (isAsset) {
    console.log('is assets', enumerableNode);
  }

  if (children) {
    structure['children'] = await Promise.all(children.map(schematize));
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
    style.universal[key] = enumerableNode[key];
  }

  // resources
  // if (isAsset) {
  //   resources['image'] = await enumerableNode.exportAsync({
  //     format: 'PNG',
  //     constraint: {
  //       type: 'SCALE',
  //       value: 1,
  //     },
  //   });
  // }

  return {
    structure,
    style,
    resources,
  };
}