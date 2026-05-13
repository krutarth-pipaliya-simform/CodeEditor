import { channel } from "./broadCast.js";
import { getNearbyHexColor } from "./getNearbyHexColor.js";

const ACTIVE_TIMEOUT = 5000;
type ActiveUser = {
    username: string;
    color: string;
    lastSeen: number;
};
export const activeUsersMap = new Map<string, ActiveUser>();
const timeoutMap = new Map<string, ReturnType<typeof setTimeout>>();
const heartbeatMap = new Map<string, ReturnType<typeof setInterval>>();

export function startHeartbeat(username: string) {
    if (heartbeatMap.has(username)) return;
    let existingUser = activeUsersMap.get(username);
    if (!existingUser) {
        existingUser = {
            username,
            color: getNearbyHexColor(),
            lastSeen: Date.now(),
        };
        activeUsersMap.set(username, existingUser);
    }
    existingUser.lastSeen = Date.now();
    renderActiveUsers();
    resetPresenceTimeout(username);
    sendHeartbeat(username);

    const interval = setInterval(() => {
        existingUser!.lastSeen = Date.now();
        resetPresenceTimeout(username);
        sendHeartbeat(username);
    }, 3000);

    heartbeatMap.set(username, interval);
}

function sendHeartbeat(username: string) {
    channel.postMessage({
        type: "heartbeat",
        user: username,
        timestamp: Date.now(),
    });

}

export function setupPresenceListener() {
    channel.addEventListener("message", (event) => {
        const data = event.data;
        if (data.type !== "heartbeat") return;
        const username = data.user;
        let existingUser = activeUsersMap.get(username);
        if (!existingUser) {
            existingUser = {
                username,
                color: getNearbyHexColor(),
                lastSeen: Date.now(),
            };

            activeUsersMap.set(username, existingUser);
        }

        existingUser.lastSeen = Date.now();
        renderActiveUsers();
        resetPresenceTimeout(username);
    });
}

function resetPresenceTimeout(username: string) {
    const existingTimer = timeoutMap.get(username);
    if (existingTimer) {
        clearTimeout(existingTimer);
    }
    const timer = setTimeout(() => {
        activeUsersMap.delete(username);

        timeoutMap.delete(username);

        renderActiveUsers();
    }, ACTIVE_TIMEOUT);
    timeoutMap.set(username, timer);
}
export function renderActiveUsers() {
    const usersInitialList =
        document.querySelector<HTMLLIElement>(".current-users");
    if (!usersInitialList) return;
    usersInitialList.innerHTML = "";
    for (const user of activeUsersMap.values()) {
        const div = document.createElement("div");
        div.classList.add("current-user-initial", "user");
        div.style.backgroundColor = user.color;
        div.innerText = user.username[0]?.toUpperCase() ?? "";
        usersInitialList.append(div);
    }
}
