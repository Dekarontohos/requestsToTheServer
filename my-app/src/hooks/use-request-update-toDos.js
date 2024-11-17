import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

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

		const toDoDbRef = ref(db, `toDos/${rowID}`);

		set(toDoDbRef, {
			title: taskName,
			completed: false,
		})
			.then(() => {
				console.log("Задача изменена.");
			})
			.finally(() => {
				setIsUpdating(false);
			});

		// fetch(`http://localhost:3005/todos/${rowID}`, {
		// 	method: "PATCH",
		// 	headers: { "Content-Type": "application/json;charset=utf-8" },
		// 	body: JSON.stringify({
		// 		title: taskName,
		// 		completed: false,
		// 	}),
		// })
		// 	.then((rawResponse) => rawResponse.json())
		// 	.then((updatedToDo) => {
		// 		setToDos((prevToDos) =>
		// 			prevToDos.map((ToDo) =>
		// 				ToDo.id === updatedToDo.id ? updatedToDo : ToDo,
		// 			),
		// 		);
		// 	})
		// 	.finally(() => setIsUpdating(false));
	};

	return { requestUpdateToDo, isUpdating };
};
