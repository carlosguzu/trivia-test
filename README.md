# Microsoft Trivia (React Native + Expo)

App simple de trivia con **11 preguntas** sobre Microsoft (empresa, acción/stock y tecnología).
Cada pregunta tiene **4 opciones** y se debe responder en **12 segundos**, mostrados en un
círculo que se va consumiendo con el tiempo.

## Requisitos

- [Node.js](https://nodejs.org/) instalado (versión 18 o superior recomendado).
- La app de **Expo Go** en tu celular (Android/iOS), o un emulador.

## Cómo correr la app

Desde la carpeta del proyecto, en la terminal:

```bash
# 1. Instala las dependencias (solo la primera vez)
npm install

# 2. Inicia el servidor de desarrollo de Expo
npm start
```

Al iniciar verás un **código QR** en la terminal:

- **Celular:** abre la app *Expo Go* y escanea el QR.
- **Android emulador:** presiona `a`.
- **iOS simulador (Mac):** presiona `i`.
- **Navegador web:** presiona `w`.

## Estructura del proyecto

- `App.js` — pantalla principal y toda la lógica del juego (temporizador, puntaje, avanzar preguntas).
- `src/questions.js` — las 11 preguntas con sus respuestas. **Edita aquí para cambiar preguntas.**
- `src/CircularTimer.js` — el círculo de cuenta regresiva hecho con SVG.
- `app.json` — configuración de la app (nombre, colores, etc.).
- `package.json` — dependencias y scripts.

## Cómo generar un .apk (para Android)

Para crear un archivo `.apk` que puedas instalar en cualquier Android, usa **EAS Build** de Expo:

### 1. Instala EAS CLI

```bash
npm install -g eas-cli
```

### 2. Inicia sesión en Expo

```bash
eas login
```

### 3. Configura el proyecto para EAS

```bash
eas build:configure
```

Esto crea un archivo `eas.json` con la configuración de build.

### 4. Genera el .apk

```bash
eas build --platform android --profile preview
```

- `--profile preview` genera un APK de desarrollo (más rápido, no requiere firma).
- Para un APK de producción, usa `--profile production` (requiere configurar firma con Google Play).

El build se hace en la nube de Expo y te da un link para descargar el `.apk`.

### 5. Instala el .apk

Descarga el archivo y transfiérelo a tu celular, o envíalo por WhatsApp/Drive. Instálalo como cualquier APK.

## Cómo aprender modificando

Ideas para practicar:

1. **Cambia el tiempo:** en `App.js`, modifica la constante `TIME_PER_QUESTION`.
2. **Agrega preguntas:** copia un objeto en `src/questions.js` (recuerda que `answer` es el índice 0-3 de la opción correcta).
3. **Cambia colores:** revisa los `StyleSheet.create({...})` al final de cada archivo.
4. **Cambia el tamaño del círculo:** pásale otra prop `size` a `<CircularTimer />` en `App.js`.
