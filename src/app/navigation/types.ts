export type RootStackParamList = {
    Camera: undefined;
    Diagnosis: {
        photo: {
            uri: string;
            width: number;
            height: number;
        };
        diagnosisData: {
            desease: string;
            description: string;
            prob: number;
            risk: string;
            risk_level: string;
            risk_description?: string;
            short_recommendation?: string;
        };
    };
    WebView: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
