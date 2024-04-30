import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';


function TableItem({item}) {
  const tableHeading = Object.keys(item.data[0]);
  const tableData = item.data.map(dataItem => Object.values(dataItem));

  return (
    <View style={{padding: 15}}>
      <Text style={Styles.itemHeading}>{item.heading}</Text>
      <ScrollView horizontal={true} contentContainerStyle={Styles.scrollTable}>
        <Table
          style={Styles.table}
          borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={tableHeading}
            style={Styles.head}
            textStyle={Styles.tableHeadingText}
          />
          {tableData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={Styles.row}
              textStyle={Styles.text}
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
export default TableItem;
