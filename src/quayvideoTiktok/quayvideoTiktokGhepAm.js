import React, { useState } from "react";

function VideoTiktokGhepAm() {
  return (
    <div>
      <style>
        {`
          .tiktokHover:hover {
            background-color: yellow;
       
            transition: all 0.3s ease;
          }
        `}
      </style>
      <div
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
            {" "}
            <i className="tiktokHover">
              Cách để nói tiếng anh dễ dàng và chính xác hơn!
            </i>
            <h1 className="tiktokHover">CHIA SẺ GHÉP ÂM #3</h1>
          </div>
          <div className="tiktokHover">
            #1 Tiếng anh cũng có những nguyên tắc ghép âm tương tự như tiếng
            việt.{" "}
          </div>
          <div className="tiktokHover">
            #2 Chỉ cần nắm những nguyên tắc này chúng ta có thể nghe đọc tiếng anh
            dễ dàng.
          </div>
          <div style={{ fontSize: "30px" }}>
            Xét ví dụ sau: từ <b className="tiktokHover">mo</b> trong{" "}
            <i style={{ color: "blue" }} className="tiktokHover">
              mo cau
            </i>
          </div>
          <div className="row">
            <div className="col-12">
              <h4 style={{ color: "blue" }} className="tiktokHover">
                {" "}
                TIẾNG VIỆT
              </h4>
              <div className="row">
                <div className="col-6 tiktokHover">Thêm dấu</div>
                <div className="col-6 tiktokHover">
                  {" "}
                  mó (sờ mó) | mọ (lọ mọ)
                </div>
              </div>
            </div>
            <div className="col-12">
              <h4 style={{ color: "blue" }} className="tiktokHover">
                {" "}
                TIẾNG ANH
              </h4>
              <div className="row">
                <div className="col-6   tiktokHover">
                  {" "}
                  Thêm phần âm dấu (l) [đọc là ồ]
                </div>
                <div className="col-6 tiktokHover">
                  mO-(ồ) | mO-(l) <br /> mall | trung tâm thương mại
                </div>
              </div>
              <div className="row">
                <div className="col-6 tiktokHover">
                  {" "}
                  Thêm phần âm dấu (m) [đọc là mờ] 
                </div>
                <div className="col-6 tiktokHover">
                  mO-m <br /> mom | mẹ
                </div>
              </div>
              {/* <div className="tiktokHover">
                Ví dụ khác: pen; hen; den; then{" "}
              </div> */}
            </div>
          </div>
          <b className="tiktokHover">
            {" "}
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
              />
            </div>
            <div className="col-10" style={{ color: "blue" }}>
              {" "}
              Chuyên rèn luyện nghe nói cho sinh viên mất căn bản, kém tự tin.
              Học online, ứng dụng AI.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoTiktokGhepAm;
