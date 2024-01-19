

export function findNodeWithId(targetId) {
    if (node.structure.id === targetId) {
        return node;
    }

    if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
            const result = findNodeWithId(targetId);
            if (result) {
                return result;
            }
        }
    }

    return null; 
}
