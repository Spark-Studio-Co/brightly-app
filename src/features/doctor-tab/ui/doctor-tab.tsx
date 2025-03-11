import { View, Image, ImageSourcePropType } from "react-native"
import Text from "@/src/shared/ui/text/text"
import StarIcon from "@/src/shared/icons/star-icon"
import { Button } from "@/src/shared/ui/button/button"

interface IDoctorTab {
    rating: string
    src: ImageSourcePropType
    name: string
    job: string
    onPress?: () => void
}

export const DoctorTab = ({ rating, src, name, job, onPress }: IDoctorTab) => {
    return (
        <View className="w-full border border-[#ECEDEF] p-5 rounded-[12px] mb-4">
            <View className="flex flex-row gap-x-4">
                <View className="flex flex-col gap-y-3">
                    <Image source={src} resizeMode="contain" style={{ width: 60, height: 60 }} />
                    <View className="flex flex-row items-center gap-x-2">
                        <StarIcon />
                        <Text weight="bold" className="text-[#080C2FA6] text-[13px]">{rating}</Text>
                    </View>
                </View>
                <View className="flex flex-col flex-1">
                    <Text weight="regular" className="text-dark text-[18px]">{name}</Text>
                    <Text weight="bold" className="text-[#8A96BC] text-[13px] mt-2">{job}</Text>
                    <Button onPress={onPress} variant="diagnosis" className="!w-[107px] !h-[37px] !rounded-[10px] mt-4"><Text weight="bold" className="text-white text-[14px]">Записаться</Text></Button>
                </View>
            </View>
        </View>
    )
}
