import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";
const firebaseConfig = {
	apiKey: "AIzaSyBTA3SJyoSQYxbMrQdG7vhG5QeY8ocUgLk",
	authDomain: "todosproject-b1e2f.firebaseapp.com",
	projectId: "todosproject-b1e2f",
	storageBucket: "todosproject-b1e2f.firebasestorage.app",
	messagingSenderId: "616317367474",
	appId: "1:616317367474:web:0a9f0a6893f55586ae85ab",
	databaseURL:
		"https://todosproject-b1e2f-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
