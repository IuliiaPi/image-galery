const searchInput = document.querySelector('.search-input')
searchInput.value = '';

let enterText;

const galleryContainer = document.querySelector('.gallery-container')

// const imageSrc = `https://api.unsplash.com/search/photos?query=${searchInput.value}&per_page=30&orientation=landscape&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow`;

function setLocalStorage() {
    localStorage.setItem('enterText', searchInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('enterText')) {
        searchInput.value = localStorage.getItem('enterText');

        enterText = searchInput.value;
        console.log(enterText);

        async function getData() {
            const url = `https://api.unsplash.com/search/photos?query=${enterText}&per_page=30&orientation=landscape&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow`;

            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            // console.log(data.urls.regular);

            for (let i = 0; i < data.length; i++) {
                const img = document.createElement('img');
                img.classList.add('gallery-img');
                // img.src = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
                img.src = data.url;
                img.alt = `image`;
                galleryContainer.append(img);
            };

            // showData(data);
        }
        getData();

        const searchForm = document.querySelector('.search-form');
        const searchImg = document.querySelector('.search-img');

        document.onkeydown = (e) => {
            if (e.keyCode === 13) {
                searchForm.submit();
                getData();
            }
        }

        searchImg.addEventListener("click", getData);
    }
}
window.addEventListener('load', getLocalStorage);



const img1 = document.querySelector('.img1')

// function showData(data) {
//     const img = document.createElement('img');
//     img.classList.add('gallery-img');
//     // img.src = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
//     img.src = imageSrc;
//     img.alt = `image`;
//     galleryContainer.append(img);
// }

// function setImage() {
//     const img = new Image();
//     const imageSrc = `https://api.unsplash.com/search/photos?query=${enterText}&per_page=30&orientation=landscape&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow`;
//     img.src = imageSrc;
//     img.addEventListener('load', () => {  //  or  img.onload = () => {
//         //  img1.src = imageSrc;
//         showData(data);
//     });
// };
// setImage();



