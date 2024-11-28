import { useState } from "react";

export const useRequestUpdateToDos = (setToDo) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateToDo = (event) => {
		const rowID = event.target.id;
		setIsUpdating(true);

		const taskName = prompt("Изменение задачи:");
		if (!taskName) {
			setIsUpdating(false);
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
				setToDo(updatedToDo);
			})
			.finally(() => setIsUpdating(false));
	};

	return { requestUpdateToDo, isUpdating };
};
