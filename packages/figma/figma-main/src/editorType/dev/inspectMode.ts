const inspectMode =  () => {
    figma.showUI("hello figma")
    figma.on("selectionchange", () => {
        console.log(figma.currentPage.selection)
    })
}

export default inspectMode;