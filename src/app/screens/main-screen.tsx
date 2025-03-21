import React, { useState } from "react";
import { View, Image, Alert, TouchableOpacity, Linking } from "react-native";
import Text from "@/src/shared/ui/text/text";
import * as ImagePicker from "expo-image-picker";

import LogoIcon from "@/src/shared/icons/logo-icon";
import { Button } from "@/src/shared/ui/button/button";
import CameraIcon from "@/src/shared/icons/camera-icon";
import PhotoIcon from "@/src/shared/icons/photo-icon";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { uploadPhoto } from "@/src/entities/upload-photo";

import { RootStackParamList } from "../navigation/types";

export const MainScreen = () => {
  const [galleryPermission, requestGalleryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [tapCount, setTapCount] = useState(0);
  const maxTaps = 8;
  const resetTime = 3000;

  const handleSecretTap = () => {
    setTapCount((prev) => prev + 1);

    if (tapCount + 1 >= maxTaps) {
      setTapCount(0);
      Linking.openURL("https://sparkstudio.kz").catch((err) =>
        console.error("❌ Ошибка при открытии сайта:", err)
      );
    }

    setTimeout(() => setTapCount(0), resetTime);
  };

  const pickImage = async () => {
    try {
      if (isLoading) return;

      if (!galleryPermission?.granted) {
        const permissionResult = await requestGalleryPermission();
        if (!permissionResult.granted) {
          Alert.alert(
            "Необходим доступ",
            "Для выбора фото необходим доступ к галерее"
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setIsLoading(true);
        const photo = result.assets[0];
        console.log("📸 Selected image:", photo);

        const response = await uploadPhoto(photo);
        console.log("📤 Upload response:", response);

        navigate("Diagnosis", { photo, diagnosisData: response } as never);
      }
    } catch (error: any) {
      console.error("❌ Error:", error);
      Alert.alert(
        "Ошибка",
        error.message || "Произошла ошибка при обработке фото"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text weight="regular" className="text-[#8B8B8B] text-[16px]">
          Анализируем фото...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 relative">
      <View className="w-full h-[50%]">
        <TouchableOpacity
          onPress={handleSecretTap}
          activeOpacity={1}
          className="w-20 h-20 z-50"
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            width: 50,
            height: 50,
          }}
        />
        <Image
          source={require("../../../assets/images/image.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="cover"
        />
      </View>

      <View className="bg-white w-full h-[80%] absolute bottom-0 z-50 rounded-tl-[150px] flex flex-col items-center pt-40 px-5">
        <LogoIcon />
        <Text weight="bold" className="mt-4 text-dark text-[38px]">
          Онлайн
        </Text>
        <Text weight="bold" className="mt-3 text-dark text-[38px]">
          диагностика кожи
        </Text>
        <Text
          weight="regular"
          className="text-gray text-[16px] w-[90%] text-center mt-5"
        >
          Сканируйте кожу и получите персональные рекомендации
        </Text>

        <View className="flex flex-row justify-between gap-x-4 mx-auto mt-20">
          <Button
            onPress={() => navigate("Camera" as never)}
            className="bg-brand"
            disabled={isLoading}
            children={
              <View className="flex flex-col items-center">
                <CameraIcon />
                <Text
                  weight="regular"
                  className="text-white text-[16px] mt-1"
                >
                  Камера
                </Text>
              </View>
            }
            variant="main"
          />

          <Button
            onPress={pickImage}
            disabled={isLoading}
            className="bg-[#F5F5F5]"
            children={
              <View className="flex flex-col items-center">
                <PhotoIcon />
                <Text
                  weight="regular"
                  className="text-dark text-[16px] mt-3"
                >
                  Галерея
                </Text>
              </View>
            }
            variant="main"
          />
        </View>
      </View>
    </View>
  );
};