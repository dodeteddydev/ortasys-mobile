import "dotenv/config";

const appEnv = process.env.APP_ENV || "development";
const API_URLS = {
  development: "", // change this to your development API URL
  staging: "",
  production: "",
};

export default {
  expo: {
    name:
      appEnv === "production"
        ? "Ortasys"
        : appEnv === "staging"
        ? "Ortasys Staging"
        : "Ortasys Dev",
    slug: "ortasys-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ortasys-mobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier:
        appEnv === "production"
          ? "com.ortasys.mobile"
          : appEnv === "staging"
          ? "com.ortasys.mobile.staging"
          : "com.ortasys.mobile.dev",
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FBF3F3",
      },
      package:
        appEnv === "production"
          ? "com.ortasys.mobile"
          : appEnv === "staging"
          ? "com.ortasys.mobile.staging"
          : "com.ortasys.mobile.dev",
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    plugins: [
      "expo-font",
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#FBF3F3",
        },
      ],
    ],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      appEnv,
      BASE_API_URL: API_URLS[appEnv],
      eas: {
        projectId: "4be1affa-a074-42a3-a032-54b3bf47e697",
      },
    },
  },
};
