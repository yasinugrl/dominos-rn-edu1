import React, { useState, useRef, useEffect } from 'react';
import { Text, View, SafeAreaView, Animated, Keyboard, Image } from 'react-native';
import { Button, FormFooter, Input } from '../../components';
import { colors } from '../../style';
import { Icon } from 'native-base';
import { addTweet } from '../../actions'

import { connect } from 'react-redux';

const AddTweet = (props) => {
    const [tweet, setTweet] = useState('')
    const [image, setImage] = useState(null)

    console.log('Gelen User: ', props.user);

    const selectImage = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
            
            
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Button
                    text={'Tweetle'}
                    loading={props.loading}
                    textStyle={{ fontSize: 14 }}
                    onPress={() => {
                        
                        const params = {
                            tweet: {
                                text: tweet,
                            },
                            uid: props.user.uid,
                            createdDate: new Date()
                        }
                        image ? params.tweet.image = image : null
                        console.log('Giden Data: ', params);
                        props.addTweet(params)
                    }}
                    style={{ width: '20%', height: 30 }}
                />
            </View>

            <View style={{ flex: 12, padding: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name={'user'} type='FontAwesome' size={40} onPress={() => { }} />

                    <Input
                        placeholder='Neler oluyor?'
                        style={{ flex: 1, height: 50, padding: 10, borderBottomWidth: 0 }}
                        value={tweet}
                        maxLength={140}
                        onChangeText={(tweet) => setTweet(tweet)}
                        autoFocus
                        multiline
                    />
                </View>


                {image &&
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{ uri: image }}
                            style={{ width: '90%', height: '50%' }}
                            resizeMode='cover'
                        />
                    </View>
                }
            </View>


            <FormFooter
                pageName='addTweet'
                {...props}
                onPress={() => selectImage()}
            />


        </SafeAreaView>
    )
}


const mapStateToProps = ({ authResponse, tweetResponse }) => {
    const { user } = authResponse;
    return { user, loading: tweetResponse.loading };
};

export default connect(mapStateToProps, { addTweet })(AddTweet);
