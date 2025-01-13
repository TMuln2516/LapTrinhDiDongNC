import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { SplashScreen } from "./src/screens";
import AuthNavigator from "./src/navigators/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import MainNavigator from "./src/navigators/MainNavigator";

const App = () => {
  // sử dụng useState để lưu thời gian 1.5 giây
  const [isShowSplash, setIsShowSplash] = useState(true);
  //muốn lưu liền thì dùng store redux toolkit
  const [accessToken, setAccessToken] = useState('');
  //kiểm tra đăng nhập
  const { getItem, setItem } = useAsyncStorage('assetToken');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  //chạy 01 lần thì dùng useEffect không tham số []
  useEffect(() => {
    checkLogin();
  }, []);
  //Khu vực các hàm
  const checkLogin = async () => {
    const token = await getItem();
    console.log(token);
    //check token
    token && setAccessToken(token);
  };
  return (
    <View>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      {!isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          {/* Kiểm tra token nếu có thì trả về Main không thì trả về Auth */}
          {accessToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      )}
    </View>
  );
};
export default App;