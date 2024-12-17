import { UPDATE_UPDATING_STATUS } from "./UpdateUpdatingStatus";
import { SET_TODOS } from "./SetToDos";

const updateToDoFetch = (rowID, taskName) => {
	return fetch(`http://localhost:3005/todos/${rowID}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
			title: taskName,
			completed: false,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((updatedToDo) => {
			return updatedToDo;
		});
};

export const UpdatedToDo = (event, toDos) => (dispatch) => {
	const rowID = event.target.id;

	dispatch(UPDATE_UPDATING_STATUS(true));

	const taskName = prompt("Изменение задачи:");
	if (!taskName) {
		dispatch(UPDATE_UPDATING_STATUS(false));
		return;
	}

	updateToDoFetch(rowID, taskName)
		.then((result) => {
			const newToDos = toDos.map((ToDo) =>
				ToDo.id === result.id ? result : ToDo,
			);
			return dispatch(SET_TODOS(newToDos));
		})
		.then(() => {
			dispatch(UPDATE_UPDATING_STATUS(false));
		})
		.catch(() => {});
};
