import $ from "jquery";

function getDataFromScreen() {
  try {
    return JSON.parse($("#ResID").text());
  } catch (error) {
    pushDataToScreen(["Lỗi"]);
    console.error("Error parsing data from screen:", error);
    return [];
  }
}

function pushDataToScreen(data) {
  try {
    $("#ResID").text(JSON.stringify(data));
  } catch (error) {
    console.error("Error pushing data to screen:", error);
  }
}

function unifyOutside(input) {
  try {
    let output = [];
    let numOfArrays = input.length;
    let numOfElements = input[0].length;

    for (let m = 0; m < numOfElements; m++) {
      let combinedArray = [];
      for (let j = 0; j < numOfArrays; j++) {
        combinedArray = combinedArray.concat(input[j][m]);
      }
      output.push(combinedArray);
    }

    return output;
  } catch (error) {
    pushDataToScreen(["Lỗi"]);
    console.error("Error in unifyOutside function:", error);
  }
}

function processArrayGetMap(mappingArray) {
  const input = mappingArray[0];
  let resultHD = [];
  let resultTB = [];
  let resultIF = [];
  let resultOthers = [];

  input.forEach((element, i) => {
    try {
      if (element !== null) {
        if (element.includes("HD")) {
          resultHD.push(i);
        } else if (element.includes("TB")) {
          resultTB.push(i);
        } else if (element.includes("IF")) {
          resultIF.push(i);
        } else {
          resultOthers.push(i);
        }
      }
    } catch (error) {}
  });

  return [resultIF, resultHD, resultTB, resultOthers];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function transformInputArray(inputArray) {
  if (inputArray.length === 0) return;

  const mapping = processArrayGetMap(inputArray);

  let res = [[], [], [], [], []];
  inputArray.forEach((e) => {
    function getElements(indices) {
      return indices.map((index) => e[index]);
    }
    const resultIF = getElements(mapping[0]);
    const resultHD = getElements(mapping[1]);
    const resultTB = getElements(mapping[2]);
    const resultOthers = getElements(mapping[3]);

    res[0].push(resultIF);
    res[1].push(resultHD);
    res[2].push(resultTB);
    res[3].push(resultOthers);
  });

  let IF = removeAllNullObjects(nextStepOutside(res[0]));
  let HD = removeAllNullObjects(nextStepOutside(res[1]));
  let TB = extractNonNullValuesByIndex(
    removeAllNullObjects(nextStepOutside(res[2]))
  );
  let charactor = AllConvertData(nextStepOutside(res[3]));
  let SEOParce = res[4][0];
  try {
    SEOParce = JSON.parse(res[4][0]);
  } catch (error) {}
  const ListenList = shuffleArray(extractAndConcat(charactor));

  function extractAndConcat(charactor) {
    const resultSet = new Set(); // Sử dụng Set để loại bỏ phần tử trùng lặp

    charactor.forEach((char) => {
      if (char.data) {
        char.data.forEach((item) => {
          if (item.qs) {
            item.qs.forEach((q) => resultSet.add(q));
          }
          if (item.aw) {
            item.aw.forEach((a) => resultSet.add(a));
          }
        });
      }
    });

    return Array.from(resultSet); // Chuyển Set thành Array để trả về
  }

  return {
    id: IF[0].IFname.split(" ").join("-"),
    ListenList,
    SEO: toSEOparce(IF[0]),
    HDTB: {
      IF: toOUTSeo(IF[0]),
      HD: HD,
      TB: TB,
    },
    charactor: shuffleArray(charactor),
  };
}
function toSEOparce(IF) {
  try {
    return JSON.parse(IF.IFdes);
  } catch (error) {
    return IF;
  }
}
function toOUTSeo(IF) {
  try {
    const { IFdes, ...rest } = IF;
    return rest;
  } catch (error) {
    return IF;
  }
}

function removeAllNullObjects(arr) {
  return arr.filter((obj) => {
    // Kiểm tra nếu tất cả giá trị trong object đều là null
    return !Object.values(obj).every((value) => value === null);
  });
}

function nextStepOutside(rows) {
  try {
    if (rows.length === 0) return [];

    let headers = rows[0];
    let formattedData = rows.slice(1).map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      delete obj["null"];
      return obj;
    });

    return formattedData;
  } catch (error) {
    console.error("Error in nextStepOutside function:", error);
    return [];
  }
}

function guideToUse() {
  pushDataToScreen([
    "Hướng dẫn sử dụng: Dành cho HD;TB và others",
    "unifyOutside: Excel to [[],...]",
  ]);
}

function transformObj(obj) {
  const transformedObj = {};
  const tempDict = {};

  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split("-");
    if (parts.length > 2 && !isNaN(parts[0])) {
      const mainKey = parts[0];
      const subKey = parts.slice(1).join("-");

      if (!tempDict[mainKey]) {
        tempDict[mainKey] = {};
      }

      tempDict[mainKey][subKey] = value;
    } else {
      transformedObj[key] = value;
    }
  }

  for (const [mainKey, subDict] of Object.entries(tempDict)) {
    transformedObj[mainKey] = subDict;
  }

  return transformedObj;
}

function transformObjToArray(obj) {
  const transformedObj = {};

  for (const [key, value] of Object.entries(obj)) {
    const [prefix] = key.split("-");

    if (!transformedObj[prefix]) {
      transformedObj[prefix] = [];
    }

    transformedObj[prefix].push(value);
  }

  return transformedObj;
}

function getAllSubmits(objArray) {
  let submits = [];

  objArray.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key.startsWith("submit")) {
        submits = submits.concat(value);
      }
    });
  });

  return submits;
}

function AllConvertData(data) {
  let res = [];
  data.forEach((e) => {
    let converted = transformObj(e);
    res.push(converted);
  });
  return transformObjects(res);
}

function transformObjects(objArray) {
  return objArray.map((obj) => {
    const transformedObj = {};
    const data = [];

    for (const [key, value] of Object.entries(obj)) {
      if (/^\d+$/.test(key)) {
        const nestedObj = {};
        for (const [subKey, subValue] of Object.entries(value)) {
          if (subValue !== null) {
            nestedObj[subKey] = subValue;
          }
        }
        if (Object.keys(nestedObj).length > 0) {
          data.push(nestedObj);
        }
      } else {
        transformedObj[key] = value;
      }
    }

    transformedObj.data = data.map((obj) => transformObjToArray(obj));
    transformedObj.submit = getAllSubmits(transformedObj.data);

    return transformedObj;
  });
}

function extractNonNullValuesByIndex(data) {
  if (data.length === 0) return [];

  const numOfKeys = Object.keys(data[0]).length;
  const result = Array.from({ length: numOfKeys }, () => []);

  for (let i = 0; i < numOfKeys; i++) {
    data.forEach((row) => {
      const value = Object.values(row)[i];
      if (value !== null) {
        result[i].push(value);
      }
    });
  }

  return result;
}

function unifyOneSet() {
  const input = getDataFromScreen();
  pushDataToScreen(unifyOutside(input));
}

function transOneSet() {
  const inputdata = getDataFromScreen();
  const res = transformInputArray(inputdata);
  pushDataToScreen(res);
}
function transMultiSet() {
  const inputdata = getDataFromScreen();
  let res = [];
  inputdata.forEach((e) => {
    res.push(transformInputArray(e));
  });
  pushDataToScreen(res);
}

export { guideToUse, transMultiSet };
