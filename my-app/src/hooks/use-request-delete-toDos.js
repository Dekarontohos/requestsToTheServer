import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRequestDeleteToDos = (setToDos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const navigate = useNavigate();

	const requestDeleteToDo = (event) => {
		const rowID = event.target.id;
		setIsDeleting(true);

		fetch(`http://localhost:3005/todos/${rowID}`, {
			method: "Delete",
		})
			.then(() => {
				fetch("http://localhost:3005/todos")
					.then((loadedData) => loadedData.json())
					.then((loadedToDos) => setToDos(loadedToDos));
			})
			.finally(() => {
				setIsDeleting(false);
				navigate("/");
			});
	};

	return { requestDeleteToDo, isDeleting };
};
