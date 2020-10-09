import { combineReducers } from 'redux';
import ListReducers from './ListReducets';

export default combineReducers({
    charactersResponse: ListReducers,
});