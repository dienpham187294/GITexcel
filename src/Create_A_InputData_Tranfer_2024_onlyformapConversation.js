import $ from "jquery";
// import sound20 from "../3000tuthongdung/sounds20";
// import T0_linkApi from "../../toolAll/T0_linkApi";

function NextStep(inX) {
  try {
    let rows = inX;
    let Arr1 = rows[0];
    let arr = [];
    rows.forEach((e, i) => {
      if (i > 0) {
        let obj = {};
        Arr1.forEach((ee, i) => {
          obj[ee] = e[i];
        });
        arr.push(obj);
      }
    });
    arr.forEach((e) => {
      delete e["null"];
    });

    return arr;
  } catch (error) {
    // console.log("Lỗi")
    console.log(error);
  }
}

function NextStep_DontUnifile(input) {
  try {
    if (input !== undefined) {
      let output = [];
      input.forEach((e) => {
        output.push(NextStep(e));
      });
      return output;
    } else {
      let input = JSON.parse($("#ResID").text());
      let output = [];
      input.forEach((e) => {
        output.push(NextStep(e));
      });

      $("#ResID").text(JSON.stringify(output));
    }

    // return output
  } catch (error) {
    console.log("Lỗi B0001");
    console.log(error);
  }
}
function fetchData() {
  try {
    let resIDText = $("#ResID").text(); // renamed input1 to resIDText

    let parseDataInput = JSON.parse(resIDText);

    let parseDataInputSet = [];

    parseDataInput.forEach((e) => {
      if (!JSON.stringify(e).includes("id-01")) {
        parseDataInputSet.push(e);
      } else {
        let dataLength = e[0].length; // renamed setLength to dataLength

        let resultArray = [];
        for (let i = 0; i < dataLength / 2; i++) {
          resultArray.push([]);
        }
        e.forEach((element, index) => {
          resultArray.forEach((subArray, subIndex) => {
            subArray.push([element[subIndex * 2], element[subIndex * 2 + 1]]);
          });
        });

        let filteredArray = removeNullArrays(resultArray); // renamed beforefinalRes to filteredArray

        let stringifiedResult = JSON.stringify(filteredArray); // renamed finalRes to stringifiedResult

        for (let i = Math.floor(dataLength / 2) + 2; i >= 0; i--) {
          let indexStr = i < 9 ? "0" + (i + 1) : "" + i; // renamed index to indexStr

          stringifiedResult = stringifiedResult
            .split("id-" + indexStr)
            .join("id")
            .split("content-" + indexStr)
            .join("content-01");
        }

        parseDataInputSet = parseDataInputSet.concat(
          JSON.parse(stringifiedResult)
        );
        // console.log(parseDataInputSet);
      }
    });
    // console.log(JSON.stringify(parseDataInputSet));
    // if (resIDText.includes("id-01")) {
    //   let parsedJson = JSON.parse(resIDText); // renamed inputJson1 to parsedJson
    //   let dataLength = parsedJson[0][0].length; // renamed setLength to dataLength
    //   let resultArray = [];
    //   for (let i = 0; i < dataLength / 2; i++) {
    //     resultArray.push([]);
    //   }

    //   parsedJson[0].forEach((element, index) => {
    //     resultArray.forEach((subArray, subIndex) => {
    //       subArray.push([element[subIndex * 2], element[subIndex * 2 + 1]]);
    //     });
    //   });

    //   let filteredArray = removeNullArrays(resultArray); // renamed beforefinalRes to filteredArray

    //   let stringifiedResult = JSON.stringify(filteredArray); // renamed finalRes to stringifiedResult

    //   for (let i = 0; i < dataLength / 2; i++) {
    //     let indexStr = i < 10 ? "0" + (i + 1) : "" + (i + 1); // renamed index to indexStr
    //     stringifiedResult = stringifiedResult
    //       .split("id-" + indexStr)
    //       .join("id")
    //       .split("content-" + indexStr)
    //       .join("content-01");
    //   }

    //   let nextStepInput = NextStep_DontUnifile(JSON.parse(stringifiedResult)); // renamed input to nextStepInput
    //   let finalArray = [];
    //   nextStepInput.forEach((element, index) => {
    //     finalArray.push(splitContentIntoArrays(element));
    //   });

    //   let processedArray = toPracPot(toOneArray(finalArray)); // renamed resresFNALL01 to processedArray
    //   $("#ResID").text(JSON.stringify(processedArray));
    //   return;
    // }

    let parsedResID = NextStep_DontUnifile(parseDataInputSet); // renamed input to parsedResID

    let finalArray = [];

    parsedResID.forEach((element, index) => {
      finalArray.push(splitContentIntoArrays(element));
    });

    // console.log(JSON.stringify(finalArray));

    let processedArray = toPracPot(toOneArray(finalArray));

    $("#ResID").text(JSON.stringify(processedArray));
  } catch (error) {
    console.log("Error occurred C000001");
    console.log(error);
  }
}

