import { Routes, Route } from "react-router-dom";
import { useRequestGetToDos } from "./hooks";
import { ToDo } from "./Components/ToDo";
import { ToDoList } from "./Components/ToDoList";
import { Page404 } from "./pages/Page404";
import { Navigate } from "react-router-dom";

export const App = () => {
	const { toDos, setToDos } = useRequestGetToDos();

	return (
		<Routes>
			<Route
				path="/"
				element={
					<ToDoList toDos={toDos} setToDos={setToDos}></ToDoList>
				}
			></Route>
			<Route
				path="/toDo/:id"
				element={<ToDo toDos={toDos} setToDos={setToDos}></ToDo>}
			></Route>
			<Route path="/404" element={<Page404></Page404>}></Route>
			<Route
				path="*"
				element={<Navigate to="/404" replace={true}></Navigate>}
			></Route>
		</Routes>
	);
};
