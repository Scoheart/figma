const inspectMode =  () => {
    figma.showUI("hello figma")
    figma.on("selectionchange", () => {
        console.log(figma.currentPage.selection[0])
    })
}

export default inspectMode;