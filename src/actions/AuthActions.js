import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,

    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAILD,


    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD,

    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILD,

    SIGN_OUT_SUCCESS,

    BASE_URL
} from './types'
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../RootNavigation';
import firestore from '@react-native-firebase/firestore';

import { Alert } from 'react-native'

export const login = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '') {
            if (validateEmail(params.email)) {
                dispatch({ type: LOGIN_START })
                auth()
                    .signInWithEmailAndPassword(params.email, params.password)
                    .then((data) => {
                        console.log('signed in!', data);
                        const uid = data.user._user.uid;
                        getUser(uid, dispatch)
                    })
                    .catch(error => {
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        } else if (error.code === 'auth/user-not-found') {
                            console.log('That email address is invalid!');
                            Alert.alert('Uyarı', 'Böyle bir kullanıcı bulunamadı!')
                        }
                        console.log(error.code);
                        dispatch({ type: LOGIN_FAILD })
                    })
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

export const register = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '' && params.firstname != '' && params.lastname != '') {
            if (validateEmail(params.email)) {
                auth()
                    .createUserWithEmailAndPassword(params.email, params.password)
                    .then((data) => {
                        const uid = data.user._user.uid;
                        const setData = {
                            name: params.name,
                            username: params.username,
                            email: params.email
                        }
                        console.log('Kayıt olacak Kullanıcı', setData);
                        console.log('uid', uid);

                        firestore()
                            .collection('Users')
                            .doc(uid)
                            .set(setData)
                            .then((user) => {
                                console.log('User added!', user);
                                RootNavigation.navigate('Login')
                            }).catch((err) => {
                                console.log('User added Faild!', err);
                            })

                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }
                        console.log(error);
                    });
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

export const isAuth = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })
        auth()
            .onAuthStateChanged((user) => {
                console.log('asdasD: ', user);
                if (user) {
                    const uid = user._user.uid
                    getUser(uid, dispatch)
                } else {
                    dispatch({ type: LOGIN_FAILD })
                }

            })
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_START })
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: LOGOUT_SUCCESS })
            }).catch(() => {
                dispatch({ type: LOGOUT_FAILD })
            })
    }
}

const getUser = (uid, dispatch) => {
    firestore()
        .collection('Users')
        .doc(uid)
        .get()
        .then((user) => {
            const payload = {
                ...user._data,
                uid
            }
            dispatch({ type: LOGIN_SUCCESS, payload })
        })
        .catch((e) => {
            console.log('Eerroror', e);
        })
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

