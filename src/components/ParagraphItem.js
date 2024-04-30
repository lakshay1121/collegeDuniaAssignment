import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ParagraphItem = ({item}) => (
  <View style={{padding: 10}}>
    <Text style={Styles.itemHeading}>{item?.heading}</Text>
    {Array.isArray(item.data) ? (
      item.data.map((paragraph, index) => <Text key={index}>{paragraph}</Text>)
    ) : (
      <Text>{item.data}</Text>
    )}
  </View>
);
const Styles = StyleSheet.create({
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {height: 50, backgroundColor: '#f1f8ff'},
  tableHeadingText: {fontWeight: 'bold', padding: 10},
  text: {padding: 10},
  row: {height: 60},
  table: {
    width: '100%',
    height: '100%',
  },
  itemHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
});
export default ParagraphItem;
