import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Image,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface InputSearchComponentProps {
  value: string;
  onChangeValue: (value: string) => void;
  listMovie: Movie[];
}
type Movie = {
  id: string;
  image: string;
  name: string;
};
type RootStackParamList = {
  MovieDetail: {id: string}; // Nếu MovieDetail có params, thay undefined bằng { id: string } chẳng hạn
};
const InputSearchComponent = (props: InputSearchComponentProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {onChangeValue, value} = props;

  return (
    <View className="w-full">
      <View className="flex-row items-center bg-[#1C1C1C] rounded-lg h-11 px-3">
        <Image
          source={require('../../assets/images/search_icon.png')}
          className="w-5 h-5 mr-3"
        />
        <TextInput
          className="flex-1 text-white"
          value={value}
          onChangeText={onChangeValue}
          placeholder="Search"
          placeholderTextColor="#8C8C8C"
        />
      </View>
    </View>
  );
};

export default InputSearchComponent;
