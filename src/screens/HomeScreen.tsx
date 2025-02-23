import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import {getApi, postApi, putApi} from '../api/Api';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: boolean;
  email: string;
  avatar: string;
};

const HomeScreen = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [editing, setEditing] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [tempUser, setTempUser] = useState<UserType | undefined>();
  const [otp, setOtp] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const defaultAvatar = require('../../assets/images/avatar.jpg');

  useEffect(() => {
    getApi('/api/users/bio', true, (error, response) => {
      if (error) {
        console.log('Error with get: ', error);
      } else {
        setUser(response.result);
      }
    });
  }, [editing, changeAvatar]);

  const handleEdit = () => {
    if (user) {
      setEditing(true);
      setTempUser({...user});
    }
  };

  const handleSave = () => {
    if (tempUser) {
      const params: Partial<Record<keyof UserType, string | boolean>> = {};

      Object.keys(tempUser).forEach(key => {
        const typedKey = key as keyof UserType;
        if (tempUser[typedKey] !== user?.[typedKey]) {
          params[typedKey] = tempUser[typedKey]; // Không còn lỗi TypeScript
        }
      });

      console.log('Params:', params);

      putApi('/api/users/bio', params, true, (error, response) => {
        if (error) {
          console.log('Error with put: ', error);
        } else {
          // setUser(response.result);
          console.log('update success');
          setEditing(false);
        }
      });
    }
  };

  const sendOtp = () => {
    console.log(`Gửi OTP đến email: ${tempUser?.email}`);
    postApi(
      '/api/verify/registration',
      tempUser?.email,
      false,
      (error, response) => {
        if (error) {
          console.log('Error with post: ', error);
        } else {
          console.log('Reponse: ', response.result);
          setModalVisible(true);
        }
      },
    );
  };

  const verifyOtp = () => {
    console.log(`OTP nhập vào: ${otp}`);
    const params = {
      email: tempUser?.email,
      otp: otp,
    };
    postApi('/api/verify/verifyOtp', params, false, (error, response) => {
      if (error) {
        console.log('Error with post: ', error);
      } else {
        console.log('Reponse: ', response.result);
        if (response.result === true) {
          setModalVisible(false);
        }
      }
    });
  };

  const handleClickChangeAvatar = async () => {
    setChangeAvatar(true);
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images], // Chỉ chọn ảnh
      });

      console.log('File chọn:', res);

      const token = await AsyncStorage.getItem('token'); // Lấy token từ AsyncStorage

      if (!token) {
        console.error('Không tìm thấy token');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: res.uri,
        name: res.name || 'avatar.jpg',
        type: res.type || 'image/jpeg',
      });

      const response = await axios.put(
        'http://192.168.1.7:8080/api/users/avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        },
      );
      setChangeAvatar(false);
      console.log('Upload thành công:', response.data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Người dùng đã hủy chọn file');
      } else {
        console.error('Lỗi khi chọn hoặc upload file:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.avatarContainer}>
            <Image
              source={user.avatar ? {uri: user.avatar} : defaultAvatar}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.changeAvatarButton}
              onPress={handleClickChangeAvatar}>
              <Text style={styles.buttonText}>Đổi Avatar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            {['firstName', 'lastName', 'dateOfBirth'].map(field => (
              <View key={field} style={styles.infoItem}>
                <Text style={styles.label}>
                  {field === 'firstName'
                    ? 'Họ'
                    : field === 'lastName'
                    ? 'Tên'
                    : 'Ngày sinh'}
                  :
                </Text>
                {editing ? (
                  <TextInput
                    style={styles.input}
                    value={String(tempUser?.[field as keyof UserType] ?? '')}
                    onChangeText={text =>
                      setTempUser(prev =>
                        prev ? {...prev, [field]: text} : undefined,
                      )
                    }
                  />
                ) : (
                  <Text style={styles.value}>
                    {user[field as keyof UserType]}
                  </Text>
                )}
              </View>
            ))}

            <View style={styles.infoItem}>
              <Text style={styles.label}>Giới tính:</Text>
              {editing ? (
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      tempUser?.gender && styles.radioSelected,
                    ]}
                    onPress={() =>
                      setTempUser(prev =>
                        prev ? {...prev, gender: true} : undefined,
                      )
                    }>
                    <Text style={styles.radioText}>Nam</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      !tempUser?.gender && styles.radioSelected,
                    ]}
                    onPress={() =>
                      setTempUser(prev =>
                        prev ? {...prev, gender: false} : undefined,
                      )
                    }>
                    <Text style={styles.radioText}>Nữ</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.value}>{user.gender ? 'Nam' : 'Nữ'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>Email:</Text>
              {editing ? (
                <View style={styles.emailContainer}>
                  <TextInput
                    style={styles.input}
                    value={tempUser?.email ?? ''}
                    onChangeText={text =>
                      setTempUser(prev =>
                        prev ? {...prev, email: text} : undefined,
                      )
                    }
                  />
                  <TouchableOpacity style={styles.otpButton} onPress={sendOtp}>
                    <Text style={styles.buttonText}>Gửi OTP</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.value}>{user.email}</Text>
              )}
            </View>

            {editing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Lưu</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : null}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập OTP"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.saveButton} onPress={verifyOtp}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', paddingTop: 50},
  avatarContainer: {alignItems: 'center', marginBottom: 20},
  avatar: {width: 120, height: 120, borderRadius: 60},
  changeAvatarButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Hiệu ứng làm mờ nền
  },
  infoContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {fontSize: 16, fontWeight: 'bold'},
  value: {fontSize: 16, color: '#333'},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    fontSize: 16,
    paddingVertical: 2,
  },
  emailContainer: {flexDirection: 'row', alignItems: 'center', flex: 1},
  otpButton: {
    backgroundColor: '#ffc107',
    padding: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  radioContainer: {flexDirection: 'row'},
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  radioSelected: {backgroundColor: '#007bff'},
  radioText: {fontSize: 16},
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});
