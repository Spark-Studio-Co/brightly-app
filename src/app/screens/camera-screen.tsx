import TakePhotoIcon from '@/src/shared/icons/take-photo-icon';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Image, Animated } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';


export const CameraScreen = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const scanLineAnim = useRef(new Animated.Value(0)).current;

    const { navigate } = useNavigation()

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

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePhoto() {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                console.log('Photo taken:', photo);
                navigate('Diagnosis' as never);
            } catch (error) {
                console.error('Error taking photo:', error);
                Alert.alert('Error', 'Failed to take photo');
            }
        }
    }

    return (
        <View style={styles.container}>
            <TapGestureHandler numberOfTaps={2} onActivated={toggleCameraFacing}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                >
                    <View className="absolute inset-0 flex items-center justify-center">
                        <View className="mb-16 w-[100%] h-[75%] flex items-center justify-center relative">
                            <Image
                                source={require('@/assets/images/scan-image.png')}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                            <Animated.View
                                style={[
                                    styles.scanLine,
                                    {
                                        transform: [{
                                            translateY: scanLineAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-100, 100]
                                            })
                                        }]
                                    }
                                ]}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                            <TakePhotoIcon />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </TapGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        marginTop: 'auto',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    button: {
        flex: 0.3,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    scanLine: {
        position: 'absolute',
        height: 4,
        width: '82%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0px 2px 12px 0px #FFFFFF',
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        borderRadius: 32,
        elevation: 5,
        alignSelf: 'center',
    },
    captureButton: {
        alignSelf: 'center',
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: '#F24942',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#EA3E41',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 18,
        elevation: 10
    },
});
