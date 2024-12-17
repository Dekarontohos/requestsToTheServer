import { GetToDos } from "./GetToDos";
import { UPDATE_DELETING_STATUS } from "./UpdateDeletingStatus";

const deleteToDoFetch = (rowID) => {
	return fetch(`http://localhost:3005/todos/${rowID}`, {
		method: "Delete",
	});
};

export const DeleteToDo = (event) => (dispatch) => {
	const rowID = event.target.id;

	dispatch(UPDATE_DELETING_STATUS(true));

	deleteToDoFetch(rowID)
		.then(() => {
			return dispatch(GetToDos());
		})
		.then(() => {
			dispatch(UPDATE_DELETING_STATUS(false));
		})
		.catch(() => {});
};
