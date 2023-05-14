export const parseCSV = (csvContent) => {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const parsedData = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const rowData = {};
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = values[j];
    }
    parsedData.push(rowData);
  }
  return parsedData;
};

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
