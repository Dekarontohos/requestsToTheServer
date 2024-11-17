import { useEffect, useState } from "react";

export const useRequestGetToDos = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3005/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => setToDos(loadedToDos));
	}, []);

	return { toDos, setToDos };
};
