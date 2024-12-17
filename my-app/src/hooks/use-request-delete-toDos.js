import { useDispatch } from "react-redux";
import { SET_TODOS, UPDATE_DELETING_STATUS } from "../Actions";

export const useRequestDeleteToDos = () => {
	const dispatch = useDispatch();

	const requestDeleteToDo = (event) => {
		const rowID = event.target.id;
		dispatch(UPDATE_DELETING_STATUS(true));

		fetch(`http://localhost:3005/todos/${rowID}`, {
			method: "Delete",
		})
			.then(() => {
				fetch("http://localhost:3005/todos")
					.then((loadedData) => loadedData.json())
					.then((loadedToDos) => dispatch(SET_TODOS(loadedToDos)));
			})
			.finally(() => {
				dispatch(UPDATE_DELETING_STATUS(false));
			});
	};

	return requestDeleteToDo;
};
