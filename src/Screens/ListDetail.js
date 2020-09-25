import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen')

const ListDetail = (props) => {
    const item = props.route.params.item
    console.log('Gelen items: ', item.image);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 3 }}>
                <Image
                    source={{ uri: item.image }}
                    style={{ width, height: height * 0.3 }}
                    resizeMode='contain'
                />
                <View style={{ padding: 10}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{ fontSize: 12}} >{item.type}</Text>
                </View>
            </View>
        </View>
    );
}

export default ListDetail;
