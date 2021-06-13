import Vue from "vue";
import axios from "app/node_modules/axios";

const pharmacies = async () => {
  const token = await Vue.prototype.$auth.getTokenSilently();
  console.log(token);
  // Use Axios to make a call to the API
  let data = await axios.get("/ker/pharmacies", {
    headers: {
      Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
    }
  });
  console.log(data);
  return data;
};

const sensors = async () => {
  const token = await Vue.prototype.$auth.getTokenSilently();
  console.log(token);
  // Use Axios to make a call to the API
  let data = await axios.get("/ker/pharmacies/sensors", {
    headers: {
      Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
    }
  });
  console.log(data);
  return data;
};

const lastvalues = async id => {
  const token = await Vue.prototype.$auth.getTokenSilently();
  console.log(token);
  // Use Axios to make a call to the API
  let data = await axios.get("/ker/pharmacies/sensors/" + id + "/values", {
    headers: {
      Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
    }
  });
  console.log(data);
  return data;
};
export { pharmacies, sensors, lastvalues };
