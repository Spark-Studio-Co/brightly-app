import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { SafeAreaView } from "react-native-safe-area-context"
import { DiagnosisTab } from "@/src/features/diagnosis/ui/diagnosis-tab"
import { DiagnosisDescription } from "@/src/features/diagnosis/ui/diagnosis-description"
import { Button } from "@/src/shared/ui/button/button"
import { Avatar } from "@/src/features/avatar/ui/avatar"

import { useNavigation } from "@react-navigation/native"

export const DiagnosisScreen = () => {

    const { navigate } = useNavigation()

    return (
        <SafeAreaView className="bg-white flex-1 justify-between h-[70%]">
            <View className="flex items-center w-[90%] mx-auto">
                <Text weight="bold" className="text-dark text-[38px] mt-16 -ml-8">✨ Готово!</Text>
                <Text weight="regular" className="text-[#8B8B8B] text-[16px] mt-5">Ознакомьтесь с полным отчетом</Text>
                <DiagnosisTab />
                <DiagnosisDescription description="На основе анализа изображения кожи, полученного с помощью сканера камеры, алгоритм зафиксировал признаки, характерные для акне на участке кожи в области рук. В частности, обнаружены повышенное количество комедонов и локальные покраснения, признаки воспалительных элементов." />
            </View>
            <View className="flex flex-row items-center justify-between w-[90%] mx-auto">
                <Avatar />
                <Button onPress={() => navigate('CityChoice' as never)} variant="diagnosis"><Text weight="bold" className="text-white text-[16px]">Записаться к врачу</Text></Button>
            </View>
        </SafeAreaView>
    )
}
