const galleryContainer = document.querySelector('.gallery-container')

const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';

function showData(data) {
const img = document.createElement('img');
img.classList.add('gallery-img');
// img.src = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
img.src = url;
img.alt = `image`;
galleryContainer.append(img);
}
// const url = 'https://api.unsplash.com/search/photos?query=spring&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showData(data);
}
getData();

// async function getLinkToImage() {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data.urls.regular);
// }
// getLinkToImage();

// function showData(data) {
//     const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=zCHXfBFZzSS0FdFvKMsQaROLD0Lvm4LfJgDM3T2t5Ow';
// }

const searchForm = document.querySelector('.search-form')

document.onkeydown = () => {
    if(e.keyCode === 13) {
        searchForm.submit();
    }
}