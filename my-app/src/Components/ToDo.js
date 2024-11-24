import { useParams } from "react-router-dom";
import styles from "../App.module.css";
import {
	useRequestUpdateToDos,
	useRequestDeleteToDos,
	useRequestGetToDos,
} from "../hooks";
import BackButton from "./ArrowBack";
import { Page404 } from "./Page404";
import { useNavigate } from "react-router-dom";

export const ToDo = (props) => {
	const { requestUpdateToDo, isUpdating } = useRequestUpdateToDos(
		props.setToDos,
	);
	const { requestDeleteToDo, isDeleting } = useRequestDeleteToDos(
		props.setToDos,
	);
	const params = useParams();
	const toDos = props.toDos;
	const navigate = useNavigate();

	if (toDos.length === 0) {
		return <Page404 />;
	}

	const toDo =
		toDos.filter((toDo) => toDo.id === Number(params.id))[0] || false;

	if (!toDo) {
		navigate("/404");
		return;
	}

	return (
		<div className={styles.app}>
			<div style={{ alignItems: "center", margin: "5px" }}>
				<BackButton></BackButton>
			</div>
			<div className={styles.ToDoBlank}>
				<div>
					<h3>Задача:</h3> {toDo.title}
				</div>
			</div>
			<div style={{ alignItems: "center", marginTop: "3px" }}>
				<button
					disabled={isUpdating}
					onClick={(event) => requestUpdateToDo(event)}
					id={toDo.id}
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
					id={toDo.id}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};
