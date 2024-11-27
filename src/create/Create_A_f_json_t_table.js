import data_f_json_map_001 from "./dataCreate/map_data_001.json";
import data_f_json_map_002_f_001 from "./dataCreate/map_data_002_f_001.json";
import data_f_json_map_003_f_002 from "./dataCreate/map_data_003_f_002.json";
import data_f_json_map_004_f_003 from "./dataCreate/map_data_004_f_003.json";
import data_f_json_map_005_f_004 from "./dataCreate/map_data_005_f_004.json";
import data_f_json_map_006 from "./dataCreate/map_data_006_morong.json";
import data_f_json_map_007 from "./dataCreate/map_data_007_core.json";
import $ from "jquery";

function A1_fetchData_f_json_to_newform_sreenDiv() {
  // data_f_json_map_001;
  const $ID_o_div_to_text_data = $("#DivTable01");

  let res = [];

  data_f_json_map_001.forEach((e_data) => {
    let sen_01 =
      "Điền thêm vào bảng sau thêm 3 nhiệm vụ, giữ nguyên GotoLocation, trình độ phù hợp với người học tiếng anh A1: \n ";

    let sen_02 = "|" + Object.keys(e_data).join(" | ") + "|\n";
    let sen_03 = "|";

    Object.keys(e_data).forEach((eAAAA) => {
      sen_03 += e_data[eAAAA] + "|";
    });

    let res_get_step1 = {
      para: sen_01 + sen_02 + sen_03,
    };
    // for (let i = 0; i < 3; i++) {
    //   res_get_step1.push({
    //     GotoLocation: e_data.GotoLocation,
    //     MeetWho: e_data.MeetWho + i,
    //     Position: " - - - ",
    //     PurposeofRequest: " - - - ",
    //     Task:
    //       "Đến " +
    //       e_data.GotoLocation +
    //       " gặp " +
    //       e_data.MeetWho +
    //       i +
    //       " nhằm yêu cầu . . .",
    //     Need: " - - - ",
    //   });
    // }
    res = res.concat(res_get_step1);
  });

  $ID_o_div_to_text_data.text(JSON.stringify(res));
}

function A2_fetchData_f_json_to_keepform_sreenDiv() {
  // data_f_json_map_001;
  const $ID_o_div_to_text_data = $("#DivTable01");
  $ID_o_div_to_text_data.text(JSON.stringify(data_f_json_map_004_f_003));
}

function A3_fetchData_f_json_to_newform_sreenDiv() {
  // data_f_json_map_001;

  let data_infn_get_f_json = data_f_json_map_003_f_002;

  const $ID_o_div_to_text_data = $("#DivTable01");

  let res = [];

  data_infn_get_f_json.forEach((e_obj_1, i_obj_1) => {
    if (i_obj_1 !== 0 && i_obj_1 % 30 === 0) {
      res.push({ id: "" });
      res.push({ id: "Hoàn thành bảng sau:" });
      let obj_in_loop_temp_begin = {};
      obj_in_loop_temp_begin.id = "id";
      obj_in_loop_temp_begin.situation = "tinh-huong";
      obj_in_loop_temp_begin.need = "need";
      obj_in_loop_temp_begin["cau-hoi-1"] = "cau-hoi-1";
      obj_in_loop_temp_begin["keywords 1"] = "keywords 1";
      obj_in_loop_temp_begin[
        "4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D "
      ] = "4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D ";
      obj_in_loop_temp_begin["cau-hoi-2"] = "cau-hoi-2";
      obj_in_loop_temp_begin["keywords 2"] = "keywords 2";
      obj_in_loop_temp_begin[
        "4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D "
      ] = "4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D ";

      res.push(obj_in_loop_temp_begin);
    }

    let obj_in_loop_temp = {};
    obj_in_loop_temp.id = i_obj_1 + 1;
    obj_in_loop_temp.situation = e_obj_1["tinh-huong"];
    obj_in_loop_temp.need = e_obj_1.Need;
    obj_in_loop_temp["cau-hoi-1"] = e_obj_1["cau-hoi-1"];
    obj_in_loop_temp["keywords 1"] = " - ";
    obj_in_loop_temp["4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D "] =
      " - ";
    obj_in_loop_temp["cau-hoi-2"] = e_obj_1["cau-hoi-2"];
    obj_in_loop_temp["keywords 2"] = " - ";
    obj_in_loop_temp["4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D "] =
      " - ";
    res.push(obj_in_loop_temp);
    // for (let i = 0; i < 4; i++) {
    //   {

    //
    //   }
    // }
  });

  $ID_o_div_to_text_data.text(JSON.stringify(res));
}

