import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => (
    <TouchableOpacity
        onPress={props.onPress}
        style={[{
            width: '90%',
            height: 50,
            backgroundColor: 'red',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10

        }, props.style]}
    >
        <Text style={[{ color: 'white', fontSize: 18, fontWeight: 'bold' }, props.textStyle]} >{props.title}</Text>

    </TouchableOpacity>
);

export default Button;
