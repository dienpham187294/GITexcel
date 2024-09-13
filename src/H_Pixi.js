import React, { useRef, useEffect, useState } from "react";
import * as PIXI from "pixi.js";

function PixiMap() {
  const ref = useRef(null);
  const [characterCoords, setCharacterCoords] = useState({ x: 0, y: 0 });
  const [showCentralMessage, setShowCentralMessage] = useState(false);
  const characterSpeed = 5;
  const isMoving = useRef(false); // Cờ để kiểm soát việc di chuyển

  useEffect(() => {
    const mapWidth = 800; // Map width
    const mapHeight = 500; // Map height

    const app = new PIXI.Application({
      width: mapWidth,
      height: mapHeight,
      transparent: false,
      antialias: true,
    });
    ref.current.appendChild(app.view);

    // Load background
    const background = PIXI.Sprite.from(
      "https://i.postimg.cc/9MtnC6PS/Map-Game-1.jpg"
    );
    background.width = mapWidth;
    background.height = mapHeight;
    app.stage.addChild(background);

    // Load character
    const character = PIXI.Sprite.from(
      "https://i.postimg.cc/cL0zmx8k/avatar-01.jpg"
    );
    character.width = 80;
    character.height = 80;
    character.anchor.set(0.5);
    // Create a circular mask for the character
    const mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawCircle(0, 0, 150); // 150 is the radius, half of the width/height
    mask.endFill();
    character.addChild(mask);
    character.mask = mask;
    app.stage.addChild(character);

    let characterPosition = {
      x: mapWidth / 2,
      y: mapHeight / 2,
    };

    const moveCharacter = (targetX, targetY) => {
      isMoving.current = true; // Bật cờ khi bắt đầu di chuyển
      const distX = targetX - characterPosition.x;
      const distY = targetY - characterPosition.y;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const moveX = (distX / distance) * characterSpeed;
      const moveY = (distY / distance) * characterSpeed;

      const moveInterval = setInterval(() => {
        if (
          Math.abs(targetX - characterPosition.x) <= Math.abs(moveX) &&
          Math.abs(targetY - characterPosition.y) <= Math.abs(moveY)
        ) {
          clearInterval(moveInterval);
          characterPosition.x = targetX;
          characterPosition.y = targetY;
          isMoving.current = false; // Tắt cờ khi nhân vật đã đến nơi
        } else {
          characterPosition.x += moveX;
          characterPosition.y += moveY;
        }
      }, 16); // khoảng 60fps
    };

    app.view.addEventListener("click", (e) => {
      if (!isMoving.current) {
        // Chỉ cho phép di chuyển khi nhân vật đã dừng
        const rect = app.view.getBoundingClientRect();
        const targetX = e.clientX - rect.left;
        const targetY = e.clientY - rect.top;
        moveCharacter(targetX, targetY);
        setShowCentralMessage(false);
      }
    });

    app.ticker.add(() => {
      character.x = characterPosition.x;
      character.y = characterPosition.y;

      setCharacterCoords({
        x: Math.floor(characterPosition.x),
        y: Math.floor(characterPosition.y),
      });
    });

    return () => {
      app.destroy(true, true);
      app.view.removeEventListener("click", moveCharacter);
    };
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div ref={ref} />
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "white",
          background: "rgba(0,0,0,0.5)",
          padding: "5px",
        }}
      >
        X: {characterCoords.x} Y: {characterCoords.y}
      </div>
      {showCentralMessage && (
        <div
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            color: "black",
            border: "4px solid black",
            boxShadow:
              "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          Hi, how are you?
        </div>
      )}
    </div>
  );
}

export default PixiMap;
