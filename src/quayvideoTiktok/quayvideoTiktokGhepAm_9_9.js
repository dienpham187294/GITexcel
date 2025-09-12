import React, { useState } from "react";

function VideoTiktokGhepAm() {
  const [clickedElements, setClickedElements] = useState(new Set());

  const handleClick = (elementId, className) => {
    setClickedElements((prev) => {
      const newSet = new Set(prev);
      const key = `${elementId}-${className}`;
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  // Function để clear tất cả
  const handleClear = () => {
    setClickedElements(new Set());
  };

  const getClickedStyle = (elementId, className) => {
    const key = `${elementId}-${className}`;
    const isClicked = clickedElements.has(key);
    if (className === "tiktokHover" && isClicked) {
      return {
        backgroundColor: "yellow",
        transition: "all 0.3s ease",
        border: "1px solid black",
      };
    }
    if (className === "tiktokHover01" && isClicked) {
      return {
        backgroundColor: "yellow",
        fontSize: "40px",
        padding: "10px",
        transition: "all 0.3s ease",
        border: "1px solid black",
      };
    }
    if (className === "tiktokHover02" && isClicked) {
      return {
        backgroundColor: "red",
        color: "yellow",
        fontSize: "30px",
        padding: "10px",
        transition: "all 0.3s ease",
        border: "1px solid black",
      };
    }
    if (className === "tiktokHover03" && isClicked) {
      return {
        backgroundColor: "red",
        color: "yellow",
        // fontSize: "30px",
        padding: "10px",
        transition: "all 0.3s ease",
        // border: "1px solid black",
      };
    }
    return {
      transition: "all 0.3s ease",
    };
  };

  return (
    <div className="row">
      <div
        className="col-9"
        style={{
          margin: "5% 10%",
          border: "3px solid green",
          borderRadius: "20px",
          width: "700px",
          height: "800px",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <div style={{ height: "700px", overflow: "hidden" }}>
          <div style={{ textAlign: "center", color: "blue" }}>
            <i
              style={getClickedStyle(1, "tiktokHover")}
              onClick={() => handleClick(1, "tiktokHover")}
            >
              Cách để nói tiếng anh dễ dàng và chính xác hơn!
            </i>
            <h1
              style={getClickedStyle(2, "tiktokHover")}
              onClick={() => handleClick(2, "tiktokHover")}
            >
              CHIA SẺ GHÉP ÂM #9
            </h1>
          </div>
          <div
            style={getClickedStyle(3, "tiktokHover")}
            onClick={() => handleClick(3, "tiktokHover")}
          >
            #1 Tiếng anh cũng có những nguyên tắc ghép âm tương tự như tiếng
            việt.{" "}
          </div>
          <div
            style={getClickedStyle(4, "tiktokHover")}
            onClick={() => handleClick(4, "tiktokHover")}
          >
            #2 Chỉ cần nắm những nguyên tắc này chúng ta có thể nghe đọc tiếng
            anh dễ dàng.
          </div>
          <div style={{ fontSize: "30px" }}>
            Trong tiếng việt có từ{" "}
            <b
              style={getClickedStyle(5, "tiktokHover")}
              onClick={() => handleClick(5, "tiktokHover")}
            >
              mU
            </b>{" "}
            trong
            <i
              style={{
                color: "blue",
                ...getClickedStyle(6, "tiktokHover"),
              }}
              onClick={() => handleClick(6, "tiktokHover")}
            >
              {" "}
              mu bàn tay
            </i>
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-12">
              <h4
                style={{
                  color: "blue",
                  ...getClickedStyle(7, "tiktokHover01"),
                }}
                onClick={() => handleClick(7, "tiktokHover01")}
              >
                TIẾNG ANH (mU- | đọc mU)
              </h4>
              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(8, "tiktokHover01")}
                  onClick={() => handleClick(8, "tiktokHover01")}
                >
                  (1)
                  <b
                    style={getClickedStyle(9, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(9, "tiktokHover02");
                    }}
                  >
                    mU
                  </b>
                  (-d)
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(10, "tiktokHover")}
                  onClick={() => handleClick(10, "tiktokHover")}
                >
                  mood n. lối, thức, điệu
                </div>
              </div>
              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(11, "tiktokHover01")}
                  onClick={() => handleClick(11, "tiktokHover01")}
                >
                  (2)
                  <b
                    style={getClickedStyle(12, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(12, "tiktokHover02");
                    }}
                  >
                    mU
                  </b>
                  (-n)
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(13, "tiktokHover")}
                  onClick={() => handleClick(13, "tiktokHover")}
                >
                  moon n. mặt trăng
                </div>
              </div>
              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(15, "tiktokHover01")}
                  onClick={() => handleClick(15, "tiktokHover01")}
                >
                  (3)
                  <b
                    style={getClickedStyle(16, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(16, "tiktokHover02");
                    }}
                  >
                    mU
                  </b>
                  (-v)
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(17, "tiktokHover")}
                  onClick={() => handleClick(17, "tiktokHover")}
                >
                  move v., n. di chuyển, chuyển động
                </div>
              </div>
            </div>
          </div>

          <div
            style={getClickedStyle(14, "tiktokHover03")}
            onClick={() => handleClick(14, "tiktokHover03")}
          >
            <i>Tại sao nên học ghép âm?</i>
            <br />
            <b>
              Ví dụ từ nguyên âm "o" trong tiếng việt chúng ta có thể phải triển
              thành các âm khác dễ dàng như: on, om , mon, non, lon, đon, món,
              mọn, mòn, ... bằng các nguyên tắc cố định.
            </b>
            <i>
              {" "}
              Trong tiếng anh cũng vậy, nếu nắm nguyên tắc sẽ dễ dàng đọc đúng
              và nghe rõ hơn.
            </i>
          </div>
        </div>
        <div style={{ height: "110px" }}>
          <div className="row">
            <div className="col-2">
              <img
                src="https://i.postimg.cc/Bv9MGGy8/favicon-ico.png"
                width={"90px"}
                alt="Logo"
              />
            </div>
            <div className="col-10" style={{ color: "blue" }}>
              Chuyên rèn luyện nghe nói cho sinh viên mất căn bản, kém tự tin.
              Học online, ứng dụng AI.
            </div>
          </div>
        </div>
      </div>

      <div className="col-3" style={{ marginTop: "20%" }}>
        <button
          onClick={handleClear}
          style={{
            backgroundColor: "#ff4757",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "15px 25px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#ff3742";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ff4757";
            e.target.style.transform = "scale(1)";
          }}
        >
          🔄 CLEAR ALL
        </button>

        {/* Hiển thị số lượng elements đã click */}
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f1f2f6",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <strong>Đã chọn: {clickedElements.size} items</strong>
        </div>

        {/* Hiển thị danh sách các element đã click (optional) */}
        {clickedElements.size > 0 && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#dfe4ea",
              borderRadius: "8px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              Các items đã chọn:
            </div>
            {Array.from(clickedElements).map((item, index) => (
              <div
                key={index}
                style={{
                  fontSize: "12px",
                  color: "#57606f",
                  padding: "2px 0",
                }}
              >
                • {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoTiktokGhepAm;
