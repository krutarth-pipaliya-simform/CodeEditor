import { addUser } from "../storage/userStore.js";

export async function generateUser(userId: string) {
    const existingUser = sessionStorage.getItem("userId");
    if (!existingUser) {
        sessionStorage.setItem("userId", userId);
        await addUser({
            userId,
        });     
        alert(`User ${userId} has been added successfully!`);
    } else {
        userId = existingUser;
    }
}