function removeNullArrays(nestedArrays) {
  return nestedArrays.map((array) =>
    array.filter((subArray) => subArray.some((item) => item !== null))
  );
}
function splitContentIntoArrays(inputArray) {
  let result = {}; // Dùng để lưu các mảng tương ứng với content-01, content-02, ..., content-n

  // Lặp qua từng phần tử trong inputArray
  inputArray.forEach((element) => {
    const { id } = element; // Lấy id

    // Lặp qua từng key trong đối tượng element
    Object.keys(element).forEach((key) => {
      if (key.startsWith("content-")) {
        // Lấy chỉ số của content (ví dụ: "01", "02", ...)
        const contentIndex = key.split("-")[1];

        // Nếu mảng tương ứng với contentIndex chưa tồn tại, thì khởi tạo
        if (!result["A" + contentIndex]) {
          result["A" + contentIndex] = [];
        }
        // Thêm phần tử vào mảng tương ứng
        result["A" + contentIndex].push({ id: id, content: element[key] });
      }
    });
  });

  return result;
}

function toOneArray(arr) {
  let res = [];

  arr.forEach((e) => {
    let keySets = Object.keys(e);
    keySets.forEach((key) => {
      res.push(e[key]);
    });
  });

  return res;
}

function toPracPot(arr) {
  let res = [];
  arr.forEach((e, i) => {
    res.push(groupByPrefiToArrayPure(groupByPrefix(e)));
  });

  return res;
}
function groupByPrefix(data) {
  // console.log(data);
  const groupedData = {};

  data.forEach((item) => {
    let keySets = item.id.split("-"); // Tách id thành các phần bằng dấu gạch ngang (-)

    // Nếu chưa có nhóm theo keySets[0], tạo một object rỗng
    if (!groupedData["id" + keySets[0]]) {
      groupedData["id" + keySets[0]] = {}; // Đây là object thay vì push vào array
    }

    // Nếu chưa có nhóm theo keySets[1], tạo một array rỗng cho nhóm đó
    if (!groupedData["id" + keySets[0]][keySets[1]]) {
      groupedData["id" + keySets[0]][keySets[1]] = []; // Tạo array để chứa các phần tử của nhóm thứ 2
    }

    // Thêm item vào nhóm tương ứng
    groupedData["id" + keySets[0]][keySets[1]].push(item);
  });

  // console.log(JSON.stringify(groupedData));

  return groupedData;
}

