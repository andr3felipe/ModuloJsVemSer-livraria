const sidebarItems = document.querySelectorAll(".sidebarItem");
const sections = document.querySelectorAll('section');

sidebarItems.forEach((item) => {
    item.addEventListener('click', () => {
    sidebarItems.forEach((item) => {
        item.classList.remove("active-item");
    });

    item.classList.add('active-item');

    sections.forEach((section) => {
        if (item.id === section.id) {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    });
    });
});





