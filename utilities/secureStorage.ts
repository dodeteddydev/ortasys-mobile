import * as SecureStorage from "expo-secure-store";

export class Storage {
  static saveToken(key: string, value: string) {
    SecureStorage.setItem(key, value);
  }

  static getToken(key: string) {
    return SecureStorage.getItem(key);
  }
  static deleteToken(key: string) {
    SecureStorage.deleteItemAsync(key);
  }
}
