const homeCtrl = require('../controller/home');
const editCtrl = require('../controller/edit');
const addCtrl = require('../controller/add');


//定义路由列表
class List {
    // 首页的处理
    '/' (res) {
        homeCtrl.render(res);
    }
    // 首页删除功能
    '/remove' (res, pathname) {
        homeCtrl.remove(res, pathname)
    }
    // 编辑处理  如： /edit/1
    '/edit' (res, pathname, params, method) {
        if(method === 'GET') {
            homeCtrl.edit(res, pathname, params)
        }else if(method === 'POST') {
            editCtrl.edit(res, pathname, params)
        }
    }
    // 添加的处理
    '/add' (res, pathname, params, method){
        if(method === 'GET') {
            homeCtrl.add(res, pathname, params);
        }else if(method === 'POST'){
            addCtrl.add(res, pathname, params);
        }
    }
}