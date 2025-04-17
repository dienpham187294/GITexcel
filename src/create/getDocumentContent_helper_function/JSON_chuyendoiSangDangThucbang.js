import $, { data } from "jquery";
import { replace } from "react-router-dom";
import peopleSets from "../dataCreate/peopleSets.json";
import * as XLSX from "xlsx";
// import Data_hd from "./data_HD01.json";
// import data_ZZZZA1 from "./data_ZZZZA1.json";
function GetData() {
  let data_get_from_RESID = [];
  try {
    data_get_from_RESID = JSON.parse($("#ResID").text());
  } catch (error) {
    $("ResID04").text("KHÔNG CÓ JSON THÍCH HỢP");
  }
  return data_get_from_RESID;
}

function GetDatabyid(id) {
  let data_get_from_RESID = [];
  try {
    data_get_from_RESID = JSON.parse($(id).text());
  } catch (error) {
    $("ResID04").text("KHÔNG CÓ JSON THÍCH HỢP");
  }
  return data_get_from_RESID;
}

function FN_01() {
  $("ResID04").text(`
    (1) Lấy tất cả Object có Type là không có HD.
    (->) Lấy các obj ra thành phần riêng.
    `);

  const data = GetData();
  const data_02 = GetData();
  let res = [];

  data.forEach((e) => {
    if (e.type) {
      res.push(e);
    }
  });

  res.forEach((e) => {
    let keySets = Object.keys(e);

    keySets.forEach((e1) => {
      let iCheck = true;

      if (e1.includes("HD")) {
        iCheck = false;
        delete e[e1];
      }

      if (e1 === "getIndexInTable") {
        iCheck = false;
        const input = e[e1];
        let res_index = JSON.parse(input);
        res_index.forEach((e2) => {
          e2.newValue = e2.index
            ? e2.index
            : findValueByHDAndKey(data_02, e2.x, e2.y, e2.z);
          delete e2.index;
          delete e2.x;
          delete e2.y;
        });
        $("#ResID03").text(
          JSON.stringify(transformArrayToNameValueSet(res_index))
        );
        e.getIndexInTable = transformArrayToNameValueSet(res_index);
      }
      // if (iCheck && e[e1] && e[e1].includes("{")) {
      //   e[e1 + "-plus"] = extractObjectsFromString(e[e1]);
      // }
    });
  });

  let res_01 = [];

  res.forEach((e) => {
    let indexLoopInput = e.getIndexInTable;
    delete e.getIndexInTable;
    let strOfElement = JSON.stringify(e);
    res_01.push({
      indexLoopInput,
      strOfElement,
    });
  });

  let res_02 = [];

  res_01.forEach((e) => {
    res_02 = res_02.concat(
      put_data_in_loop_total(e.indexLoopInput, 0, [e.strOfElement])
    );
  });
  let res03 = [];
  res_02.forEach((e, i) => {
    res03.push(JSON.parse(e));
  });

  let res04 = [];

  res03.forEach((e) => {
    let obj = {};

    Object.keys(e).forEach((e1, i1) => {
      const key = "A" + (10 + i1);
      obj[key] = {
        id: i1,
        origin: e[e1],
        index: e1,
        replace: [],
        final: "",
      };

      if (e[e1] && e[e1].includes("{")) {
        let condition = extractObjectsFromString(e[e1]);
        obj[key].condition = condition;

        condition.forEach((e) => {
          // Cache the lookup result to avoid redundant calls

          let lookupValue = findValueByHDAndKey(data_02, e.x, e.y, e.z);
          let yesValue = e.yes || lookupValue || "ERROR";
          let noValue = e.no || "ERROR";

          let replaceValue = lookupValue ? yesValue : noValue;
          let replaceIndex = e.origin;

          obj[key].replace.push({ replaceIndex, replaceValue, lookupValue });
        });
      }

      if (obj[key].origin !== null) {
        obj[key].final = obj[key].origin;
        obj[key].replace.forEach((e) => {
          obj[key].final = obj[key].final
            .split(e.replaceIndex)
            .join(e.replaceValue);
        });
      } else {
        obj[key].final = null; // Fixed assignment to `null` instead of comparison
      }
    });

    res04.push(obj);
  });

  let res05 = [];

  res04.forEach((e) => {
    let keySets = Object.keys(e);
    let obj = {};
    keySets.forEach((e1) => {
      obj[e[e1]["index"]] = e[e1]["final"];
    });
    res05.push(JSON.stringify(obj));
  });

  let res06 = removeDuplicates(res05);

  let res07 = [];

  res06.forEach((e) => {
    res07.push(JSON.parse(e));
  });

  res07.forEach((e, i) => {
    e.img = peopleSets[i % 10].img;
    e.name = peopleSets[i % 10].name;
    e.gender = peopleSets[i % 10].gender;
    // e.stt = i + 1;
  });
  createTableFromArray("ResID05", res07);

  $("#ResID02").text(JSON.stringify(res07));
}

