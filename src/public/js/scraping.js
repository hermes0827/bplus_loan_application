import axios from "axios";

axios({
  url: "https://stg.benefitplus.kr/api/loan_recpetion",
  method: "get",
  data: {
    name: "체납내역",
  },
}).then((response) => {
  console.log(JSON.parse(response.data.data.data[0].output));
});
