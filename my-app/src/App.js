import { useState } from "react";
import styles from "./App.module.css";
import {
	useRequestGetToDos,
	useRequestPostToDos,
	useRequestUpdateToDos,
	useRequestDeleteToDos,
} from "./hooks";

export const App = () => {
	const { toDos, setToDos } = useRequestGetToDos();
	const { requestAddToDos, isCreating } = useRequestPostToDos(setToDos);
	const { requestUpdateToDo, isUpdating } = useRequestUpdateToDos(setToDos);
	const { requestDeleteToDo, isDeleting } = useRequestDeleteToDos(setToDos);
	const [sorting, setSorting] = useState(false);

	const filtration = (event) => {
		let filter = event.target.value;
		if (filter === "") {
		} else {
			const filterResult = toDos.filter((todo) =>
				todo.title.toLowerCase().includes(filter),
			);
			setToDos(filterResult);
		}
	};

	function debounce(func, delay) {
		let timeoutId;

		return function (...args) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const searchFunction = debounce(filtration, 300);

	const sort = () => {
		setSorting(!sorting);
		if (!sorting) {
			toDos.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			toDos.sort((a, b) => a.id - b.id);
		}
	};

	return (
		<div className={styles.app}>
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
								onClick={(event) => requestDeleteToDo(event)}
								id={id}
							>
								Удалить
							</button>
						</div>
					</div>
				))}
			</div>
			<div
				style={{
					display: "flex",
				}}
			>
				<div>
					<button
						disabled={isCreating}
						onClick={requestAddToDos}
						style={{
							marginRight: "5px",
							width: "100%",
						}}
					>
						Добавить задачу
					</button>
					<div>
						{" "}
						<button
							onClick={sort}
							style={{
								width: "100%",
							}}
						>
							{sorting
								? "Отключить сортировку"
								: "Включить сортировку"}
						</button>
					</div>
					<input placeholder="Поиск" onChange={searchFunction} />
				</div>
			</div>
		</div>
	);
};
