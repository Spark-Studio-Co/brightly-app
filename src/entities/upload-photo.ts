import * as FileSystem from "expo-file-system";
import axios from 'axios'
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

export const uploadPhoto = async (photo: any): Promise<DiagnosisResponse> => {
    try {
        const base64 = await FileSystem.readAsStringAsync(photo.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const file: any = {
            uri: photo.uri,
            name: "photo.jpg",
            type: "image/jpeg",
            base64: base64,
        };

        const formData = new FormData();
        formData.append("img", file);

        const serverResponse = await axios.post("https://brightly-app-production.up.railway.app/api/skiniver/predict", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const response = serverResponse.data;
        console.log("✅ Upload success. Full response:", JSON.stringify(response, null, 2));
        
        // Validate response has required fields
        if (!response.desease || !response.description) {
            console.error("❌ Invalid API response format:", response);
            throw new Error("Invalid response from server");
        }
        
        return response;
    } catch (error: any) {
        console.error("❌ Upload failed:", error.message);
        Alert.alert("Upload Error", "Failed to upload photo: " + error.message);
        throw error;
    }
};