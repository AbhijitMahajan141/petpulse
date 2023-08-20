import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import Navigation from './src/navigation';
import {Provider} from 'react-redux'
import { store } from './src/redux/store';


function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle='default'
        backgroundColor="#FFF8E1"
      />
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

export default App;
