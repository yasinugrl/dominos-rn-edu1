import {
    LIST_START,
    LIST_SUCCESS,
    LIST_FAILD,
} from './types'
import Axios from 'axios';
import { Alert } from 'react-native';


export const getList = () => {
    return (dispatch) => {
        dispatch({ type: LIST_START })
        Axios({
            method: 'get',
            url: 'https://kodluyoruzrn55.herokuapp.com/api/characters',
            headers: {
              authorization: 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzdiMzA3ODQxZGEwMDAxNzlhYWRkYyIsImlhdCI6MTYwMjI0Nzc2MCwiZXhwIjoxNjAyNDIwNTYwfQ.21a-lBJUsY_PnFWy7855Z2yokmerZky21wAsm8-Di-U')
            }
          }).then((response) => {
            console.log('Gelen GET Başarılı: => ', response.data);
            dispatch({ type: LIST_SUCCESS, payload: response.data })
          }).catch((err) => {
              dispatch({ type: LIST_FAILD })
            console.log('Gelen GET Hatalı: => ', err);
            Alert.alert('UYARI', 'İstek sırasında bir sorun oluştu!')
          })
       
    }

}