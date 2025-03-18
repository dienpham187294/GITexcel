import $ from "jquery";

function getDataFromScreen() {
  try {
    return JSON.parse($("#ResID").text());
  } catch (error) {
    pushDataToScreen(["Lỗi"]);
    console.error("Error parsing data from screen:", error);
    return [];
  }
}

function pushDataToScreen(data) {
  try {
    $("#ResID").text(JSON.stringify(data));
  } catch (error) {
    console.error("Error pushing data to screen:", error);
  }
}

function pushDataToScreen_02(data) {
  try {
    $("#ResID02").text(JSON.stringify(data));
  } catch (error) {
    console.error("Error pushing data to screen:", error);
  }
}

function pushDataToScreen_HD(data) {
  try {
    $("#ResID03").text(JSON.stringify(data));
  } catch (error) {
    console.error("Error pushing data to screen:", error);
  }
}

// Hàm xử lý khi click vào một phần tử theo ID
function handleClickById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener("click", () => {
      console.log(`You clicked on element with ID: ${id}`);
      alert(`You clicked on: ${element.textContent}`);
    });
  } else {
    console.error(`Element with ID "${id}" not found.`);
  }
}

export {
  getDataFromScreen,
  pushDataToScreen,
  pushDataToScreen_02,
  pushDataToScreen_HD,
  handleClickById,
};
