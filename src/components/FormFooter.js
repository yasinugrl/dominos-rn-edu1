import { Icon } from 'native-base';
import React, { useRef, useEffect } from 'react';
import { Text, View, Animated, Keyboard } from 'react-native';
import { colors } from '../style';
import { Button } from './Button';

const FormFooter = (props) => {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

        return () => {
            Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        };

    }, []);

    const _keyboardWillShow = (e) => {
        const height = e.endCoordinates.height
        Animated.timing(animation, {
            toValue: -height + 34,
            duration: 250
        }).start();
    };

    const _keyboardWillHide = (e) => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300
        }).start();
    };

    return (
        <Animated.View
            style={
                [{
                    flex: 0.6,
                    backgroundColor: '#edeeef',
                    borderTopColor: '#b7b7b7',
                    borderTopWidth: 0.3,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    justifyContent: 'space-between'
                },
                {
                    transform: [
                        {
                            translateY: animation,
                        }
                    ]
                }
                ]
            }>

            { props.pageName == 'addTweet' ?
                <Icon onPress={props.onPress} name='image' type='FontAwesome' style={{ color: colors.main }} /> :
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: colors.main, fontSize: 14 }}>Şifreni mi unuttun?</Text>
                    <Button
                        text={props.text}
                        loading={props.loading}
                        onPress={props.onPress}
                        style={{ width: '25%', height: 30 }}
                    />
                </View>
            }


        </Animated.View>
    );
}
export { FormFooter };
