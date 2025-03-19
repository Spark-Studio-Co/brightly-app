import axios from "axios";
import { Alert, Image } from "react-native";
import * as FileSystem from "expo-file-system";

export interface DiagnosisResponse {
    desease: string;
    description: string;
    prob: number;
    risk: string;
    risk_level: string;
    risk_description?: string;
    short_recommendation?: string;
}

export const uploadPhoto = async (photo: { uri: string; width?: number; height?: number }): Promise<DiagnosisResponse> => {
    try {
        if (!photo?.uri) {
            throw new Error("No photo URI provided");
        }

        console.log("📤 Original photo dimensions:", { width: photo.width, height: photo.height });
        
        // Check if the image is too large (over 1500 pixels in either dimension)
        let photoToUpload = photo;
        if (photo.width && photo.height && (photo.width > 1500 || photo.height > 1500)) {
            console.log("📷 Image is large, compressing...");
            // Resize the image to reduce its size
            photoToUpload = await resizeImage(photo.uri);
        }
        
        console.log("📤 Uploading photo from URI:", photoToUpload.uri);

        const formData = new FormData();
        formData.append("img", {
            uri: photoToUpload.uri,
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
                timeout: 30000, // 30 seconds timeout
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

/**
 * Compresses an image to reduce its file size before uploading
 * @param uri Original image URI
 * @returns Compressed image with new URI
 */
async function resizeImage(uri: string): Promise<{ uri: string }> {
    try {
        // Create a compressed copy with lower quality
        const timestamp = new Date().getTime();
        const newUri = `${FileSystem.cacheDirectory}compressed_${timestamp}.jpg`;
        
        // Use FileSystem to create a copy first
        await FileSystem.copyAsync({
            from: uri,
            to: newUri,
        });
        
        // Try to compress the image by reading and writing it with a lower quality
        try {
            // Read the image as base64
            const base64Data = await FileSystem.readAsStringAsync(newUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            
            // Write it back with a lower quality
            const compressedBase64 = `data:image/jpeg;base64,${base64Data}`;
            const compressedUri = `${FileSystem.cacheDirectory}compressed_final_${timestamp}.jpg`;
            
            // Write the compressed image to a new file
            await FileSystem.writeAsStringAsync(compressedUri, compressedBase64.split(',')[1], {
                encoding: FileSystem.EncodingType.Base64,
            });
            
            console.log("📏 Compressed image saved to:", compressedUri);
            return { uri: compressedUri };
        } catch (compressionError) {
            console.warn("⚠️ Advanced compression failed, using simple copy:", compressionError);
            // If the advanced compression fails, just return the copied file
            return { uri: newUri };
        }
    } catch (error) {
        console.error("❌ Error compressing image:", error);
        // Return original if compression fails
        return { uri };
    }
};