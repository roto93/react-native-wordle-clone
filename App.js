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

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 24 } }}>
        <Stack.Screen name='Onboarding' component={OnBoardingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Wordle' component={MainPage}
          options={{ headerRight: HeaderRight }}
        />
        <Stack.Screen name='Settings' component={SettingPage}
          options={{ headerRight: HeaderRight }}
        />
        <Stack.Screen name='Statistics' component={StatisticPage}
          options={{ headerRight: HeaderRight }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
      <TouchableOpacity style={styles.headerTO}>
        <SettingIcon color={'#000'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerTO}>
        <BarChartIcon color={'#000'} />
      </TouchableOpacity>
    </RowView>
  )
}