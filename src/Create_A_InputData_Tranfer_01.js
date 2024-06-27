import $ from "jquery";



function Unifile_Outside() {
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
    console("Lỗi Unifile_Outside");
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

function NextStep_OUTSIDE() {
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




export {
  
  Unifile_Outside,
  NextStep_OUTSIDE,
  NextStep_DontUnifile,
 
  getNewArrayImgAndWords,
};

