import React, { useEffect, useState } from "react";
import $ from "jquery";
import MindMap from "./B100_SPEAK_AND_RECORD_MINDMAP";
const ContentDiv = ({ rateDiv, actionSet, setActionSTT }) => {
  const [Index, setIndex] = useState(0);
  const [divElement, setDivElement] = useState(null); // Lưu trữ phần tử div
  const [STTSHOW, setSTTSHOW] = useState([0]); // Lưu trữ phần tử div
  const [BorderSets, setBorderSets] = useState([]); // Lưu trữ phần tử div

  useEffect(() => {
    if (Index === 0) {
      // Tìm phần tử có ID "1x1ID"
    }
  }, [Index]);

  useEffect(() => {
    // actionSet
    // console.log(actionSet.divCss);
    if (
      actionSet.divCss !== "" &&
      actionSet.divCss !== null &&
      actionSet.divCss !== undefined
    ) {
      let modeCss = {};
      try {
        modeCss = JSON.parse(actionSet.divCss);
      } catch (error) {
        console.log(error);
      }

      let idNew = "a" + Date.now();
      let divID = "chatDIV" + actionSet.column;

      addDiv(divID, "div", "text", idNew, modeCss);

      if (actionSet.clickAnimation) {
        $("#" + idNew).text(actionSet.textInDiv);
        setTimeout(() => {
          simulateSelection(idNew);
        }, 2000);
      }

      if (!actionSet.clickAnimation && actionSet.textInDiv) {
        if (actionSet.textAppear === "normal") {
          $("#" + idNew).text(actionSet.textInDiv);
          setActionSTT((D) => D + 1);
        } else {
          typeEffect(idNew, actionSet.textInDiv.split(""), 100);
        }
      }

      if (actionSet.imgInDiv) {
        addImageToDiv(idNew, actionSet.imgInDiv);
      }
    } else {
      setActionSTT((D) => D + 1);
    }
  }, [actionSet]);

  const clearTable = () => {
    cellSets.forEach((eCol) => {
      cellSets.forEach((eRow) => {
        const cell = document.getElementById(`${eCol}x${eRow}ID`);
        if (cell) {
          cell.textContent = ""; // Xóa nội dung
        }
      });
    });
  };

  // Hàm để di chuyển div tới vị trí có ID là "5x5ID"
  const moveDivTo5x5 = () => {
    if (divElement) {
      // Xóa div khỏi vị trí hiện tại
      if (divElement.parentNode) {
        divElement.parentNode.removeChild(divElement);
      }

      // Di chuyển đến vị trí mới
      const targetElement = document.getElementById("5x5ID");
      if (targetElement) {
        targetElement.appendChild(divElement);
      }
    }
  };

  const addDiv = (ID, type, text, newid, modeCss) => {
    // Lấy phần tử bằng jQuery
    const $element = $("#" + ID);

    if ($element.length) {
      // Kiểm tra xem phần tử có tồn tại không
      // Tạo phần tử mới bằng jQuery
      const $div = $("<" + type + ">", {
        id: newid, // Đặt ID cho phần tử mới
        // Thêm nội dung văn bản nếu có
      });

      $div.css(modeCss);

      // $div.addClass("fade-in");

      $element.append($div);

      // Lưu phần tử div để có thể di chuyển sau này
      // setDivElement($div[0]); // Lưu đối tượng DOM của div
      $element.animate(
        {
          scrollTop: $element[0].scrollHeight,
        },
        1000
      ); // Cuộn trong 500ms
    }
  };

  function addImageToDiv(id, imageUrl) {
    try {
      // Lấy phần tử bằng jQuery
      const $element = $("#" + id);

      if ($element.length) {
        // Tạo phần tử img bằng jQuery
        const $img = $("<img>", {
          src: imageUrl, // Đặt đường dẫn đến hình ảnh
          alt: "Mô tả hình ảnh", // Thêm thuộc tính alt
          css: {
            width: "100%", // Đặt chiều rộng bằng 100% của parent
            height: "100%", // Đặt chiều cao bằng 100% của parent
            objectFit: "cover", // Đảm bảo hình ảnh giữ tỉ lệ và bao phủ toàn bộ khung chứa
          },
        });

        // Xóa nội dung trước đó của phần tử (nếu có) và thêm hình ảnh vào
        $element.empty().append($img); // Sử dụng .empty() để xóa nội dung trước đó và .append() để thêm hình ảnh
        setActionSTT((D) => D + 1);
      }
    } catch (error) {
      console.error(error); // Bắt và xử lý lỗi
    }
  }

  const typeEffect = (elementId, textArray, speed) => {
    try {
      const element = document.getElementById(elementId);
      let index = 0;

      const type = () => {
        if (index < textArray.length) {
          if (textArray[index] === "\n") {
            // Nếu ký tự là newline (\n), thêm một thẻ <br> để xuống dòng
            element.innerHTML += "<br>";
          } else {
            // Nếu không, thêm ký tự bình thường
            element.innerHTML += textArray[index];
          }
          index++;
          setTimeout(type, speed); // Tiếp tục đánh chữ sau một khoảng thời gian
        } else {
          // Khi hoàn thành việc đánh chữ, thêm thẻ <br> để xuống dòng
          element.innerHTML += "<br>";
          setActionSTT((D) => D + 1);
        }
      };

      // Gọi hàm type để bắt đầu hiệu ứng
      type();
    } catch (error) {
      console.error("Error in typeEffect:", error);
    }
  };

  const scrollToTopInMindmap = (id) => {
    const mindmapView = document.getElementById("mindmapview");
    const targetElement = document.getElementById(id);

    if (mindmapView && targetElement) {
      // Kiểm tra xem targetElement có nằm trong mindmapView không
      if (mindmapView.contains(targetElement)) {
        // Tính toán vị trí của phần tử targetElement so với mindmapView
        const offsetTop = targetElement.offsetTop - mindmapView.offsetTop;

        // Cuộn mindmapView đến vị trí của phần tử targetElement
        mindmapView.scrollTo({
          top: offsetTop, // Cuộn đến vị trí gần top
          behavior: "smooth", // Di chuyển mượt mà
        });
      }
    }
  };
  function simulateSelection(id) {
    // Kiểm tra xem phần tử có tồn tại không
    const targetElement = $("#" + id);

    if (targetElement.length) {
      // Tạo icon bằng jQuery
      const iconElement = $('<i class="bi bi-hand-index-thumb"></i>');

      // Thêm icon vào bên trong phần tử với ID cho trước
      targetElement.append(iconElement);
      // Tạo hiệu ứng cho icon (scale to nhỏ để tạo cảm giác bấm vào)

      targetElement.css({
        transform: "scale(0.5)",
        transition: "transform 0.3s",
      });

      // // targetElement.addClass("fade-in");

      // Sau một khoảng thời gian, phóng to icon để tạo hiệu ứng
      setTimeout(function () {
        targetElement.css({ transform: "scale(1.2)" });
      }, 100); // Bắt đầu hiệu ứng sau 100ms

      // Sau khi hiệu ứng hoàn tất, đưa icon về kích thước bình thường
      setTimeout(function () {
        targetElement.css({
          transform: "scale(0.8)",
          borderColor: "yellow",
          backgroundColor: "gray",
        });
        setActionSTT((D) => D + 1);
      }, 500); // Hiệu ứng kéo dài 500ms
    } else {
      console.log("Phần tử với ID '" + id + "' không tồn tại.");
    }
  }
  const expandElement = (targetElement) => {
    // Bắt đầu với kích thước nhỏ hơn một chút để tạo hiệu ứng smooth hơn
    targetElement.css({
      width: "150px", // Kích thước nhỏ ban đầu
      height: "50px", // Kích thước nhỏ ban đầu
      overflow: "hidden", // Ẩn nội dung để không bị hiện đột ngột
      transition: "all 1s ease-in-out", // Tăng thời gian và dùng 'ease-in-out' để mượt hơn
    });

    // Kích hoạt hiệu ứng mở rộng sau một khoảng thời gian
    setTimeout(() => {
      targetElement.css({
        width: "200px", // Kích thước cuối cùng lớn hơn
        height: "100px", // Kích thước cuối cùng lớn hơn
      });
    }, 100); // Bắt đầu sau một khoảng thời gian nhỏ để đảm bảo sự mượt mà
  };

  return (
    <div
      style={{
        marginTop: rateDiv * 5 + "vh",
        height: 40 * rateDiv + "vh",
        width: "100%",
        border: "1px solid black",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: "15px",
        display: "flex",
        color: "white",
      }}
    >
      <div className="row" style={{ width: "100%" }}>
        <div
          className="col-6"
          id="chatDIVD1"
          style={{
            height: 40 * rateDiv + "vh",
            overflow: "hidden",
            padding: "10px",
            fontSize: "larger",
            marginTop: "10px",
          }}
        ></div>
        <div
          className="col-6"
          id="chatDIVD2"
          style={{
            height: 40 * rateDiv + "vh",
            overflow: "hidden",
            padding: "10px",
            fontSize: "larger",
            marginTop: "10px",
          }}
        ></div>
        <div
          className="col-4"
          id="chatDIVD3"
          style={{
            height: 40 * rateDiv + "vh",
            overflow: "hidden",
            padding: "20px",
            fontSize: "larger",
            marginTop: "20px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ContentDiv;

const cellSets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

{
  /* <table style={{ position: "relative" }}>
        <tbody>
          {cellSets.map((eCol, iCol) => (
            <tr key={iCol}>
              {cellSets.map((eRow, iRow) => (
                <td
                  style={{
                    width: 10 * rateDiv + "vw",
                    height: 10 + rateDiv + "vh",
                    position: "relative",
                    overflow: "visible",
                  }}
                  key={iRow}
                  id={eCol + "x" + eRow + "ID"}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */
}

{
  /* Thêm nút clear và nút di chuyển */
}
{
  /* <div style={{ marginLeft: "10px" }}>
        <button onClick={() => addDiv("1x5ID")}>Thêm</button>
        <button
          onClick={() => {
            typeEffect("1x5IDDiv", ["H", "E", "A", "D", "I", "N", "G"], 100);
          }}
        >
          Đánh máy
        </button>
        <button
          onClick={() => {
            addDiv("1x1ID");
            addImageToDiv(
              "1x1IDDiv",
              "https://i.postimg.cc/wBNmZTY8/Sarah-27.jpg"
            );
          }}
        >
          Thêm hình ảnh
        </button>
        <button onClick={clearTable} style={{ marginRight: "10px" }}>
          Clear Table
        </button>
        <button onClick={moveDivTo5x5}>Move Div to 5x5</button>
      </div> */
}

function DataTableALL(arr) {
  // Helper function to render individual tables
  const renderTable = (data) => {
    try {
      const dataRows = data;

      return (
        <table
          id="tableView"
          className=""
          style={{
            borderBottom: "1px solid black",
            marginBottom: "10px",
            color: "white",
            border: "1",
            whiteSpace: "pre-line",
            scale: "1",
          }}
        >
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    id={rowIndex + "x" + cellIndex + "cellTableID"}
                    key={cellIndex}
                  >
                    <div>{cell !== null ? cell : null}</div>
                  </td>
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

const dataTable = [
  [
    [null, null, null, null, "Hotel", null, null, null],
    [null, null, null, null, "down arrow", null, null, null],
    [null, null, null, null, "Check -in", null, null, null],
    [null, null, null, null, "down arrow", null, null, null],
    ["bar", "bar", "bar", "bar", "Information", "bar", "bar", "bar"],
    [
      "down arrow",
      null,
      "down arrow",
      null,
      null,
      "down arrow",
      null,
      "down arrow",
    ],
    [
      "Ready",
      null,
      "Check-in early",
      null,
      null,
      "Waiting 20 minutes",
      null,
      "Waiting",
    ],
    [null, null, "down arrow", null, null, "down arrow", null, "down arrow"],
    [
      null,
      null,
      "Fee and payment",
      null,
      null,
      "Drinking for waiting",
      null,
      "Luggage storage",
    ],
    [null, null, "down arrow", null, null, null, null, null],
    [null, null, "Verification", null, null, null, null, null],
    [null, null, "down arrow", null, null, null, null, null],
    [null, null, "Receive room", null, null, null, null, null],
  ],
];

const getFirstChar = (str) => {
  if (typeof str === "string" && str.length > 0) {
    return str.charAt(0);
  }
  return ""; // Trả về chuỗi rỗng nếu không phải là chuỗi hoặc chuỗi rỗng
};
