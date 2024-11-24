import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<button onClick={handleBack} style={styles.button}>
			<FontAwesomeIcon icon={faArrowLeft} style={styles.icon} />
		</button>
	);
};

const styles = {
	button: {
		background: "transparent",
		border: "none",
		cursor: "pointer",
		padding: "0",
		margin: "0",
	},
	icon: {
		color: "black", // Цвет стрелки
		fontSize: "24px", // Размер стрелки
	},
};

export default BackButton;
