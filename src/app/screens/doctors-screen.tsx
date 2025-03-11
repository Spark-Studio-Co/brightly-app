import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View, ScrollView, ImageSourcePropType } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useNavigation } from "@react-navigation/native"

import BackArrowIcon from "@/src/shared/icons/back-arrow-icon"
import { CitySwitch } from "@/src/features/city-switch/ui/city-switch"
import { DoctorTab } from "@/src/features/doctor-tab/ui/doctor-tab"
import { useCitySwitch } from "@/src/features/city-switch/model/city-switch-store"
import { useState, useEffect } from "react"

// Mock data for doctors
interface Doctor {
    id: string;
    name: string;
    job: string;
    rating: string;
    src: ImageSourcePropType;
    city: string;
}

const mockDoctors: Doctor[] = [
    {
        id: '1',
        name: 'Иванов Иван Иванович',
        job: 'Терапевт',
        rating: '4.9',
        src: require('../../../assets/images/doctor.png'),
        city: 'Домодедово'
    },
    {
        id: '2',
        name: 'Петрова Анна Сергеевна',
        job: 'Кардиолог',
        rating: '4.8',
        src: require('../../../assets/images/doctor.png'),
        city: 'Домодедово'
    },
    {
        id: '3',
        name: 'Сидоров Алексей Петрович',
        job: 'Невролог',
        rating: '4.7',
        src: require('../../../assets/images/doctor.png'),
        city: 'Домодедово'
    },
    {
        id: '4',
        name: 'Козлова Мария Ивановна',
        job: 'Эндокринолог',
        rating: '4.9',
        src: require('../../../assets/images/doctor.png'),
        city: 'Коммунарка'
    },
    {
        id: '5',
        name: 'Соколов Дмитрий Александрович',
        job: 'Хирург',
        rating: '4.8',
        src: require('../../../assets/images/doctor.png'),
        city: 'Коммунарка'
    },
    {
        id: '6',
        name: 'Новикова Елена Владимировна',
        job: 'Офтальмолог',
        rating: '4.7',
        src: require('../../../assets/images/doctor.png'),
        city: 'Коммунарка'
    }
];

export const DoctorsScreen = () => {
    const navigation = useNavigation();
    const { active } = useCitySwitch();
    const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

    // Filter doctors based on selected city
    useEffect(() => {
        const filtered = mockDoctors.filter(doctor => doctor.city === active);
        setFilteredDoctors(filtered);
    }, [active]);

    const handleDoctorPress = (doctorId: string) => {
        console.log(`Booking appointment with doctor ${doctorId}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="w-[90%] mx-auto mt-16">
                <Button onPress={() => navigation.goBack()} className="absolute -left-2">
                    <BackArrowIcon />
                </Button>
                <View className="items-center">
                    <Text weight="bold" className="text-dark text-[18px]">Врачи</Text>
                </View>

                <CitySwitch />

                <ScrollView
                    className="mt-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {filteredDoctors.map(doctor => (
                        <DoctorTab
                            key={doctor.id}
                            name={doctor.name}
                            job={doctor.job}
                            rating={doctor.rating}
                            src={doctor.src}
                            onPress={() => handleDoctorPress(doctor.id)}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
