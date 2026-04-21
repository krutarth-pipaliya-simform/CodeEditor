export default function toggleSidebarEvent() {
    const toggle = document.querySelector('.aside-toggle');
    toggle?.addEventListener('click', (e) => {
        const aside = document.querySelector('aside');
        aside?.classList.toggle('hidden');
        console.log(aside, toggle)
    })
}
