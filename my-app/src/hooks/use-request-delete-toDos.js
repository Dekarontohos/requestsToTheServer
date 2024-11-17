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
				setToDos((prevToDos) =>
					prevToDos.filter((ToDo) => ToDo.id !== rowID),
				);
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return { requestDeleteToDo, isDeleting };
};
