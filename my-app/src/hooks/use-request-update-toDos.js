import { useDispatch, useSelector } from "react-redux";
import { SET_TODOS, UPDATE_UPDATING_STATUS } from "../Actions";
import { selectData } from "../Selectors";

export const useRequestUpdateToDos = () => {
	const dispatch = useDispatch();
	const toDos = useSelector(selectData);

	const requestUpdateToDo = (event) => {
		const rowID = event.target.id;
		dispatch(UPDATE_UPDATING_STATUS(true));

		const taskName = prompt("Изменение задачи:");
		if (!taskName) {
			dispatch(UPDATE_UPDATING_STATUS(false));
			return;
		}

		fetch(`http://localhost:3005/todos/${rowID}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify({
				title: taskName,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedToDo) => {
				const newToDos = toDos.map((ToDo) =>
					ToDo.id === updatedToDo.id ? updatedToDo : ToDo,
				);
				dispatch(SET_TODOS(newToDos));
			})
			.finally(() => dispatch(UPDATE_UPDATING_STATUS(false)));
	};

	return requestUpdateToDo;
};
