import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { useFonts } from "expo-font";
import { useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoaderScreen } from './src/app/screens/loader-screen';
import { MainScreen } from './src/app/screens/main-screen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        // Add your fonts here if needed
        // 'custom-font': require('./assets/fonts/custom-font.ttf'),
    });

    useEffect(() => {
        // Hide the splash screen when fonts are loaded
        if (fontsLoaded) {
            SplashScreen.hideAsync().catch(() => { });
        }
    }, [fontsLoaded]);

    // Show a loading screen while fonts are loading
    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <View style={{ flex: 1, width: '100%', margin: 'auto', backgroundColor: 'white' }}>
                    <NavigationContainer>
                        <StatusBar translucent backgroundColor="transparent" />
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Loader" component={LoaderScreen} />
                            <Stack.Screen name="Main" component={MainScreen} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}