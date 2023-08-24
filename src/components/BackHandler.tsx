import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

export const BackHandle = ({navigation}:any) => {
    useFocusEffect(() => {
    const onBackPress = () => {
      // Navigate to a different screen instead of allowing the back action
      navigation.navigate('Signin'); // Replace 'Home' with the screen you want to navigate to
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  });
}