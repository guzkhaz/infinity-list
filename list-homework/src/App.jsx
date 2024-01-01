import './App.css'

function App() {

    let nextPage = 2;

    const infinteObserver = new IntersectionObserver(
        ([entry], observer) => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                loadNewCards(nextPage++);
            }
        },
        { threshold: 1 }
    );

    const loadNewCards = (page = 1) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
            .then((res) => res.json())
            .then((cards) => {
                cards.forEach((card) => {
                    const post = document.createElement("div");
                    post.innerHTML = `<h3>${card.id} ${card.title}</h3><p>${card.body}</p>`;
                    post.className = "card";
                    document.body.append(post);
                });

                const lastCard = document.querySelector(".card:last-child");
                if (lastCard) {
                    infinteObserver.observe(lastCard);
                }
            })
            .catch(console.error);
    };

    loadNewCards();

  return (
    <></>
  )
}

export default App
