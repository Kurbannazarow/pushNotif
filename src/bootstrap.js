import * as Font from 'expo-font';

export async function bootstrap() {
    await Font.loadAsync({
        'open-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'open-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    });
}