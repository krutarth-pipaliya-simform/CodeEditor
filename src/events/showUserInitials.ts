import { getAllUsers } from "../storage/userStore.js";
import { getNearbyHexColor } from "./getNearbyHexColor.js";
export async function setUserInitials() {
    const usersInitialList =
        document.querySelector<HTMLLIElement>(".current-users");
    const val = await getAllUsers();
    for (let el of val) {
        //  <div class="current-user-initial user">K</div>
        let div = document.createElement("div");
        div.classList.add("current-user-initial", "user");
        div.style.backgroundColor = getNearbyHexColor();
        if (el["username"][0]) div.innerText = el["username"][0];
        usersInitialList?.append(div);
    }
}
