import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import axios from 'axios';

//components.
import KeyValueItem from '../src/components/KeyValueItem';
import ParagraphItem from '../src/components/ParagraphItem';
import KeyParagraphItem from '../src/components/KeyParagraphItem';
import TableItem from '../src/components/TabelItem';

//env imports.
import {URL} from '@env';

const HomeScreen = () => {
  const [jsonData, setJsonData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}`);
      setJsonData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTabs = () => {
    if (!jsonData || !selectedCategory) return null;

    const tabs = Object.keys(jsonData[selectedCategory]);

    if (tabs[0] === '0') {
      return <View></View>;
    }

    if (!selectedTab) {
      setSelectedTab(tabs[0]);
    }
    return (
      <FlatList
        horizontal
        data={tabs}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelectedTab(item)}>
            <Text
              style={{
                padding: 10,
                fontWeight: selectedTab === item ? 'bold' : 'normal',
                borderRadius: selectedTab === item ? 15 : 0,
                borderColor: selectedTab === item ? 'lightblue' : 'white',
                backgroundColor: selectedTab === item ? '#f1f8ff' : 'white',
                color: selectedTab === item ? 'lightblue' : 'grey',
                borderWidth: selectedTab === item ? 1 : 0,
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
    );
  };

  const renderContent = () => {
    if (!jsonData || !selectedCategory) return null;

    let content;
    if (selectedTab === null) {
      content = jsonData[selectedCategory];
    } else {
      const tabData = jsonData[selectedCategory][selectedTab];
      if (tabData && typeof tabData === 'object') {
        content = tabData;
      } else {
        content = jsonData[selectedCategory];
      }
    }

    if (content === null) return null;

    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <RenderItem key={index} item={item} />
      ));
    }

    return <RenderItem item={content} />;
  };

  const RenderItem = ({item}) => {
    if (!item || !item.type) {
      return null;
    }

    switch (item.type) {
      case 'KEY_VALUE':
        return <KeyValueItem item={item} />;
      case 'PARAGRAPH':
        return <ParagraphItem item={item} />;
      case 'KEY_PARAGRAPH':
        return <KeyParagraphItem item={item} />;
      case 'TABLE':
        return <TableItem item={item} />;
      case 'SPECIAL':
        return <SpecialItem item={item} />;
      default:
        return null;
    }
  };

  const SpecialItem = ({item}) => {
    return (
      <View style={{padding: 10}}>
        {Object.entries(item.data).map(([category, gemstone], index) => (
          <View key={index}>
            <Text style={Styles.itemHeading}>{category}</Text>

            <ScrollView
              horizontal={true}
              contentContainerStyle={Styles.scrollTable}>
              <Table
                style={Styles.table}
                borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row
                  data={Object.keys(gemstone)}
                  style={Styles.head}
                  textStyle={Styles.tableHeadingText}
                />
                <Row data={Object.values(gemstone)} textStyle={Styles.text} />
              </Table>
            </ScrollView>
          </View>
        ))}
      </View>
    );
  };

  if (!jsonData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={Styles.categoryContainer}>
        <Text>Category: </Text>
        <FlatList
          horizontal
          data={Object.keys(jsonData)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
              <Text
                style={{
                  padding: 10,
                  fontWeight: selectedCategory === item ? 'bold' : 'normal',
                  borderRadius: selectedCategory === item ? 15 : 0,
                  borderColor:
                    selectedCategory === item ? 'lightblue' : 'white',
                  backgroundColor:
                    selectedCategory === item ? '#f1f8ff' : 'white',
                  color: selectedCategory === item ? 'lightblue' : 'grey',
                  borderWidth: selectedCategory === item ? 1 : 0,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>
      <View>{renderTabs()}</View>

      <View>{renderContent()}</View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
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

export default HomeScreen;
