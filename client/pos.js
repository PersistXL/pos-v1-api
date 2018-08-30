window.onload = function () {
    axios.get('http://localhost:3000/list')
        .then(function (response) {
            let List = response.data, str = ` `;
            var n = [];
            List.forEach(list => {
                str += `
                <li data-list="${list.id}">名称: ${list.name} ，数量: ${list.count} 个，单价: ${list.price}.00 (元)，小计:${sum(list.count, list.price)} (元)</li><br>
                `
                function sum(count, price) {
                    return parseInt(price) * parseInt(count);
                }
                let c = sum(list.count, list.price);
                n.push(c);
            });
            //计算总价
            var allsum = 0;
            for (let i in n) {
                allsum += parseInt(n[i]);
            }
             //列表项显示在页面
            let list = document.getElementById('list');
            list.innerHTML += str;
            //总价显示在页面
            let bott = ` 
             --------------------------<br>
            总计:${ allsum}.00(元)<br>
            节省: 4.00(元)<br><br>
             ***************************    
                `
            let bot = document.getElementById('bot');
            bot.innerHTML = bott;
        })
        .catch(function (error) {
            console.log(error);
        });
}

document.addEventListener('click', handleDeleteMovieClick, false);  //事件代理的方法来绑定click事件,
function handleDeleteMovieClick(e) {
    let list = e.target.getAttribute("data-list"); //getAttribute() 方法通过名称获取属性的值。
    let confirmDel = confirm("确认删除？");//confirm(message)   message 要在 window 上弹出的对话框中显示的纯文本
    if (confirmDel) {
        deleteMovieById(list)
    }
    else return;
}

function deleteMovieById(list) {  //删除操作
    axios.delete(` http://localhost:3000/list/${list}`)
        .then(function (response) {
            if (response.status === 404) {
                console.log("删除成功!")
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}