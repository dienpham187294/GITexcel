import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import * as TransferData from "./Create_A_InputData_Tranfer_2024_onlyformapConversation";

import * as TransferData_01 from "./Create_A_InputData_Tranfer_01";
import transferTextToArray from "./transferTextToArray";
import ReadMessage from "./ReadMessage_2024";
import Dictaphone from "./RegcognitionV2024-05-NG";
import initializeVoicesAndPlatform from "./initializeVoicesAndPlatform";
import InputDataTest from "./ForTest.json";
import ghepamJSON from "./data/dataForExcelRare/ghepam.json";
import ghepamJSONDoandau from "./data/dataForExcelRare/doanmodauGhepam.json";
import {
  findClosestMatch,
  getRandomElement,
  parceARandomSets,
  shuffleArray,
  collectWeSay,
  removeNoneElements,
} from "./ulti/help_prac_function";

let PracDataSave = [];
let IndexSave = 0;
let theySaySave = "Hi how are you?";
let CungThucHanhIndex = 0;
function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");
  const [Documents, SetDocuments] = useState(null);
  const [PracData, SetPracData] = useState(null);
  const [PickData, SetPickData] = useState([]);
  const [Action, SetAction] = useState([]);
  const [Index, SetIndex] = useState(0);
  const [New, SetNew] = useState(0);
  const [ObjRead, SetObjRead] = useState(null);
  const [CMD, SetCMD] = useState(null);
  const [CMDList, SetCMDList] = useState(null);
  const [CMDInterim, SetCMDInterim] = useState(null);
  const [WeCanSay, SetWeCanSay] = useState([]);
  const [SubmitSets, SetSubmitSets] = useState([]);
  const [HDtable, SetHDtable] = useState([]);
  const [Detailtable, SetDetailtable] = useState([]);
  const [ImgAvatar, SetImgAvatar] = useState(null);
  const [Gender, SetGender] = useState(null);
  const [CommonStTable, SetCommonStTable] = useState([]);
  const [HDinfo, SetHDinfo] = useState("huongdan");
  const [Notify, SetNotify] = useState(null);
  const [DataShowTableOfID, SetDataShowTableOfID] = useState(null);
  const [IndexDataShow, SetIndexDataShow] = useState(0);
  const [DocumentMode, SetDocumentMode] = useState("A1");
  // const [PracTest, SetPracTest] = useState(false);
  // const [PracTestList, SetPracTestList] = useState(null);
  const [Score, SetScore] = useState(0);

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

  useEffect(() => {
    PracDataSave = PracData;
  }, [PracData]);

  useEffect(() => {
    IndexSave = Index;
  }, [Index]);

  useEffect(() => {
    if (PracData !== null && PracData[Index]) {
      if (Index === 0) {
        try {
          if (PracData[Index]) {
            SetImgAvatar(
              PracData[Index][0].img[0] ||
                "https://i.postimg.cc/KzXn83D8/Andrew-40.jpg"
            );
            SetGender(PracData[Index][0].gender[0] || 1);
          }
        } catch (error) {}
      }

      // Collecting and setting various states
      SetCMDList(collectWeSay(PracData[Index], ["weSay"]));
      SetWeCanSay(
        shuffleArray(collectWeSay(PracData[Index], ["weSay", "weCanSayList"]))
      );
      // .concat(
      //   pickRandomN(qsSets, 4)
      // )
      SetSubmitSets(collectWeSay(PracData[Index], ["submitList"]));
      SetHDtable(collectWeSay(PracData[Index], ["guideTable"]));
      SetDetailtable(collectWeSay(PracData[Index], ["detailTable"]));
      SetCommonStTable(collectWeSay(PracData[Index], ["commonSt"]));
    }
    if (PracData === null) {
      SetIndex(0);
      SetPickData([]);
    }
  }, [PracData, Index]);

  useEffect(() => {
    // Handling submitListT and preventing crashes with error handling
    if (!PracDataSave) {
      console.log(!PracDataSave);
      return;
    }
    let submitListT = [];
    try {
      submitListT = PracDataSave[IndexSave].map(
        (e) => e.submitList || []
      ).flat();
    } catch (error) {
      console.log("Error processing submitListT:", error);
    }
    // console.log(JSON.stringify(PickData));
    // Checking data and handling index updates
    try {
      let DataCheck = removeNoneElements(PickData);
      let submitSets = removeNoneElements(submitListT);
      let iCheck = submitSets.every((e) => DataCheck.includes(e + "")); // Ensure all elements in submitListT are in DataCheck
      if (iCheck && submitSets.length === DataCheck.length) {
        if (IndexSave < PracDataSave.length - 1) {
          // Move to the next index if not at the end
          SetIndex((prevIndex) => prevIndex + 1);
          SetPickData([]); // Clear PickData for the next set
          SetAction("");
        } else {
          // If at the last index, reset
          SetPracData(null);
          SetIndex(0);
          SetPickData([]);
          SetScore((D) => D + 1);
        }
      }
    } catch (error) {
      console.log("Error during data check:", error);
    }
  }, [PickData]);

  function fn_speakAgain() {
    ReadMessage(ObjRead, theySaySave, Gender || 1, 0.75);
  }
  function fn_speakSlowly() {
    ReadMessage(ObjRead, theySaySave, Gender || 1, 0.5);
  }

  useEffect(() => {
    console.log(Action, "action");
    if (Action.includes("FN")) {
      SetPickData([...PickData, Action]);
    }
  }, [Action]);

  function fn_Xuly(CMD) {
    try {
      if (CMD !== null) {
        const closestMatch = findClosestMatch(CMD, PracData[Index]);
        theySaySave = getRandomElement(closestMatch.theySay);
        ReadMessage(ObjRead, theySaySave, Gender || 1, 0.75);
        if (closestMatch.action) {
          SetAction(closestMatch.action[0].slice(6));
        }
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (New !== 0) {
      SetIndex(0);
      SetPickData([]);
      // SetCMD("Hello");
    }
  }, [New]);
  useEffect(() => {
    const initialize = async () => {
      const e = await initializeVoicesAndPlatform();
      SetObjRead(e);
    };

    initialize();
  }, []);

  // useEffect(() => {
  //   if (PracTest) {
  //     let setsN = parceARandomSets(InputDataTest.length);
  //     SetPracTestList(setsN);
  //     SetPracData(InputDataTest[setsN[0]]);
  //   }
  // }, [PracTest]);

  return (
    <div>
      {/* <h1>ABC</h1>
      <div style={{ padding: "5%" }}>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>id</td>
              <td>audioCode</td>
              <td>text</td>
              <td>lang</td>
              <td>rate</td>
            </tr>
          </thead>
          <tbody>
            {ghepamJSON.map((e, i) => (
              <>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A1"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text01}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A2"}</td>
                  <td>Tham khảo ví dụ đọc cụm từ sau.</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A3"}</td>
                  <td>{e.Text}</td>
                  <td>115</td>
                  <td>1</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A4"}</td>
                  <td>
                    Thay vì nghe và lặp lại theo cách thông thường thì chúng ta
                    sẽ kết hợp làm theo 3 bước.
                  </td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A5"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text02}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A6"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text03}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A7"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text04}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A8"}</td>
                  <td>{e.cachDoc}</td>
                  <td>316</td>
                  <td>0.4</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A9"}</td>
                  <td>{e.Text}</td>
                  <td>115</td>
                  <td>0.6</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A10"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text05}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A11"}</td>
                  <td>{e.cachDoc}</td>
                  <td>316</td>
                  <td>0.4</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A12"}</td>
                  <td>{e.Text}</td>
                  <td>115</td>
                  <td>0.6</td>
                </tr>
                <tr key={i}>
                  <td>{"F" + (i <= 9 ? "0" + i : i)}</td>
                  <td>{"F" + (i <= 9 ? "0" + i : i) + "A13"}</td>
                  <td>{ghepamJSONDoandau[i % 20].text06}</td>
                  <td>316</td>
                  <td>1.3</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div> */}
      <hr />
      <div style={{ display: "" }} id="remodeDiv">
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
        {showButton(TransferData, "green")}
        <div style={{ padding: "0 10% " }}>
          {showButton(TransferData_01, "blue")}
        </div>
        <select
          onChange={(e) => {
            SetDocumentMode(e.currentTarget.value);
          }}
        >
          <option value={"A1"}>A1</option>
          <option value={"A2"}>A2</option>
        </select>
        <button
          className="btn btn-primary"
          style={{ border: "6px solid purple" }}
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
        <br />
        {JSON.stringify(ObjRead)}
        <button
          onClick={() => {
            ReadMessage(
              ObjRead,
              "Hi, Try it with your best.",
              Gender || 1,
              0.75
            );
          }}
        >
          Thử giọng đọc
        </button>
        {/* <button className="btn btn-primary" onClick={() => hr}>
          Cùng thực hành thử
        </button> */}
        {/* <a href="/test"> Cùng thực hành thử</a> */}
        <a href="/video"> Sản xuất video</a>
        <hr />
        <div id="ResID" style={{ padding: "15px" }}></div>
      </div>
      <h1>Phase: {Index + 1}</h1>
      {JSON.stringify(SubmitSets)}
      <br />
      {JSON.stringify(PickData)}
      <hr />
      <Dictaphone
        fn_Xuly={fn_Xuly}
        CMDList={CMDList}
        fn_speakAgain={fn_speakAgain}
        fn_speakSlowly={fn_speakSlowly}
      />{" "}
      {PracData !== null ? (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
            transition: "all 1s ease-in-out", // Smooth transition for the container
            opacity: PracData ? 1 : 0, // Fade in/out effect for the container
            transform: PracData ? "translateY(0)" : "translateY(-10px)", // Smooth movement
          }}
          className="row"
        >
          <div className="col-2">
            <img
              src={ImgAvatar}
              width={"200px"}
              // style={{
              //   transition: "transform 1s ease-in-out, opacity 1s ease-in-out", // Smooth transition for image
              //   opacity: PracData ? 1 : 0,
              //   transform: PracData ? "scale(1)" : "scale(0.95)", // Slight scaling effect
              // }}
            />
          </div>
          <div
            className="col-4"
            style={{
              backgroundColor: "#f0f0f0",
              boxShadow:
                "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              padding: "20px",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              transition: "all 1s ease-in-out", // Smooth transition for this box
              opacity: PracData ? 1 : 0,
              transform: PracData ? "translateY(0)" : "translateY(-10px)", // Move effect
            }}
          >
            {PracData.map((e, i) => (
              <div key={"a" + i}>
                {Index > i ? i + 1 : null}
                {e.map((e1, i1) => (
                  <div
                    key={"AA" + i1}
                    style={{
                      display: "inline-block",
                      transition: "opacity 1s ease-in-out", // Smooth transition for inline-block elements
                      opacity: Index >= i ? 1 : 0,
                    }}
                  >
                    {Index === i && e1.purpose ? (
                      <div>
                        {e1.purpose.map((e2, i2) => (
                          <i
                            style={{
                              fontSize: "medium",
                              color: "purple",
                              transition: "color 1s ease-in-out", // Smooth color change
                            }}
                            key={"b" + i1 + i2}
                          >
                            {e2}
                          </i>
                        ))}
                      </div>
                    ) : null}

                    {Index > i && e1.submitList ? (
                      <div>
                        {e1.submitList.map((e2, i2) => (
                          <i
                            style={{
                              marginRight: "10px",
                              fontSize: "medium",
                              transition: "all 1s ease-in-out", // Smooth transition for list items
                            }}
                            key={"b" + i1 + i2}
                          >
                            __{e2}
                          </i>
                        ))}
                      </div>
                    ) : null}

                    {Index === i && e1.notify ? (
                      <div
                        style={{
                          borderTop: "1px solid green",
                          padding: "10px",
                          width: "300px",
                          transition: "all 1s ease-in-out", // Smooth transition for notifications
                          opacity: e1.notify ? 1 : 0,
                        }}
                      >
                        {e1.notify.map((e, i) => (
                          <h5
                            key={i}
                            style={{
                              color: "blue",
                              transition: "color 1s ease-in-out",
                            }}
                          >
                            + {e}
                          </h5>
                        ))}
                      </div>
                    ) : null}
                    {Index === i && i1 === 0 ? (
                      <>
                        {JSON.stringify(SubmitSets)}
                        <br />
                        {JSON.stringify(PickData)}
                      </>
                    ) : null}

                    {Index === i && i1 === 0 && SubmitSets.includes("FN01") ? (
                      <div>
                        {SubmitSets.map((eFN, iFN) =>
                          eFN.includes("FN") ? (
                            <span
                              style={{
                                width: "100px",
                                padding: "1px 20px",
                                // backgroundColor: "yellow",
                                border: "1px solid black",
                                borderRadius: "5px",
                                backgroundColor: PickData.includes(eFN)
                                  ? "yellow"
                                  : "transparent",
                              }}
                              key={"FN" + iFN}
                            >
                              {" "}
                              {iFN + 1}. <i className="bi bi-mic"></i>
                            </span>
                          ) : null
                        )}
                      </div>
                    ) : null}

                    {Index >= i && e1.pickingList
                      ? e1.pickingList.map(
                          (ePickingListPot, iPickingListPot) => (
                            <div key={iPickingListPot}>
                              {showPick(
                                ePickingListPot,
                                SetPickData,
                                PickData,
                                Index === i ? false : true,
                                i
                              )}
                            </div>
                          )
                        )
                      : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="col-6">
            <div
              style={{
                fontSize: "medium",
                whiteSpace: "pre-line",
                transition: "all 1s ease-in-out", // Smooth transition for the table
              }}
            >
              {DataTableALL(HDtable)}
            </div>

            {/* <select
              className="form-control"
              style={{
                transition: "all 1s ease-in-out", // Smooth transition for the select box
              }}
              onChange={(e) => {
                fn_Xuly(e.currentTarget.value);
              }}
            >
              <option key={"a0"}>"We can say" list:</option>
              {WeCanSay.map((e, i) => (
                <option key={i} value={e}>
                  {e}
                </option>
              ))}
            </select> */}
          </div>
          <div
            style={{
              fontSize: "medium",
              whiteSpace: "pre-line",
              transition: "all 1s ease-in-out", // Add a smooth transition
              opacity: Detailtable.length !== 0 ? 1 : 0, // Fade effect based on content
              transform:
                Detailtable.length !== 0
                  ? "translateY(0)"
                  : "translateY(-10px)", // Slight movement effect
            }}
          >
            {Detailtable.length !== 0 ? (
              <h5 style={{ color: "blue", transition: "color 1s ease-in-out" }}>
                Detail information
              </h5>
            ) : null}
            {DataTableALLInformation(Detailtable)}
          </div>
        </div>
      ) : null}
      <hr />
      <button
        onClick={() => {
          SetPracData(null);
        }}
        className="btn btn-outline-primary"
      >
        Xóa bài thực hành
      </button>
      {Documents !== null
        ? tableDocuments(
            Documents,
            SetPracData,
            SetNew,
            IndexDataShow,
            SetIndexDataShow,
            DocumentMode
          )
        : null}
      <hr />
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

function tableDocuments(
  data,
  SetPracData,
  SetNew,
  IndexDataShow,
  SetIndexDataShow,
  mode
) {
  if (mode === "A1") {
    try {
      return (
        <div>
          <h4>Chọn bài thực hành</h4>
          <hr />
          {data.map((e, i) => (
            <button
              className="btn btn-outline-primary p-4"
              key={i}
              onClick={() => {
                SetPracData(e.data);
                SetNew((D) => D + 1);
                SetIndexDataShow(i);
              }}
            >
              {i + 1} {/* Display the item from the data array */}
            </button>
          ))}

          {shuffleArray(data).map((e, i) => (
            <button
              className="btn btn-primary p-4"
              key={i}
              onClick={() => {
                SetPracData(e.data);
                SetNew((D) => D + 1);
              }}
            >
              ? {/* Display the item from the data array */}
            </button>
          ))}

          <hr />
          {[data[IndexDataShow].data].map((e, i) => (
            <div key={i}>
              <h5>Conversation {i + 1}</h5>{" "}
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
                        <h4>
                          {showText(e2.Error) === "Không"
                            ? null
                            : showText(e2.Error, "red")}
                        </h4>
                        <p>
                          Hỏi:
                          <br />
                          <b>
                            {" "}
                            {showText(e2.weSay) === "Không" ? (
                              <h5 style={{ color: "red" }}>
                                Cảnh báo lỗi không có câu nói
                              </h5>
                            ) : (
                              showText(e2.weSay)
                            )}
                          </b>
                        </p>
                        <hr />
                        Trả lời:
                        <p>
                          {" "}
                          {showText(e2.theySay) === "Không" ? (
                            <h5 style={{ color: "red" }}>
                              Cảnh báo lỗi không có câu trả lời
                            </h5>
                          ) : (
                            showText(e2.theySay)
                          )}
                        </p>
                      </div>
                      <div className="col-5">
                        <p> Mục tiêu: {showText(e2.purpose)}</p>
                        <p> Thông báo: {showText(e2.notify)}</p>
                        <p> Cần chọn: {showText(e2.submitList)}</p>
                        Dánh sách lựa chọn: {showTextARR(e2.pickingList)}
                        <p>
                          {" "}
                          Dánh sách câu có thể nói: {showText(e2.weCanSayList)}
                        </p>
                        <p> Hành động: {showText(e2.action)}</p>
                        <p> Phần thưởng: {showText(e2.reward)}</p>
                        <p>
                          Câu chuyện:{" "}
                          {e2.guideTable !== undefined ? (
                            <b>{JSON.stringify(e2.guideTable).slice(0, 20)}</b>
                          ) : (
                            "Không"
                          )}{" "}
                        </p>
                        <p>
                          Thông tin chi tiết:{" "}
                          {e2.detailTable !== undefined ? (
                            <b>{JSON.stringify(e2.detailTable).slice(0, 20)}</b>
                          ) : (
                            "Không"
                          )}{" "}
                        </p>
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
      return "Lỗi 1";
    }
  }

  try {
    return (
      <div>
        <table className="table table-sm">
          <tbody>
            {data.map((e0, i0) => (
              <>
                <tr>
                  <td>id-{i0 < 9 ? "0" + (i0 + 1) : i0 + 2}</td>
                  {e0.map((e, i) => (
                    <td>{e[0]}</td>
                  ))}
                </tr>

                <tr>
                  <td>content-{i0 < 9 ? "0" + (i0 + 1) : i0 + 2}</td>
                  {e0.map((e, i) => (
                    <td key={i}>
                      {e[1].map((e1, i1) => (
                        <span key={i1}>
                          {i1 === e[1].length - 1 ? e1 : e1 + ";"}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return "Lỗi 2";
  }
}

function showText(arr, colorQ) {
  try {
    return (
      <b>
        {arr.map((e, i) => (
          <span key={i} style={{ color: colorQ ? colorQ : "black" }}>
            <br /> + {e}
          </span>
        ))}
      </b>
    );
  } catch (error) {
    return "Không";
  }
}

function showTextARR(arr) {
  try {
    return arr.map((e, i) => (
      <div key={"group" + i}>
        {e.map((e1, i1) => (
          <span key={"e" + i1} style={{ color: "blue" }}>
            <br /> - {e1}
          </span>
        ))}
      </div>
    ));
  } catch (error) {
    return "Không";
  }
}

function showPick(arr, SetPickData, PickData, mode, indexOfPhase) {
  try {
    if (mode) {
      return null;
    }
    if (!Array.isArray(arr)) {
      throw new Error("Input is not an array");
    }

    const handleChange = (e) => {
      const selectedValue = e.target.value;

      if (!mode) {
        // Remove any previous values from other selects that are already in PickData and not the current select
        const updatedPickData = PickData.filter((item) => !arr.includes(item));

        if (selectedValue !== "none") {
          // Add the new selected value to the filtered PickData
          SetPickData([...updatedPickData, selectedValue.trim()]);
        } else {
          // Only update with the filtered data when 'none' is selected (i.e., no value added)
          SetPickData(updatedPickData);
        }
      }
    };

    return (
      <select
        className="form-control"
        onChange={handleChange}
        value={PickData.find((item) => arr.includes(item)) || "none"}
        style={{
          width: "200px",
          color: PickData.find((item) => arr.includes(item)) ? "blue" : "black",
          // color: "blue",
        }}
      >
        {arr.map((e, i) => (
          <option
            key={indexOfPhase + "" + i}
            value={i === 0 ? "None" : e.trim()}
          >
            {e}
          </option>
        ))}
        <option value={"None"}>None</option>
      </select>
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

function DataTableALL(arr) {
  // Helper function to render individual tables
  const renderTable = (data) => {
    try {
      const dataRows = data;

      return (
        <table
          className="table table-sm table-striped"
          style={{
            // fontSize: "medium",
            borderBottom: "1px solid black",
            marginBottom: "10px",
          }}
        >
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell !== null ? cell : "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (error) {
      console.error("Error in renderTable:", error);
      return <div>Error rendering table</div>;
    }
  };

  // Main logic to handle array input
  if (arr && Array.isArray(arr)) {
    try {
      return (
        <div>
          {arr.map((tableData, index) => (
            <div key={index}>{renderTable(tableData)}</div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error in DataTableALL:", error);
      return <div>Error rendering tables</div>;
    }
  } else {
    return <div>No data available</div>; // Fallback when no data is passed
  }
}

function DataTableALLInformation(arr) {
  // Helper function to render individual tables
  const renderTable = (data) => {
    try {
      if (!data || data.length === 0) return <div>No data available</div>;

      const [headerRow, ...dataRows] = data; // Extract the first row as header

      return (
        <table
          className="table table-sm table-striped"
          style={{
            borderBottom: "1px solid black",
            marginBottom: "10px",
          }}
        >
          <thead>
            <tr>
              {headerRow.map((cell, cellIndex) => (
                <th key={cellIndex}>{cell !== null ? cell : "-"}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell !== null ? cell : "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (error) {
      console.error("Error in renderTable:", error);
      return <div>Error rendering table</div>;
    }
  };

  // Main logic to handle array input
  if (arr && Array.isArray(arr)) {
    try {
      return (
        <div>
          {arr.map((tableData, index) => (
            <div key={index}>{renderTable(tableData)}</div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error in DataTableALL:", error);
      return <div>Error rendering tables</div>;
    }
  } else {
    return <div>No data available</div>; // Fallback when no data is passed
  }
}
