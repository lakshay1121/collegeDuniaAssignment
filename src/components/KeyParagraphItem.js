import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const KeyParagraphItem = ({item}) => {
    if (item.type === 'KEY_PARAGRAPH') {
      return (
        <View style={{padding: 10}}>
          <Text style={Styles.itemHeading}>{item?.heading}</Text>
          {Object.entries(item.data).map(([key, value], index) => (
            <View key={index} style={{marginBottom: 5}}>
              <Text style={{fontWeight: 'bold'}}>{key}:</Text>
              {typeof value === 'object' ? (
                Object.entries(value).map(([subKey, subValue], subIndex) => (
                  <View
                    key={subIndex}
                    style={{marginLeft: 10, marginBottom: 3}}>
                    <Text style={{fontWeight: 'bold'}}>{subKey}:</Text>
                    <Text>
                      {Array.isArray(subValue) ? subValue.join('\n') : subValue}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>{Array.isArray(value) ? value.join('\n') : value}</Text>
              )}
            </View>
          ))}
        </View>
      );
    } else if (item.type === 'PARAGRAPH') {
      return (
        <View style={{padding: 10}}>
          <Text style={Styles.itemHeading}>{item?.heading}</Text>
          {Array.isArray(item.data) &&
            item.data.map((paragraph, index) => (
              <Text key={index} style={{marginBottom: 5}}>
                {paragraph}
              </Text>
            ))}
        </View>
      );
    } else {
      return null;
    }
  };
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
export default KeyParagraphItem;