function groupByPrefiToArrayPure(data) {
  // console.log(data);
  let res = [];
  let ketSets = Object.keys(data);
  ketSets.forEach((e) => {
    res.push(data[e]);
  });
  let res2 = [];

  res.forEach((e) => {
    let resT = [];
    let keySets01 = Object.keys(e);
    keySets01.forEach((e1) => {
      resT.push(conversationBox(e[e1]));
    });
    res2.push(resT);
  });
  return res2;
}
let nextSubmistList = [];
function conversationBox(arr) {
  let res = {
    img: [],
    gender: [],
    sayFirst: [],
    weSay: [],
    theySay: [],
    submitList: [],
    weCanSayList: [],
    pickingList: [],
    action: [],
    reward: [],
    notify: [],
    theySaySubmitList: [],
    NotifyWeSay: [],
    Error: [],
    guideTable: [],
    detailTable: [],
    commonSt: [],
    purpose: [],
    tablePicking: [],
  };
  if (nextSubmistList.length !== 0) {
    res.submitList = res.submitList.concat(nextSubmistList);
    nextSubmistList = [];
  }

  arr.forEach((e) => {
    let i = false;
    if (e.content === null) {
      console.log(e.id, "D01 NULLLLLLLL");
      console.log(e.content);
      return;
    } else if (
      !(e.content + "").includes("[") &&
      (e.content + "").toLowerCase().includes("null")
    ) {
      console.log(e.id, "ERROR A01");
      console.log(e.content);
      return;
    }

    if (e.id.includes("img")) {
      res.img.push(e.content);
      i = true;
    }
    if (e.id.includes("gender")) {
      res.gender.push(e.content);
      i = true;
    }
    if (e.id.includes("sayFirst")) {
      res.sayFirst.push(e.content);
      i = true;
    }
    if (e.id.includes("nextSubmitList")) {
      nextSubmistList.push(e.content);
      i = true;
    }
    if (e.id.includes("purpose")) {
      res.purpose.push(e.content);
      i = true;
    }

    if (e.id.includes("weCanSayList")) {
      let weCanSayList = trimArrayElements(e.content.split(";"));
      res.weCanSayList = res.weCanSayList.concat(weCanSayList);
      i = true;
    }
    if (e.id.includes("weSay")) {
      res.NotifyWeSay.push(e);
      // res.weSay.push(e.content);
      i = true;
    }

    if (e.id.includes("theySay")) {
      res.theySaySubmitList.push(e);
      i = true;
    }
    if (e.id.includes("submitList")) {
      res.theySaySubmitList.push(e);
      i = true;
    }
    if (e.id.includes("guideTable")) {
      try {
        let guideInput = JSON.parse(e.content);
        let guideCheckSets = [];
        let guideSets = [];

        guideInput[0].forEach((row) => {
          // console.log(row);
          // Check if the first element (ID) exists in guideCheckSets
          if (!guideCheckSets.includes(row[0])) {
            guideCheckSets.push(row[0]); // Add ID to guideCheckSets
            guideSets.push([]); // Create a new array for this ID
          }
          // Push the rest of the elements except the ID to the last guideSets array
          guideSets[guideSets.length - 1].push(row.slice(1));
          // row.forEach((e1) => {
          //   console.log(e1);

          // });
        });

        // Concatenate guideSets to res.guideTable
        res.guideTable = res.guideTable.concat(guideSets);
      } catch (error) {
        console.log(error);
      }

      i = true;
    }
    if (e.id.includes("detailTable")) {
      try {
        let guideInputA = JSON.parse(e.content);
        let guideCheckSetsA = [];
        let guideSetsA = [];

        guideInputA[0].forEach((row) => {
          // console.log(row);
          // Check if the first element (ID) exists in guideCheckSets
          if (!guideCheckSetsA.includes(row[0])) {
            guideCheckSetsA.push(row[0]); // Add ID to guideCheckSets
            guideSetsA.push([]); // Create a new array for this ID
          }
          // Push the rest of the elements except the ID to the last guideSets array
          guideSetsA[guideSetsA.length - 1].push(row.slice(1));
          // row.forEach((e1) => {
          //   console.log(e1);

          // });
        });

        // Concatenate guideSets to res.detailTable
        res.detailTable = res.detailTable.concat(guideSetsA);
      } catch (error) {
        console.log(error);
      }

      i = true;
    }

    if (e.id.includes("tablePicking")) {
      try {
        let guideInputA = JSON.parse(e.content);
        let guideCheckSetsA = [];
        let guideSetsA = [];

        guideInputA[0].forEach((row) => {
          // console.log(row);
          // Check if the first element (ID) exists in guideCheckSets
          if (!guideCheckSetsA.includes(row[0])) {
            guideCheckSetsA.push(row[0]); // Add ID to guideCheckSets
            guideSetsA.push([]); // Create a new array for this ID
          }
          // Push the rest of the elements except the ID to the last guideSets array
          guideSetsA[guideSetsA.length - 1].push(row.slice(1));
          // row.forEach((e1) => {
          //   console.log(e1);

          // });
        });

        // Concatenate guideSets to res.tablePicking
        res.tablePicking = res.tablePicking.concat(guideSetsA);
      } catch (error) {
        console.log(error);
      }

      i = true;
    }

    if (e.id.includes("commonSt")) {
      res.commonSt.push(e);
      i = true;
    }

    if (e.id.includes("pickingList")) {
      let listT = trimArrayElements(e.content.split(";"));
      res.pickingList.push(listT);
      i = true;
    }

    if (e.id.includes("notify")) {
      res.NotifyWeSay.push(e);
      // res.notify.push(e.content);
      i = true;
    }
    if (e.id.includes("action")) {
      res.action.push(e.content);
      i = true;
    }
    if (e.id.includes("reward")) {
      res.reward.push(e.content);
      i = true;
    }
    if (!i) {
      res.Error.push(" Cảnh báo lỗi ID: " + e.id);
      console.log("Lỗi", e.id);
    }
  });

  let iCheckCount = 0;
  let setsChecks = [];
  try {
    if (res["theySaySubmitList"].length > 0) {
      let contentT = res["theySaySubmitList"][0].content;
      iCheckCount = getRandomNumber(
        trimArrayElements(contentT.split(";")).length
      );

      res["theySaySubmitList"].forEach((e) => {
        if (e.id.includes("theySay")) {
          let arr = trimArrayElements(e.content.split(";"));
          setsChecks.push(arr.length);

          if (arr[iCheckCount].includes("\\")) {
            res["theySay"] = res["theySay"].concat(
              trimArrayElements(arr[iCheckCount].split("\\"))
            );
            // Handle the case where the element contains a backslash
          } else {
            res["theySay"].push(arr[iCheckCount]);
          }

          // res["theySay"].push(arr[iCheckCount]);
        }
        if (e.id.includes("submitList")) {
          let arr = trimArrayElements((e.content + "").split(";"));
          setsChecks.push(arr.length);
          res["submitList"].push(arr[iCheckCount]);
        }
      });
    }
  } catch (error) {
    console.log("TheySay");
  }
  delete res["theySaySubmitList"];
  let iCheckCountNotifyWeSay = 0;
  let setsChecksNotifyWeSay = [];
  try {
    if (res["NotifyWeSay"].length > 0) {
      let contentT = res["NotifyWeSay"][0].content;
      iCheckCountNotifyWeSay = getRandomNumber(
        trimArrayElements(contentT.split(";")).length
      );

      res["NotifyWeSay"].forEach((e) => {
        if (e.id.includes("notify")) {
          let arr = trimArrayElements(e.content.split(";"));
          setsChecksNotifyWeSay.push(arr.length);
          res["notify"].push(arr[iCheckCountNotifyWeSay]);
        }
        if (e.id.includes("weSay")) {
          let arr = trimArrayElements(e.content.split(";"));
          setsChecksNotifyWeSay.push(arr.length);

          if (arr[iCheckCountNotifyWeSay].includes("\\")) {
            res["weSay"] = res["weSay"].concat(
              trimArrayElements(arr[iCheckCountNotifyWeSay].split("\\"))
            );
            // Handle the case where the element contains a backslash
          } else {
            res["weSay"].push(arr[iCheckCountNotifyWeSay]);
          }
        }
      });
    }
  } catch (error) {
    console.log("We Say they Say");
  }

  if (res.submitList.length === 0) {
    res.Error.push("Cảnh báo lỗi Thiếu submitList.");
  }

  if (res.weSay.length === 0) {
    res.weSay.push("Hi");
  }
  if (res.theySay.length === 0) {
    res.theySay.push("Hi");
  }

  delete res["NotifyWeSay"];

  let keySets = Object.keys(res);
  keySets.forEach((e) => {
    if (res[e].length === 0) {
      delete res[e];
    }
  });

  return res;
}

export { fetchData };

function trimArrayElements(array) {
  try {
    return array
      .filter((element) => element !== null && element !== "") // Bước 1: loại bỏ các phần tử null
      .map((element) => {
        if (typeof element === "string") {
          return element.trim(); // Cắt bỏ khoảng trắng đầu và cuối của chuỗi
        }
        if (typeof element === "number") {
          return element + ""; // Chuyển số thành chuỗi
        }
        return element;
      });
  } catch (error) {
    console.log(JSON.stringify(array));
  }
}

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function removeNullElements(arr) {
  // Helper function to remove nulls from nested arrays
  const cleanArray = (data) => {
    return data.map((row) =>
      row.filter((cell) => cell !== null && cell !== undefined && cell !== "")
    );
  };

  // Main logic to handle the array input
  if (arr && Array.isArray(arr)) {
    try {
      return arr.map((tableData) => cleanArray(tableData));
    } catch (error) {
      console.error("Error in removeNullElements:", error);
      return [];
    }
  } else {
    return []; // Fallback when no data is passed or arr is not an array
  }
}
