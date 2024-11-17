import { useState } from "react";

export const useRequestPostToDos = (setToDos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddToDos = () => {
		setIsCreating(true);

		const taskName = prompt("Задача:");
		if (!taskName) {
			setIsCreating(false);
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
				setToDos((prevToDos) => [...prevToDos, newToDo]);
			})
			.finally(() => {
				setIsCreating(false);
			});
	};

	return { requestAddToDos, isCreating };
};
