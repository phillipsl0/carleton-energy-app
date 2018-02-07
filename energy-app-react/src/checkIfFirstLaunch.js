import { AsyncStorage } from 'react-native';

const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED).then((value) => {
      console.log("JSON value:", JSON.parse(value));
      return JSON.parse(value);
    });
    //const hasLaunched = JSON.parse(response) || 'null';
    console.log("Async response:", hasLaunched)
    if (hasLaunched == null) {
      setAppLaunched();
      console.log("First launch!")
      return true;
    }
    console.log("Not first launch")
    return false;
  } catch (error) {
    return false;
  }
}