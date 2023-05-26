import axios from '../utils/axios';

const loginEndpoint = 'auth/login'; // post
const signupEndpoint = 'members'; // post

export const getUserInfo = async (userInfo, rejectWithValue) => {
  console.log('보낸 이메일과 비밀번호', userInfo);
  console.log(`보낸 서버 주소 👉🏻 ${axios.defaults.baseURL}/auth/login`);
  try {
    // const {data: userInfo} = await.post()
    const response = await axios.post(loginEndpoint, userInfo);
    console.log(`응답 헤더 👉🏻`, response.headers);
    console.log(`응답 바디 👉🏻`, response.data);
    const { accessToken, refreshToken } = response.data;
    if (accessToken && refreshToken) {
      localStorage.setItem(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
    }
    return { userInfo: response.data };
  } catch (err) {
    return rejectWithValue({ error: err.message }); // rejectWithValue적용
  }
};

export default {};
