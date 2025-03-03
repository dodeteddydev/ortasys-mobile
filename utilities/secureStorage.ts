import * as SecureStorage from "expo-secure-store";

export class StorageKey {
  static accessToken = "accessToken";
  static refreshToken = "refreshToken";
}

export class Storage {
  static async saveToken(key: string, value: string) {
    await SecureStorage.setItemAsync(key, value);
  }

  static async getToken(key: string) {
    return await SecureStorage.getItemAsync(key);
  }
  static async deleteToken(key: string) {
    await SecureStorage.deleteItemAsync(key);
  }
}
