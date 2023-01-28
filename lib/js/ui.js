// include script
window.addEventListener('load', function() {
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

    // menu list
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
    document.querySelector('.menu-tab button').addEventListener('click', e => {
        const dataset = e.target.dataset;
        if(!dataset.value) return;
        if(dataset.value === ''){
            displayList(menuList);
        }else {
            displayItems(menuList,dataset.val);
        }
    });

    // 자동시작 (Deafult 데이터 => HTML)
    getList()
    .then(data => {
        data.data.forEach(data => menuList.push(data));
        displayList(menuList);
    })
});