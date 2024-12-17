import { SET_TODOS } from "./SetToDos";
import { UPDATE_CREATION_STATUS } from "./UpdateCreationStatus";

const PostToDoFetch = (taskName) => {
	return fetch("http://localhost:3005/todos", {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify({
			userId: 1,
			id: Date.now(),
			title: taskName,
			completed: false,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then((newToDo) => {
			return newToDo;
		});
};

export const PostToDo = (toDos) => (dispatch) => {
	dispatch(UPDATE_CREATION_STATUS(true));

	const taskName = prompt("Задача:");
	if (!taskName) {
		dispatch(UPDATE_CREATION_STATUS(false));
		return;
	}

	PostToDoFetch(taskName)
		.then((newToDo) => {
			return dispatch(SET_TODOS([...toDos, newToDo]));
		})
		.then(() => {
			dispatch(UPDATE_CREATION_STATUS(false));
		})
		.catch(() => {});
};
