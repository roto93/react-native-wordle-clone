import React from 'react';
import { Dimensions, View } from "react-native";

export const winX = Dimensions.get('window').width
export const winY = Dimensions.get('window').height

export const RowView = (props) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.styles]}>
      {props.children}
    </View>
  )
}