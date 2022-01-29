import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Action from '../redux/actions'
import useActions from '../hooks/useActions';
import useTheme from '../hooks/useTheme';

const OnBoardingPage = ({ navigation }) => {
  const { theme } = useSelector(state => state.themeModeReducer)
  const navigate = (screenName) => navigation.reset({
    index: 0,
    routes: [{ name: 'Onboarding' }, { name: screenName }]
  })
  const Theme = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle Clone</Text>
      <View style={styles.TO_container}>
        <TO theme={Theme} text={'Start'} onPress={() => navigate('Wordle')} />
        <TO theme={Theme} text={'Settings'} onPress={() => navigate('Settings')} />
        <TO theme={Theme} text={'Statistics'} onPress={() => navigate('Statistics')} />
      </View>
      <Text style={styles.versionText}>
        ver. 1.0.0
      </Text>
    </View>
  );
};

export default OnBoardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 32,
    marginBottom: 64,
    color: '#000'
  },
  TO_container: {
    width: 208,
    height: 176,
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  TO: {
    width: 208,
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TO_text: {
    fontSize: 18,
    color: '#000'
  },
  versionText: {
    fontSize: 12,
  }
});

const TO = ({ text, onPress, theme }) => {
  return (
    <TouchableOpacity style={[styles.TO, { borderColor: theme.text, backgroundColor: theme.primary, text: theme.color }]} onPress={onPress}>
      <Text style={styles.TO_text}>{text}</Text>
    </TouchableOpacity>
  )
}