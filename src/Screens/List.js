import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';
import ListItems from '../Component/ListItem'
import Button from '../Component/Button'
import { connect } from 'react-redux';

import { getList } from '../actions'


const List = (props) => {

  const [data, setData] = useState([])

  useEffect(() => {
    props.getList()
  }, [])



  const renderItem = ({ item }) => (
    <ListItems item={item} navigation={props.navigation} />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={props.characters}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          initialNumToRender={5}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Listeniz boş</Text>
              </View>
            )
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
};


const mapStateToProps = ({ charactersResponse }) => {
  const { 
    loadingCharacter,
    characters
   } = charactersResponse;
  console.log('Gelen Değerler: ', characters, loadingCharacter);

  return { 
    loadingCharacter,
    characters
   };
};

export default connect(mapStateToProps, { getList } )(List);