function FN_A1(id) {
  const data = GetDatabyid(id);
  const data_02 = GetDatabyid(id);
  let res = [];

  data.forEach((e) => {
    if (e.type) {
      res.push(e);
    }
  });

  res.forEach((e) => {
    let keySets = Object.keys(e);

    keySets.forEach((e1) => {
      let iCheck = true;

      if (e1.includes("HD")) {
        iCheck = false;
        delete e[e1];
      }

      if (e1 === "getIndexInTable") {
        iCheck = false;
        const input = e[e1];
        let res_index = JSON.parse(input);
        res_index.forEach((e2) => {
          e2.newValue = e2.index
            ? e2.index
            : findValueByHDAndKey(data_02, e2.x, e2.y, e2.z);
          delete e2.index;
          delete e2.x;
          delete e2.y;
        });
        // $("#ResID03").text(
        //   JSON.stringify(transformArrayToNameValueSet(res_index))
        // );
        e.getIndexInTable = transformArrayToNameValueSet(res_index);
      }
      // if (iCheck && e[e1] && e[e1].includes("{")) {
      //   e[e1 + "-plus"] = extractObjectsFromString(e[e1]);
      // }
    });
  });

  let res_01 = [];

  res.forEach((e) => {
    let indexLoopInput = e.getIndexInTable;
    delete e.getIndexInTable;
    let strOfElement = JSON.stringify(e);
    res_01.push({
      indexLoopInput,
      strOfElement,
    });
  });

  let res_02 = [];

  res_01.forEach((e) => {
    res_02 = res_02.concat(
      put_data_in_loop_total(e.indexLoopInput, 0, [e.strOfElement])
    );
  });
  let res03 = [];
  res_02.forEach((e, i) => {
    res03.push(JSON.parse(e));
  });

  let res04 = [];

  res03.forEach((e) => {
    let obj = {};

    Object.keys(e).forEach((e1, i1) => {
      const key = "A" + (10 + i1);
      obj[key] = {
        id: i1,
        origin: e[e1],
        index: e1,
        replace: [],
        final: "",
      };

      if (e[e1] && e[e1].includes("{")) {
        let condition = extractObjectsFromString(e[e1]);
        obj[key].condition = condition;

        condition.forEach((e) => {
          // Cache the lookup result to avoid redundant calls

          let lookupValue = findValueByHDAndKey(data_02, e.x, e.y, e.z);
          let yesValue = e.yes || lookupValue || "ERROR";
          let noValue = e.no || "ERROR";

          let replaceValue = lookupValue ? yesValue : noValue;
          let replaceIndex = e.origin;

          obj[key].replace.push({ replaceIndex, replaceValue, lookupValue });
        });
      }

      if (obj[key].origin !== null) {
        obj[key].final = obj[key].origin;
        obj[key].replace.forEach((e) => {
          obj[key].final = obj[key].final
            .split(e.replaceIndex)
            .join(e.replaceValue);
        });
      } else {
        obj[key].final = null; // Fixed assignment to `null` instead of comparison
      }
    });

    res04.push(obj);
  });

  let res05 = [];

  res04.forEach((e) => {
    let keySets = Object.keys(e);
    let obj = {};
    keySets.forEach((e1) => {
      obj[e[e1]["index"]] = e[e1]["final"];
    });
    res05.push(JSON.stringify(obj));
  });

  let res06 = removeDuplicates(res05);

  let res07 = [];

  res06.forEach((e) => {
    res07.push(JSON.parse(e));
  });

  res07.forEach((e, i) => {
    e.img = peopleSets[i % 10].img;
    e.name = peopleSets[i % 10].name;
    e.gender = peopleSets[i % 10].gender;
    // e.stt = i + 1;
  });
  // createTableFromArray("ResID05", res07);

  // $("#ResID02").text(JSON.stringify(res07));
  return res07;
}

