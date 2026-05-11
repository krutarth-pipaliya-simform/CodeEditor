import { addUser } from "../storage/userStore.js";

export async function generateUser(username: string) {
    const existingUser = sessionStorage.getItem("userId");
    if (!existingUser) {
        sessionStorage.setItem("username", username);
        await addUser(
            username,
        );     
        alert(`User ${username} has been added successfully!`);
    } else {
        username = existingUser;
    }
}
