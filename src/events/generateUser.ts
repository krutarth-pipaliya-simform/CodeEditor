import { addUser } from "../storage/userStore.js";
import { showCurrentUser } from "./showCurrentUser.js";
export async function generateUser(username: string) {
    sessionStorage.setItem("username", username);
    showCurrentUser(username);
    await addUser(username);
    alert(`User ${username} has been added successfully!`);
}
