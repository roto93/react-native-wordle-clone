import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import React from 'react';
import useActions from '../hooks/useActions';
import { RowView, winX } from '../Lib/Lib';
import { useSelector } from 'react-redux';
import { toggleThemeMode } from '../redux/actions';
import useTheme from '../hooks/useTheme';

const SettingPage = () => {
  const { toggleThemeMode, toggleIsUpperCase } = useActions()
  const { themeMode } = useSelector(state => state.themeModeReducer)
  const { isUpperCase } = useSelector(state => state.isUpperCaseReducer)
  const Theme = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: Theme.primary }]}>
      <ListItem text={'Dark Mode'} value={themeMode === 'dark'} onChange={toggleThemeMode} />
      <ListItem text={'Hard Mode'} value={isUpperCase} onChange={toggleIsUpperCase} />
      <ListItem text={'Upper Case'} value={isUpperCase} onChange={toggleIsUpperCase} />
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 24
  },
  listItem: {
    width: winX - 64,
    height: 36,
    marginBottom: 12,
    justifyContent: 'space-between'
  },
  listItem_text: {
    fontSize: 16,
    color: '#000'
  }
});

const ListItem = ({ text, value, onChange }) => {
  const Theme = useTheme()
  return (
    <RowView style={styles.listItem}>
      <Text style={[styles.listItem_text, { color: Theme.text }]}>{text}</Text>
      <Switch
        value={value}
        onChange={onChange}
      />
    </RowView>
  )
}
