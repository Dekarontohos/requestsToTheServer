import { useState } from "react";
import styles from "../App.module.css";
import { useRequestPostToDos } from "../hooks";

import { Link } from "react-router-dom";

export const ToDoList = (props) => {
	const { requestAddToDos, isCreating } = useRequestPostToDos(props.setToDos);
	const [sorting, setSorting] = useState(false);

	const filtration = (event) => {
		let filter = event.target.value;
		if (filter === "") {
			fetch("http://localhost:3005/todos")
				.then((loadedData) => loadedData.json())
				.then((loadedToDos) => props.setToDos(loadedToDos));
		} else {
			const filterResult = props.toDos.filter((todo) =>
				todo.title.toLowerCase().includes(filter),
			);
			props.setToDos(filterResult);
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
			props.toDos.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			props.toDos.sort((a, b) => a.id - b.id);
		}
	};

	return (
		<div className={styles.app}>
			<div>
				{props.toDos.map(({ id, title }) => (
					<div className={styles.ToDosListElement} key={id}>
						<div
							className={styles.title}
							onClick={(event) => console.log(event)}
						>
							<Link to={`/toDo/${id}`}>{title}</Link>
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
