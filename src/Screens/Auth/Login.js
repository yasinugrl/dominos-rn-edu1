import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Text, View, ScrollView,
    SafeAreaView, Animated, Keyboard, KeyboardAvoidingView,
} from 'react-native';
import { Icon } from 'native-base'
import { Input, FormFooter } from '../../components'
import { connect } from 'react-redux';
import { login } from '../../actions'
import { colors } from '../../style';



const Login = (props) => {
    const [email, setEmail] = useState('test2@test.com')
    const [password, setPassword] = useState('123456')

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'twitter'} fontSize={40} />
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'ellipsis-h'} fontSize={25} />
            </View>

            <View style={{ flex: 9 }}>
                <ScrollView style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, width: '70%', marginBottom: 20, textAlign: 'left', }}>Twitter'a giriş yap</Text>
                    <Input
                        placeholder={'Telefoni e-posta veya kullanıcı adı'}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        keyboardType='numeric'
                    />

                    <Input
                        placeholder={'Şifre'}
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                </ScrollView>
            </View>

            <FormFooter
                page='login'
                text='Giriş yap'
                {...props}
                onPress={() => {
                    const params = { email, password }
                    props.login(params)
                }}
            />

        </SafeAreaView>
    )
}

const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { login })(Login);
