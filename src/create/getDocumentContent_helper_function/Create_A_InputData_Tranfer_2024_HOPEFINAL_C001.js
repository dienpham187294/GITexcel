import $ from "jquery";
import {
  getDataFromScreen,
  pushDataToScreen,
  pushDataToScreen_02,
  pushDataToScreen_HD,
} from "./C001_with_screen";

// import {
//   STEP_01_get_all_sentence_f_sreen_and_fetch_to_table_IDANDST,
//   STEP_02_f_table_IDANDST_then_A1_A2_to_table_HD_JSON,
//   STEP_3_get_TableHD_f_json_same_step_02,
// } from "./C001_child_001";

// import * as FN_C001_001 from "./C001_child_001";

import { guideToUse_C001 } from "./C001_guild_to_do";
let errorSetCheck = [];
const fn_test = {
  func1: () => console.log("Function 1 executed"),
  func2: function () {
    alert("Function 2 executed");
  },
  func3() {
    console.log("Function 3 executed");
  },
};

let countAllSentece = [];

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
  let resultTV = [];
  let resultIPA = [];
  let resultTB = [];
  let resultIF = [];
  let resultOthers = [];

  input.forEach((element, i) => {
    try {
      if (element !== null) {
        if (element.includes("QS")) {
        } else if (element.includes("HD-B")) {
        } else if (element.includes("HD")) {
          resultHD.push(i);
        } else if (element.includes("TV")) {
          resultTV.push(i);
        } else if (element.includes("IP")) {
          resultIPA.push(i);
        } else if (element.includes("TB")) {
          resultTB.push(i);
        } else if (element.includes("IF") || element.includes("If")) {
          resultIF.push(i);
        } else {
          resultOthers.push(i);
        }
      }
    } catch (error) {}
  });

  return [resultIF, resultHD, resultTB, resultOthers, resultTV, resultIPA];
}

