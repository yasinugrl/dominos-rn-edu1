import React, { Component } from 'react';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from './RootNavigation';
import { USER } from './actions/types';


class PushController extends Component {
  async configure(onRegister) { 
    
          try {
            await messaging().requestPermission();
            // User has authorised
          } catch (error) {
              // User has rejected permissions
          }
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
              onRegister(fcmToken);
          } else {
              // user doesn't have a device token yet
          }

        messaging().subscribeToTopic("all")
      
        messaging().onNotificationOpenedApp((notificationOpen) => {
            console.log('onNotificationOpenedApp', notificationOpen.data);
             
        });
      
      
        messaging().getInitialNotification()
          .then((notificationOpen) => {
              console.log('getInitialNotification', notificationOpen.data);
           
          });
  }


  render() {
    return null;
  }
}
export default PushController;