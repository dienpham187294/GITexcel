import React from "react";
// import "./MindMap.css"; // Đảm bảo bạn tạo một file CSS riêng để quản lý style

function MindMapNode({ text, style }) {
  return (
    <div className="mind-map-node" style={style}>
      {text}
    </div>
  );
}

function DataTableALL({ arr }) {
  if (!arr || !Array.isArray(arr)) {
    return <div>No data available</div>;
  }

  const renderNodes = () => {
    let elements = [];
    arr.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          // Tạo node cho mỗi giá trị không null
          elements.push(
            <MindMapNode
              key={`${rowIndex}-${cellIndex}`}
              text={cell}
              style={{
                top: `${rowIndex * 80}px`, // Khoảng cách theo hàng
                left: `${cellIndex * 100 + 100}px`, // Khoảng cách theo cột
                transform: "translateX(-50%)", // Căn giữa theo chiều ngang
              }}
            />
          );
        }
      });
    });
    return elements;
  };

  return (
    <div style={{ scale: "0.5" }} className="mind-map-container">
      {renderNodes()}
    </div>
  );
}

const dataTable = [
  [null, null, null, null, "Hotel", null, null, null],
  [null, null, null, null, "⬇️", null, null, null],
  [null, null, null, null, "Check-in", null, null, null],
  [null, null, null, null, "⬇️", null, null, null],
  ["bar", "bar", "bar", "bar", "Information", "bar", "bar", "bar"],
  ["⬇️", null, "⬇️", null, null, "⬇️", null, "⬇️"],
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
  [null, null, "⬇️", null, null, "⬇️", null, "⬇️"],
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
  [null, null, "⬇️", null, null, null, null, null],
  [null, null, "Verification", null, null, null, null, null],
  [null, null, "⬇️", null, null, null, null, null],
  [null, null, "Receive room", null, null, null, null, null],
];

export default function MindMap() {
  return <DataTableALL arr={dataTable} />;
}
