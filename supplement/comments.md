[Installation ](https://docs.expo.io/get-started/installation/)

```js
npm install --global expo-cli
expo init my-app
cd my-app
expo start
```

When you run expo start (or npm start), Expo CLI starts Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app. It also pops up Expo Dev Tools, a graphical interface for Expo CLI.

Установка пакетов:

```js
npm install expo
...
expo install expo-font  //  "expo-font": "~8.4.0"
expo install expo-updates  // нужен для продакшен
expo install expo-app-loading
...
expo install react-native-reanimated //  low level abstraction for the Animated library API
```

После установки дополнительных пакетов рекомендуют удалить папку `node_modules` и `package-lock.json` и затем переустановить пакеты `npm install`

---

[Подключение шрифтов](https://docs.expo.io/versions/latest/sdk/font/#loadasyncobject)

```js
// App.js
import { useFonts } from 'expo-font';
...
 const [loaded] = useFonts({
     'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
     'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
     'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
 })
 if (!loaded) {
     return null;
 }
```

---

Заменяем компонент-обертку нашего приложения:

```js
// index.js
import { registerRootComponent } from 'expo'
import App from './App'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
```

---

Нужно внести изменения в файл `app.json`

```json
{
  "expo": {
    "name": "Book Store App",
    "slug": "book-store-app",
    "description": "Book Store App",
    "privacy": "public",
    "version": "1.0.0",
    "platforms": ["android"],
    "orientation": "portrait",
    "backgroundColor": "#3A4047",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#3A4047"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "android": {
      "package": "com.sxidsvit.bookstoreapp"
    }
  }
}
```

---

Если для подключения шрифтов используется компонент `AppLoading`, который предварительно должен быть установлен отдельным npm-пакетом `expo install expo-app-loading`, то не нужно устанавливать npm-пакет `expo-font`. Expo воспользуется своим собственным пакетом `expo-font`

```js
import { useFonts } from 'expo-font'; // expo-font встроенный в expo !!!
import AppLoading from 'expo-app-loading'
...
const App = () => {
    const [fontsLoaded] = useFonts({
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
```

---

Для корретктной работы компонента `SafeArea` на Android устройствах нужно установить пакет `react-native-safe-area-context` и подключить его:

```js
import { SafeAreaView } from 'react-native-safe-area-context'
```

---

Зависимости в `package.json`

```json
...
 "dependencies": {
    "@react-native-community/masked-view": "^0.1.10",
    "@react-navigation/bottom-tabs": "^5.10.1",
    "@react-navigation/native": "^5.8.1",
    "@react-navigation/stack": "^5.11.0",
    "expo": "^40.0.1",
    "expo-app-loading": "^1.0.1",
    "expo-updates": "^0.4.2",
    "react": "16.13.1",
    "react-native": "0.63.3",
    "react-native-gesture-handler": "^1.8.0",
    "react-native-reanimated": "~1.13.0",
    "react-native-safe-area-context": "3.1.9",
    "react-native-screens": "^2.12.0"
  },
  ...
```

---

## Admin Panel

`npx create-react-app adminpanel`