function FN_ZZZZA1() {
  // Assuming GetData() fetches your data
  const data = GetData()[1];

  let data_xuly_01 = [];

  // Iterate through the data array in chunks of 4 elements
  for (let i = 0; i < data.length; i += 4) {
    // Slice out 4 elements from the data array starting at index i
    let chunk = data.slice(i, i + 4);

    // Merge the 4 arrays into one array
    let mergedArray = [].concat(...chunk);

    // Push the merged array into data_xuly_01
    data_xuly_01.push(mergedArray);
  }

  $("#ResID02").text(JSON.stringify(data_xuly_01));
  // Log the result or return if necessary
  console.log(data_xuly_01);
  $("#ResID02").text(JSON.stringify(nextStepOutside(data_xuly_01)));
  // Convert to a Workbook

  $("#ResID03").text(JSON.stringify(GetData()[0]));

  $("#ResID04").text(JSON.stringify(GetData()[2]));
  // return data_xuly_01;
}

function FN_ZZZZA1_HD01() {
  let data_ZZZZA1 = JSON.parse($("#ResID02").text());
  let Data_hd = JSON.parse($("#ResID03").text());
  let Data_hd_excel = JSON.parse($("#ResID04").text());
  let res = [];
  let res_02 = [];
  let objKeys = Object.keys(data_ZZZZA1[0]);

  data_ZZZZA1.forEach((e, ie) => {
    let data_string_hd01 = JSON.stringify(Data_hd);
    // console.log(data_string_hd01);
    objKeys.forEach((e1) => {
      try {
        data_string_hd01 = data_string_hd01
          .split(e1)
          .join(e[e1].split(`"`).join(`'`));
      } catch (error) {}
    });
    let data_chuyendoi_gancuoi = nextStepOutside(JSON.parse(data_string_hd01));
    $("#ResID05").text(JSON.stringify(data_chuyendoi_gancuoi));
    let data_toprac = FN_A1("#ResID05"); // Giả sử trả về một mảng các đối tượng

    let key = Object.keys(data_toprac[0]); // Lấy danh sách key từ phần tử đầu tiên
    let setstoprac = [key]; // Mảng chứa tiêu đề

    data_toprac.forEach((eA) => {
      let tem = [];
      key.forEach((eB) => {
        tem.push(eA[eB]); // Lấy giá trị theo từng key
      });
      setstoprac.push(tem); // Thêm hàng dữ liệu vào mảng chính
    });

    res.push(JSON.parse(data_string_hd01));
    //////////////////
    let data_string_hd_excel = JSON.stringify(Data_hd_excel);
    objKeys.forEach((e1) => {
      try {
        data_string_hd_excel = data_string_hd_excel
          .split(e1)
          .join(e[e1].split(`"`).join(`'`));
      } catch (error) {}
    });
    data_string_hd_excel = data_string_hd_excel
      .split("_F")
      .join("_F" + (ie + 1));

    let data_hd_excel = JSON.parse(data_string_hd_excel);

    // Tìm số dòng lớn nhất giữa 2 bảng
    let maxRows = Math.max(data_hd_excel.length, setstoprac.length);

    // Đảm bảo đủ dòng: nếu thiếu, thêm dòng rỗng phù hợp
    while (data_hd_excel.length < maxRows) {
      data_hd_excel.push(new Array(data_hd_excel[0].length).fill("")); // thêm dòng trống theo số cột của excel
    }

    while (setstoprac.length < maxRows) {
      setstoprac.push(new Array(setstoprac[0].length).fill("")); // thêm dòng trống theo số cột của setstoprac
    }

    // Gộp dòng theo chiều ngang (cột)
    let mergedData = [];

    for (let i = 0; i < maxRows; i++) {
      mergedData.push([...data_hd_excel[i], ...setstoprac[i]]);
    }

    res_02.push(mergedData);

    // res_02.push(JSON.parse(data_string_hd_excel).concat(setstoprac));
    /////////////////
  });

  exportToExcel(res.concat(res_02));
  console.log(JSON.stringify(res));
}

const exportToExcel = (data) => {
  // Tạo workbook mới một lần duy nhất
  const wb = XLSX.utils.book_new();

  // Thêm từng sheet từ data
  data.forEach((e, i) => {
    const ws = XLSX.utils.aoa_to_sheet(e); // e là một mảng 2 chiều
    XLSX.utils.book_append_sheet(wb, ws, `${i + 1}`);
  });

  // Ghi file Excel
  XLSX.writeFile(wb, "B_FILE_01.xlsx");
};

