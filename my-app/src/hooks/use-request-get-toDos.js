import { useEffect, useState } from "react";

export const useRequestGetToDos = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => setToDos(loadedToDos));
	}, []);

	return toDos;
};
