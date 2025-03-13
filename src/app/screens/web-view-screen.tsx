import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export const WebViewScreen = () => {
    return (
        <WebView
            style={styles.container}
            source={{ uri: 'https://n1051682.yclients.com' }}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});