function shuffleArray_inorder_of_type(charactor, typeSets) {
  let characterSets_af_suffer = shuffleArray(charactor);
  let resSets = {};
  typeSets.forEach((e) => {
    resSets[e] = [];
    characterSets_af_suffer.forEach((e1) => {
      if (e1.type === e) {
        resSets[e].push(e1);
      }
    });
  });

  let set_step_get_variety = [];
  let i = 0;

  while (true) {
    let temp_set = [];
    let iCheck = false;

    typeSets.forEach((e) => {
      if (resSets[e][i]) {
        iCheck = true;
        temp_set.push(resSets[e][i]);
      }
    });

    if (temp_set.length > 0) {
      set_step_get_variety.push(temp_set);
    }

    if (!iCheck) {
      break;
    }

    i++;
  }
  let final_sets = [];
  set_step_get_variety.forEach((e) => {
    final_sets = final_sets.concat(shuffleArray(e));
  });

  return final_sets;
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

  let res = [[], [], [], [], [], [], []];
  inputArray.forEach((e) => {
    function getElements(indices) {
      return indices.map((index) => e[index]);
    }
    const resultIF = getElements(mapping[0]);
    const resultHD = getElements(mapping[1]);
    const resultTB = getElements(mapping[2]);
    const resultOthers = getElements(mapping[3]);
    const resultTV = getElements(mapping[4]);
    const resultIPA = getElements(mapping[5]);
    res[0].push(resultIF);
    res[1].push(resultHD);
    res[2].push(resultTB);
    res[3].push(resultOthers);
    res[4].push(resultTV);
    res[5].push(resultIPA);
  });

  let IF = removeAllNullObjects(nextStepOutside(res[0]));

  console.log(JSON.stringify(IF));

  let HD = removeAllNullObjects(nextStepOutside(res[1]));
  let TV = removeAllNullObjects(nextStepOutside(res[4]));
  let IP = removeAllNullObjects(nextStepOutside(res[5]));
  let TB = extractNonNullValuesByIndex(
    removeAllNullObjects(nextStepOutside(res[2]))
  );
  let charactor = AllConvertData(nextStepOutside(res[3]));
  let SEOParce = res[4][0];
  try {
    SEOParce = JSON.parse(res[4][0]);
  } catch (error) {}

  let get_unique_listenSets_a_typeSets = extractAndConcat(charactor);
  const ListenList = [];
  // get_unique_listenSets_a_typeSets[0];
  const typeSets = get_unique_listenSets_a_typeSets[1];

  function extractAndConcat(characters) {
    const uniqueSet = new Set(); // Use Set to remove duplicate elements
    const uniqueSet_type = new Set(); // Use Set to remove duplicate elements
    characters.forEach((character) => {
      if (character.type) {
        uniqueSet_type.add(character.type);
      }

      if (character.data) {
        // Add `fsp` if it exists
        if (character.fsp) {
          countAllSentece.push(character.fsp);
          uniqueSet.add(character.type + "_" + character.fsp);
        }

        // Iterate through `data` array
        character.data.forEach((item) => {
          // Add `qs` elements if they exist
          if (item.qs) {
            item.qs.forEach((question) => {
              countAllSentece.push(question);
              uniqueSet.add(character.type + "_" + question);
            });
          }

          // Add `aw` elements if they exist
          if (item.aw) {
            item.aw.forEach((answer) => {
              countAllSentece.push(answer);
              uniqueSet.add(character.type + "_" + answer);
            });
          }
        });
      }
    });

    return [Array.from(uniqueSet), Array.from(uniqueSet_type)]; // Convert Set to Array for output
  }

  ///////////THEM MỚI ĐỠ PHẢI THÊM YES NO WRON
  // charactor.forEach((e) => {
  //   if (e.data) {
  //     try {
  //       e.data.forEach((e1) => {
  //         if (e1.qs.includes("Yes") && e1.submit.includes("FN01")) {
  //           e.data.push({
  //             qs: ["No"],
  //             action: ["WRONG"],
  //           });
  //         }
  //         if (e1.qs.includes("No") && e1.submit.includes("FN01")) {
  //           e.data.push({
  //             qs: ["Yes"],
  //             action: ["WRONG"],
  //           });
  //         }
  //       });
  //     } catch (error) {}
  //   }
  // });

  let id_f_excel_to_total_form = "thuc-hanh-hoc-noi-dung";
  let name_f_excel_to_total_form = "Thực hành nội dung";
  try {
    if (IF[0].IFname) {
      id_f_excel_to_total_form = removeVietnameseAccents(
        IF[0].IFname.split(" ").join("-")
      );
      name_f_excel_to_total_form = IF[0].IFname;
    } else {
      id_f_excel_to_total_form = removeVietnameseAccents(
        IF[0].Ifname.split(" ").join("-")
      );
      name_f_excel_to_total_form = IF[0].Ifname;
    }
  } catch (error) {}
  /////////////THEM MỚI ĐỠ PHẢI THÊM YES NO WRONG

  return {
    id: id_f_excel_to_total_form,
    charactor: charactor,
    ListenList,
    typeSets,
    SEO: toSEOparce(name_f_excel_to_total_form, IF),
    HDTB: {
      IF: toOUTSeo(IF[0]),
      HD: HD,
      TB: TB,
      TV: TV,
      IPA: IP,
    },
  };
}
function toSEOparce(name, IF) {
  try {
    return {
      seo: {
        metaTitle: name,
        metaDescription: "Thực sử dụng các mẫu câu đơn giản để hỏi và trả lời.",
        keywords: ["tiếng Anh A1", "hỏi và trả lời", "10.000 lượt nghe nói"],
      },
    };
    return JSON.parse(IF.IFdes);
  } catch (error) {
    return IF;
  }
}
function toOUTSeo(IF) {
  try {
    // const { IFdes, ...rest } = IF;
    return IF;
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
        submits = submits.concat(value + "");
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

function checkStringInArray(inputString, array) {
  // Duyệt qua từng phần tử của mảng
  for (let obj of array) {
    // Kiểm tra nếu giá trị st của phần tử trùng với inputString
    if (obj.st === inputString) {
      return [true, obj]; // Nếu trùng, trả về đối tượng chứa st
    }
  }
  return [false]; // Nếu không trùng, trả về false
}

function transMultiSet() {
  const inputdata = getDataFromScreen();
  let res = [];
  inputdata.forEach((e) => {
    res.push(transformInputArray(e));
  });
  let i = 0;
  let alladdId = [];
  let iCount_female = 0;
  let iCount_male = 0;
  const langIDFemale = [
    101,
    //  103, 105, 107
  ];
  const langIDMale = [
    102,
    //  104, 106, 108
  ];

  res.forEach((e) => {
    e.charactor = e.charactor.filter((e1) => e1.gender !== null);
  });

  res.forEach((e, index_total) => {
    let RepresentativeCode = e.HDTB.IF["IF-audiocode"]
      ? e.HDTB.IF["IF-audiocode"]
      : "";

    e.charactor.forEach((eChar, iChar) => {
      let langid = "101";
      let index_to_random = index_total;
      if (eChar.gender === "female") {
        langid = langIDFemale[index_to_random % 1];
        // iCount_female++;
      }
      if (eChar.gender === "male") {
        langid = langIDMale[index_to_random % 1];
        // iCount_male++;
      }

      if (eChar.fsp !== undefined) {
        alladdId.push({
          text: eChar.fsp,
          audioCode: RepresentativeCode + "a" + i,
          lang: langid,
        });
        eChar.fspSets = [
          {
            st: eChar.fsp,
            id: RepresentativeCode + "a" + i,
            // lang: langid,
          },
        ];
        i++;
      }
      if (eChar.data !== undefined) {
        eChar.data.forEach((eConver) => {
          if (eConver.aw !== undefined) {
            eConver.aw01 = [];
            eConver.aw.forEach((eQsSentence) => {
              alladdId.push({
                text: eQsSentence,
                audioCode: RepresentativeCode + "a" + i,
                lang: langid,
              });
              eConver.aw01.push({
                st: eQsSentence,
                id: RepresentativeCode + "a" + i,
                // lang: langid,
              });
              i++;
            });
          }
        });
      }
    });
  });

  let UP_01 = ["Z"];
  let UP_02 = ["X", "H"];
  res.forEach((e) => {
    e.charactor_01 = shuffleArray_inorder_of_type(e.charactor, e.typeSets);

    let Normal_sets = [];
    let UP_01_sets = [];
    let UP_02_sets = [];

    e.charactor_01.forEach((e1) => {
      let n = false;

      // Check if e1.type matches any value in UP_01
      UP_01.forEach((e2) => {
        if (e1.type.includes(e2)) {
          n = true;
          UP_01_sets.push(e1);
        }
      });

      // Check if e1.type matches any value in UP_02
      UP_02.forEach((e2) => {
        if (e1.type.includes(e2)) {
          n = true;
          UP_02_sets.push(e1);
        }
      });

      // If matches were found, add e1 to Normal_sets
      if (!n) {
        Normal_sets.push(e1);
      }
    });

    delete e.charactor;
    e.charactor = Normal_sets;
    e.charactor_UP_01 = UP_01_sets;
    e.charactor_UP_02 = UP_02_sets;
    delete e.charactor_01;
  });

  alladdId.forEach((e) => {
    e.rate = 0.8;
  });

  let checkStAndLang = [];
  let deleteGET = [];

  alladdId.forEach((e, index) => {
    // Tìm kiếm nếu đã tồn tại phần tử với text + lang trùng
    let found = checkStAndLang.find((item) => item.text === e.text + e.lang);

    // Nếu tìm thấy phần tử trùng, thêm audioCode vào set của phần tử đó và loại bỏ phần tử khỏi alladdId
    if (found) {
      found.set.push(e.audioCode);
    } else {
      // Nếu không tìm thấy, thêm một phần tử mới vào checkStAndLang
      checkStAndLang.push({
        id: e.audioCode,
        text: e.text + e.lang,
        set: [e.audioCode],
      });
      deleteGET.push({
        audioCode: e.audioCode,
        text: e.text,
        lang: e.lang,
        rate: 0.75,
      });
    }
  });

  checkStAndLang = checkStAndLang.filter((item) => item.set.length >= 2);

  // console.log(JSON.stringify(checkStAndLang));

  console.log(
    "LENGTH:________________",
    deleteGET.length,
    "=========",
    checkStAndLang.length
  );
  let stringOfres = JSON.stringify(res);

  checkStAndLang.forEach((e) => {
    e.set.forEach((e1) => {
      stringOfres = stringOfres.split('"' + e1 + '"').join('"' + e.id + '"');
    });
  });

  pushDataToScreen_02(deleteGET);
  pushDataToScreen(JSON.parse(stringOfres));
  countWords(countAllSentece);
}

function f_excel_after_unifileandNext_t_table_4_copy() {
  const data = getDataFromScreen();
  const keysSet = Object.keys(data[0]);

  let res_HD = [];

  let res_no_HD = [];

  data.forEach((e) => {
    let objSets = helper_fn.splitObject(e);
    res_HD.push(objSets.hdKeys);
    res_no_HD.push(objSets.otherKeys);
  });

  pushDataToScreen_02(replaceHDAll(res_no_HD, res_HD));
}

export {
  guideToUse_C001,
  transMultiSet,
  f_excel_after_unifileandNext_t_table_4_copy,

  // STEP_01_get_all_sentence_f_sreen_and_fetch_to_table_IDANDST,
  // STEP_02_f_table_IDANDST_then_A1_A2_to_table_HD_JSON,
  // STEP_3_get_TableHD_f_json_same_step_02,
  // FN_C001_001,
  fn_test,
};
function splitObject(obj) {
  const hdKeys = {};
  const otherKeys = {};

  Object.keys(obj).forEach((key) => {
    if (key.startsWith("HD-")) {
      hdKeys[key] = obj[key];
    } else if (key.startsWith("AQS")) {
    } else if (key.startsWith("QS")) {
      otherKeys[key] = obj[key];
    }
  });

  return { hdKeys, otherKeys };
}

function countCharacterN(str, n) {
  return str.split(n).length - 1;
}
function extractParenthesesContent(str) {
  const regex = /\((.*?)\)/g; // Biểu thức chính quy để tìm các nội dung trong dấu ngoặc đơn
  let matches = [];
  let match;

  // Duyệt qua tất cả các kết quả khớp
  while ((match = regex.exec(str)) !== null) {
    matches.push({ id: "(" + match[1] + ")", index: match[1].split(";") }); // Thêm nội dung trong dấu ngoặc đơn vào mảng
  }

  return matches;
}

function replaceHDAll(res_no_HD, res_HD) {
  const result = [];
  // res_no_HD, res_HD;

  const keySets_o_noHD = Object.keys(res_no_HD[0]);

  let res_no_HD_after_parce_newsets = [];

  res_no_HD.forEach((e) => {
    let stringCheck = JSON.stringify(e);

    let count_01 = countCharacterN(stringCheck, "[");
    let count_02 = countCharacterN(stringCheck, "]");
    let count_03 = countCharacterN(stringCheck, "(");
    let count_04 = countCharacterN(stringCheck, ")");
    let count_05 = countCharacterN(stringCheck, ";");
    // console.log(stringCheck, count_01, count_02, count_03, count_04);
    if (count_01 !== count_02) {
      errorSetCheck.push(e.type + "__Số lượng [] không tương xứng");
    }
    if (count_03 !== count_04) {
      errorSetCheck.push(e.QS00 + "__Số lượng () không tương xứng");
    }
    if (count_05 !== 0 && count_05 % count_03 !== 0) {
      errorSetCheck.push(e.QS00 + "__Số lượng ; không tương xứng");
    }
    if (count_03 > 0 && count_05 > 0) {
      let ReplaceKeysSets = extractParenthesesContent(stringCheck);
      console.log(ReplaceKeysSets);
      let n = 0;
      while (ReplaceKeysSets[0].index[n]) {
        let strNew = stringCheck;

        ReplaceKeysSets.forEach((e704) => {
          strNew = strNew.split(e704.id).join(e704.index[n]);
        });
        res_no_HD_after_parce_newsets.push(JSON.parse(strNew));
        n++;
      }
    } else {
      res_no_HD_after_parce_newsets.push(JSON.parse(stringCheck));
    }
  });

  console.log(JSON.stringify(errorSetCheck));

  let checkExistSetsOfID = [];

  res_no_HD_after_parce_newsets.forEach((eNoHD) => {
    res_HD.forEach((eHD, iHD) => {
      if (eHD["HD-01"] && eNoHD.type !== null) {
        let countNULL = false;
        let obj_tempGet = { fileMark: "", AQS00: "", stt: "" };

        keySets_o_noHD.forEach((eKeyNoHD) => {
          if (eKeyNoHD.startsWith("QS")) {
            let stringTemp = eNoHD[eKeyNoHD] || "";

            Object.keys(eHD).forEach((keyDH, iDH) => {
              try {
                let check_01 = "[" + keyDH + "]";

                let check_02 = "[" + keyDH + "-AB]";

                let check_03 = "[" + keyDH + "-AC]";

                if (stringTemp.includes(check_02)) {
                  if (eHD[keyDH] === null) {
                    countNULL = true;
                  }
                  stringTemp = stringTemp
                    .split(check_02)
                    .join(
                      res_HD[Math.floor(iHD / 4) * 4 + ((iHD + 1) % 4)][keyDH]
                    );
                }
                if (stringTemp.includes(check_03)) {
                  if (eHD[keyDH] === null) {
                    countNULL = true;
                  }
                  stringTemp = stringTemp
                    .split(check_03)
                    .join(
                      res_HD[Math.floor(iHD / 4) * 4 + ((iHD + 2) % 4)][keyDH]
                    );
                }

                if (stringTemp.includes(check_01)) {
                  if (eHD[keyDH] === null) {
                    countNULL = true;
                  }
                  stringTemp = stringTemp.split(check_01).join(eHD[keyDH]);
                }

                stringTemp = stringTemp
                  .split(".,")
                  .join(",")
                  .split(".?")
                  .join("?")
                  .split(". and")
                  .join(" and")
                  .split(", H")
                  .join(", h")
                  .split(", S")
                  .join(", s")
                  .split(" _")
                  .join("")
                  .split("_")
                  .join("");
              } catch (error) {}
            });

            if (stringTemp.includes("REMOVE01")) {
              stringTemp = stringTemp
                .split("REMOVE01")
                .join("")
                .split(" She ")
                .join(" ")
                .split(" He ")
                .join(" ")
                .split(" Her ")
                .join(" ")
                .split(" His ")
                .join(" ");
            }

            obj_tempGet["A" + eKeyNoHD] = stringTemp;

            if (eNoHD[eKeyNoHD]) {
              // obj_tempGet[eKeyNoHD] = eNoHD[eKeyNoHD];
            }
          } else {
            obj_tempGet["A" + eKeyNoHD] = eNoHD[eKeyNoHD];
          }
        });

        if (!countNULL && obj_tempGet.AQS00) result.push(obj_tempGet);
      }
    });
  });
  let newRes = [];
  result.forEach((e, i) => {
    let newObj = {
      type: e.AQS00,
      stt: i + 1,
      fsp: e.AQS01,
      "01-qs-01": e.AQS02,
      "01-submit-01": "FN01",
      "01-action-01": "FN01",
      "01-aw-01": e.AQS08 || "",
      "02-qs-01": e.AQS03,
      "02-aw-01": e.AQS04,
      "02-aw-02": e.AQS05,
      "03-qs-01": e.AQS06,
      "03-aw-01": e.AQS07,
      "04-qs-01": e.AQS09,
      "04-aw-01": e.AQS09 ? "Well" : "",
      "04-submit-01": e.AQS10 || "",
      "04-action-01": e.AQS10 || "",
      name: peopleSets[i % 10].name,
      img: peopleSets[i % 10].img,
      gender: peopleSets[i % 10].gender,
      "05-qs-01": e.AQS09
        ? e.AQS09.includes("wrong")
          ? "That is right."
          : "That is wrong."
        : "",
      "05-aw-01": e.AQS09 ? "Incorrect." : "",
      "05-action-01": e.AQS10 ? "WRONG" : "",
    };
    newRes.push(newObj);
  });

  return newRes;
}

const helper_fn = {
  splitObject: splitObject, // Gắn hàm vào object
  replaceHDAll: replaceHDAll,
};

const peopleSets = [
  {
    name: "Emily",
    gender: "female",
    img: "https://i.postimg.cc/vTh9hqF4/Emily-21.jpg",
  },
  {
    name: "David",
    gender: "male",
    img: "https://i.postimg.cc/s2GYz4SL/David-20.jpg",
  },
  {
    name: "Jessica",
    gender: "female",
    img: "https://i.postimg.cc/GhMGs5xN/Jessica-23.jpg",
  },
  {
    name: "Michael",
    gender: "male",
    img: "https://i.postimg.cc/HkRM68K9/Michael-30.jpg",
  },
  {
    name: "Sarah",
    gender: "female",
    img: "https://i.postimg.cc/wBNmZTY8/Sarah-27.jpg",
  },
  {
    name: "Andrew",
    gender: "male",
    img: "https://i.postimg.cc/KzXn83D8/Andrew-40.jpg",
  },
  {
    name: "Ashley",
    gender: "female",
    img: "https://i.postimg.cc/zv8KnmMm/Ashley-34.jpg",
  },
  {
    name: "Christopher",
    gender: "male",
    img: "https://i.postimg.cc/vBW5g80L/Christopher-60.jpg",
  },
  {
    name: "Jennifer",
    gender: "female",
    img: "https://i.postimg.cc/3RHvT53y/Jennifer-39.jpg",
  },
  {
    name: "Joshua",
    gender: "male",
    img: "https://i.postimg.cc/wj7J5QWB/Joshua-70.jpg",
  },
];

function countWords(sentences) {
  // Loại bỏ các câu trùng lặp bằng cách sử dụng Set
  const uniqueSentences = Array.from(
    new Set(sentences.map((sentence) => sentence.trim().toLowerCase()))
  );

  // Gộp tất cả các câu lại thành một chuỗi
  const allText = uniqueSentences.join(" ");

  // Loại bỏ các ký tự không phải từ (giữ lại các từ và dấu cách), chuyển về dạng chữ thường
  const cleanedText = allText.replace(/[^\w\s]/g, "").toLowerCase();

  // Tách chuỗi thành một mảng các từ
  const wordsArray = cleanedText
    .split(/\s+/)
    .filter((word) => word.trim() !== "");

  // Lọc trùng lặp từ vựng
  const uniqueWords = new Set(wordsArray);

  console.log(
    "Số câu (không trùng lặp):",
    uniqueSentences.length,
    "__________________"
  );
  console.log("Tổng số từ:", wordsArray.length, "------------------");
  console.log("Số từ không trùng lặp:", uniqueWords.size, "++++++++++++++++++");

  return {
    uniqueSentencesCount: uniqueSentences.length,
    totalWords: wordsArray.length,
    uniqueWordCount: uniqueWords.size,
  };
}

function removeVietnameseAccents(str) {
  return str
    .normalize("NFD") // Tách dấu và ký tự gốc
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/đ/g, "d") // Chuyển "đ" thành "d"
    .replace(/Đ/g, "D") // Chuyển "Đ" thành "D"
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(" ")
    .join("-")
    .split("--")
    .join("-") // Loại bỏ các ký tự đặc biệt và dấu câu, giữ lại khoảng trắng
    .toLowerCase(); // Chuyển tất cả thành chữ thường
}
