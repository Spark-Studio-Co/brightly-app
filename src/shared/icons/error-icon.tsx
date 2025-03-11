import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

const ErrorIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        {...props}
    >
        <Circle cx={9} cy={9} r={9} fill="#F95721" />
        <Path
            d="M8.99976 9.49994L9.00024 5.49994"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M8.99963 12.4999H9.00022"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg >
);
export default ErrorIcon;
