import data_show_f_json from "./dataCreate/map_data_007_core.json";

import basic_100lesson from "./dataCreate/100_basic_01.json";
import peopleSets from "./dataCreate/peopleSets.json";
function ShowTableFJSON() {
  return (
    <div>
      {basic_100lesson
        .slice(0, 1)
        .map((eRow, iRow) => f_obj_t_tdSets(eRow, iRow))}
    </div>
  );
}

function f_obj_t_tdSets(input, iRow) {
  // Define sets of questions and answers

  let totalSets = [
    {
      qs: input["qs-a1"],
      awSets: [
        {
          aw: [input["aw01-01-a1"], input["aw01-02-a1"]],
          key: input["key01-01-a1"],
        },
        {
          aw: [input["aw02-01-a1"], input["aw02-02-a1"]],
          key: input["key02-01-a1"],
        },
      ],
    },
    {
      qs: input["qs-a2"],
      awSets: [
        {
          aw: [input["aw01-01-a2"], input["aw01-02-a2"]],
          key: input["key01-01-a2"],
        },
        {
          aw: [input["aw02-01-a2"], input["aw02-02-a2"]],
          key: input["key02-01-a2"],
        },
      ],
    },
    {
      qs: input["qs-a3"],
      awSets: [
        {
          aw: [input["aw01-01-a3"], input["aw01-02-a3"]],
          key: input["key01-01-a3"],
        },
        {
          aw: [input["aw02-01-a3"], input["aw02-02-a3"]],
          key: input["key02-01-a3"],
        },
      ],
    },
    {
      qs: input["qs-a4"],
      awSets: [
        {
          aw: [input["aw01-01-a4"], input["aw01-02-a4"]],
          key: input["key01-01-a4"],
        },
        {
          aw: [input["aw02-01-a4"], input["aw02-02-a4"]],
          key: input["key02-01-a4"],
        },
      ],
    },
  ];

  let f_total_to_table = [
    {
      name: "Name",
      key01: totalSets[0].qs,
      key02: totalSets[1].qs,
      key03: totalSets[2].qs,
      key04: totalSets[3].qs,
    },
  ];

  totalSets[0].awSets.forEach((e000, i000) => {
    totalSets[1].awSets.forEach((e001, i001) => {
      let obj = {
        name: "",
        key01: e000.key,
        key02: e001.key,
        key03: totalSets[2].awSets[0].key,
        key04: "1",
      };
      f_total_to_table.push(obj);
    });
  });

  f_total_to_table.slice(1).forEach((e, i) => {
    e.key04 = totalSets[3].awSets[i % 2].key;
    // totalSets[3].awSets.forEach((e04) => {
    //   e.key04 = e04;
    // });
  });

  totalSets[0].awSets.forEach((e000, i000) => {
    totalSets[1].awSets.forEach((e001, i001) => {
      let obj = {
        name: "",
        key01: e000.key,
        key02: e001.key,
        key03: totalSets[2].awSets[1].key,
        key04: "",
      };
      f_total_to_table.push(obj);
    });
  });

  f_total_to_table.slice(1).forEach((e, i) => {
    e.name = peopleSets[i % 10].name;
  });

  let dataPrac = [];

  let objPrac = {
    id: "",
    charactor: [{ data: [] }],
  };

  f_total_to_table.slice(1).forEach((e, i) => {
    try {
      let data = [].concat(r_people_aw(e.name));
      ["key01", "key02", "key03", "key04"].forEach((key) => {
        try {
          let findObj_res = findObjectsByKey(totalSets, e[key]);
          let obj = { qs: [findObj_res[1]], aw: findObj_res[0].aw };
          data.push(obj);
        } catch (error) {}
      });

      let numChoose = i % 3;

      let pickSets = [
        [1, 2],
        [1, 3],
        [2, 3],
      ];

      let stringFsp = "";

      // [
      //   "key0" + pickSets[numChoose][0],
      //   "key0" + pickSets[numChoose][1],
      // ].forEach((key, iKey) => {
      //   let findObj_res = findObjectsByKey(totalSets, e[key]);

      //   stringFsp =
      //     stringFsp + findObj_res[0].aw[1] + (iKey === 0 ? " and " : " So, ");
      // });
      stringFsp += "Who am I?";

      dataPrac.push({
        fsp: stringFsp,
        type: "A1",
        name: e.name,
        data: data,
        submit: ["FN01"],
      });
    } catch (error) {}
  });

  // Render the rows dynamically
  return (
    <>
      <h1>Bài học {iRow + 1}</h1>
      <h2> {input["Baihoc"]}</h2>
      <h5> {input["Noidungthugon"]}</h5>
      <hr />
      <b>
        Kỹ năng là mục tiêu. - Thực hành là phương pháp - Kỷ luật và cùng nhau
        làm động lực.
      </b>
      <br />
      <i>Kỹ năng cốt lõi: Ghép - Tách âm bằng UEOAI-Ơ</i>
      <br />
      <i>Mục tiêu chung cuộc: 10.000 lượt nghe nói.</i>
      <br />
      <i>
        Mục tiêu nhỏ: 20 điểm thực hành (riêng - bài đơn) và 20 điểm thực hành
        (chung - bài ghép).
      </i>
      <h5>Hoạt động 1: Nhắc lại nguyên tắc ghép âm và UEOAI-Ơ</h5>
      <h5>Hoạt động 2: Thực hành Ghép âm - Tách âm</h5>
      <h5>Hoạt động 3: Học "vừa đủ" nội dung để có thể thực hành.</h5>
      <div
        style={{
          padding: "15px",
          margin: "20px",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        {JSON.stringify(dataPrac)}
        {/* {showTable_f_objSets_sameKey(f_total_to_prac_table)} */}

        {/* {set_prac_style_01.slice(0, 2).map((e, i) => (
          <p>
            {e.qs}- {e.aw}
          </p>
        ))}
        <br />
        2 Dạng câu hỏi 2: Biết . . .Tôi là ai?
        <br />
        3 Điều này có đúng hay không?: Trả lời yes it right/ No it wrong
        <br />4 Did she (Or Name) say A or B Trả lời A hoặc B */}
      </div>
      <h5>Hoạt động 4: Thực hành riêng - bài đơn.</h5>
      <h5>Hoạt động 5: Giải lao - Chơi trò chơi.</h5>
      <h5>Hoạt động 6: Học thêm về nội dung.</h5>
      <h5>Hoạt động 7: Thực hành chung - bài ghép.</h5>
      <hr />
      ***Bảng nội dung:
      {showTable_f_objSets_sameKey(f_total_to_table)}
      {/* <table className="table">
        <tbody>
          <tr>
            <td>Real name</td>
            <td>{qs_01}</td>
            <td>{qs_02}</td>
            <td>{qs_03}</td>
            <td>{qs_04}</td>
          </tr>
          {set_after_fnSet.map((eSetsFinal, i03) => (
            <tr key={i03}>
              <td>{eSetsFinal.name}</td>
              <td>{eSetsFinal.aw01}</td>
              <td>{eSetsFinal.aw02}</td>
              <td>{eSetsFinal.aw03}</td>
              <td>{eSetsFinal.aw04}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}

function showTable_f_objSets_sameKey(inputSets) {
  const getKeySets = Object.keys(inputSets[0]);

  return (
    <table className="table">
      <tbody>
        {inputSets.map((e, i) => (
          <tr key={i}>
            {getKeySets.map((e1, i1) => (
              <td key={i1}>{e[e1]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ShowTableFJSON_map_01() {
  return (
    <div className="row" style={{ padding: "15px" }}>
      <div className="col-12">
        {" "}
        <h1>HOW CAN I HELP YOU?</h1>
      </div>
      <div className="col-12">
        {data_show_f_json.slice(0, 16).map((e, i) =>
          i % 4 === 0 ? (
            <div key={i} className="group">
              {/* You can render additional content here */}
              <div className="row">
                <div className="col-12">
                  <h1 style={{ color: "blue" }}>
                    {e.situation} ({i + 1})
                  </h1>{" "}
                </div>
                <div className="col-6">
                  <b> - {e.qs}</b>
                  {data_show_f_json.slice(i, i + 4).map((eAAA, iAAA) => (
                    <div key={iAAA}>
                      + {eAAA["key-cautraloi-01"]} ({iAAA + 1})
                      {iAAA % 4 === 0 ? (
                        <div
                          style={{
                            padding: "15px",
                            border: "1px solid black",
                            borderRadius: "5px",
                          }}
                        >
                          Nếu đáp án là
                          <b
                            style={{
                              backgroundColor: "yellow",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {eAAA["key-cautraloi-01"]}
                          </b>{" "}
                          hỏi thêm:
                          <hr />
                          <i>{eAAA["morong-01"]}</i>
                          <br />+ {eAAA["aw-mr-01-01"]} (A)
                          <br />+ {eAAA["aw-mr-01-02"]} (B)
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="col-6">
                  <b> - {e.qs02}</b>
                  {data_show_f_json.slice(i, i + 4).map((eAAA, iAAA) => (
                    <div key={iAAA}>
                      + {eAAA["key-cautraloi-02"]} ({iAAA + 1})
                      {iAAA % 4 === 0 ? (
                        <div
                          style={{
                            padding: "15px",
                            border: "1px solid black",
                            borderRadius: "5px",
                          }}
                        >
                          <b
                            style={{
                              backgroundColor: "yellow",
                              padding: "5px",
                              borderRadius: "5px",
                            }}
                          >
                            {eAAA["key-cautraloi-02"]}
                          </b>{" "}
                          <hr />
                          <i>{eAAA["morong-02"]}</i>
                          <br />+ {eAAA["aw-mr-02-01"]} (A)
                          <br />+ {eAAA["aw-mr-02-02"]} (B)
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>{" "}
            </div>
          ) : null
        )}
      </div>

      <div>
        <h1>Chọn đáp án dạng</h1>
        <select className="form-control">
          <option>1-1-B-2</option>
          <option>5-2-3</option>
        </select>
      </div>
    </div>
  );
}

export default ShowTableFJSON;

function findObjectsByKey(data, key) {
  let obj1 = null; // Đối tượng nhỏ chứa key
  let obj2 = null; // Đối tượng lớn chứa câu hỏi và awSets

  for (const item of data) {
    const awSet = item.awSets.find((aw) => aw.key === key); // Tìm awSet theo key
    if (awSet) {
      obj1 = awSet; // Lưu lại awSet nhỏ
      obj2 = item; // Lưu lại câu hỏi và danh sách awSets
      break; // Dừng tìm kiếm nếu đã tìm thấy
    }
  }

  return [obj1, obj2.qs];
}

function r_people_aw(name) {
  let res = [];
  let qsSetsWrong = [];
  peopleSets.forEach((e) => {
    if (e.name === name) {
      res.push({
        qs: ["You are " + name],
        aw: ["That is right."],
        action: ["FN01"],
      });
    } else {
      qsSetsWrong.push("You are " + e.name);
    }
  });
  res.push({
    qs: ["You are " + name],
    aw: ["That is wrong. I am " + name],
    action: ["WRONG"],
  });
  return res;
}
