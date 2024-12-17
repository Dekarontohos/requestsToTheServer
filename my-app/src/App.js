import styles from "./App.module.css";
import { ToDo } from "./Components/ToDo";
import { ButtonsPanel } from "./Components/ButtonsPanel";
import { GetToDos } from "./Actions";
import { useDispatch } from "react-redux";

export const App = () => {
	const dispatch = useDispatch();
	dispatch(GetToDos());
	return (
		<div className={styles.app}>
			<ToDo></ToDo>
			<ButtonsPanel></ButtonsPanel>
		</div>
	);
};