function A4_fetchData_f_json_to_newform_sreenDiv() {
  // data_f_json_map_001;

  let data_infn_get_f_json = data_f_json_map_004_f_003;

  const $ID_o_div_to_text_data = $("#DivTable01");

  let res = [];

  data_infn_get_f_json.forEach((e_obj_1, i_obj_1) => {
    // if (i_obj_1 !== 0 && i_obj_1 % 30 === 0) {
    //   res.push({ id: "" });
    //   res.push({ id: "Hoàn thành bảng sau:" });
    //   let obj_in_loop_temp_begin = {};
    //   obj_in_loop_temp_begin.id = "id";
    //   obj_in_loop_temp_begin.situation = "tinh-huong";
    //   obj_in_loop_temp_begin.need = "need";
    //   obj_in_loop_temp_begin["cau-hoi-1"] = "cau-hoi-1";
    //   obj_in_loop_temp_begin["keywords 1"] = "keywords 1";
    //   obj_in_loop_temp_begin[
    //     "4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D "
    //   ] = "4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D ";
    //   obj_in_loop_temp_begin["cau-hoi-2"] = "cau-hoi-2";
    //   obj_in_loop_temp_begin["keywords 2"] = "keywords 2";
    //   obj_in_loop_temp_begin[
    //     "4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D "
    //   ] = "4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D ";

    //   res.push(obj_in_loop_temp_begin);
    // }

    let keyList01 =
      e_obj_1["4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D"].split(";");
    let keyList02 =
      e_obj_1["4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D"].split(";");
    keyList01.forEach((e_keywords, i_keywords) => {
      let obj_in_loop_temp = {};
      obj_in_loop_temp.situation = e_obj_1.need;
      obj_in_loop_temp.qs = e_obj_1["cau-hoi-1"];
      obj_in_loop_temp.key = e_keywords;
      obj_in_loop_temp.qs02 = e_obj_1["cau-hoi-2"];
      obj_in_loop_temp.key02 = keyList02[i_keywords];
      res.push(obj_in_loop_temp);
    });
    // obj_in_loop_temp.id = i_obj_1 + 1;
    // obj_in_loop_temp.situation = e_obj_1["tinh-huong"];
    // obj_in_loop_temp.need = e_obj_1.Need;
    // obj_in_loop_temp["cau-hoi-1"] = e_obj_1["cau-hoi-1"];
    // obj_in_loop_temp["keywords 1"] = " - ";
    // obj_in_loop_temp["4 thông tin trả lời mẫu câu 1, theo dạng A;B;C;D "] =
    //   " - ";
    // obj_in_loop_temp["cau-hoi-2"] = e_obj_1["cau-hoi-2"];
    // obj_in_loop_temp["keywords 2"] = " - ";
    // obj_in_loop_temp["4 thông tin trả lời mẫu câu 2, theo dạng A;B;C;D "] =
    //   " - ";
  });

  $ID_o_div_to_text_data.text(JSON.stringify(res));
}

function A5_fetchData_f_json_to_newform_sreenDiv() {
  // data_f_json_map_001;

  let data_infn_get_f_json = data_f_json_map_005_f_004;

  const $ID_o_div_to_text_data = $("#DivTable01");

  let res = [];
  let iCount_up = 0;
  data_infn_get_f_json.forEach((e_obj_1, i_obj_1) => {
    let aw_fellow_01 = e_obj_1["aw-morong-01"].split(";");

    if (aw_fellow_01.length > 1) {
      let obj01 = {
        id: "",
        qs: e_obj_1["qs-01"],
        aw: e_obj_1["aw-01"],
        morong: e_obj_1["morong-01"],
        aw01: aw_fellow_01[0],
        aw02: aw_fellow_01[1],
      };

      res.push(obj01);
    } else {
      let obj01 = {
        id: iCount_up,
        qs: e_obj_1["qs-01"],
        aw: e_obj_1["aw-01"],
        morong: e_obj_1["morong-01"],
        aw01: aw_fellow_01[0],
        aw02: "--------------------",
      };
      iCount_up += 1;
      res.push(obj01);
    }

    let aw_fellow_02 = e_obj_1["aw-morong-02"].split(";");

    if (aw_fellow_02.length > 1) {
      let obj01 = {
        id: "",
        qs: e_obj_1["qs-02"],
        aw: e_obj_1["aw-02"],
        morong: e_obj_1["morong-02"],
        aw01: aw_fellow_02[0],
        aw02: aw_fellow_02[1],
      };

      res.push(obj01);
    } else {
      let obj01 = {
        id: iCount_up,
        qs: e_obj_1["qs-02"],
        aw: e_obj_1["aw-02"],
        morong: e_obj_1["morong-02"],
        aw01: aw_fellow_02[0],
        aw02: "--------------------",
      };

      iCount_up += 1;
      res.push(obj01);
    }
  });

  $ID_o_div_to_text_data.text(JSON.stringify(res));
}

export {
  A1_fetchData_f_json_to_newform_sreenDiv,
  A2_fetchData_f_json_to_keepform_sreenDiv,
  A3_fetchData_f_json_to_newform_sreenDiv,
  A4_fetchData_f_json_to_newform_sreenDiv,
  A5_fetchData_f_json_to_newform_sreenDiv,
};
