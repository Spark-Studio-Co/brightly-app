import { Image, Animated, Easing, View } from "react-native"
import { useEffect, useRef } from "react"


interface ISplashScreenProps {
    onAnimationEnd: () => void
}

export const LoaderScreen = ({ onAnimationEnd }: ISplashScreenProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            // First fade in quickly (appear smoothly)
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000, // Faster fade in (0.8 seconds)
                useNativeDriver: true,
                easing: Easing.ease
            }),
            Animated.delay(2500), // Shorter delay (1.5 seconds)
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000, // Faster fade out (1 second)
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
            <Animated.View style={{ opacity: fadeAnim, flex: 1 }} className='mt-24'>
                <Image
                    source={require('../../../assets/images/splash-screen.png')}
                    resizeMode="cover"
                    className="w-[100%] h-full"
                />
            </Animated.View>
        </View>
    )
}
