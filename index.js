const searchInput = document.querySelector('.search-input')
searchInput.value = '';

let enterText;
enterText = searchInput.value;

if (searchInput.value === '') {
    enterText = 'ice';
}

const url = 'https://api.unsplash.com/';
const accessKey = 'zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
const perPage = 18;
const imageSrc = `${url}search/photos?query=${enterText}&per_page=${perPage}&orientation=landscape&client_id=${accessKey}`;

const galleryContainer = document.querySelector('.gallery-container');

async function getData() {
    const res = await fetch(imageSrc);
    const data = await res.json();
    console.log(data);
    showData(data);
}

function showData(data) {
    const results = data.results;

    results.map((result) => {
        const img = document.createElement('img');
        img.classList.add('gallery-img');
        img.src = result.urls.small;
        img.alt = `image`;
        galleryContainer.append(img);
    });
}

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

        const imageSrc = `${url}search/photos?query=${enterText}&per_page=${perPage}&orientation=landscape&client_id=${accessKey}`;

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

            results.map((result) => {
                const img = document.createElement('img');
                img.classList.add('gallery-img');
                img.src = result.urls.small;
                img.alt = `image`;
                galleryContainer.append(img);
            });
        }
        getData();

        const searchForm = document.querySelector('.search-form');
        const searchImg = document.querySelector('.search-img');

        document.onkeydown = () => {
            if (e.keyCode === 13) {
                searchForm.submit();
                getData();
            }
        }

        searchImg.addEventListener("click", getData);
    }
}
window.addEventListener('load', getLocalStorage);


// closeBtn = document.querySelector('.close-button');
// closeBtn.addEventListener('click', () => {
//     searchInput.value = '';
// });



