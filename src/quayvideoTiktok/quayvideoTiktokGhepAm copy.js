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
        fontSize: "40px",
        padding: "10px",
        transition: "all 0.3s ease",
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
        <div style={{ height: "700px" }}>
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
              CHIA SẺ GHÉP ÂM #4
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
            Xét ví dụ sau: từ{" "}
            <b
              style={getClickedStyle(5, "tiktokHover")}
              onClick={() => handleClick(5, "tiktokHover")}
            >
              Ao
            </b>{" "}
            trong{" "}
            <i
              style={{
                color: "blue",
                ...getClickedStyle(6, "tiktokHover"),
              }}
              onClick={() => handleClick(6, "tiktokHover")}
            >
              Cái Ao
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
                TIẾNG ANH (Au | từ A về u)
              </h4>
              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(8, "tiktokHover01")}
                  onClick={() => handleClick(8, "tiktokHover01")}
                >
                  k
                  <b
                    style={getClickedStyle(9, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(9, "tiktokHover02");
                    }}
                  >
                    Aʊ
                  </b>
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(10, "tiktokHover")}
                  onClick={() => handleClick(10, "tiktokHover")}
                >
                  cow n. con bò cái
                </div>
              </div>
              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(11, "tiktokHover01")}
                  onClick={() => handleClick(11, "tiktokHover01")}
                >
                  h
                  <b
                    style={getClickedStyle(12, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(12, "tiktokHover02");
                    }}
                  >
                    Aʊ
                  </b>
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(13, "tiktokHover")}
                  onClick={() => handleClick(13, "tiktokHover")}
                >
                  how adv. thế nào, như thế nào, làm sao, ra sao
                </div>
              </div>

              <div className="row">
                <div
                  className="col-6"
                  style={getClickedStyle(15, "tiktokHover01")}
                  onClick={() => handleClick(15, "tiktokHover01")}
                >
                  d
                  <b
                    style={getClickedStyle(16, "tiktokHover02")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick(16, "tiktokHover02");
                    }}
                  >
                    Aʊ
                  </b>
                  -(n)
                </div>
                <div
                  className="col-6"
                  style={getClickedStyle(17, "tiktokHover")}
                  onClick={() => handleClick(17, "tiktokHover")}
                >
                  down adv., prep. xuống
                </div>
              </div>
            </div>
          </div>
          <b
            style={getClickedStyle(14, "tiktokHover02")}
            onClick={() => handleClick(14, "tiktokHover02")}
          >
            <i>
              KÊT LUẬN: Thay vì học đọc từng từ một, hãy hiểu và nắm nguyên lý.
            </i>
          </b>
        </div>
        <div style={{ height: "100px" }}>
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
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="col-3" style={{ marginTop: "20%" }}>
        CLEAR
      </div>
    </div>
  );
}

export default VideoTiktokGhepAm;
