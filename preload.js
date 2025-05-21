window.onload = function () {
    const parser = new DOMParser();
    fetch("/components/header.html").then(file => file.text().then(content => {
        const header = parser.parseFromString(content, "text/html").body.querySelector("header");
        document.body.style.paddingTop = "1em";
        document.body.prepend(header);
    }));
}