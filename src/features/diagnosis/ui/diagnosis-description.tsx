import { View } from "react-native"
import Text from "@/src/shared/ui/text/text";

interface IDescriptionProps {
    description: string;
}

export const DiagnosisDescription = ({ description }: IDescriptionProps) => {
    const paragraphs = description.split('\n').filter(p => p.trim().length > 0);

    return (
        <View className="border border-[#ECEDEF] rounded-[12px] py-8 px-6 mt-6 w-full">
            {paragraphs.map((paragraph, index) => (
                <Text key={index} weight="regular" className="text-dark text-[16px] mb-4 last:mb-0">
                    {paragraph}
                </Text>
            ))}
        </View>
    )
}
