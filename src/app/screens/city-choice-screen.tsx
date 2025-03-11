import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button } from "@/src/shared/ui/button/button"
import { CityChoiceTab } from "@/src/features/city-choice-tab/ui/city-choice-tab"

import BackArrowIcon from "@/src/shared/icons/back-arrow-icon"

import { useNavigation } from "@react-navigation/native"

export const CityChoiceScreen = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="w-[90%] mx-auto flex items-center mt-16">
                <Button onPress={() => navigation.goBack()} className="absolute -left-2">
                    <BackArrowIcon />
                </Button>
                <Text weight="bold" className="text-dark text-[32px] mt-16">
                    Выберите город
                </Text>
                <Text weight="bold" className="text-dark text-[32px]">
                    для записи к врачу
                </Text>
                <CityChoiceTab city="Домодедово" margin="mt-16" />
                <CityChoiceTab city="Коммунарка" margin="mt-8" />
            </View>
        </SafeAreaView>
    )
}
