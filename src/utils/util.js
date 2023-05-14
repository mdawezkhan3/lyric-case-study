export const sortArrayByTimestamp = (array) => {
  return array.sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timestampB = new Date(b.timestamp);
    return timestampA - timestampB;
  });
}

export const groupArrayByDate = (array) => {
  const groupedObject = array.reduce((obj, item) => {
    const date = item.timestamp.split(",")[0].trim();
    if (!obj[date]) {
      obj[date] = [];
    }
    obj[date].push(item);
    return obj;
  }, {});

  return groupedObject;
}
