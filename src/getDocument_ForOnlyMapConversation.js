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
  const [WeCanSay, SetWeCanSay] = useState([]);
  const [Notify, SetNotify] = useState(null);

  const [IndexDataShow, SetIndexDataShow] = useState(0);
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
      SetWeCanSay(collectWeSay(PracData[Index]).concat(pickRandomN(qsSets, 4)));
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
      SetCMD("Hello");
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
        <br />
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
      <h1>Phase: {Index + 1}</h1>
      <Dictaphone SetCMD={SetCMD} />{" "}
      {PracData !== null ? (
        <div
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
          className="row"
        >
          {PracData.map((e, i) => (
            <div className="row" key={i} style={{ marginLeft: i * 25 + "px" }}>
              <div className="col-7">
                {" "}
                {e.map((e1, i1) => (
                  <div key={i1}>
                    {Index === i && e1.notify ? (
                      <h1 style={{ color: "blue" }}>{e1.notify}</h1>
                    ) : null}
                    {Index >= i && e1.pickingList ? (
                      <div className="row">
                        <div>
                          {showPick(
                            Index === i ? e1.pickingList : e1.submitList,
                            SetPickData,
                            PickData,
                            Index === i ? false : true
                          )}{" "}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="col-5">
                {Index === i ? (
                  <select className="form-control">
                    <option>"We can say" list:</option>
                    {shuffleArray(WeCanSay).map((e, i) => (
                      <option key={i}>{e}</option>
                    ))}
                  </select>
                ) : null}
              </div>
            </div>
          ))}
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
            SetIndexDataShow
          )
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

function tableDocuments(
  data,
  SetPracData,
  SetNew,
  IndexDataShow,
  SetIndexDataShow
) {
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
              SetPracData(e);
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
              SetPracData(e);
              SetNew((D) => D + 1);
            }}
          >
            ? {/* Display the item from the data array */}
          </button>
        ))}

        <hr />
        {[data[IndexDataShow]].map((e, i) => (
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
                        <b> {showText(e2.weSay)}</b>
                      </p>
                      <hr />
                      Trả lời:
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
    console.log(error);
    return "Lỗi";
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
              borderRadius: "5px",
              padding: "5 10px",
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
      const similarity = compareTwoStrings(
        cleanString(inputString),
        cleanString(weSayString)
      );
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
function shuffleArray(array) {
  let newArray = array.slice(); // Sao chép mảng để giữ nguyên mảng gốc
  for (let i = newArray.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1)); // Chọn một chỉ mục ngẫu nhiên từ 0 đến i
    // Hoán đổi phần tử hiện tại với phần tử ngẫu nhiên
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
  }
  return newArray; // Trả về mảng đã được xáo trộn
}
function collectWeSay(arr) {
  // Sử dụng reduce để gom tất cả weSay và weCanSayList
  const combined = arr.reduce((result, current) => {
    const weSayCombined = current.weSay || [];
    const weCanSayListCombined = current.weCanSayList || [];

    // Nối cả weSay và weCanSayList vào kết quả
    return result.concat(weSayCombined).concat(weCanSayListCombined);
  }, []);

  // Sử dụng Set để loại bỏ phần tử trùng lặp và chuyển đổi về mảng
  return [...new Set(combined)];
}
function pickRandomN(arr, n) {
  if (arr.length < n) {
    return arr;
  }

  let result = [];
  let tempArr = [...arr]; // Copy the original array to avoid mutation

  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * tempArr.length);
    result.push(tempArr[randomIndex]);
    tempArr.splice(randomIndex, 1); // Remove the selected element from the temp array
  }

  return result;
}

const qsSets = [
  "What is your name?",
  "How old are you?",
  "Where are you from?",
  "Do you speak English?",
  "What do you do?",
  "How are you today?",
  "Where do you live?",
  "Do you have any pets?",
  "Can you help me, please?",
  "What time is it?",
  "Do you like coffee?",
  "What is your favorite color?",
  "How many brothers or sisters do you have?",
  "Do you have a phone number?",
  "Are you married?",
  "What is your job?",
  "What is your hobby?",
  "Where is the nearest supermarket?",
  "What’s your email address?",
  "How much does this cost?",
  "Do you have any children?",
  "What’s your favorite food?",
  "What’s your favorite movie?",
  "Where is the bathroom?",
  "What’s your address?",
  "Can I have the bill, please?",
  "How do you spell your name?",
  "How do you get to work?",
  "Can you repeat that, please?",
  "What’s your favorite book?",
  "How long have you lived here?",
  "Where do you study?",
  "What time do you wake up?",
  "What do you like to do on weekends?",
  "Can I help you?",
  "How much is this?",
  "Do you like music?",
  "What’s your phone number?",
  "What do you do in your free time?",
  "What is your favorite sport?",
  "Are you tired?",
  "Where is the train station?",
  "Can you speak slowly, please?",
  "How do you feel today?",
  "Where are we going?",
  "Do you like to travel?",
  "What’s the weather like today?",
  "How far is it from here?",
  "What’s your favorite season?",
  "Where is the nearest bus stop?",
];
function cleanString(str) {
  return str
    .toLowerCase() // Chuyển về chữ thường
    .normalize("NFD") // Chuẩn hóa các ký tự có dấu thành dạng đơn
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/[^a-z0-9\s]/g, ""); // Loại bỏ ký tự đặc biệt, chỉ giữ chữ cái, số và khoảng trắng
}
