import { View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import CalendarIcon from "@/src/shared/icons/calendar-icon"

interface IChoiceButtonProps {
    city: string
    margin?: string
    onPress?: () => void
}

export const CityChoiceTab = ({ city, onPress, margin }: IChoiceButtonProps) => {
    return (
        <View className={`border-[#ECEDEF] border w-full rounded-[16px] px-8 pt-5 flex-col flex ${margin}`}>
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-col">
                    <Text weight="bold" className="text-dark text-[24px]">{city}</Text>
                    <Text weight="regular" className="text-[#8B8B8B] w-[60%] text-[16px] mt-3">Выбрать врача и записаться на прием</Text>
                </View>
                <CalendarIcon />
            </View>
            <Button onPress={onPress} variant="diagnosis" className="!w-[136px] !h-[37px] !rounded-[10px] mt-5 mb-4"><Text weight="bold" className="text-white text-[14px]">Записаться</Text></Button>
        </View>
    )
}
