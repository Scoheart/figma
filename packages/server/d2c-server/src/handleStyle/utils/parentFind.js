
export function findNodeAndParent(root, targetName, parent = null) {
    if (root.structure.name === targetName) {
        return { node: root, parent: parent };
    }

    for (const child of root.children) {
        const result = findNodeAndParent(child, targetName, root);
        if (result.node) {
            return result;
        }
    }

    return { node: null, parent: null };
}

const { node: son2Node, parent: son2ParentNode } = findNodeAndParent(node, 'son2');

console.log(son2Node); // son2 节点
console.log(son2ParentNode); // son2 的父节点
