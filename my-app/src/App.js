import styles from "./App.module.css";
import { useRequestGetToDos } from "./hooks";

export const App = () => {
	const toDos = useRequestGetToDos();

	console.log(toDos);

	return (
		<div className={styles.app}>
			{toDos.map(({ id, title }) => (
				<div
					className={styles.ToDosListElement}
					key={id}
					style={{ border: "1px solid black" }}
				>
					{title}
				</div>
			))}
		</div>
	);
};
