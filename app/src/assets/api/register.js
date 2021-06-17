import axios from "axios";

const instance = axios.create({});

const registerApiCall = (reqData) => {
  return instance({
    url: "/api/auth/register",
    method: "post",
    data: { key: reqData.key, email: reqData.email, pwd: reqData.pwd },
  });
};

const authSendEmail = (reqData) => {
  return instance({
    url: "/api/auth/authSendEmail",
    method: "post",
    data: { email: reqData, emailContentHTML: "<div></div>" },
  });
};

const emailCheckApiCall = (reqData) => {
  return instance({
    url: `/api/auth/emails?email=${reqData}`,
    method: "get",
  });
};

export { registerApiCall, authSendEmail, emailCheckApiCall };
