export const switchTheme = () => {
    let checkbox = document.querySelector('input[name=theme]');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelector('div.black_overlay').classList.remove("d-none");
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelector('div.black_overlay').classList.add("d-none");
        }
    })
}

export const navScroll = () => {
    let nav = document.querySelector(".main-nav");

    document.addEventListener('scroll', () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            nav.style.top = "0";
            nav.style.background = "var(--bgPanel)";

        } else {
            nav.style.top = "-55px";
        }
    })
}

export const navMobile = () => {
    let hamburger = document.querySelector(".hamburger");
    let nav = document.querySelector("#toggle");

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('activeNavMobile');
    })
}