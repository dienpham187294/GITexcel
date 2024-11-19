import React, { useState, useRef, useEffect } from "react";
import $ from "jquery";
import Sript from "./data/Sript-001.json";
import BeginPart from "./data/Sript-beginpart-001.json";
const Text = "sat";
const IPA = "sæt";
const FIND = "æ,ʌ,ɑː";

function NewTableFromJson() {
  return (
    <div style={{ textAlign: "center", marginTop: "20px", padding: "5%" }}>
      <h1>New Model</h1>
      <button
        onClick={() => {
          try {
            // handleTextToSpeech(0, jsonData[0]);
          } catch (error) {
            alert("Kiểm tra file thông tin.");
          }
        }}
      >
        + Chạy thử mô hình table mới.
      </button>
      <table className="table">
        <tbody>
          <tr>
            <td>id</td>
            <td>audioCode</td>
            <td>text</td>
            <td>lang</td>
            <td>rate</td>
          </tr>
          {Sript.map((e, i) => (
            <>
              {" "}
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{BeginPart[i % 20].id}</td>
                <td>320</td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{BeginPart[i % 20].id01}</td>
                <td>320</td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  Tham khảo ví dụ sau. Ghép giữa âm {e.phuamt} và âm{" "}
                  {e.nguyenam} thành phần âm chính, {e.phuamt}
                  {e.nguyenam}. Phần âm dấu là {e.phuamsau}. Đọc tạm ban đầu là
                </td>
                <td>320</td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  {e.phuamt}
                  {e.nguyenam} {e.phuamsau}
                </td>
                <td>320</td>
                <td>1</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  Hãy đọc thành tiếng để nắm cơ bản cách thức ghép âm, đảm bảo
                  bạn nắm được thứ tự các âm phát ra. Đừng lo lắng âm tạm chưa
                  thật giống tiếng anh, âm tạm cho bạn một định hình ban đầu cần
                  hình thành âm đó như thế nào, như vậy đã đủ, bạn đã đi đúng
                  hướng cách thức ghép âm. Sau khi đọc tạm ta tiếp tục tinh
                  chỉnh bằng cách, đổi cách phát âm các âm phụ sang cách phát âm
                  tiếng anh, phần âm chính sẽ đọc to dài hơn, phần âm dấu thì
                  đọc nhỏ, ngắn hơn, dạng tiếng gió.
                </td>
                <td>320</td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{e.text}</td>
                <td>1</td>
                <td>0.1</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  Lưu ý lại, âm chính đọc to dài, âm dấu đọc nhỏ ngắn. Nghe từ
                  điển nói và tinh chỉnh.
                </td>
                <td>320 </td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{e.text}</td>
                <td>2</td>
                <td>0.1</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>Nghe lại một lần nữa.</td>
                <td>320 </td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{e.text}</td>
                <td>81</td>
                <td>0.1</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  Âm ghép tạm {e.phuamt}
                  {e.nguyenam} {e.phuamsau} có nhiệm vụ cho ta một khung định
                  hình cơ bản cách phát các âm như thế nào. Kết hợp với lắng
                  nghe, tinh chỉnh để đạt được âm chuẩn.
                </td>
                <td>320 </td>
                <td>1.6</td>
              </tr>
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>{e.text}</td>
                <td>115</td>
                <td>0.1</td>
              </tr>{" "}
              <tr>
                <td>{i}</td>
                <td>A{i}</td>
                <td>
                  Ghi nhớ lại lần nữa 3 bước sau. Bước 1, Xác định nguyên âm đại
                  diện là nằm đâu trong UỂ OẢI Ơ. Bước 2, Nối phía trước, để
                  phía sau. Âm chính đọc to dài, âm dấu đọc nhỏ ngắn. Bước 3,
                  Nghe từ điển và tinh chỉnh. Chúc các bạn sớm thành công. Hãy
                  theo dõi để có thêm nhiều ví dụ hơn.
                </td>
                <td>320 </td>
                <td>1.6</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewTableFromJson;
