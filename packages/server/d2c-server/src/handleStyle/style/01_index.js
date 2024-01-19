import { node } from '../node.js';
import { layoutMode } from './layout.js';
import { colorFromFills } from '../../fills.ts/index.js';
import { primaryAxisAlignItems } from './primaryAxisAlignItems.js';
import { counterAxisAlignItems } from './counterAxisAlignItems.js';
import { relativeTransform } from './relativeTransform.js';
import { layoutSizingHorizontal } from './layoutSizingHorizontal.js';
import { layoutSizingVertical } from './layoutSizingVertical.js';

let result = '';
function handleStyle(node) {
    const styles = node['style']['universal'];
    const name = node['structure']['name'];
    const children = node['children'];
    if (children.length > 0) {
        children.map((child) => handleStyle(child));
    }
    function fun(key) {
        switch (key) {
            case 'width':
            case 'height':
                return `${key}:${styles[key]}px` + '\n';
            case 'fills':
                return colorFromFills(styles[key]) + '\n';
            case 'layoutMode':
                return layoutMode(styles[key]) + '\n';

            case 'relativeTransform':
                return relativeTransform(node) + '\n';

            case 'primaryAxisAlignItems':
                if (styles['layoutMode'] !== 'NONE') {
                    return primaryAxisAlignItems(styles[key]) + '\n';
                }
            case 'counterAxisAlignItems':
                if (styles['layoutMode'] !== 'NONE') {
                    return counterAxisAlignItems(styles[key]) + '\n';
                }
            case 'itemSpacing':
                return `column-gap:${styles[key]}px` + '\n';
            case 'layoutSizingHorizontal':
                return layoutSizingHorizontal(styles[key]) + '\n';
            case 'layoutSizingVertical':
                return layoutSizingVertical(styles[key]) + '\n';
            default:
                return key;
        }
    }
    return (result += `.${name}{${Object.keys(styles)
        .map((key) => `${fun(key)};`)
        .join('')}}`);
}

console.log(handleStyle(node));
