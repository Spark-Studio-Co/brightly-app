import ErrorIcon from "@/src/shared/icons/error-icon"
import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"


export const DiagnosisTab = () => {
    return (
        <View className="w-full bg-[#F2F6F7] h-[64px] rounded-[12px] items-center flex flex-row px-6 mt-10">
            <ErrorIcon />
            <Text weight="bold" className="text-dark text-[20px] ml-4">
                Диагноз:
            </Text>
            <Text weight="regular" className="text-dark text-[18px] ml-2">
                Акне
            </Text>
        </View>
    )
}
