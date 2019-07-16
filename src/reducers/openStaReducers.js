export default (state = false, action) => {
	if (action.type === 'CHANGE_OPEN_STA') {
		state = action.payload
	}
	return state;
};
