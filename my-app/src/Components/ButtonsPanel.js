import { useDispatch, useSelector } from "react-redux";
import { selectData, selectIsCreating, selectSorting } from "../Selectors";
import {
	SET_TODOS,
	UPDATE_SORTING_VALUE,
	PostToDo,
	GetToDos,
} from "../Actions";

export const ButtonsPanel = () => {
	const sorting = useSelector(selectSorting);
	const toDos = useSelector(selectData);
	const isCreating = useSelector(selectIsCreating);
	const dispatch = useDispatch();

	const OnPostClick = () => {
		dispatch(PostToDo(toDos));
	};

	const sort = () => {
		dispatch(UPDATE_SORTING_VALUE(!sorting));
		let sortToDos = [...toDos];
		if (!sorting) {
			sortToDos.sort((a, b) => a.title.localeCompare(b.title));
		} else {
			sortToDos.sort((a, b) => a.id - b.id);
		}
		dispatch(SET_TODOS(sortToDos));
	};

	const filtration = (event) => {
		let filter = event.target.value;
		if (filter === "") {
			dispatch(GetToDos());
		} else {
			const filterResult = toDos.filter((todo) =>
				todo.title.toLowerCase().includes(filter.toLowerCase()),
			);
			dispatch(SET_TODOS(filterResult));
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
					onClick={OnPostClick}
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
