import $ from "jquery";
import sentencePlus_f_json001 from "./dataCreate/sentencePlus_001.json";
import processedArray_f_json from "./dataCreate/fileroot_001.json";

function getErrorOfSubmitNotInclude(processedArray) {
  let checkResult = [];
  processedArray.forEach((e) => {
    e.data.forEach((e1) => {
      e1.forEach((e2, i2) => {
        try {
          if (e2.submitList) {
            let pickingListA = [];
            e2.pickingList.forEach((e21) => {
              pickingListA = pickingListA.concat(e21);
            });
            e2.submitList.forEach((e3) => {
              if (!pickingListA.includes(e3)) {
                checkResult.push({
                  id: e.idFile + e.idContent + "-" + (i2 + 1),
                  error: e3,
                });
              }
            });
          }
        } catch (error) {}
      });
    });
  });

  console.log(JSON.stringify(checkResult), "ERROR CHECK");
}
function getTableToNoteSpreadOrnot() {
  let checkResult = [];
  let res_pluslist_f_step1_t_step2 = [];
  let temporary_processedArray_f_json = processedArray_f_json;

  temporary_processedArray_f_json.forEach((e) => {
    try {
      e.data.forEach((eData, iData) => {
        eData.forEach((e_sets, i_sets) => {
          let iCheck = e_sets.pickingList[0].join("; ");
          // res_pluslist_f_step1_t_step2.push();
          sentencePlus_f_json001.forEach((e_obj_sentence, i_obj_sentence) => {
            if (iCheck === e_obj_sentence.pickingList) {
              e_sets.addmoreSentenceSets = e_obj_sentence;
              return;
            }
          });
        });
      });
    } catch (error) {}
  });

  temporary_processedArray_f_json.forEach((e) => {
    try {
      e.data.forEach((eData, iData) => {
        eData.forEach((e_sets, i_sets) => {
          try {
            if (e_sets.addmoreSentenceSets !== undefined) {
              e_sets.pickingList[0].slice(1).forEach((e_more, i_more) => {
                let obj = {
                  id: e.idFile + e.idContent,
                  indexOfBox: iData,
                  indexOfSets: i_sets,
                  indexOfRandom: i_more,
                  theySay: (
                    e_sets.addmoreSentenceSets["sentence-01"] +
                    " \\\\ " +
                    e_sets.addmoreSentenceSets["sentence-02"] +
                    " \\\\ " +
                    e_sets.addmoreSentenceSets["sentence-03"]
                  )
                    .split("[Thông tin]")
                    .join(e_more),
                  submitList: e_more,
                };
                // e_sets.forEach((e_obj, i_obj) => {

                res_pluslist_f_step1_t_step2.push(obj);
              });
            } else {
              let obj = {
                id: e.idFile + e.idContent,
                indexOfBox: iData,
                indexOfSets: i_sets,
                indexOfRandom: "---",
                theySay: e_sets.theySay.join(" \\ "),
                submitList: e_sets.submitList.join("; "),
              };
              res_pluslist_f_step1_t_step2.push(obj);
            }
          } catch (error) {
            console.log(error);
          }

          // });
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  // let checkResult_to_gather_same_sentence = [];

  // CreateTable(checkResult);
  CreateTable(res_pluslist_f_step1_t_step2, "To_json");
  // console.log(JSON.stringify(temporary_processedArray_f_json));
}

function CreateTable(checkResult, mode) {
  const $div = $("#DivTable01");

  if (mode === "To_json") {
    $div.text(JSON.stringify(checkResult));

    return;
  }
  // 1. Tạo bảng
  const $table = $('<table border="1"></table>');
  const $thead = $("<thead></thead>");
  const $tbody = $("<tbody></tbody>");

  // Lấy các keys từ object đầu tiên làm tiêu đề
  const keys = Object.keys(checkResult[0]);
  const $headerRow = $("<tr></tr>");
  keys.forEach((key) => {
    $headerRow.append(`<th>${key}</th>`);
  });
  $thead.append($headerRow);
  $table.append($thead);

  // Thêm dữ liệu từ JSON
  checkResult.forEach((item) => {
    const $row = $("<tr></tr>");
    keys.forEach((key) => {
      let value = item[key];
      if (Array.isArray(value)) {
        value = value.join("; ");
      }
      $row.append(`<td>${value}</td>`);
    });
    $tbody.append($row);
  });
  $table.append($tbody);

  // Thêm bảng vào div
  $div.append($table);

  // 2. Thêm chức năng sao chép bảng
  $("#copyTableBtn").click(function () {
    const tableHtml = $div.html(); // Lấy toàn bộ nội dung trong div
    const $temp = $("<textarea></textarea>"); // Tạo textarea tạm thời
    $temp.val(tableHtml); // Gán nội dung bảng vào textarea
    $("body").append($temp); // Thêm vào body để có thể chọn
    $temp.select(); // Chọn toàn bộ nội dung
    document.execCommand("copy"); // Sao chép vào clipboard
    $temp.remove(); // Xóa textarea tạm thời
    alert("Table copied to clipboard!");
  });
}

export { getErrorOfSubmitNotInclude, getTableToNoteSpreadOrnot };
