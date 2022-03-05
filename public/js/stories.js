const cards = document.querySelectorAll('.card');
const next = document.getElementById("next")
const prev = document.getElementById("prev")
if(cards !== null) {
    cards.forEach(card => {
        let toggle_accordions = card.querySelectorAll('.toggle-accordion');
        let accordionate = card.querySelectorAll('.accordionate');
        let cardHeight = card.getBoundingClientRect().height;
        console.log(cardHeight)

        toggle_accordions.forEach(togglers => {
            if(cardHeight > 200){
                togglers.style.display = "block"
            } else {
                togglers.style.display = "none"
            }

            togglers.addEventListener('click', async function(){
                if(togglers.innerHTML === "Read More"){
                    togglers.innerHTML = "Show Less"
                } else {
                    togglers.innerHTML = "Read More"
                }
                accordionate.forEach(accordions => {
                    accordions.classList.toggle('activeReadable');
                });
            });
        })
    });
}

if(prev){
    prev.addEventListener('click', function(e){
        e.preventDefault()
        let page = parseInt(prev.getAttribute("data-page"))
        page--;
        page = page <= 0? 1: page
        console.log(page)
        window.location.href = "https://storynogan.herokuapp.com/mystory/stories/" + page;
    })
}

if(next){
    next.addEventListener('click', function(e){
        e.preventDefault()
        let page = parseInt(next.getAttribute("data-page"))
        page++;
        console.log(page)
        window.location.href = "https://storynogan.herokuapp.com/mystory/stories/" + page;
    })
}