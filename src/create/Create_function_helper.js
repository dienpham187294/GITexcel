import $ from "jquery";

function transper_row_f_id_id01(data) {
  let temporary_data_f_id_t_id01_res_all = [];
  data.forEach((row_data_o_id) => {
    let temporary_data_f_id_t_id01_res_one = [];
    row_data_o_id.forEach((e, i) => {
      if (i > 0) {
        temporary_data_f_id_t_id01_res_one =
          temporary_data_f_id_t_id01_res_one.concat(row_data_o_id[0], e);
      }
    });
    temporary_data_f_id_t_id01_res_all.push(temporary_data_f_id_t_id01_res_one);
  });
  return temporary_data_f_id_t_id01_res_all;
}


export { transper_row_f_id_id01 };
