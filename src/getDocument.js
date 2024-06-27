import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import * as TransferData from "./Create_A_InputData_Tranfer_01";
import * as TransferData2024 from "./Create_A_InputData_Tranfer_2024_HOPEFINAL";
import transferTextToArray from "./transferTextToArray";
function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");
  const [ImgAndVocals, SetImgAndVocals] = useState(null);

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
      <div style={{ display: "" }}>
        <input type="file" id="input" />
        <button
          onClick={() => {
            $("#input").val("");
            $("#ResID").text("");
          }}
        >
          Reset
        </button>
        
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
      
        {showButton(TransferData)}
        <hr />
        {showButton(TransferData2024)}

 
        <button
          onClick={() => {
            try {
              if (ImgAndVocals === null) {
                SetImgAndVocals(JSON.parse($("#ResID").text()));
              } else {
                SetImgAndVocals(null);
              }
            } catch (error) {}
          }}
        >
          GET TABLE IMG AND VOCALS
        </button>
        <hr />

        {ImgAndVocals !== null ? tableDataView(ImgAndVocals, 2) : null}
        <hr />
        <i>Các funtion get data inside: Volce and image -vocals; img-</i>
        <div id="ResID" style={{ padding: "35px" }}></div>
        <div id="getInnerHtml">
          <hr />
        </div>
      </div>

      <div></div>

    
      <div id="showKQ"></div>
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


function tableDataView(ImgAndVocals, mode) {
  if (mode === 2) {
    return (
      <table>
        {ImgAndVocals.map((e, i) => (
          <tr key={i}>
            <td>{e.vocals}</td>
            <td>{e.img}</td>
          </tr>
        ))}
      </table>
    );
  }

  try {
    let aSets = [];
    ImgAndVocals.forEach((e, i) => {
      e.qsAndAw.forEach((e1) => {
        aSets.push({ id: "A" + i, qs: e1.qs, aw: [e1.aw] });
      });
    });

    return (
      <>
        {mode === 1
          ? JSON.stringify(aSets)
          : // <table>
            //   {ImgAndVocals.map((e, i) =>
            //     e.qsAndAw.map((e1, i1) => (
            //       <tr key={i1}>
            //         <td>{"A" + i}</td>
            //         <td>{e1.qs}</td>
            //         <td>{e1.aw}</td>
            //       </tr>
            //     ))
            //   )}
            // </table>
            null}

        {mode === 0 ? (
          <table>
            {ImgAndVocals.map((e, i) => (
              <tr key={i}>
                {/* <td>{e.vocals}</td>
            <td>{e.img}</td> */}
                <td>{e.head}</td>
                <td>{e.subHead}</td>
                <td>{e.storyEn}</td>
                <td>{e.storyVn}</td>
                <td>{JSON.stringify(e.qsAndAw)}</td>
              </tr>
            ))}
          </table>
        ) : null}
      </>
    );
  } catch (error) {
    return "Lỗi";
  }
}

