//set the bgcolor of User profile with random color
export function randomColoriseProfile(): void {
  const users: NodeListOf<HTMLElement> = document.querySelectorAll(".user");
  for (const user of users) {
    // Generate a random hex color string
  const randomColor: string =
    "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    user.style.backgroundColor = randomColor;
  }
}