import { useDispatch, useSelector } from "react-redux";
import { SET_TODOS, UPDATE_CREATION_STATUS } from "../Actions";
import { selectData } from "../Selectors";

export const useRequestPostToDos = () => {
	const dispatch = useDispatch();
	const toDos = useSelector(selectData);

	const requestAddToDos = () => {
		dispatch(UPDATE_CREATION_STATUS(true));

		const taskName = prompt("Задача:");
		if (!taskName) {
			dispatch(UPDATE_CREATION_STATUS(false));
			return;
		}

		fetch("http://localhost:3005/todos", {
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
				dispatch(SET_TODOS([...toDos, newToDo]));
			})
			.finally(() => {
				dispatch(UPDATE_CREATION_STATUS(false));
			});
	};

	return requestAddToDos;
};
