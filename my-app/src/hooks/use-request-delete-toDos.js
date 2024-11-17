import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useRequestDeleteToDos = (setToDos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteToDo = (event) => {
		const rowID = event.target.id;
		setIsDeleting(true);

		const toDoDbRef = ref(db, `toDos/${rowID}`);

		remove(toDoDbRef)
			.then(() => {
				console.log("Задача удалена.");
			})
			.finally(() => {
				setIsDeleting(false);
			});
	};

	return { requestDeleteToDo, isDeleting };
};
