import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const TakePhotoIcon = (props: SvgProps) => (
    <Svg
        width={30}
        height={30}
        viewBox="0 0 30 30"
        fill="none"
        {...props}
    >
        <Path
            d="M29.25 1.9375V7.875C29.25 8.18994 29.1249 8.49199 28.9022 8.71469C28.6795 8.93739 28.3774 9.0625 28.0625 9.0625C27.7476 9.0625 27.4455 8.93739 27.2228 8.71469C27.0001 8.49199 26.875 8.18994 26.875 7.875V3.125H22.125C21.8101 3.125 21.508 2.99989 21.2853 2.77719C21.0626 2.55449 20.9375 2.25244 20.9375 1.9375C20.9375 1.62256 21.0626 1.32051 21.2853 1.09781C21.508 0.875111 21.8101 0.75 22.125 0.75H28.0625C28.3774 0.75 28.6795 0.875111 28.9022 1.09781C29.1249 1.32051 29.25 1.62256 29.25 1.9375ZM7.875 26.875H3.125V22.125C3.125 21.8101 2.99989 21.508 2.77719 21.2853C2.55449 21.0626 2.25244 20.9375 1.9375 20.9375C1.62256 20.9375 1.32051 21.0626 1.09781 21.2853C0.875111 21.508 0.75 21.8101 0.75 22.125V28.0625C0.75 28.3774 0.875111 28.6795 1.09781 28.9022C1.32051 29.1249 1.62256 29.25 1.9375 29.25H7.875C8.18994 29.25 8.49199 29.1249 8.71469 28.9022C8.93739 28.6795 9.0625 28.3774 9.0625 28.0625C9.0625 27.7476 8.93739 27.4455 8.71469 27.2228C8.49199 27.0001 8.18994 26.875 7.875 26.875ZM28.0625 20.9375C27.7476 20.9375 27.4455 21.0626 27.2228 21.2853C27.0001 21.508 26.875 21.8101 26.875 22.125V26.875H22.125C21.8101 26.875 21.508 27.0001 21.2853 27.2228C21.0626 27.4455 20.9375 27.7476 20.9375 28.0625C20.9375 28.3774 21.0626 28.6795 21.2853 28.9022C21.508 29.1249 21.8101 29.25 22.125 29.25H28.0625C28.3774 29.25 28.6795 29.1249 28.9022 28.9022C29.1249 28.6795 29.25 28.3774 29.25 28.0625V22.125C29.25 21.8101 29.1249 21.508 28.9022 21.2853C28.6795 21.0626 28.3774 20.9375 28.0625 20.9375ZM1.9375 9.0625C2.25244 9.0625 2.55449 8.93739 2.77719 8.71469C2.99989 8.49199 3.125 8.18994 3.125 7.875V3.125H7.875C8.18994 3.125 8.49199 2.99989 8.71469 2.77719C8.93739 2.55449 9.0625 2.25244 9.0625 1.9375C9.0625 1.62256 8.93739 1.32051 8.71469 1.09781C8.49199 0.875111 8.18994 0.75 7.875 0.75H1.9375C1.62256 0.75 1.32051 0.875111 1.09781 1.09781C0.875111 1.32051 0.75 1.62256 0.75 1.9375V7.875C0.75 8.18994 0.875111 8.49199 1.09781 8.71469C1.32051 8.93739 1.62256 9.0625 1.9375 9.0625ZM7.875 6.6875H22.125C22.4399 6.6875 22.742 6.81261 22.9647 7.03531C23.1874 7.25801 23.3125 7.56005 23.3125 7.875V22.125C23.3125 22.4399 23.1874 22.742 22.9647 22.9647C22.742 23.1874 22.4399 23.3125 22.125 23.3125H7.875C7.56005 23.3125 7.25801 23.1874 7.03531 22.9647C6.81261 22.742 6.6875 22.4399 6.6875 22.125V7.875C6.6875 7.56005 6.81261 7.25801 7.03531 7.03531C7.25801 6.81261 7.56005 6.6875 7.875 6.6875ZM9.0625 20.9375H20.9375V9.0625H9.0625V20.9375Z"
            fill="white"
        />
    </Svg>
);
export default TakePhotoIcon;
