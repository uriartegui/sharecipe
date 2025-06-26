document.addEventListener("DOMContentLoaded", function () {
    const headerDiv = document.getElementById("header-include");
    if (!headerDiv) {
        console.error('Elemento #header-include não encontrado');
        return;
    }

    // Lista de caminhos a tentar, do mais confiável ao menos
    const paths = [
        "/html/partials/header.html",
        "../partials/header.html",
        "partials/header.html",
        "html/partials/header.html"
    ];

    // Função recursiva para tentar cada caminho
    function tryFetch(index) {
        if (index >= paths.length) {
            console.error('Falha ao carregar header: nenhum caminho funcionou');
            return;
        }
        fetch(paths[index])
            .then(response => {
                if (!response.ok) throw new Error();
                return response.text();
            })
            .then(data => {
                headerDiv.innerHTML = data;
                highlightActiveMenu(); // Chama a função para destacar o menu
            })
            .catch(() => {
                tryFetch(index + 1);
            });
    }

    // Função para destacar o link do menu da página atual
    function highlightActiveMenu() {
        const links = headerDiv.querySelectorAll('a');
        const currentPath = window.location.pathname.split('/').pop();
        links.forEach(link => {
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentPath)) {
                link.classList.add('active');
            }
        });
    }

    tryFetch(0);
});