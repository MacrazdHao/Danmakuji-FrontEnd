import axios from "axios";

// import qs from 'qs'; //此模块用于转成Form Data 格式

axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${localStorage.JWT_TOKEN}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
const baseURL = "/api";

const login = data => {
  return axios.post(`${baseURL}/auth/login`, data);
};

const getVideosInfo = (fileSize, vMd5) => {
  return axios.get(`/api/videos/${fileSize}/${vMd5}`);
};
const getDanmakujiIdByBangumisIdAndepIndex = (bangumiId, epIndex) => {
  return axios.get("/api/episodes", {
    params: {
      bangumiId: bangumiId,
      epIndex: epIndex
    }
  });
};
const getsearchBangumisIdResult = query => {
  return axios.get("/api/bangumis", {
    params: {
      bangumiName: query
    }
  });
};

export default {
  login,
  getVideosInfo,
  getDanmakujiIdByBangumisIdAndepIndex,
  getsearchBangumisIdResult
};