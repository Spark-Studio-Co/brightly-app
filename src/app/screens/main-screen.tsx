import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import Text from '@/src/shared/ui/text/text';
import * as ImagePicker from 'expo-image-picker';

import LogoIcon from '@/src/shared/icons/logo-icon';
import { Button } from '@/src/shared/ui/button/button';
import CameraIcon from '@/src/shared/icons/camera-icon';
import PhotoIcon from '@/src/shared/icons/photo-icon';
import { useNavigation, NavigationProp } from '@react-navigation/native';



// Define the navigation param list
type RootStackParamList = {
  Camera: { imageUri?: string } | undefined;
  Main: undefined;
};

export const MainScreen = () => {
  const [galleryPermission, requestGalleryPermission] = ImagePicker.useMediaLibraryPermissions();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    // Check if we have permission
    if (!galleryPermission?.granted) {
      const permissionResult = await requestGalleryPermission();
      if (!permissionResult.granted) {
        Alert.alert('Необходим доступ', 'Для выбора фото необходим доступ к галерее');
        return;
      }
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      navigate('Camera', { imageUri: result.assets[0].uri });
      console.log('Selected image:', result.assets[0].uri);
    }
  }

  return (
    <View className='flex-1 relative'>
      <View className='w-full h-[50%]'>
        <Image
          source={require('../../../assets/images/image.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </View>
      <View className='bg-white w-full h-[80%] absolute bottom-0 z-50 rounded-tl-[150px] flex flex-col items-center pt-40 px-5'>
        <LogoIcon />
        <Text weight='bold' className='mt-4 text-dark text-[38px]'>
          Онлайн
        </Text>
        <Text weight='bold' className='mt-3 text-dark text-[38px]'>
          диагностика кожи
        </Text>
        <Text weight='regular' className='text-gray text-[16px] w-[90%] text-center mt-5'>
          Сканируйте кожу и получите персональные рекомендации
        </Text>
        <View className='flex flex-row justify-between gap-x-2 max-w-[90%] mx-auto mt-20'>
          <Button onPress={() => navigate('Camera')} className='bg-brand' children={
            <View className='flex flex-col items-center'>
              <CameraIcon />
              <Text weight='regular' className='text-white text-[16px] mt-1'>Камера</Text>
            </View>
          } variant='main' />
          <Button
            onPress={pickImage}
            className='bg-[#F5F5F5]'
            children={
              <View className='flex flex-col items-center'>
                <PhotoIcon />
                <Text weight='regular' className='text-dark text-[16px] mt-3'>Галерея</Text>
              </View>
            }
            variant='main'
          />
        </View>
      </View>
    </View>
  );
};

