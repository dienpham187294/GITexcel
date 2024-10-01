import $ from "jquery";

function A_Unifile_Outside() {
  try {
    let input = JSON.parse($("#ResID").text());
    //  let getKeys = Object.keys(input[0])
    // console.log(input)
    let output = [];
    let i = input.length;
    let n = input[0].length;

    // console.log(input[i][n])
    for (let m = 0; m < n; m++) {
      let out = [];
      for (let j = 0; j < i; j++) {
        out = out.concat(input[j][m]);
      }
      output.push(out);
    }

    $("#ResID").text(JSON.stringify(output));
    // return output
  } catch (error) {
    console.log("Lỗi Unifile_Outside");
    console.log(error);
  }
}

function NextStep(inX) {
  try {
    let rows = inX;
    let Arr1 = rows[0];
    let arr = [];
    rows.forEach((e, i) => {
      if (i > 0) {
        let obj = {};
        Arr1.forEach((ee, i) => {
          obj[ee] = e[i];
        });
        arr.push(obj);
      }
    });
    arr.forEach((e) => {
      delete e["null"];
    });

    return arr;
  } catch (error) {
    // console.log("Lỗi")
    console.log(error);
  }
}

function B_NextStep_OUTSIDE() {
  try {
    let rows = JSON.parse($("#ResID").text());
    let Arr1 = rows[0];
    let arr = [];
    rows.forEach((e, i) => {
      if (i > 0) {
        let obj = {};
        Arr1.forEach((ee, i) => {
          obj[ee] = e[i];
        });

        arr.push(obj);
      }
    });
    arr.forEach((e) => {
      delete e["null"];
    });

    $("#ResID").text(JSON.stringify(arr));
  } catch (error) {
    // console.log("Lỗi")
    console.log(error);
  }
}

function NextStep_DontUnifile() {
  try {
    let input = JSON.parse($("#ResID").text());
    //  let getKeys = Object.keys(input[0])
    // console.log(input)
    let output = [];
    input.forEach((e) => {
      output.push(NextStep(e));
    });

    $("#ResID").text(JSON.stringify(output));
    // return output
  } catch (error) {
    console.log("Lỗi");
    console.log(error);
  }
}

