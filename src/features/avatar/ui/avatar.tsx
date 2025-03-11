import { View, Image } from "react-native"

export const Avatar = () => {
    return (
        <View className="border border-[#F249420D] w-[107px] h-[107px] rounded-full flex items-center justify-center">
            <View className="border border-[#F2494233] w-[89px] h-[89px] rounded-full flex items-center justify-center">
                <View className="border border-[#F2494266] w-[71px] h-[71px] rounded-full flex items-center justify-center">
                    <Image style={{ width: 54, height: 54 }} source={require("../../../../assets/images/diagnoser.png")} />
                </View>
            </View>
        </View>
    )
}
