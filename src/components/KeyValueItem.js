import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';

function KeyValueItem({item}) {
  const tableData = Object.entries(item.data);

  return (
    <View style={{padding: 15}}>
      <Text style={Styles.itemHeading}>{item.heading}</Text>
      <ScrollView horizontal={true} contentContainerStyle={Styles.scrollTable}>
        <Table
          style={Styles.table}
          borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          {tableData.map(([key, value], index) => (
            <Row
              key={index}
              data={[key, value]}
              style={index % 2 === 0 ? Styles.head : Styles.row}
              textStyle={
                index % 2 === 0 ? Styles.tableHeadingText : Styles.text
              }
            />
          ))}
        </Table>
      </ScrollView>
    </View>
  );
}
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
export default KeyValueItem;  
