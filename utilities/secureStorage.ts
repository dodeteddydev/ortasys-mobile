import * as SecureStore from "expo-secure-store";

export class Storage {
  static async saveToken(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }

  static async getToken(key: string) {
    return await SecureStore.getItemAsync(key);
  }

  static async deleteToken(key: string) {
    await SecureStore.deleteItemAsync(key);
  }
}
