export const initialState = {
	isDeleting: false,
	isCreating: false,
	isUpdating: false,
	sorting: false,
};

export const ActionStatusesReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case "UPDATE_SORTING_VALUE":
			return { ...state, sorting: payload };
		case "UPDATE_CREATION_STATUS":
			return { ...state, isCreating: payload };
		case "UPDATE_UPDATING_STATUS":
			return { ...state, isUpdating: payload };
		case "UPDATE_DELETING_STATUS":
			return { ...state, isDeleting: payload };
		case "": {
			return payload;
		}
		default:
			return state;
	}
};
