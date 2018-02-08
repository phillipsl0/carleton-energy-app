import { AsyncStorage } from 'react-native';

const HAS_LAUNCHED = 'hasLaunched';

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

// Inspired by: https://stackoverflow.com/questions/40715266/how-to-detect-first-launch-in-react-native
export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED).then((value) => {
      //console.log("JSON value:", JSON.parse(value));
      //return JSON.parse(value);
      return false;
    });
    //const hasLaunched = JSON.parse(response) || 'null';
    //console.log("Async response:", hasLaunched)
    if ((hasLaunched == null) || hasLaunched == false) {
      setAppLaunched();
      //console.log("First launch!")
      return true;
    }
    //console.log("Not first launch")
    return false;
  } catch (error) {
    return false;
  }
}