import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BookDetail } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer'])

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();

const App = () => {
    const [fontsLoaded] = useFonts({
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;