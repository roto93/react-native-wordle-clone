import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function rootNavigate(name) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        { name: 'Onboarding' },
        { name: 'Wordle' },
        { name: name }]
    });
  }
}