import axios from "axios";
import { Alert } from "react-native";

export interface DiagnosisResponse {
    desease: string;
    description: string;
    prob: number;
    risk: string;
    risk_level: string;
    risk_description?: string;
    short_recommendation?: string;
}

export const uploadPhoto = async (photo: { uri: string }): Promise<DiagnosisResponse> => {
    try {
        if (!photo?.uri) {
            throw new Error("No photo URI provided");
        }

        console.log("📤 Uploading photo from URI:", photo.uri);

        const formData = new FormData();
        formData.append("img", {
            uri: photo.uri,
            name: "photo.jpg",
            type: "image/jpeg",
        } as any);

        const serverResponse = await axios.post(
            "http://yarko.tw1.ru/api/skiniver/predict",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (!serverResponse.data.desease || !serverResponse.data.description) {
            console.error("❌ Invalid API response:", serverResponse.data);
            throw new Error("Invalid response from server");
        }

        console.log("✅ Upload success:", JSON.stringify(serverResponse.data, null, 2));
        return serverResponse.data;
    } catch (error: any) {
        console.error("❌ Upload failed:", error.message);
        Alert.alert("Upload Error", "Failed to upload photo: " + error.message);
        throw error;
    }
};