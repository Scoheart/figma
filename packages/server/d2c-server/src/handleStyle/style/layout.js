export const layoutMode = (layoutMode, node) => {
    let result = '';
    if (layoutMode !== 'NONE') {
        return (result += 'display:flex;');
    }
    switch (layoutMode) {
        case 'NONE':
            return result;
        case 'HORIZONTAL':
            return (result += 'flex-direction:row');
        case 'VERTICAL':
            return (result += 'flex-direction:column');
    }
};
