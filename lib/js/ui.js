window.addEventListener('load', function() {
    /*===========================================================
    * Header, Footer - Include Script
    *===========================================================*/
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });

    /*===========================================================
    * Menu List 데이터 받아오기
    *===========================================================*/
    let menuList = [];

    // 데이터 받아오기 : fetch()
    async function getList() {
        return fetch('/lib/js/menulist_presso.json') // 요청할 json파일
        // .then(res=>res.json());
        .then(json => console.log(json))
    }

    // HTML Display
    function displayList(data, type) {
        const menuPresso = document.querySelector('.menu-list.presso');
        const menuJuicy = document.querySelector('.menu-list.juicy');

        if (type) {
            menuPresso.innerHTML = data.filter(val => val.type === type).map(parseToHTML).join('');
        }else {
            menuPresso.innerHTML = data.map(parseToHTML).join('');
        }
    }

    // 데이터 -> HTML 변환
    function parseToHTML(data){
        return `
            <div class="menu-item">
                <a href="">
                    <span class="menu-img"><img src="${data.product_thumb}" alt=""></span>
                    <span class="menu-info font24">${data.product_title}</span>
                </a>
            </div>
        `;
    }

    // 탭 클릭시 이벤트
    // document.querySelector('.menu-tab button').addEventListener('click', e => {
    //     const dataset = e.target.dataset;
    //     if(!dataset.value) return;
    //     if(dataset.value === ''){
    //         displayList(menuList);
    //     }else {
    //         displayItems(menuList,dataset.val);
    //     }
    // });

    // 자동시작 (Deafult 데이터 => HTML)
    // getList()
    // .then(data => {
    //     data.data.forEach(data => menuList.push(data));
    //     displayList(menuList);
    // })


    /*===========================================================
    * News List 뿌리기
    *===========================================================*/
    function newsList () { // data를 동적으로 받기위해 newsList 함수 생성
        return fetch('/lib/js/news_list.json') // fetch() 안에는 기본적으로 요청할 url을 넣는다! default값으로 get으로 동작함
        .then(res => res.json()) // .then()에서 응답을 받고 .json 메소드로 파싱한 json()값을 리턴
        .then(json => json.data); // 리턴받은 json값을 받음
    }

    // newsList()의 실행이 끝나면 호출되는 then()
    newsList().then((data) => {
        console.log(data) // fetch에서 받은 데이터가 data에 전달됨
        dispalyNewsList(data)
    });

    function dispalyNewsList(data) {
        const newsWrap = document.querySelector('.news-wrap ul');
        newsWrap.insertAdjacentHTML('beforeend',data.map((data) => createHTMLString(data)).join(""))
    }

    function createHTMLString(data) {
        return `<li class="list-item mb80">
                    <a href="#">
                        <div class="item-thumb"></div>
                        <div class="item-desc">
                            <p class="font24 bold">${data.postList[0].listTitle}</p>
                            <span class="medium">${data.postList.date}</span>
                        </div>
                    </a>
                </li>`
    }

});
// 형제 요소 찾기 
function getSiblings(currentNode) {
    console.log(currentNode)
    let siblings = [];

    // 부모 노드가 없는 경우 현재 노드를 반환
    if (!currentNode.parentNode) {
        return currentNode;
    }

    // 부모 노드 접근
    let parentNode = currentNode.parentNode;

    // 부모 노드의 첫 번째 자식 노드
    let siblingNode = parentNode.firstChild;

    while (siblingNode) {
        // 기존 노드가 아닌 경우 배열에 추가
        if (siblingNode.nodeType === 1 && siblingNode !== currentNode) {
            siblings.push(siblingNode)
        }
        // 다음 노드 접근
        siblingNode = siblingNode.nextElementSibling;
    }

    // 형제 노드가 담긴 배열 반환
    return siblings;
}