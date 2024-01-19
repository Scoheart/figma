import { findNodeWithId } from '../utils/findNodeWithId.js';

export function relativeTransform(node) {
    let result = '';

    if (node.structure.parent === null) {
        // 是顶层元素时，必定是relative
        return (result += 'position:relative;overflow: hidden');
    } else if (findNodeWithId(node.structure.parent).structure.parent === null) {
        if (
            // 如果是第二级节点，并且父节点没有layout布局时，才整子绝父相
            findNodeWithId(node.structure.parent).style.universal.layoutMode === 'NONE'
        ) {
            result += 'position:absolute;overflow: hidden';
            let relativeTransformArr = node.style.universal.relativeTransform;
            result += `left:${relativeTransformArr[0][2]}px; top:${relativeTransformArr[1][2]}px;`;
            return result;
        }
    } else {
        // 如果不是二级元素，就得使用父元素的padding来实现，但是这会影响到父元素的宽高
    }
}
