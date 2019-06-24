export default (item) => {
	return (dispatch) => {
		dispatch({type: 'ADD_ITEM', payload: item});
	}
}