function getNewArrayImgAndWords() {
  try {
    let data = JSON.parse($("#ResID").text());

    // Extracting "vocals" and "img" into separate arrays
    const vocals = data.map((item) => item.vocals);
    const img = data.map((item) => item.img);

    let res = [];
    vocals.forEach((eVocals, i) => {
      let matchFound = false;

      for (const eImg of img) {
        try {
          if (eImg.includes(replaceCharsWithHyphen(eVocals))) {
            res.push({
              vocals: eVocals,
              img: eImg,
            });

            matchFound = true;
            break; // Exits the loop once a match is found
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (!matchFound) {
        res.push({
          vocals: eVocals,
          img: null,
        });
      }
    });

    $("#ResID").text(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
}

function replaceCharsWithHyphen(inputString) {
  // Sử dụng phương thức .replace() và biểu thức chính quy để thay thế các ký tự
  const result = inputString.replace(/[\s'.(),]+/g, "-");
  return result;
}

function Z_TransformTemplateHotel() {
  try {
    let input = JSON.parse($("#ResID").text());

    let res = [];

    input.forEach((e, i) => {
      res.push([
        ["01-01-img-01", [peopleList[i % 10]["img"]]],
        [
          "01-01-gender-01",
          [peopleList[i % 10]["gender"] === "female" ? 1 : 2],
        ],

        ["01-01-purpose-01", [e["01-01-purpose-01"]]],
        ["01-01-weSay-01", ParseTheySay(e, "01-01-weSay-01")],
        ["01-01-theySay-01", ParseTheySay(e, "01-01-theySay-01")],
        ["01-01-detailTable-01", [JSON.stringify(deitalTable)]],
        ["01-01-submitList-01", [e["01-01-submitList-01"]]],
        ["01-01-submitList-02", [e["02-01-submitList-01"]]],
        ["01-01-submitList-03", [e["03-01-submitList-01"]]],
        ["01-01-tablePicking-01", [JSON.stringify(tablePicking)]],
        ///01-02
        ["01-02-weSay-01", ParseTheySay(e, "01-02-weSay-01")],
        ["01-02-theySay-01", ParseTheySay(e, "01-02-theySay-01")],
        //
        ///01-03
        ["01-03-weSay-01", ParseTheySay(e, "01-03-weSay-01")],
        ["01-03-theySay-01", ParseTheySay(e, "01-03-theySay-01")],

        ["02-01-purpose-01", ["More information"]],
        ["02-01-weSay-01", ParseTheySay(e, "04-01-weSay-01")],
        ["02-01-theySay-01", ParseTheySay(e, "04-01-theySay-01")],
        ["02-01-submitList-01", ParseSubmit(e, "04-01-submitList-01")],

        ///////////04-02

        ["02-02-weSay-01", ParseTheySay(e, "04-02-weSay-01")],
        ["02-02-theySay-01", ParseTheySay(e, "04-02-theySay-01")],
        ["02-02-submitList-01", ParseSubmit(e, "04-02-submitList-01")],
        [
          "02-02-pickingList-01",
          ParsePickingList(
            e,
            "04-02-pickingListName-01",
            "04-02-pickingList-01"
          ),
        ],
        ///////////04-03

        ["02-03-weSay-01", ParseTheySay(e, "04-03-weSay-01")],
        ["02-03-theySay-01", ParseTheySay(e, "04-03-theySay-01")],
        [
          "02-03-pickingList-01",
          ParsePickingList(
            e,
            "04-03-pickingListName-01",
            "04-03-pickingList-01"
          ),
        ],
      ]);
    });

    $("#ResID").text(JSON.stringify(res));
  } catch (error) {}
}

export {
  A_Unifile_Outside,
  B_NextStep_OUTSIDE,
  Z_TransformTemplateHotel,

  // NextStep_DontUnifile,
  // getNewArrayImgAndWords,
};

function processArray(arr) {
  // Sử dụng Set để loại bỏ phần tử trùng lặp, và trim() mỗi phần tử
  let trimmedArray = arr.map((element) => element.trim());
  let uniqueArray = [...new Set(trimmedArray)];
  return uniqueArray;
}

const peopleList = [
  {
    name: "Emily",
    gender: "female",
    img: "https://i.postimg.cc/vTh9hqF4/Emily-21.jpg",
  },
  {
    name: "Jessica",
    gender: "female",
    img: "https://i.postimg.cc/GhMGs5xN/Jessica-23.jpg",
  },
  {
    name: "Sarah",
    gender: "female",
    img: "https://i.postimg.cc/wBNmZTY8/Sarah-27.jpg",
  },
  {
    name: "Ashley",
    gender: "female",
    img: "https://i.postimg.cc/zv8KnmMm/Ashley-34.jpg",
  },
  {
    name: "Jennifer",
    gender: "female",
    img: "https://i.postimg.cc/3RHvT53y/Jennifer-39.jpg",
  },
  {
    name: "David",
    gender: "male",
    img: "https://i.postimg.cc/s2GYz4SL/David-20.jpg",
  },
  {
    name: "Michael",
    gender: "male",
    img: "https://i.postimg.cc/HkRM68K9/Michael-30.jpg",
  },
  {
    name: "Andrew",
    gender: "male",
    img: "https://i.postimg.cc/KzXn83D8/Andrew-40.jpg",
  },
  {
    name: "Christopher",
    gender: "male",
    img: "https://i.postimg.cc/vBW5g80L/Christopher-60.jpg",
  },
  {
    name: "Joshua",
    gender: "male",
    img: "https://i.postimg.cc/wj7J5QWB/Joshua-70.jpg",
  },
];

function ParsePickingList(e, name1, name2) {
  try {
    let n = e[name1] || null;
    let m = (e[name2] || null).split(";");
    return trimArrayElements([n].concat(m));
  } catch (error) {
    return ["None"];
  }
}
function ParseTheySay(e, name2) {
  try {
    // [e["04-02-submitList-01"]]

    let res = [];
    if (e[name2]) {
      res.push(e[name2]);
    }
    if (res.length === 0) {
      res.push("Hi");
    }
    return trimArrayElements(res);
  } catch (error) {
    return [];
  }
}
function ParseSubmit(e, name2) {
  try {
    let res = [];
    if (e[name2]) {
      res.push(e[name2]);
    }
    return trimArrayElements(res);
  } catch (error) {
    return [];
  }
}

function trimArrayElements(array) {
  try {
    return array
      .filter(
        (element) => element !== null && element !== "" && element !== undefined
      ) // Bước 1: loại bỏ các phần tử null
      .map((element) => {
        if (typeof element === "string") {
          return element.trim(); // Cắt bỏ khoảng trắng đầu và cuối của chuỗi
        }
        if (typeof element === "number") {
          return element + ""; // Chuyển số thành chuỗi
        }
        return element;
      });
  } catch (error) {
    console.log(JSON.stringify(array));
  }
}

const deitalTable = [
  [
    [1, "Options:", null, null, null, null, null, null, null, null],
    [
      1,
      "Room Services",
      "Cleaning",
      "Laundry",
      "In-room dining",
      "Towel & linen change",
      "Wake-up call",
      null,
      null,
      null,
    ],
    [
      1,
      "Dining Services",
      "Restaurant",
      "Bar/Café",
      "Buffet",
      "Special dietary options",
      null,
      null,
      null,
      null,
    ],
    [
      1,
      "Guest Support",
      "Booking",
      "(Check-in/Check-out)",
      "Concierge services",
      "Luggage storage",
      "Travel and tour assistance",
      "Currency exchange",
      "Lost and found service",
      "24-hour front desk",
    ],
    [
      1,
      "Wellness & Leisure",
      "Gym/Fitness center",
      "Spa & massage",
      "Swimming pool",
      "Sauna",
      "Sports facilities",
      "Personal trainer services",
      "Wellness programs",
      null,
    ],
    [
      1,
      "Business Services",
      "Meeting rooms",
      "Conference facilities",
      "Printing & fax services",
      "Wi-Fi access",
      "Office supplies",
      "Business center services",
      null,
      null,
    ],
    [
      1,
      "Transport & Parking",
      "Airport shuttle",
      "Valet parking",
      "Taxi booking",
      "Car rental",
      "Electric vehicle charging stations",
      "Bicycle rental",
      null,
      null,
    ],
    [
      1,
      "Event Services",
      "Banquet halls",
      "Catering",
      "Wedding planning",
      "Corporate event management",
      "Audio-visual equipment rental",
      null,
      null,
      null,
    ],
    [
      1,
      "Customer Relationship",
      "Common questions",
      "Feedback collection",
      "Loyalty programs",
      "Guest satisfaction surveys",
      "Special requests",
      null,
      null,
      null,
    ],
  ],
];

const tablePicking = [
  [
    [1, "Room Services", "Cleaning", "Request service"],
    [1, null, null, "Request service information"],
    [1, null, null, "Check service status"],
    [1, null, "Laundry", "Request service"],
    [1, null, null, "Request service information"],
    [1, null, null, "Check service status"],
    [1, null, "In-room dining", "Place order"],
    [1, null, null, "Request menu information"],
    [1, null, null, "Check order status"],
    [1, null, "Towel & linen change", "Request towel or linen change"],
    [1, null, null, "Check service status"],
    [1, null, "Wake-up call", "Schedule wake-up call"],
    [1, null, null, "Modify or cancel wake-up call"],
    [1, null, null, "Check wake-up call status"],
    [1, "Dining Services", "Restaurant", "Reserve table"],
    [1, null, null, "Request menu information"],
    [1, null, null, "Request special service"],
    [1, null, "Bar/Café", "Reserve bar/café seat"],
    [1, null, null, "Request drink menu information"],
    [1, null, "Buffet", "Reserve buffet seat"],
    [1, null, null, "Request buffet menu information"],
    [1, null, "Special dietary options", "Request special dietary meal"],
    [1, null, null, "Check meal suitability"],
    [1, "Guest Support", "Booking (Room and additional services)", "Book room"],
    [1, null, null, "Modify or cancel booking"],
    [
      1,
      null,
      "Reception desk (Check-in/Check-out)",
      "Request check-in/check-out",
    ],
    [1, null, null, "Request check-in/check-out information"],
    [
      1,
      null,
      "Concierge services",
      "Request tour/transport/entertainment assistance",
    ],
    [1, null, "Luggage storage", "Send/receive luggage"],
    [1, null, null, "Check luggage status"],
    [1, null, "Travel and tour assistance", "Book tour"],
    [1, null, null, "Request tourist information"],
    [1, null, "Currency exchange", "Currency exchange"],
    [1, null, null, "Request exchange rate information"],
    [1, null, "Lost and found service", "Report lost item"],
    [1, null, null, "Check found item status"],
    [1, null, "24-hour front desk", "Request 24-hour front desk assistance"],
    [1, "Wellness & Leisure", "Gym/Fitness center", "Book gym session"],
    [1, null, null, "Inquire about personal trainer"],
    [1, null, "Spa & massage", "Book massage session"],
    [1, null, null, "Inquire about spa packages"],
    [1, null, "Swimming pool", "Inquire about pool hours"],
    [1, null, null, "Book pool session"],
    [1, null, "Sauna", "Book sauna session"],
    [1, null, null, "Check sauna status"],
    [1, null, "Sports facilities (e.g., tennis, yoga)", "Book court"],
    [1, null, null, "Inquire about classes or trainers"],
    [1, null, "Personal trainer services", "Book personal trainer session"],
    [1, null, null, "Check schedule"],
    [1, null, "Wellness programs", "Inquire about wellness programs"],
    [1, "Business Services", "Meeting rooms", "Book meeting room"],
    [1, null, null, "Request meeting equipment"],
    [1, null, "Conference facilities", "Book conference room"],
    [1, null, null, "Request conference equipment"],
    [1, null, "Printing & fax services", "Request printing or fax"],
    [1, null, "Wi-Fi access", "Request Wi-Fi password"],
    [1, null, null, "Request connection support"],
    [1, null, "Office supplies", "Request office supplies"],
    [
      1,
      null,
      "Business center services (e.g., secretarial services)",
      "Book business center",
    ],
    [1, null, null, "Request secretarial services"],
    [1, "Transport & Parking", "Airport shuttle", "Book airport shuttle"],
    [1, null, null, "Inquire about shuttle schedule"],
    [1, null, "Valet parking", "Request valet parking"],
    [1, null, null, "Check vehicle status"],
    [1, null, "Taxi booking", "Book taxi"],
    [1, null, null, "Inquire about fare and wait time"],
    [1, null, "Car rental", "Book car rental"],
    [1, null, null, "Check vehicle status"],
    [
      1,
      null,
      "Electric vehicle charging stations",
      "Reserve electric vehicle charging station",
    ],
    [1, null, null, "Inquire about charging cost"],
    [1, null, "Bicycle rental", "Rent bicycle"],
    [1, null, null, "Check bicycle status"],
    [1, "Event Services", "Banquet halls", "Book banquet hall"],
    [1, null, null, "Request event equipment"],
    [1, null, "Catering", "Request catering service"],
    [1, null, null, "Inquire about menu"],
    [1, null, "Wedding planning", "Book wedding planning service"],
    [1, null, "Corporate event management", "Book corporate event"],
    [1, null, null, "Inquire about event services"],
    [1, null, "Audio-visual equipment rental", "Rent audio-visual equipment"],
    [
      1,
      "Customer Relationship",
      "Common questions",
      "Inquire about general hotel/service information",
    ],
    [1, null, "Feedback collection", "Provide feedback"],
    [1, null, null, "Request feedback response"],
    [1, null, "Loyalty programs", "Inquire about loyalty program"],
    [
      1,
      null,
      "Guest satisfaction surveys",
      "Participate in customer satisfaction survey",
    ],
  ],
];
