import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export const useRequestGetToDos = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		const toDosDbRef = ref(db, "toDos");

		return onValue(toDosDbRef, (snapshot) => {
			const loadedToDos = snapshot.val() || [];
			setToDos(loadedToDos);
		});
	}, []);

	return { toDos, setToDos };
};
