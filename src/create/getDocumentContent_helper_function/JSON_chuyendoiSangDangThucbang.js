import $ from "jquery";
import { replace } from "react-router-dom";

function GetData() {
  let data_get_from_RESID = [];
  try {
    data_get_from_RESID = JSON.parse($("#ResID").text());
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

  createTableFromArray("ResID05", res07);

  $("#ResID02").text(JSON.stringify(res07));
}

const ChuyenDoi_Buoc_1 = {
  HuongDan: () => {
    $("#ResID04").text(
      `Chào mừng đến với Các Bước chuyển đổi từ JSON ban đầu 
      (1) Lấy tất cả Object có Type là không có HD`
    );
  },
  Buoc1: () => FN_01(),
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
