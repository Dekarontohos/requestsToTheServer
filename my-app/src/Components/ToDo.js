import styles from "../App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectIsDeleting, selectIsUpdating } from "../Selectors";
import { DeleteToDo, UpdatedToDo } from "../Actions";

export const ToDo = () => {
	const dispatch = useDispatch();
	const toDos = useSelector(selectData);
	const isUpdating = useSelector(selectIsUpdating);
	const isDeleting = useSelector(selectIsDeleting);

	const OnUpdateClick = (event) => {
		dispatch(UpdatedToDo(event, toDos));
	};

	const OnDeleteClick = (event) => {
		dispatch(DeleteToDo(event));
	};

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
							onClick={(event) => OnUpdateClick(event)}
							id={id}
							style={{
								marginRight: "10px",
							}}
						>
							Изменить
						</button>
						<button
							disabled={isDeleting}
							onClick={(event) => OnDeleteClick(event)}
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
