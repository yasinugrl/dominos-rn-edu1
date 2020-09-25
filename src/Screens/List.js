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


const List = (props) => {

  const [data, setData] = useState([])

  useEffect(() => {
    Axios({
      method: 'get',
      url: 'https://kodluyoruzrn55.herokuapp.com/api/characters',
      headers: {
        authorization: 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzdiMzA3ODQxZGEwMDAxNzlhYWRkYyIsImlhdCI6MTYwMTAzNjMxMSwiZXhwIjoxNjAxMjA5MTExfQ.NceDgS4FMk3xWDTs45hU2KZXr6x98NYYAUP03zuuJCg')
      }
    }).then((response) => {
      console.log('Gelen GET Başarılı: => ', response.data);
      setData(response.data.characters.slice(0,8))
    }).catch((err) => {
      console.log('Gelen GET Hatalı: => ', err);
      Alert.alert('UYARI', 'İstek sırasında bir sorun oluştu!')
    })

  }, [])



  const renderItem = ({ item }) => (
    <ListItems item={item} navigation={props.navigation} />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={data}
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


export default List;
