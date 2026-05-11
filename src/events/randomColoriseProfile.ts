//random nearby colors
function getNearbyHexColor() {
  const base = {
    r: 183,
    g: 226,
    b: 17,
  };

  const variation = 20;

  const r = Math.min(255, Math.max(0, base.r + Math.floor(Math.random() * variation * 2 - variation)));
  const g = Math.min(255, Math.max(0, base.g + Math.floor(Math.random() * variation * 2 - variation)));
  const b = Math.min(255, Math.max(0, base.b + Math.floor(Math.random() * variation * 2 - variation)));

  return (
    "#" +
    [r, g, b]
      .map(v => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

//set the bgcolor of User profile with random color
export function randomColoriseProfile(): void {
  const users: NodeListOf<HTMLElement> = document.querySelectorAll(".user");
  for (const user of users) {
    user.style.backgroundColor = getNearbyHexColor();
  }
}