import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import transferTextToArray from "./transferTextToArray";
import * as Button_chuyendoi_001 from "./create/getDocumentContent_helper_function/Button_chuyendoi_001";
import * as ChuyenDoi_Buoc_1 from "./create/getDocumentContent_helper_function/JSON_chuyendoiSangDangThucbang";
import * as ChuyenDoi_Buoc_2 from "./create/getDocumentContent_helper_function/Create_A_InputData_Tranfer_2024_HOPEFINAL_C001";
import {
  findClosestMatch,
  getRandomElement,
  parceARandomSets,
  shuffleArray,
  collectWeSay,
  removeNoneElements,
  transper_to_table_f_json_obj,
  copyTable_f_id,
} from "./ulti/help_prac_function";

function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");
  useEffect(() => {
    const handleFileChange = async (event) => {
      try {
        let ArrIndex;

        const indexText = $("#IndexExcel").text();

        if (indexText.includes("-")) {
          ArrIndex = transferTextToArray(indexText);
        } else {
          ArrIndex = indexText.split(" ").join("").split(",");
        }

        let ArrOUT = [];

        for (const e of ArrIndex) {
          // Note: Assuming readXlsxFile returns a promise
          const rows = await readXlsxFile(event.target.files[0], { sheet: e });
          ArrOUT.push(rows);
        }

        // Assuming you want to update some state with the output
        // Update your state here with ArrOUT
        $("#ResID").text(JSON.stringify(ArrOUT));
      } catch (error) {
        console.error(error);
      }
    };

    $("#headerID").hide();
    const input = document.getElementById("input");
    input.addEventListener("change", handleFileChange);

    // Cleanup function to remove event listener
    return () => {
      input.removeEventListener("change", handleFileChange);
    };
  }, []);
  return (
    <div style={{ display: "", padding: "5%" }} id="remodeDiv">
      Lấy sheet: <b id="IndexExcel"> {IndexExcel}</b>
      <input
        placeholder="Nhập ds file name cần lấy"
        onChange={(e) => {
          SetIndexExcel(e.currentTarget.value.trim());
        }}
        type={"text"}
      />
      <input type="file" id="input" />
      <button
        onClick={() => {
          $("#input").val("");
          $("#ResID").text("");
        }}
      >
        Xóa
      </button>
      <br />(<b id="SODONGEXCELCANLAYID">4</b>)
      <select
        onChange={(e) => {
          document.getElementById("SODONGEXCELCANLAYID").textContent =
            e.currentTarget.value;
        }}
      >
        <option value="">Số dòng excel cần lấy</option>
        {Array.from({ length: 100 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <div className="row">
        <div className="col-6">
          {" "}
          {showButtonNew(Button_chuyendoi_001)}
          <hr />
          {showButtonNew(ChuyenDoi_Buoc_1)} <hr />
          {showButtonNew(ChuyenDoi_Buoc_2)}
        </div>
        <div className="col-6">
          Các nút con<div id="viewBTN"></div>
          <div id="showID" style={{ color: "blue" }}></div>
        </div>
      </div>
      <hr />
      <button
        onClick={() => {
          generateDownloadLinkFromDiv();
        }}
      >
        {" "}
        Lấy link down load file JSON TH | Tạo transMutiSet (A-B) từng lần 1 và
        bấm
      </button>
      <div className="row" style={{ maxHeight: "400px", overflow: "hidden" }}>
        <div className="col-3">
          ResID#01
          <div id="ResID"></div>
        </div>
        <div className="col-3">
          ResID#02
          <div id="ResID02"></div>
        </div>
        <div className="col-3">
          ResID#03
          <div id="ResID03"></div>
        </div>
        <div className="col-3">
          ResID#04
          <div id="ResID04"></div>
        </div>
      </div>
      <button
        onClick={() => {
          try {
            const div = document.getElementById("ResID05");

            // Lấy nội dung text của div
            const content = div.innerText;

            // Tạo một textarea tạm thời để sao chép nội dung
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = content;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);

            alert("Content copied to clipboard!");
          } catch (error) {}
        }}
      >
        COPY NỘI DUNG TABLE VỪA TẠO #ResID05
      </button>
      <div style={{ maxHeight: "300px", overflow: "hidden" }}>
        <div id="ResID05"></div>
      </div>
    </div>
  );
}

export default GetDocument;

function showButton(ArrBTN, color) {
  let ArrObj = Object.keys(ArrBTN);

  return ArrObj.map((e, i) => (
    <button
      key={i}
      style={{
        borderRadius: "15px",
        borderColor: color ? color : "black",
        color: color ? color : "black",
      }}
      onClick={() => {
        ArrBTN[e]();
      }}
    >
      {e}
    </button>
  ));
}

function showButtonNew(ArrBTN) {
  let ArrObj = Object.keys(ArrBTN);

  return ArrObj.map((e, i) => (
    <button
      id={e}
      key={i}
      onClick={() => {
        document.getElementById("showID").textContent = e;
        try {
          ArrBTN[e]();
        } catch (error) {
          // Ensure that the module's default or named exports are correctly resolved
          const moduleObject = ArrBTN[e];

          // Check if moduleObject is valid and contains functions
          if (moduleObject && typeof moduleObject === "object") {
            // Get function names correctly from moduleObject
            const functionNames = Object.keys(moduleObject).filter(
              (key) => typeof moduleObject[key] === "function"
            );

            // console.log("Module Object:", moduleObject);
            // console.log("Function Names:", functionNames);

            // Find the element with id="viewBTN"
            const viewBTN = document.getElementById("viewBTN");
            viewBTN.textContent = "";
            if (viewBTN) {
              // Append buttons for each function to viewBTN
              functionNames.forEach((funcName) => {
                const button = document.createElement("button"); // Create button
                button.textContent = funcName; // Set button text
                button.onclick = moduleObject[funcName]; // Assign click handler
                viewBTN.appendChild(button); // Append button to viewBTN
              });
            } else {
              console.error('Element with id="viewBTN" not found.');
            }
          } else {
            console.error(
              "Invalid module object or no functions found in ArrBTN[e]."
            );
          }
        }
      }}
    >
      {e}
    </button>
  ));
}

// Hàm tải xuống dữ liệu dạng JSON
function generateDownloadLinkFromDiv() {
  const sourceDiv = document.getElementById("ResID");
  const targetDiv = document.getElementById("ResID02");

  if (!sourceDiv || !targetDiv) {
    console.error("Không tìm thấy div với id 'ResID' hoặc 'ResID02'");
    return;
  }

  try {
    // Lấy và parse nội dung JSON từ ResID
    const data = JSON.parse(sourceDiv.textContent || sourceDiv.innerText);

    // Tạo file blob từ dữ liệu JSON
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Tạo thẻ <a> để tải file
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "result" + $("#IndexExcel").text() + ".json";
    downloadLink.textContent =
      "Tải xuống kết quả JSON" + $("#IndexExcel").text();
    downloadLink.style.display = "inline-block";
    downloadLink.style.marginTop = "10px";

    // Xóa các link cũ (nếu có) rồi thêm mới
    targetDiv.innerHTML = "";
    targetDiv.appendChild(downloadLink);
  } catch (err) {
    console.error("Không thể phân tích JSON từ nội dung của div 'ResID':", err);
    targetDiv.textContent = "Lỗi: Dữ liệu không hợp lệ.";
  }
}
