import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Text from '@/src/shared/ui/text/text';
import { useCitySwitch } from '../model/city-switch-store';

export const CitySwitch = () => {
    const { active, toggleSwitch } = useCitySwitch();
    const [containerWidth, setContainerWidth] = useState(0);

    const translateX = useSharedValue(0);

    useEffect(() => {
        translateX.value = active === 'Домодедово' ? 0 : containerWidth / 2;
    }, [active, containerWidth]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value, { duration: 200 }) }],
    }));

    const onLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    return (
        <TouchableOpacity
            onPress={toggleSwitch}
            activeOpacity={0.8}
            onLayout={onLayout}
            className="flex flex-row items-center bg-[#F2F6F7] w-full h-[48px] rounded-[8px] mt-10 relative"
        >
            <Animated.View
                style={[
                    styles.indicator,
                    animatedStyle,
                    { width: containerWidth / 2 - 8 },
                ]}
            />

            <View className="flex-1 justify-center items-center z-10">
                <Text
                    weight="bold"
                    className={`${active === 'Домодедово' ? 'text-dark' : 'text-gray'} text-[16px]`}
                >
                    Домодедово
                </Text>
            </View>

            <View className="flex-1 justify-center items-center z-10">
                <Text
                    weight="bold"
                    className={`${active === 'Коммунарка' ? 'text-dark' : 'text-gray'} text-[16px]`}
                >
                    Коммунарка
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        left: 4,
        height: '85%',
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
});