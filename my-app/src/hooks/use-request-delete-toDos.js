import { useState } from "react";

export const useRequestDeleteToDos = (setToDos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteToDo = (event) => {
		const rowID = event.target.id;
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${rowID}`, {
			method: "Delete",
		})
			.then(() => {
				// setToDos((prevToDos) =>
				// 	prevToDos.filter((ToDo) => ToDo.id !== rowID),
				// );
				fetch("http://localhost:3005/todos")
					.then((loadedData) => loadedData.json())
					.then((loadedToDos) => setToDos(loadedToDos));
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return { requestDeleteToDo, isDeleting };
};
