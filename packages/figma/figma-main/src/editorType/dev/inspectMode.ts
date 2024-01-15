const inspectMode = () => {
  figma.showUI('hello figma');
  figma.on('selectionchange', () => {
    console.log("hello figma")
    fetch("http://localhost:8081", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "FRAME",
        children: []
      })
    })
  });
};

function getProperties(obj: object) {
  const arr = Object.getOwnPropertyNames(obj);
  return arr;
}

function enumerableProperty(obj: any) {
  const newObj = {};
  for (let property in obj) {
    newObj[property] = obj[property];
  }
  return newObj;
}

export default inspectMode;
