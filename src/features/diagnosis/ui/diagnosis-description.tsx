import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "@/src/shared/ui/text/text";

interface IDescriptionProps {
  description: string;
}

export const DiagnosisDescription = ({ description }: IDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200; // Adjust as needed

  const paragraphs = description.split("\n").filter((p) => p.trim().length > 0);
  const fullText = paragraphs.join("\n");
  const truncatedText =
    fullText.length > maxLength
      ? `${fullText.substring(0, maxLength)}...`
      : fullText;

  return (
    <View className="border border-[#ECEDEF] rounded-[12px] py-8 px-6 mt-6 w-full">
      <Text weight="regular" className="text-dark text-[16px] mb-4 last:mb-0">
        {expanded ? fullText : truncatedText}
      </Text>
      {fullText.length > maxLength && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text weight="bold" className="text-brand mt-2">
            {expanded ? "Скрыть" : "Подробнее"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
