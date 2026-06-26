import { Platform } from "react-native";

export const BACKEND_URL = Platform.OS === 'android'
   ? "http://10.0.2.2:5000"
   : process.env.EXPO_PUBLIC_NEW_API_URL;