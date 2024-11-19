import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";

const Text = "sat";
const IPA = "sæt";
const FIND = "æ,ʌ,ɑː";

function NewVideoModel() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>New Model</h1>

      <button
        onClick={() => {
          try {
            startLoop("XULY", 0, "look", "lʊk");
            startLoop("XULY01", 0, "let", "let");
            // handleTextToSpeech(0, jsonData[0]);
          } catch (error) {
            alert("Kiểm tra file thông tin.");
          }
        }}
      >
        + Chạy thử mô hình video mới.
      </button>
      <div
        style={{
          width: "1024px",
          aspectRatio: "16 / 9",
          border: "1px solid black",
          marginLeft: "250px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div className="row">
          <div id="XULY" className="col-6"></div>
          <div id="XULY01" className="col-6"></div>
        </div>
        {/* <table className="table">
          <tbody>
            <tr>
              <td>Từ vựng</td>
              <td>sat</td>
            </tr>
            <tr>
              <td>IPA</td>
              <td>/sæt/</td>
            </tr>
            <tr>
              <td>Nguyên âm</td>
              <td>/æ/</td>
            </tr>
            <tr>
              <td>Đại diện</td>
              <td>/æ/= A</td>
            </tr>
            <tr>
              <td>Nối trước</td>
              <td>sA</td>
            </tr>
            <tr>
              <td>Nối sau</td>
              <td>sA-t</td>
            </tr>
            <tr>
              <td>Tinh chỉnh</td>
              <td>
                {" "}
                <span>
                  {" "}
                  <span style={{ fontSize: "60px", fontWeight: "800" }}>
                    sA
                  </span>
                  <span style={{ fontSize: "40px" }}>-t</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <tbody>
            <tr>
              <td>U</td>
              <td>E</td>
              <td>O</td> <td>A</td> <td>I</td> <td>Ơ</td>
            </tr>
            <tr>
              <td>
                /ʊ/ <br /> /uː/
              </td>
              <td>/e/</td>{" "}
              <td>
                /ɒ/
                <br /> /ɔː/
              </td>{" "}
              <td>
                /æ/
                <br /> /ʌ/
                <br /> /ɑː/
              </td>
              <td>
                /ɪ/ <br />
                /iː/
              </td>{" "}
              <td>
                /ə/
                <br /> /ɜː/
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr>
                  <td>Nối các âm đơn</td>
                  <td>/eɪ/ /aɪ/ /ɔɪ/ /aʊ/ /əʊ/ /ɪə/ /eə/ /ʊə/</td>
                </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default NewVideoModel;

function startLoop(id, n, textInput, ipaInput) {
  let text = textInput.split("");
  let ipa = ipaInput;

  // const audioKey = "SE-type.wavLoaded";
  // const audio = audioFilesLoaded[audioKey];

  // const playSound = () =>
  //   playAudioById(
  //     audio,
  //     () => console.log("SE START"),
  //     () => console.log("SE END")
  //   );

  function findVowelInIPA(ipaString) {
    const UEOAIsets = [
      { vowel: "U", ipa: ["ʊ", "uː"] },
      { vowel: "E", ipa: ["e"] },
      { vowel: "O", ipa: ["ɒ", "ɔː"] },
      { vowel: "A", ipa: ["æ", "ʌ", "ɑː"] },
      { vowel: "I", ipa: ["ɪ", "iː"] },
      { vowel: "Ơ", ipa: ["ɜː"] },
    ];

    let foundVowel = null;
    let vowelRepresentation = null;

    UEOAIsets.forEach((e) => {
      e.ipa.forEach((e1) => {
        if (ipaString.includes(e1)) {
          foundVowel = e1;
          vowelRepresentation = e.vowel;
        }
      });
    });
    let ipaArray = [];
    const getTime_01 = ipaString.split(foundVowel);
    ipaArray.push(getTime_01[0]);
    ipaArray.push(foundVowel);
    ipaArray.push(getTime_01[1]);
    return { ipaArray, foundVowel, vowelRepresentation };
  }

  const IDget = $("#" + id);
  IDget.html(""); // Xóa nội dung trước khi bắt đầu vòng lặp mới
  IDget.css({ opacity: 1 });
  IDget.append(
    `<div class="allClass" id="XULYSript` + id + n + `"><i id=""></i></div>`
  );
  IDget.append(
    `<div class="allClass" id="XULYText` +
      id +
      n +
      `"><i id="tuvung"></i></div>`
  );
  IDget.append(`<div class="allClass" id="XULYIPA` + id + n + `"></div>`);
  IDget.append(`<div class="allClass" id="XULYExplain` + id + n + `"></div>`);
  IDget.append(`<div class="allClass" id="XULYEND` + id + n + `"></div>`);
  IDget.append(`<div class="allClass" id="XULYTable` + id + n + `"></div>`);
  const IDgetScript = $("#XULYSript" + id + n);
  const IDgetText = $("#XULYText" + id + n);
  const IDgetIPA = $("#XULYIPA" + id + n);
  const IDgetExplain = $("#XULYEND" + id + n);
  const IDgetEnd = $("#XULYExplain" + id + n);
  const IDgetTable = $("#XULYTable" + id + n);

  IDget.css({ fontSize: "80px", fontWeight: "800" });
  IDgetScript.css({
    fontSize: "20px",
    fontWeight: "500",
    padding: "0 5px",
    color: "black",
    height: "60px",
  });
  // IDgetText.css({ marginTop: "20%" });
  IDgetIPA.css({ color: "yellow" });
  IDgetExplain.css({ opacity: 0, fontSize: "0px" });
  IDgetEnd.css({ opacity: 0, fontSize: "0px" });
  IDgetTable.css({
    fontSize: "20px",
  });
  const vowelFound = findVowelInIPA(ipa);

  let time01 = 500 + text.length * 500;
  let time02 = 1500 + text.length * 500 + ipa.length * 500;

  // Append each character of `text` with a delay
  // IDgetScript.text("Từ vựng");
  // $("#tuvung" + id).text("Từ vựng");
  text.forEach((char, index) => {
    setTimeout(() => {
      IDgetText.append(
        `<span class="allClass textClass textClass${index}${id}${n}">${char}</span>`
      );
      // playSound();
    }, index * 500);
  });

  // After `text` is appended, add a line break and start appending `ipa`
  setTimeout(() => {
    // IDgetScript.text("Phiên âm quốc tế");
    IDgetIPA.css({
      border: "1px solid green",
      borderRadius: "10px",
      backgroundColor: "grey",
    });

    vowelFound.ipaArray.forEach((char, index) => {
      setTimeout(() => {
        IDgetIPA.append(
          `<span class="allClass ipaClass ipaClass${index}${id}${n}">${char}</span>`
        );
        // playSound();
      }, index * 300);
    });
  }, time01);

  setTimeout(() => {
    // IDgetScript.text("Bước 1: Xác định nguyên âm đại diện");
    IDgetExplain.append(
      `<span> <span>${vowelFound.foundVowel}</span> ~ <u>${vowelFound.vowelRepresentation}</u> </span>`
    );
    addtable(IDgetTable, vowelFound.vowelRepresentation);
    IDgetExplain.css({
      opacity: 1,
      fontSize: "100px",
      transition: "all 3s ease",
    });
  }, time02);

  setTimeout(() => {
    $(".ipaClass1" + id + n).css({
      transition: "all 2s ease",
      color: "blue",
    });
    IDgetText.css({
      fontSize: 0,
      opacity: 0,
      transition: "all 2s ease",
    });
  }, time02 + 2000);

  setTimeout(() => {
    IDgetExplain.css({
      fontSize: "0px",
      opacity: 0,
      transition: "all 1s ease",
    });
  }, time02 + 5000);

  setTimeout(() => {
    // IDgetScript.text("Bước 2: (Âm chính to, dài hơn) -- Âm dấu nhỏ ngắn hơn.");
    // const audioKey = "SE-tingSound.mp3Loaded";
    // const audio = audioFilesLoaded[audioKey];

    // const playSound_01 = () =>
    //   playAudioById(
    //     audio,
    //     () => console.log("SE START"),
    //     () => console.log("SE END")
    //   );
    // playSound_01();
    IDgetEnd.append(
      `<span> <i>(${vowelFound.ipaArray[0]}</i> <u class="allClass vowelRepresentationClass">${vowelFound.vowelRepresentation}</u>
      )<i class="allClass endsound"> --${vowelFound.ipaArray[2]} </i>
      </span>`
    );

    IDgetEnd.css({
      fontWeight: "500",
      padding: "0px",
      opacity: 1,
      fontSize: "100px",
      transition: "all 1s ease",
    });

    setTimeout(() => {
      $(".vowelRepresentationClass").css({
        fontSize: "60px",
        color: "blue",
        transition: "all 2s ease",
      });
      $(".endsound").css({
        fontSize: "40px",
        color: "purple",
        transition: "all 2s ease",
      });
    }, 2000);

    setTimeout(() => {
      IDget.css({
        opacity: 0,
        // fontSize: "0",
        transition: "all 1s ease",
      });
      setTimeout(() => {
        startLoop(id, n + 1, text.join(""), ipa); // Gọi lại hàm startLoop để tiếp tục vòng lặp
      }, 1000);
    }, 7000);
  }, time02 + 6000);
}

function addtable(objectFocus, vowelRepresentation) {
  // Dữ liệu cho bảng
  const UEOAIsets = [
    { vowel: "U", ipa: ["ʊ", "uː"] },
    { vowel: "E", ipa: ["e"] },
    { vowel: "O", ipa: ["ɒ", "ɔː"] },
    { vowel: "A", ipa: ["æ", "ʌ", "ɑː"] },
    { vowel: "I", ipa: ["ɪ", "iː"] },
    { vowel: "Ơ", ipa: ["ɜː"] },
  ];

  // Tạo bảng và thêm các hàng
  const table = $("<table></table>").css({
    border: "1px solid black",
    borderCollapse: "collapse",
    width: "100%",
  });

  // Thêm hàng dữ liệu
  UEOAIsets.forEach((item) => {
    const styleCSS =
      item.vowel === vowelRepresentation
        ? "border: 1px solid black; padding: 8px; background-color: gray;"
        : "border: 1px solid black; padding: 8px;";

    table.append(`
      <tr>
        <td style="${styleCSS}">${item.vowel}</td>
        <td style="${styleCSS}">${item.ipa.join(", ")}</td>
      </tr>
    `);
  });

  // Thêm bảng vào phần tử được truyền vào dưới dạng `objectFocus`
  objectFocus.append(table);
}
