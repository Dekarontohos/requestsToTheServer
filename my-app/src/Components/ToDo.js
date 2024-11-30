import { useContext } from "react";
import { AppContext } from "../context";
import styles from "../App.module.css";

export const ToDo = () => {
	const {
		toDos,
		isUpdating,
		requestUpdateToDo,
		isDeleting,
		requestDeleteToDo,
		useRequestGetToDos,
	} = useContext(AppContext);

	return (
		<div>
			{toDos.map(({ id, title }) => (
				<div
					className={styles.ToDosListElement}
					key={id}
					style={{
						border: "1px solid black",
						marginRight: "5px",
					}}
				>
					<div
						style={{
							marginRight: "10px",
						}}
					>
						{title}
					</div>
					<div>
						{" "}
						<button
							disabled={isUpdating}
							onClick={(event) => requestUpdateToDo(event)}
							id={id}
							style={{
								marginRight: "10px",
							}}
						>
							Изменить
						</button>
						<button
							disabled={isDeleting}
							onClick={(event) =>
								requestDeleteToDo(event, useRequestGetToDos)
							}
							id={id}
						>
							Удалить
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
