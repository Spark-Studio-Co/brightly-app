import React from 'react';
import { View, Image } from 'react-native';
import Text from '@/src/shared/ui/text/text';

import LogoIcon from '@/src/shared/icons/logo-icon';
import { Button } from '@/src/shared/ui/button/button';
import CameraIcon from '@/src/shared/icons/camera-icon';
import PhotoIcon from '@/src/shared/icons/photo-icon';
import { useNavigation } from '@react-navigation/native';



export const MainScreen = () => {

  const { navigate } = useNavigation()

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
        <View className='flex flex-row justify-between w-[90%] mx-auto mt-20'>
          <Button className='bg-brand' children={
            <View className='flex flex-col items-center'>
              <CameraIcon />
              <Text weight='regular' className='text-white text-[16px] mt-1'>Камера</Text>
            </View>
          } variant='main' />
          <Button className='bg-[#F5F5F5]' children={
            <View className='flex flex-col items-center'>
              <PhotoIcon />
              <Text weight='regular' className='text-dark text-[16px] mt-3'>Камера</Text>
            </View>
          } variant='main' />
        </View>
      </View>
    </View>
  );
};

