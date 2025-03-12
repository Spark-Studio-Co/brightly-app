import { TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native";

type Variants = "main" | "diagnosis";

interface IButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
    className?: string;
    variant?: Variants;
}

export const Button = ({ children, className = "", variant, ...props }: IButtonProps) => {
    const getStyle = () => {
        switch (variant) {
            case "main":
                return "w-[48%] h-[89px] rounded-[12px] flex items-center justify-center";
            case "diagnosis":
                return "w-56 h-[54px] flex items-center justify-center bg-brand rounded-[16px]"
            default:
                return "";
        }
    };

    return (
        <TouchableOpacity className={`${getStyle()} ${className}`} activeOpacity={0.7} {...props}>
            {children}
        </TouchableOpacity>
    );
};