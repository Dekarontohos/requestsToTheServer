import styles from "./App.module.css";
import {
	useRequestGetToDos,
	useRequestPostToDos,
	useRequestUpdateToDos,
	useRequestDeleteToDos,
} from "./hooks";
import { AppContext } from "./context";
import { ToDo } from "./Components/ToDo";
import { ButtonsPanel } from "./Components/ButtonsPanel";
import { useState } from "react";

export const App = () => {
	const { toDos, setToDos } = useRequestGetToDos();
	const { requestAddToDos, isCreating } = useRequestPostToDos(setToDos);
	const { requestUpdateToDo, isUpdating } = useRequestUpdateToDos(setToDos);
	const { requestDeleteToDo, isDeleting } = useRequestDeleteToDos(setToDos);
	const [sorting, setSorting] = useState(false);

	return (
		<AppContext.Provider
			value={{
				toDos,
				setToDos,
				isUpdating,
				requestUpdateToDo,
				isDeleting,
				requestDeleteToDo,
				useRequestGetToDos,
				isCreating,
				requestAddToDos,
				sorting,
				setSorting,
			}}
		>
			<div className={styles.app}>
				<ToDo></ToDo>
				<ButtonsPanel></ButtonsPanel>
			</div>
		</AppContext.Provider>
	);
};
