import { Image, Animated, Easing, View } from "react-native"
import { useEffect, useRef } from "react"


interface ISplashScreenProps {
    onAnimationEnd: () => void
}

export const LoaderScreen = ({ onAnimationEnd }: ISplashScreenProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.ease
            }),
            Animated.delay(2500),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease)
            })
        ]).start(() => {
            onAnimationEnd();
        });

        return () => fadeAnim.stopAnimation();
    }, [fadeAnim, onAnimationEnd]);

    return (
        <View className="flex-1 bg-white">
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
                <Image
                    source={require('../../../assets/images/splash-screen.png')}
                    resizeMode="contain"
                    className="w-[100%] h-[90%] mt-auto"
                />
            </Animated.View>
        </View>
    )
}
