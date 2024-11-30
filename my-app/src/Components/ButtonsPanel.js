import { useContext } from "react";
import { AppContext } from "../context";

export const ButtonsPanel = () => {
	const {
		toDos,
		setToDos,
		isCreating,
		requestAddToDos,
		sorting,
		setSorting,
	} = useContext(AppContext);

	const sort = () => {
		setSorting(!sorting);
		if (!sorting) {
			toDos.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			toDos.sort((a, b) => a.id - b.id);
		}
	};

	const filtration = (event) => {
		let filter = event.target.value;
		if (filter === "") {
			fetch("http://localhost:3005/todos")
				.then((loadedData) => loadedData.json())
				.then((loadedToDos) => setToDos(loadedToDos));
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

	return (
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
	);
};
