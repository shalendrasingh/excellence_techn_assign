import axios from "axios";

const fetchUserData = () => {
   const config = {
      method: "get",
      url: `https://reqres.in/api/users?page=2`,
   };
   return axios(config);
};

export { fetchUserData };
