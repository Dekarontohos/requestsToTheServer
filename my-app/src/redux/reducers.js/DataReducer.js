export const initialState = {
	toDos: [],
};

export const DataReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "SET_TODOS":
			return { ...state, toDos: payload };
		case "": {
			return payload;
		}
		default:
			return state;
	}
};
