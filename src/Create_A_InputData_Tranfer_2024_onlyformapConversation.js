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

function NextStep_DontUnifile() {
  try {
    let input = JSON.parse($("#ResID").text());
    //  let getKeys = Object.keys(input[0])
    // console.log(input)
    let output = [];
    input.forEach((e) => {
      output.push(NextStep(e));
    });

    $("#ResID").text(JSON.stringify(output));
    // return output
  } catch (error) {
    console.log("Lỗi");
    console.log(error);
  }
}

function FetchData() {
  try {
    NextStep_DontUnifile();
    let input = JSON.parse($("#ResID").text());
    let res = [];
    input.forEach((e, i) => {
      res.push(splitContentIntoArrays(e));
    });

    let res01 = toPracPot(toOneArray(res));

    $("#ResID").text(JSON.stringify(res01));
    // return output
  } catch (error) {
    console.log("Lỗi");
    console.log(error);
  }
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
        if (!result[contentIndex]) {
          result[contentIndex] = [];
        }

        // Thêm phần tử vào mảng tương ứng
        result[contentIndex].push({ id: id, content: element[key] });
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
    console.log();
    res.push(groupByPrefiToArrayPure(groupByPrefix(e)));
  });

  return res;
}
function groupByPrefix(data) {
  const groupedData = {};

  data.forEach((item) => {
    let keySets = item.id.split("-"); // Tách id thành các phần bằng dấu gạch ngang (-)

    // Nếu chưa có nhóm theo keySets[0], tạo một object rỗng
    if (!groupedData[keySets[0]]) {
      groupedData[keySets[0]] = {}; // Đây là object thay vì push vào array
    }

    // Nếu chưa có nhóm theo keySets[1], tạo một array rỗng cho nhóm đó
    if (!groupedData[keySets[0]][keySets[1]]) {
      groupedData[keySets[0]][keySets[1]] = []; // Tạo array để chứa các phần tử của nhóm thứ 2
    }

    // Thêm item vào nhóm tương ứng
    groupedData[keySets[0]][keySets[1]].push(item);
  });

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

function conversationBox(arr) {
  console.log(JSON.stringify(arr));
  let res = {
    weSay: [],
    theySay: [],
    submitList: [],
    pickingList: [],
    action: [],
    reward: [],
    notify: [],
  };

  arr.forEach((e) => {
    if (e.id.includes("weSay")) {
      res.weSay.push(e.content);
    }
    if (e.id.includes("theySay")) {
      res.theySay.push(e.content);
    }
    if (e.id.includes("pickingList")) {
      let listT = e.content.split(";");
      res.pickingList = res.pickingList.concat(listT);
    }

    if (e.id.includes("submitList")) {
      res.submitList.push(e.content);
    }
    if (e.id.includes("notify")) {
      res.notify.push(e.content);
    }
    if (e.id.includes("action")) {
      res.action.push(e.content);
    }
    if (e.id.includes("reward")) {
      res.reward.push(e.content);
    }
  });
  let keySets = Object.keys(res);
  keySets.forEach((e) => {
    if (res[e].length === 0) {
      res[e] = null;
    }
  });
  return res;
}

export { FetchData };
