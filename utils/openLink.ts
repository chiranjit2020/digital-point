import { Alert, Linking } from 'react-native';

// Asks Android to open a URL in whichever app handles it (dialer, WhatsApp,
// maps, browser). It can fail, e.g. a tablet with no dialer, so show a
// native alert instead of failing silently.
export async function openLink(url: string, failureMessage: string): Promise<void> {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('Could not open', failureMessage);
  }
}
