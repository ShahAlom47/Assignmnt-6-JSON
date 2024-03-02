
const searchBox = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

const rightContainer =document.getElementById('right-container');
const leftCardContainer = document.getElementById('left-card-container');
const allPostUrl = 'https://openapi.programming-hero.com/api/retro-forum/posts'


let Active = '';

fetch(allPostUrl)
    .then(res => res.json())
    .then(datas => printCard(datas.posts))

searchBtn.addEventListener('click', () => {
    let searchValue = searchBox.value
    searchBox.value='';
    const categoryPost = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`
    fetch(categoryPost)
        .then(res => res.json())
        .then(datas => printCard(datas.posts))

    
})

const printCard = (datasArr) => {
    leftCardContainer.innerHTML = '';
    rightContainer.innerHTML='';
    for (let datas of datasArr) {

        if (datas.isActive) {
            Active = 'bg-green-500'
        }
        else {
            Active = 'bg-red-500'
        }
        const makeCard = document.createElement('div');
        makeCard.className = `rounded-lg p-9 bg-[#797DFC1A] border-2 border-blue-500  flex  gap-4 flex-col lg:flex-row`
        makeCard.innerHTML = `
    <div class="img-box  relative">
    <p id="isActive" class="w-3 h-3 rounded-full ${Active} bg-gre  border-2 absolute "></p>
    <div class="img border-4 rounded-lg w-16 h-16">
        <img class='rounded-lg' src=${datas.image} alt="">
    </div>
</div>
<div class="data-box space-y-3 flex-1">
    <div class="header flex gap-3 text-gray-600">
        <p class="text-base font-semibold"># <span id="category">${datas.category}</span></p>
        <p class="text-base font-semibold">Author: <span id="A-Name">${datas.author.name}</span></p>

    </div>
    <div class="main space-y-3">
        <h1 class=" font-bold text-xl">${datas.title}</h1>
        <p class="text-gray-600 ">${datas.description}</p>

    </div>
    <hr>
    <div class="footer flex flex-col lg:flex-row justify-between gap-5  ">
        <div class="f-container flex flex-wrap gap-5">
            <div class="text-gray-600 text-lg flex gap-2 items-center">
                <img src="image/msg.svg" alt="">
                <p>${datas.comment_count}</p>
            </div>
            <div class="text-gray-600 text-lg flex gap-2 items-center">
                <img src="image/tabler-icon-eye (1).svg" alt="">
                <p>${datas.view_count}</p>
            </div>
            <div class="text-gray-600 text-lg flex gap-2 items-center">
                <img src="image/clock.svg" alt="">
                <p> <span>${datas.posted_time}</span> Min</p>
            </div>
        </div>
        <button onclick='cc()' id="card-btn" class="rounded-full "><img src="image/btn icon.svg"
                alt=""></button>
    </div>
</div>
    
    `


     leftCardContainer.appendChild(makeCard);


    }

    const makeRightContant = document.createElement('div');
    makeRightContant.className=`bg-[#12132D0D] rounded-xl p-3`
    makeRightContant.innerHTML=`
    <div id="header" class="flex justify-between">
    <h1 class="font-medium text-lg ">Title</h1>
    <div class="flex flex-1 justify-end">
        <img src="image/ll2.svg" alt="">
        <p class="flex font-medium text-gray-600">Mark as Read <span id="list-counter"
                class="mx-2"> 0</span> </p>

    </div>
</div>
<div id="list-container" class="py-4 flex flex-col gap-2">
    <div id="list" class="flex gap-3 justify-between items-start p-3 bg-white rounded-lg">
        <h1>sdhasjs hsaddj dshjsdjhd shd</h1>
        <div class="flex items-center">
            <img src="image/tabler-icon-eye (1).svg" alt="">
            <p id="list-item-view">123434</p>
        </div>

    </div>
    <div id="list2" class="flex gap-3 justify-between items-start p-3 bg-white rounded-lg">
        <h1>sdhasjs hsaddj dshjsdjhd shd</h1>
        <div class="flex items-center">
            <img src="image/tabler-icon-eye (1).svg" alt="">
            <p id="list-item-view">123434</p>
        </div>

    </div>

</div>
    `
rightContainer.appendChild(makeRightContant)
}

function cc() {

    console.log(1234567);
}