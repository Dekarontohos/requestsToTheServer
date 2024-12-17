import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_TODOS } from "../Actions";

export const useRequestGetToDos = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("http://localhost:3005/todos")
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => dispatch(SET_TODOS(loadedToDos)));
	}, []);
};
