const searchForm = document.querySelector('.search-form');
const searchImg = document.querySelector('.search-img');

const searchInput = document.querySelector('.search-input')
searchInput.value = '';

let enterText;
enterText = searchInput.value;

if (searchInput.value === '') {
    enterText = 'ice';
}

const url = 'https://api.unsplash.com/';
const accessKey = 'zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
let perPage = 18;
let page = 1;
let imageSrc = `${url}search/photos?query=${enterText}&per_page=${perPage}&page=${page}&orientation=landscape&client_id=${accessKey}`;

const galleryContainer = document.querySelector('.gallery-container');

const btnShowMore = document.querySelector('.btn-show-more');
btnShowMore.classList.remove('_hidden');

async function getData() {
    const res = await fetch(imageSrc);
    const data = await res.json();
    console.log(data);

    showData(data);
}

function showData(data) {
    const results = data.results;

    results.map((result) => {
        const imgLink = document.createElement('a');
        imgLink.classList.add('img-link');
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        // imgLink.textContent = result.alt_description;
        galleryContainer.append(imgLink);

        const image = document.createElement('img');
        image.classList.add('gallery-img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.title = result.alt_description;
        imgLink.append(image);
    });

    // page++;

    // if (page > 1) {
    //     btnShowMore.classList.remove('_hidden');
    // }
}

btnShowMore.addEventListener('click', () => {
    page++;
    imageSrc = `${url}search/photos?query=${enterText}&per_page=${perPage}&page=${page}&orientation=landscape&client_id=${accessKey}`;
    getData();
});

window.onload = function () {
    getData();
}

function setLocalStorage() {
    localStorage.setItem('enterText', searchInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('enterText')) {
        searchInput.value = localStorage.getItem('enterText');

        enterText = searchInput.value;
        console.log(enterText);

        let imageSrc = `${url}search/photos?query=${enterText}&page=${page}&per_page=${perPage}&orientation=landscape&client_id=${accessKey}`;

        async function getData() {
            const res = await fetch(imageSrc);
            const data = await res.json();
            console.log(data);
            showData(data);
        }

        function showData(data) {
            const results = data.results;
            console.log(results);
            galleryContainer.innerHTML = '';

            // if (page === 1) {
            //     galleryContainer.innerHTML = '';
            // };

            results.map((result) => {
                const imgLink = document.createElement('a');
                imgLink.classList.add('img-link');
                imgLink.href = result.links.html;
                imgLink.target = "_blank";
                // imgLink.textContent = result.alt_description;
                galleryContainer.append(imgLink);

                const image = document.createElement('img');
                image.classList.add('gallery-img');
                image.src = result.urls.small;
                image.alt = result.alt_description;
                image.title = result.alt_description;
                imgLink.append(image);
            });

            // page++;

            // if (page > 1) {
            //     btnShowMore.classList.remove('_hidden');
            // }

            if (results.length === 0) {
                btnShowMore.classList.remove('_hidden');
                btnShowMore.innerHTML = 'Try again';
                btnShowMore.classList.add('_error');
            }
        }
        getData();
    }
}
window.addEventListener('load', getLocalStorage);

searchImg.addEventListener("click", getData);

   // document.onkeydown = () => {
        //     if (e.keyCode === 13) {
        //         searchForm.submit();
        //         getData();
        //     }
        // }

// closeBtn = document.querySelector('.close-button');
// closeBtn.addEventListener('click', () => {
//     searchInput.value = '';
// });



