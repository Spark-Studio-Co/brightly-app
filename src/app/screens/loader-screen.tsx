import { View, Image, StyleSheet, Animated } from "react-native"
import { useEffect } from "react"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from "react-native-safe-area-context";

// Define the navigation type
type RootStackParamList = {
    Loader: undefined;
    Main: undefined;
};

type LoaderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Loader'>;

export const LoaderScreen = () => {
    const navigation = useNavigation<LoaderScreenNavigationProp>();
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        // Wait for 3 seconds before starting fade out
        const timer = setTimeout(() => {
            // Start fade out animation
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800, // Duration of fade out in milliseconds
                useNativeDriver: true,
            }).start(() => {
                // After animation completes, navigate to the main screen
                navigation.navigate('Main');
            });
        }, 10000); // 3 seconds

        // Clean up timer if component unmounts
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image
                    source={require('../../assets/Group1000004764.png')}
                    style={styles.logo}
                    resizeMode="cover"
                />
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    }
})
