import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListItems = ({ item, navigation }) => (
    <TouchableOpacity
    onPress={() => {
        navigation.navigate('ListDetail', { item })
    }} 
    style={styles.item}>
        <Image 
        source={{ uri: item.image }} 
        style={{ width: 75, height: 75, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} 
        defaultSource={require('../img/dummy.png')}
        />
        <View style={styles.child}>
            <Text style={styles.title1}>{item.name}</Text>
            <Text style={styles.item2}>{item.species}</Text>
        </View>
    </TouchableOpacity>
);

const styles = {
    item: { margin: 20, flexDirection: 'row', borderWidth: 0.3, borderRadius: 10, borderColor: 'gray' },
    title1: { fontSize: 17, fontWeight: 'bold' },
    title1: { fontSize: 12, color: 'gray' },
    child: { marginLeft: 20, padding: 10 }
};

export default ListItems;
