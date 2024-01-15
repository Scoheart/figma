function enumerableProperty(obj: any) {
  const newObj = {};
  for (let property in obj) {
    newObj[property] = obj[property];
  }
  return newObj;
}
