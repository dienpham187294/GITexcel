import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import * as TransferData from "./Create_A_InputData_Tranfer_2024_onlyformapConversation";
import transferTextToArray from "./transferTextToArray";
function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");

  const [Documents, SetDocuments] = useState(null);

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
    <div className="container-fluid row" id="CreateDiv">
      <div style={{ display: "" }} id="remodeDiv">
        <input type="file" id="input" />
        <button
          onClick={() => {
            $("#input").val("");
            $("#ResID").text("");
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            $("#remodeDiv ").hide();
          }}
        >
          {" "}
          HIDE
        </button>
        {/* {showButton(ArrBTN1)} */}
        <hr />

        <p id="IndexExcel"> {IndexExcel}</p>
        <input
          placeholder="Nhập ds file name cần lấy"
          onChange={(e) => {
            SetIndexExcel(e.currentTarget.value.trim());
          }}
          type={"text"}
        />
        <hr />
        {/* {showButton(ArrBTN2)} */}
        {showButton(TransferData)}
        <hr />

        <button
          onClick={() => {
            try {
              if (Documents === null) {
                SetDocuments(JSON.parse($("#ResID").text()));
                $("#ResID").text("");
              } else {
                SetDocuments(null);
              }
            } catch (error) {}
          }}
        >
          GET DOCUMENT
        </button>
        <button>THỰC HÀNH Start</button>
        <hr />
        <div id="ResID" style={{ padding: "35px" }}></div>
      </div>
      {Documents !== null ? tableDocuments(Documents) : null}
    </div>
  );
}

export default GetDocument;

function showButton(ArrBTN) {
  let ArrObj = Object.keys(ArrBTN);

  return ArrObj.map((e, i) => (
    <button
      key={i}
      onClick={() => {
        ArrBTN[e]();
      }}
    >
      {e}
    </button>
  ));
}

function tableDocuments(data) {
  try {
    return (
      <div>
        <hr />

        {data.map((e, i) => (
          <div key={i}>
            <h5>Conversation {i + 1}</h5>
            {e.map((e1, i1) => (
              <div
                key={i1}
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                {e1.map((e2, i2) => (
                  <div className="row" key={i2}>
                    <div className="col-1">{i1 + 1}</div>
                    <div className="col-6">
                      <p>
                        <b> {showText(e2.weSay)}</b>
                      </p>
                      <p>{showText(e2.theySay)}</p>
                    </div>
                    <div className="col-5">
                      <p> Thông báo: {showText(e2.notify)}</p>
                      <p> Cần chọn: {showText(e2.submitList)}</p>
                      <p> Dánh sách lựa chọn: {showText(e2.pickingList)}</p>
                      <p> Hành động: {showText(e2.action)}</p>
                      <p> Phần thưởng: {showText(e2.reward)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <hr />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return "Lỗi";
  }
}

function showText(arr) {
  try {
    let text = "";
    arr.forEach((e) => {
      text += e + "; ";
    });
    return <b>{text}</b>;
  } catch (error) {
    return "Không";
  }
}
