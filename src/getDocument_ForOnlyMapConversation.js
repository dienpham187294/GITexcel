import { useEffect, useState } from "react";
import $ from "jquery";
import readXlsxFile from "read-excel-file";
import * as TransferData from "./Create_A_InputData_Tranfer_2024_onlyformapConversation";
import transferTextToArray from "./transferTextToArray";
import ReadMessage from "./ReadMessage_2024";
import Dictaphone from "./RegcognitionV2024-05-NG";
import initializeVoicesAndPlatform from "./initializeVoicesAndPlatform";
import { compareTwoStrings } from "string-similarity";
function GetDocument() {
  const [IndexExcel, SetIndexExcel] = useState("1");
  const [Documents, SetDocuments] = useState(null);
  const [PracData, SetPracData] = useState(null);
  const [PickData, SetPickData] = useState([]);
  const [Index, SetIndex] = useState(0);
  const [New, SetNew] = useState(0);
  const [ObjRead, SetObjRead] = useState(null);
  const [CMD, SetCMD] = useState(null);

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
    if (PracData !== null && PracData[Index]) {
      let submitListT = PracData[Index].map((e) => e.submitList || []) // Get submitList or return an empty array
        .flat(); // Flatten the arrays into one array
      let iCheck = submitListT.every((e) => PickData.includes(e + "")); // Check if all items in submitListT are in PickData
      if (iCheck && submitListT.length === PickData.length) {
        if (Index < PracData.length - 1) {
          SetIndex((prevIndex) => prevIndex + 1);
          SetPickData([]);
        } else {
          SetPracData(null);
          SetIndex(0);
          SetPickData([]);
        }
      }
    }
  }, [PracData, Index, PickData]);

  useEffect(() => {
    try {
      if (CMD !== null) {
        const closestMatch = findClosestMatch(CMD, PracData[Index]);
        ReadMessage(ObjRead, getRandomElement(closestMatch.theySay), 1);

        if (closestMatch.action) {
          SetPickData([...PickData, "FN01"]);
        }
      }
    } catch (error) {}
  }, [CMD]);

  useEffect(() => {
    if (New !== 0) {
      SetIndex(0);
      SetPickData([]);
    }
  }, [New]);
  useEffect(() => {
    const initialize = async () => {
      const e = await initializeVoicesAndPlatform();
      SetObjRead(e);
    };

    initialize();
  }, []);

  return (
    <div>
      <div style={{ display: "" }} id="remodeDiv">
        <p id="IndexExcel"> {IndexExcel}</p>
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
          Reset
        </button>
        {showButton(TransferData)}
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
        {JSON.stringify(ObjRead)}
        <button
          onClick={() => {
            ReadMessage(ObjRead, "Hi, Try it with your best.", 1);
          }}
        >
          READ
        </button>

        <hr />
        <div id="ResID" style={{ padding: "15px" }}></div>
      </div>

      {PracData !== null ? (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
          className="row"
        >
          <Dictaphone SetCMD={SetCMD} />{" "}
          {PracData.map((e, i) => (
            <div key={i} style={{ marginLeft: i * 25 + "px" }}>
              {e.map((e1, i1) => (
                <div key={i1}>
                  {Index === i && e1.notify ? (
                    <h1 style={{ color: "blue" }}>{e1.notify}</h1>
                  ) : null}
                  {Index >= i && e1.pickingList ? (
                    <>
                      {showPick(
                        Index === i ? e1.pickingList : e1.submitList,
                        SetPickData,
                        PickData,
                        Index === i ? false : true
                      )}
                    </>
                  ) : null}

                  {Index === i && e1.weCanSayList ? (
                    <select>
                      <option>"We can say" list:</option>
                      {e1.weCanSayList.map((e, i) => (
                        <option key={i}>{e}</option>
                      ))}
                    </select>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null}
      <hr />
      {Documents !== null
        ? tableDocuments(Documents, SetPracData, SetNew)
        : null}
      <hr />
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

function tableDocuments(data, SetPracData, SetNew) {
  try {
    return (
      <div>
        <hr />
        {data.map((e, i) => (
          <button
            className="btn btn-outline-primary p-4"
            key={i}
            onClick={() => {
              SetPracData(e);
              SetNew((D) => D + 1);
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
              SetPracData(e);
              SetNew((D) => D + 1);
            }}
          >
            ? {/* Display the item from the data array */}
          </button>
        ))}

        <hr />
        {data.map((e, i) => (
          <div key={i}>
            <h5>Conversation {i + 1}</h5>{" "}
            <button
              onClick={() => {
                SetPracData(e);
                SetNew((D) => D + 1);
              }}
            >
              {" "}
              StartPractice
            </button>
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
                        <i style={{ color: "blue" }}>
                          {" "}
                          {showText(e2.sayFirst)}
                        </i>
                      </p>
                      <p>
                        <b> {showText(e2.weSay)}</b>
                      </p>
                      <p>{showText(e2.theySay)}</p>
                    </div>
                    <div className="col-5">
                      <p> Thông báo: {showText(e2.notify)}</p>
                      <p> Cần chọn: {showText(e2.submitList)}</p>
                      <p> Dánh sách lựa chọn: {showText(e2.pickingList)}</p>
                      <p>
                        {" "}
                        Dánh sách câu có thể nói: {showText(e2.weCanSayList)}
                      </p>
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

function showPick(arr, SetPickData, PickData, mode) {
  try {
    if (!Array.isArray(arr)) {
      throw new Error("Input is not an array");
    }

    return (
      <>
        {arr.map((e, i) => (
          <button
            style={{
              backgroundColor:
                PickData.includes(e.trim()) || mode ? "yellow" : "transparent",
            }}
            onClick={() => {
              if (!mode) {
                if (!PickData.includes(e.trim())) {
                  // Add item if not already in PickData
                  SetPickData([...PickData, e.trim()]);
                } else {
                  // Remove item if it exists in PickData
                  SetPickData(PickData.filter((item) => item !== e.trim()));
                }
              }
            }}
            key={i}
          >
            {e}
          </button>
        ))}
      </>
    );
  } catch (error) {
    return null;
  }
}
function findClosestMatch(inputString, arrayInput) {
  console.log(arrayInput);
  let closestMatch = null;
  let highestSimilarity = 0;

  // Duyệt qua từng đối tượng trong arrayInput
  arrayInput.forEach((entry) => {
    // Duyệt qua từng chuỗi trong thuộc tính weSay của đối tượng
    entry.weSay.forEach((weSayString) => {
      // So sánh độ tương đồng giữa inputString và weSayString
      const similarity = compareTwoStrings(inputString, weSayString);
      console.log(inputString, weSayString, similarity);

      // Cập nhật độ tương đồng cao nhất và đối tượng tương ứng nếu cần
      if (similarity > highestSimilarity) {
        highestSimilarity = similarity;
        closestMatch = entry;
      }
    });
  });

  // Kiểm tra độ tương đồng có lớn hơn 0.6 không và trả về họSay của đối tượng tương ứng
  if (highestSimilarity > 0.5 && closestMatch) {
    return closestMatch;
  }

  return { theySay: ["What do you mean?"] };
}

const getRandomElement = (array) => {
  // Kiểm tra nếu mảng rỗng
  if (array.length === 0) {
    return null; // Hoặc throw new Error('Array is empty') tùy theo yêu cầu của bạn
  }

  // Tính toán chỉ số ngẫu nhiên trong mảng
  const randomIndex = Math.floor(Math.random() * array.length);

  // Trả về phần tử tại chỉ số ngẫu nhiên
  return array[randomIndex];
};
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    // Chọn một chỉ số ngẫu nhiên từ 0 đến i
    const j = Math.floor(Math.random() * (i + 1));

    // Hoán đổi arr[i] với arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
