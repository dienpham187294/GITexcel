import data_show_f_json from "./dataCreate/map_data_007_core.json";

function ShowTableFJSON() {
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
