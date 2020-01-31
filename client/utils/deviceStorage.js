import { AsyncStorage } from 'react-native'

export default deviceStorage = {
  
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message)
    }
  }
}