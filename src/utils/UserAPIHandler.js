import axios from 'axios';

function getUserProfile(user_email){
  // console.log(user_email);
  const url = `/api/user_profile`;
  // console.log(url);
  return axios.get(url, {
  params: {
    email: user_email
  }
}).then(response => response.data);
}



function createUser(params){
  return axios.post('/api/create_user',params).then(response => response.data);
}

function addUserCoinsAPI(params){
  return axios.post('/api/add_coins',params).then(response => response.data);
}

export {getUserProfile, createUser, addUserCoinsAPI};
