export const authReducer = (state, action) => {
	const { type, payload: { userbyId, alluser, isAuthenticated, user }} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			}
		case 'ALL_USER':
            return {
				...state,
				alluser
			}
		case 'USER_BY_ID':
			return {
				...state,
				userbyId
			}
		default:
			return state
	}
}