import {
    ADD_TWEET_FAILD,
    ADD_TWEET_START,
    ADD_TWEET_SUCCESS,

    GET_TWEET_START,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAILD
} from './types'
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../RootNavigation';
import { Alert } from 'react-native'

export const getTweets = () => {
    return (dispatch) => {
        dispatch({ type: GET_TWEET_START });
        firestore()
            .collection('Tweets')
            .orderBy('createdDate', 'desc')
            .onSnapshot(tweets => {
                let data = []
                tweets._docs.forEach(element => {
                    const pr ={
                        ...element._data,
                        fav: [],
                        comment: [],
                        retweet: [],
                        user: {
                            profile_url: '',
                            name: 'Yasin',
                            username: 'ysnugrl'
                        }
                    }
                    data.push(pr)
                });
                console.log('Gelen DAta ', data);
                dispatch({ type: GET_TWEET_SUCCESS, payload: data  });

            })


    }
}

export const addTweet = (params) => {
    return (dispatch) => {
        dispatch({ type: ADD_TWEET_START })
        firestore()
            .collection('Tweets')
            .add(params)
            .then((data) => {
                console.log('SUCESS addTweet', data);
                dispatch({ type: ADD_TWEET_SUCCESS })
                RootNavigation.pop()
            })
            .catch(() => {
                dispatch({ type: ADD_TWEET_FAILD })
                console.log('EROR addTweet');
            })

    }
}
