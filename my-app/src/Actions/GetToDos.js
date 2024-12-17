import { SET_TODOS } from "./SetToDos";

const getToDosFetch = () => {
	return fetch("http://localhost:3005/todos")
		.then((loadedData) => loadedData.json())
		.then((loadedToDos) => {
			return loadedToDos;
		});
};

export const GetToDos = () => (dispatch) => {
	getToDosFetch()
		.then((result) => {
			dispatch(SET_TODOS(result));
		})
		.catch(() => {});
};
