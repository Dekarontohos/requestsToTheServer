import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase";

export const useRequestPostToDos = (setToDos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddToDos = () => {
		setIsCreating(true);

		const taskName = prompt("Задача:");
		if (!taskName) {
			setIsCreating(false);
			return;
		}

		const toDosDbRef = ref(db, "toDos");

		push(toDosDbRef, {
			userId: 1,
			title: taskName,
			completed: false,
		})
			.then((response) => {
				console.log("Задача добавлено:", response);
			})
			.finally(() => setIsCreating(false));

		// fetch("http://localhost:3005/todos", {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json;charset=utf-8" },
		// 	body: JSON.stringify({
		// 		userId: 1,
		// 		id: Date.now(),
		// 		title: taskName,
		// 		completed: false,
		// 	}),
		// })
		// 	.then((rawResponse) => rawResponse.json())
		// 	.then((newToDo) => {
		// 		setToDos((prevToDos) => [...prevToDos, newToDo]);
		// 	})
		// 	.finally(() => {
		// 		setIsCreating(false);
		// 	});
	};

	return { requestAddToDos, isCreating };
};
