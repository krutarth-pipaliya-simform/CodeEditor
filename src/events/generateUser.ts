import { addUser } from "../storage/userStore.js";
export async function generateUser(username: string) {
    sessionStorage.setItem("username", username);
    await addUser(username);
    alert(`User ${username} has been added successfully!`);
}
