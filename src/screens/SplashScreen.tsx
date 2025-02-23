import {Image, View, StyleSheet} from 'react-native';
import {useEffect} from 'react';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OnBoard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Có thể thay đổi màu nền nếu muốn
  },
  logo: {
    width: 150, // Điều chỉnh kích thước ảnh
    height: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
