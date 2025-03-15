import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState, useCallback } from "react";
import { SplashScreen } from "expo-router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoaderScreen } from "./src/app/screens/loader-screen";
import { MainScreen } from "./src/app/screens/main-screen";
import { CameraScreen } from "./src/app/screens/camera-screen";
import { DiagnosisScreen } from "./src/app/screens/diagnosis-screen";
import { CityChoiceScreen } from "./src/app/screens/city-choice-screen";
import { DoctorsScreen } from "./src/app/screens/doctors-screen";
import { WebViewScreen } from "./src/app/screens/web-view-screen";

import "./global.css";

// Немедленно предотвращаем автоматическое скрытие сплеш-скрина
SplashScreen.preventAutoHideAsync().catch(() => {
  /* если возникает ошибка, игнорируем */
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "ProximaNova-Regular": require("./assets/fonts/Proxima Nova/proximanova_regular.ttf"),
    "ProximaNova-Bold": require("./assets/fonts/Proxima Nova/proximanova_bold.otf"),
    "ProximaNova-Black": require("./assets/fonts/Proxima Nova/proximanova_black.ttf"),
    "ProximaNova-Light": require("./assets/fonts/Proxima Nova/proximanova_light.otf"),
    "ProximaNova-ExtraBold": require("./assets/fonts/Proxima Nova/proximanova_extrabold.otf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [appIsReady, setAppIsReady] = useState(false);

  // Подготовка приложения к запуску
  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn("Ошибка при подготовке приложения:", e);
      }
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView className="flex-1" onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <View className="flex-1 w-full m-auto bg-white">
          <StatusBar translucent backgroundColor="transparent" />
          {isSplashVisible ? (
            <LoaderScreen onAnimationEnd={() => setIsSplashVisible(false)} />
          ) : (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
                <Stack.Screen name="CityChoice" component={CityChoiceScreen} />
                <Stack.Screen name="Doctors" component={DoctorsScreen} />
                <Stack.Screen name="WebView" component={WebViewScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
