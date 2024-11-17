import { useState } from "react";

export const useRequestUpdateToDos = (setToDos) => {
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
				setToDos((prevToDos) =>
					prevToDos.map((ToDo) =>
						ToDo.id === updatedToDo.id ? updatedToDo : ToDo,
					),
				);
			})
			.finally(() => setIsUpdating(false));
	};

	return { requestUpdateToDo, isUpdating };
};
