export default (state = {app_list: []}, action) => {
	if (action.type === 'ADD_ITEM') {
		state = {...state, app_list: [...state.app_list, action.payload]}
	}
	return state;
};
