import TakePhotoIcon from "@/src/shared/icons/take-photo-icon";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Animated,
  SafeAreaView,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import { Button } from "@/src/shared/ui/button/button";

import Text from "@/src/shared/ui/text/text";

import { useNavigation } from "@react-navigation/native";
import { uploadPhoto } from "@/src/entities/upload-photo";

export const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<any>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      if (!permission || permission.status === "undetermined") {
        await requestPermission();
      }
    })();
  }, [permission]);

  useEffect(() => {
    startScanAnimation();
    return () => {
      scanLineAnim.stopAnimation();
    };
  }, []);

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  if (!permission) {
    return <View />;
  }

  if (permission.status !== "granted") {
    return (
      <View className="flex flex-col items-center justify-center top-1/2 gap-y-8">
        <Text className="text-xl text-black -mt-8">
          Использование камеры - обязательно
        </Text>
        <Button variant="diagnosis" onPress={requestPermission}>
          <Text className="text-white text-[18px]">Разрешить</Text>
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleCameraReady = () => {
    setIsCameraReady(true);
    console.log("✅ Camera is ready");
  };

  async function takePhoto() {
    if (!isCameraReady) {
      Alert.alert("Error", "Camera is still initializing. Please wait.");
      return;
    }

    if (!cameraRef.current) {
      console.error("🚨 Camera reference is null");
      Alert.alert("Error", "Camera is not ready. Please try again.");
      return;
    }

    if (!isLoading) {
      try {
        setIsLoading(true);
        const photo = await cameraRef.current.takePictureAsync();
        console.log("📸 Photo taken:", photo);

        const response = await uploadPhoto(photo);
        console.log("📤 Upload response:", response);

        navigate("Diagnosis", { photo, diagnosisData: response } as never);
      } catch (error: any) {
        console.error("❌ Error:", error);
        Alert.alert(
          "Error",
          error.message || "An error occurred while processing your photo"
        );
      } finally {
        setIsLoading(false);
      }
    }
  }


  return (
    <View style={styles.container}>
      <TapGestureHandler numberOfTaps={2} onActivated={toggleCameraFacing}>
        <CameraView
          ref={(ref) => {
            if (ref) {
              cameraRef.current = ref;
              console.log("📷 Camera Ref Set");
            }
          }}
          style={styles.camera}
          facing={facing}
          onCameraReady={handleCameraReady}
        >
          <View className="absolute inset-0 flex items-center justify-center">
            <View className="mb-16 w-[100%] h-[75%] flex items-center justify-center relative">
              <Image
                source={require("@/assets/images/scan-image.png")}
                className="w-full h-full"
                resizeMode="contain"
              />
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanLineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-100, 100],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.captureButton,
                isLoading && styles.captureButtonDisabled,
              ]}
              onPress={takePhoto}
              disabled={isLoading}
            >
              <TakePhotoIcon />
            </TouchableOpacity>
          </View>
        </CameraView>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  captureButtonDisabled: {
    opacity: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    marginTop: "auto",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    marginBottom: 20,
  },
  button: {
    flex: 0.3,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scanLine: {
    position: "absolute",
    height: 4,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0px 2px 12px 0px #FFFFFF",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    borderRadius: 32,
    elevation: 5,
    alignSelf: "center",
  },
  captureButton: {
    alignSelf: "center",
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#F24942",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EA3E41",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
});
