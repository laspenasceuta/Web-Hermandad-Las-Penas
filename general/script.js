async function loadHTML(id, url) {
    const res = await fetch(url);
    document.getElementById(id).innerHTML = await res.text();
}

loadHTML('header', '../general/html/header.html');
loadHTML('footer', '../general/html/footer.html');