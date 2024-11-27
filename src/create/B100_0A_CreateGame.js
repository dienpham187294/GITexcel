import Pixi from "./H_Pixi";

export default function ImageVIEW() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden", // Chỉnh lại "none" thành "hidden" để tránh các vấn đề về hiển thị
        display: "flex", // Sử dụng flexbox để sắp xếp các phần tử
      }}
    >
      <div style={{ width: "800px", padding: "5px", zIndex: 1 }}>
        <Pixi />
        <hr />
        Bàn điều khiển
      </div>
      <div style={{ flex: 1, border: "1px solid black", zIndex: 2 }}></div>
    </div>
  );
}
