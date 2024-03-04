
const searchBox = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error')
const listContainer = document.getElementById('list-container');
const readCounter = document.getElementById('list-counter');
const leftCardContainer = document.getElementById('left-card-container');
const allPostUrl = 'https://openapi.programming-hero.com/api/retro-forum/posts'


const title = [];
let Loaded = false



let listCount = 0;
let Active = '';



loadingShowHide(Loaded);

    fetch(allPostUrl)
        .then(res => {
            if(!res.ok){throw (res.status)}
           return res.json()
        })

        .then(datas => printCard(datas.posts))
        .catch(error=>{

            let xx = document.createElement('h1')
            xx.className = `flex flex-col items-center justify-center p-4`
            xx.innerHTML = `
               <h1 class="text-4xl lg:text-4xl text-center font-bold">404</h1>
               <h1 class="text-4xl lg:text-4xl text-center font-bold">Data Not Found</h1>
               <p>${error.message}</p>
             `
               setTimeout(() => {  
            leftCardContainer.appendChild(xx);
            Loaded = true
            loadingShowHide(Loaded)
            }, 2000);
        })



searchBtn.addEventListener('click', () => {
    Loaded = false
    loadingShowHide(Loaded)

    leftCardContainer.innerHTML = '';
    let searchValue = searchBox.value
    searchBox.value = '';



    const categoryPost = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`
    fetch(categoryPost)
        .then(res => {
            if (!res.ok) {
                throw (res.status)
            }
            return res.json()
         })
        .then(datas => {return printCard(datas.posts)})

        .catch(err => {
            let xx = document.createElement('h1')
            xx.className = `flex flex-col items-center justify-center p-4`
            xx.innerHTML = `
               <h1 class="text-4xl lg:text-4xl text-center font-bold">404</h1>
               <h1 class="text-4xl lg:text-4xl text-center font-bold">Data Not Found</h1>
               <p>${err.message}</p>
               `

               setTimeout(() => {
                
            leftCardContainer.appendChild(xx);
            Loaded = true
            loadingShowHide(Loaded)
        }, 2000);
        })

})

const printCard = (datasArr) => {
    leftCardContainer.innerHTML = '';

    if (datasArr.length === 0) {
        errorMsg.classList.remove('hidden');
        Loaded = true
        loadingShowHide(Loaded);
    }
    else {
        errorMsg.classList.add('hidden');
    }

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
                <p class="text-base font-semibold">Author: <span id="A-Name">${datas.author?.name}</span></p>

            </div>
            <div class="main space-y-3">
                <h1 id='' class=" font-bold text-xl">${datas.title}</h1>
                <p class="text-gray-600 ">${datas.description}</p>
            </div>
    <hr>
        <div class="footer flex flex-col lg:flex-row justify-between gap-5  ">
            <div class="f-container flex flex-row flex-wrap gap-5">
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
         <button onclick='makeTitleList(${JSON.stringify(datas.id)})' class="rounded-full "><img src="image/btn icon.svg" alt=""></button>
         </div>
        </div>

    `
        title.push(datas)
   
setTimeout(() => {
    

        Loaded = true
        loadingShowHide(Loaded);
        leftCardContainer.appendChild(makeCard);
    }, 2000);
    }
}

function makeTitleList(id) {
    let data = title.find(ietm => ietm.id === id)

    const makeList = document.createElement('div');
    makeList.className = `flex gap-3 justify-between items-start p-3 bg-white rounded-lg`
    makeList.innerHTML = `
    <h1 class='font-semibold'>${data.title} </h1>
    <div class="flex items-center px-3">
        <img src="image/tabler-icon-eye (1).svg" alt="">
        <p id="list-item-view">${data.view_count}</p>
    </div>

    `
    listContainer.appendChild(makeList)
    listCount += 1;
    readCounter.innerText = listCount;

}

function loadingShowHide(Loaded) {
    if (Loaded) {
        loading.classList.add('hidden')
    }
    else {
        loading.classList.remove('hidden')
    }

};



// latest post 

const latestPostContainer = document.getElementById('latest-card');
const postLoading = document.getElementById('postLoading')
const latestPostUrl = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts';

postLoading.classList.remove('hidden')
fetch(latestPostUrl)
    .then(res => {
        if (!res.ok) {
            throw (res.status)
        }
        return res.json()
    })
    .then(datas => LatestPostCard(datas))
    .catch(error => {
        latestPostContainer.innerHTML = ''
        const errorBox = document.createElement('div');
        errorBox.className = `flex flex-col justify-center items-center py-9 col-span-3`
        errorBox.innerHTML = `

    <h1 class="text-4xl lg:text-4xl text-center font-bold">404</h1>
    <h1 class="text-4xl lg:text-4xl text-center font-bold">Data Not Found</h1>
    <p>${error.message}</p>
    `

        setTimeout(() => {
            postLoading.classList.add('hidden')
            latestPostContainer.appendChild(errorBox);
        }, 2000);

    });

const LatestPostCard = (datas) => {
    for (let data of datas) {

        const postCard = document.createElement('div');
        postCard.className = `card  bg-base-100 shadow-xl border-2`
        postCard.innerHTML = `
    <figure class="px-10 pt-10">
    <img src=${data.cover_image} alt="Shoes"
        class="rounded-xl" />
</figure>
<div class="card-body items-start text-center">
    <div class="card-head flex gap-3">
        <img src="image/cal.svg" alt="">
        <p>${data.author?.posted_date || 'No Publish Date'}</p>
    </div>
    <h2 class="card-title text-start font-bold">${data.title}</h2>
    <p class="text-start text-gray-600 font-medium">${data.description}</p>
    <div class="post-footer flex items-center gap-3 my-3">
        <div class="post-img-box w-16 h-16 rounded-full border-2">
            <img class="rounded-full" src=${data.profile_image} alt="">
        </div>
        <div class="footer-data text-start">
            <h4 class="font-bold">${data.author?.name}</h4>
            <p class="text-gray-600">${data.author?.designation || 'Unknown'}</p>
        </div>
    </div>

</div>
    `
        setTimeout(() => {
            postLoading.classList.add('hidden')
            latestPostContainer.appendChild(postCard);
        }, 2000);


    }
}

