export default (sta) => {
	return (dispatch) => {
		dispatch({type: 'CHANGE_OPEN_STA', payload: sta});
	}
}