const ChuyenDoi_Buoc_1 = {
  HuongDan: () => {
    $("#ResID04").text(
      `Chào mừng đến với Các Bước chuyển đổi từ JSON ban đầu 
      (1) Lấy tất cả Object có Type là không có HD`
    );
  },
  LayBangFsp_1bang_toCopy: () => FN_01(),
  LayBangZZZZA1: () => FN_ZZZZA1(),
  DaCo_ZZZZA1_GHEP_HD01_exportFileExcel: () => FN_ZZZZA1_HD01(),
};
export { ChuyenDoi_Buoc_1 };

function extractObjectsFromString(str) {
  const regex = /\{[^}]+\}/g; // RegEx tìm các đối tượng trong chuỗi
  const matches = str.match(regex); // Tìm các đối tượng trong chuỗi

  // Nếu có các đối tượng, chuyển đổi từ chuỗi sang object
  return matches
    ? matches.map((match) => {
        // Cắt bỏ dấu ngoặc nhọn và chuyển chuỗi thành đối tượng
        const objStr = match.slice(1, -1);
        const obj = { origin: match };
        objStr.split(",").forEach((pair) => {
          const [key, value] = pair.split(":").map((item) => item.trim());
          obj[key] = value;
        });
        return obj;
      })
    : [];
}

function findValueByHDAndKey(arr, x, y, z) {
  // Tìm phần tử có e["HD-Bmark"] = x
  const result = arr.find((e) => e["HD-Bmark"] === x);

  // Nếu tìm thấy phần tử, trả về giá trị e[y], nếu không trả về undefined

  if (z && result) {
    console.log(z, result);
    try {
      let res = result[y].split(";")[z].trim();
      return res;
    } catch (error) {}
  }

  return result ? result[y] : undefined;
}

function transformArrayToNameValueSet(arr) {
  // Dùng reduce để nhóm theo 'name' và tạo valueSet cho mỗi 'name'
  const grouped = arr.reduce((acc, { name, newValue }) => {
    // Tìm xem 'name' đã có trong accumulator chưa
    const existingGroup = acc.find((group) => group.name === name);

    if (existingGroup) {
      // Nếu đã có, chỉ cần thêm 'newValue' vào 'valueSet'
      existingGroup.valueSet.push(newValue);
    } else {
      // Nếu chưa có, tạo một đối tượng mới cho 'name' và 'valueSet'
      acc.push({ name, valueSet: [newValue] });
    }

    return acc;
  }, []);

  return grouped;
}

function put_data_in_loop_total(setTotal, n, strOfElement) {
  let res = [];

  if (n >= setTotal.length) {
    return strOfElement; // Return early if we've processed all sets
  }

  let set01_valueSet = setTotal[n].valueSet;
  let set01_name = setTotal[n].name;

  set01_valueSet.forEach((e1) => {
    strOfElement.forEach((e2) => {
      res.push(e2.split(set01_name).join(e1));
    });
  });

  // Recursive call to process the next set if exists
  return put_data_in_loop_total(setTotal, n + 1, res);
}

function removeDuplicates(strings) {
  return [...new Set(strings)];
}
function createTableFromArray(id, array) {
  // Lấy các key của đối tượng đầu tiên trong mảng (tạo cột cho bảng)
  const keys = Object.keys(array[0]);

  // Tạo bảng với id và thêm header (cột)
  let table = $("#" + id);
  let headerRow = $("<tr></tr>");

  // Thêm các cột vào header
  keys.forEach((key) => {
    let headerCell = $("<th></th>").text(key);
    headerRow.append(headerCell);
  });
  table.append(headerRow);

  // Thêm các dòng vào bảng
  array.forEach((obj) => {
    let row = $("<tr></tr>");
    keys.forEach((key) => {
      let cell = $("<td></td>").text(
        obj[key] !== null ? (obj[key] === "null" ? "" : obj[key]) : ""
      ); // Kiểm tra null và thay bằng chuỗi rỗng nếu cần
      row.append(cell);
    });
    table.append(row);
  });
}

function copyContent(id) {
  // Lấy nội dung của phần tử có id truyền vào
  var content = $("#" + id).text();

  // Sao chép nội dung vào clipboard
  navigator.clipboard
    .writeText(content)
    .then(function () {
      // Hiển thị alert sau khi sao chép thành công
      alert("Đã sao chép xong!");
    })
    .catch(function (error) {
      // Nếu có lỗi xảy ra khi sao chép
      alert("Có lỗi xảy ra khi sao chép: " + error);
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
