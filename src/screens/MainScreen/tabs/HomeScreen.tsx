import {getApi} from '../../../api/Api';
import {genreType, movieType} from '../../../data/Data';
import {formatDuration} from '../../../utils/Utils';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InputSearchComponent from '../../../components/InputSearchComponent';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  const [searchValue, setSearchValue] = useState('');
  const [listMovie, setListMovie] = useState<movieType[]>([]);
  const [filteredMovie, setFilteredMovie] = useState<movieType[]>([]);
  const [listGenre, setListGenre] = useState<genreType[]>([]);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    getApi('/api/movies/', false, (error, response) => {
      if (error) {
        console.log('Error with get: ', error);
      } else {
        console.log('Reponse: ', response.result);
        setListMovie(response.result);
        setFilteredMovie(response.result);
      }
    });

    getApi('/api/genres/', true, (error, response) => {
      if (error) {
        console.log('Error with get: ', error);
      } else {
        console.log('List genre: ', response.result);
        const updatedGenres: genreType[] = [
          {id: 'all', name: 'Tất cả'},
          ...response.result,
        ];
        setListGenre(updatedGenres);
      }
    });
  }, []);

  const removeDiacritics = (str: string): string => {
    return str
      .normalize('NFD') // Phân tách ký tự và dấu
      .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu
      .replace(/[Đđ]/g, 'd') // Chuyển Đ, đ thành d
      .toLowerCase();
  };

  useEffect(() => {
    console.log('Search value: ', searchValue);
    const filteredMovies = listMovie.filter(movie => {
      const matchesSearch = searchValue
        ? removeDiacritics(movie.name).includes(removeDiacritics(searchValue))
        : true;
      const matchesGenre =
        selectedGenre === 'all'
          ? true
          : movie.genres.some(genre => genre.id === selectedGenre);
      return matchesSearch && matchesGenre;
    });
    setFilteredMovie(filteredMovies);
  }, [searchValue, selectedGenre]);

  const handleClickMovie = (id: string) => {
    console.log('Click on movie', id);
    navigation.navigate('MovieDetail', id);
  };

  const showGenresCus = (item: genreType) => {
    const isSelected = item.id === selectedGenre;
    return (
      <TouchableOpacity onPress={() => setSelectedGenre(item.id)}>
        <View
          className={`p-2 mx-2 rounded-lg ${
            isSelected ? 'bg-[#FCC434]' : 'bg-[#1C1C1C]'
          }`}>
          <Text
            className={`text-lg ${
              isSelected ? 'text-black' : 'text-[#8C8C8C]'
            }`}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showMovieNowPlayingCus = ({item}: {item: movieType}) => {
    return (
      <TouchableOpacity onPress={() => handleClickMovie(item.id)}>
        <View className="flex justify-center items-center w-[300px]">
          <Image
            className="w-[300px] h-[450px] rounded-lg"
            source={{
              uri: item.image,
            }}
          />
          <Text className="text-white text-center mt-2 text-lg font-semibold">
            {item.name}
          </Text>
          <View>
            <Text className="text-gray-400">
              {formatDuration(item.duration)} •{' '}
              {item.genres
                .slice(0, 2)
                .map(genre => genre.name)
                .join(', ')}
            </Text>
          </View>
          <View className="flex-row justify-center items-center space-x-2">
            <AntDesign name="star" size={20} color="#FCC434" />
            <Text className="text-gray-400">{item.rate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const showMovieComingSoonCus = (item: movieType) => {
    return (
      <TouchableOpacity onPress={() => handleClickMovie(item.id)}>
        <View className="w-[170px] pr-2">
          <View className="h-[300px]">
            <Image
              className="h-[240px] rounded-lg"
              source={{
                uri: item.image,
              }}
            />

            <Text className="text-lg text-[#FCC434] numberOfLines={2}">
              {item.name}
            </Text>
          </View>
          <View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../../../../assets/images/video_icon.png')}
              />
              <Text className="text-gray-400">
                {item.genres
                  .slice(0, 1)
                  .map(genre => genre.name)
                  .join(', ')}
              </Text>
            </View>
          </View>
          <View>
            <View className="flex-row items-center space-x-2">
              <Image
                source={require('../../../../assets/images/calendar_icon.png')}
              />
              <Text className="text-gray-400">{item.premiere}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        className="bg-black w-full h-full px-4"
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View>
          <View className="py-4 flex-row justify-between">
            <View>
              <Text className="text-lg text-white">Hi, Huy</Text>
              <Text className="text-2xl text-white">Wellcome Back</Text>
            </View>
            <View className="justify-center">
              <Icon name="notifications" color="white" size={35} />
            </View>
          </View>
          <View>
            <InputSearchComponent
              value={searchValue}
              onChangeValue={setSearchValue}
              listMovie={listMovie}
            />
          </View>
          <View>
            <ScrollView horizontal className="mt-4">
              {listGenre.map(item => (
                <View key={item.id}>{showGenresCus(item)}</View>
              ))}
            </ScrollView>
          </View>
          <View>
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Now Playing</Text>
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
              </View>
            </View>

            {/* Đang chiếu */}
            <View className="items-center pb-4">
              <FlatList
                data={filteredMovie}
                renderItem={showMovieNowPlayingCus}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={300} // Matches your itemWidth
                snapToAlignment="center"
                decelerationRate="fast"
                style={{flexGrow: 0}}
              />
              {/* <Pagination
              dotsLength={listMovie.length}
              activeDotIndex={activeSlide}
              containerStyle={{paddingVertical: 10}}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: '#3498db',
              }}
              inactiveDotStyle={{backgroundColor: '#ccc'}}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> */}
            </View>
          </View>

          {/* Sắp chiếu */}
          <View className="pb-4">
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Coming Soon</Text>
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
              </View>
            </View>

            <View>
              <ScrollView className="space-x-4" horizontal>
                {listMovie.map(item => (
                  <View key={item.id}>{showMovieComingSoonCus(item)}</View>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Giảm giá */}
          <View className="pb-4">
            <View className="flex-row justify-between items-center py-4">
              <Text className="text-white text-xl">Promo & Discount</Text>
              <View className="flex-row items-center">
                <Text className="text-[#FCC434] text-sm">See all</Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  color="#FCC434"
                  size={15}
                />
              </View>
            </View>

            <View className="items-center">
              <Image
                className="w-[370px] h-[200px]"
                source={require('../../../../assets/images/discount.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
