import {combineReducers} from 'redux';
import app from './appReducers';
import openSta from './openStaReducers';

export default combineReducers({
	App: app,
	OpenSta: openSta,
});
