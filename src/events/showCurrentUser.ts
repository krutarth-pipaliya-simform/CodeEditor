export function showCurrentUser(value: string) {
    const userInitial = document.querySelector(".current-user-initial");
    const userName = document.querySelector(".current-user-name");

    if (!(userInitial instanceof HTMLDivElement)) {
        throw new Error("User Initial Div Not found");
    }
    if (!(userName instanceof HTMLDivElement)) {
        throw new Error("User Name Div Not found");
    }
    if (value != undefined) {
        userInitial.classList.remove("hidden");
        userInitial.innerText = value.charAt(0);
        userName.innerText = value;
    }
}
