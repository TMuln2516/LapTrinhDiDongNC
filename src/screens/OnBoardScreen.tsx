import React, {useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({navigation}: any) => {
  const swiperRef = useRef<any>(null);

  const handleSkip = () => {
    navigation.navigate('Login'); // Chuyển sang màn hình Login
  };

  const handleNext = () => {
    swiperRef.current?.scrollBy(1); // Chuyển đến ảnh tiếp theo
  };

  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}>
      {/* Slide 1 */}
      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/onboarding-1.png')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide 2 */}
      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/onboarding-2.png')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide 3 */}
      <View style={styles.slide}>
        <Image
          source={require('../../assets/images/onboarding-3.png')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dot: {
    backgroundColor: '#C4C4C4',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default OnboardingScreen;
