document.addEventListener("DOMContentLoaded", function() {
    fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e5131de4f4f441a68b6814074114c1f6')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayNews(data.articles))
        .catch(error => {
            console.error('Error fetching the news:', error);
            const container = document.getElementById('newsContainer');
            container.innerHTML = '<p>Failed to load news articles.</p>';
        });

    const links = document.querySelectorAll('header nav ul li a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
});

function displayNews(articles) {
    const container = document.getElementById('newsContainer');
    container.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-item';
        articleElement.innerHTML = `
            <div class="news-image">
                <img src="${article.urlToImage || 'placeholder-image.png'}" alt="Article Image">
            </div>
            <div class="news-content">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
            </div>
        `;
        container.appendChild(articleElement);
    });
}
