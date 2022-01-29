import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import useActions from '../hooks/useActions';

const SettingPage = () => {
  const { toggleThemeMode } = useActions()
  return (
    <View>
      <Button title={'theme'} onPress={() => { toggleThemeMode() }} />
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({});
