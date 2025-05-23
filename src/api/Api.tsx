import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

// export const API_URL = 'http://172.20.10.13:8080';
// export const API_URL = 'http://localhost:8080';
export const API_URL = 'http://10.0.2.2:8080';

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const getApi = async (
  url: string,
  useToken: boolean,
  callback: (error: any, response: any) => void,
) => {
  try {
    // Lấy token nếu có auth
    const token = useToken ? await AsyncStorage.getItem('token') : null;
    const response: AxiosResponse = await axios.get(`${API_URL}${url}`, {
      headers: {
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
        'Content-Type': 'application/json',
      },
    });
    callback(null, response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    callback(errorMessage, null);
  }
};

export const postApi = async (
  url: string,
  params: any,
  useToken: boolean,
  callback: (error: any, response: any) => void,
) => {
  try {
    // Lấy token nếu có auth
    const token = useToken ? await AsyncStorage.getItem('token') : null;
    const response: AxiosResponse = await axios.post(
      `${API_URL}${url}`,
      params,
      {
        headers: {
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
          'Content-Type': 'application/json',
        },
      },
    );
    callback(null, response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    callback(errorMessage, null);
  }
};

export const putApi = async (
  url: string,
  params: any,
  useToken: boolean,
  callback: (error: any, response: any) => void,
) => {
  try {
    // Lấy token nếu có auth
    const token = useToken ? await AsyncStorage.getItem('token') : null;
    const response: AxiosResponse = await axios.put(
      `${API_URL}${url}`,
      params,
      {
        headers: {
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
          'Content-Type': 'application/json',
        },
      },
    );
    callback(null, response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    callback(errorMessage, null);
  }
};

export const loginApi = async (
  username: string,
  password: string,
  callback: (error: any, response: any) => void,
) => {
  const data = {
    username,
    password,
  };

  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${API_URL}/api/auth/login`,
    data,
  };

  try {
    const response: AxiosResponse = await axios.request(config);
    console.log('response: ', response);
    callback(null, response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong';
    callback(errorMessage, null);
  }
};
