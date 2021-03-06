import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardingPage from './src/screen/OnBoardingPage';
import MainPage from './src/screen/MainPage';
import SettingPage from './src/screen/SettingPage';
import StatisticPage from './src/screen/StatisticPage';
import { RowView } from './src/Lib/Lib';
import SettingIcon from './src/images/icons/SettingIcon';
import BarChartIcon from './src/images/icons/BarChartIcon';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { navigationRef, rootNavigate } from './rootNavigation';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 24 } }}>
          <Stack.Screen name='Onboarding' component={OnBoardingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name='Wordle' component={MainPage}
            options={{ headerRight: HeaderRight }}
          />
          <Stack.Screen name='Settings' component={SettingPage} />
          <Stack.Screen name='Statistics' component={StatisticPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headerTO: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  }
});


const HeaderRight = () => {
  return (
    <RowView>
      <TouchableOpacity style={styles.headerTO} onPress={() => { rootNavigate('Settings') }}>
        <SettingIcon color={'#000'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerTO} onPress={() => { rootNavigate('Statistics') }}>
        <BarChartIcon color={'#000'} />
      </TouchableOpacity>
    </RowView>
  )
}