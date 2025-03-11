import { View } from "react-native"
import Text from "@/src/shared/ui/text/text";

interface IDescriptionProps {
    description: string;
}

export const DiagnosisDescription = ({ description }: IDescriptionProps) => {
    return (
        <View className="border border-[#ECEDEF] rounded-[12px] py-8 px-6 mt-6 w-full">
            <Text weight="regular" className="text-dark text-[16px]">
                {description}
            </Text>
        </View>
    )
}
