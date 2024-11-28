import { useParams } from "react-router-dom";
import styles from "../App.module.css";
import {
	useRequestUpdateToDos,
	useRequestDeleteToDos,
	useRequestGetToDos,
} from "../hooks";
import BackButton from "./ArrowBack";
import { Page404 } from "../pages/Page404";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const ToDo = (props) => {
	const [toDo, setToDo] = useState();
	const { requestUpdateToDo, isUpdating } = useRequestUpdateToDos(setToDo);
	const { requestDeleteToDo, isDeleting } = useRequestDeleteToDos(
		props.setToDos,
	);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchToDo = async () => {
			try {
				const response = await fetch(
					`http://localhost:3005/todos/${params.id}`,
				);
				if (!response.ok) {
					throw new Error("Задача не найдена");
				}
				const loadedToDo = await response.json();
				setToDo(loadedToDo);
			} catch (error) {
				navigate("/404");
			}
		};
		fetchToDo();
	}, [params.id, navigate]);

	if (!toDo) {
		return <Page404 />;
	}

	return (
		<div className={styles.app}>
			<div style={{ alignItems: "center", margin: "5px" }}>
				<BackButton />
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
