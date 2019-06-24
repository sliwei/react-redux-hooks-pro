import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import Reducers from '../reducers';

// add middleware inside this function
const middleware = applyMiddleware(thunk);

//--- STORE
export default createStore(Reducers, middleware);
