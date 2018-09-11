// // // const superagent = require('superagent');
// // // const cheerio = require('cheerio');

// // // const urlStr = 'http://www.jianshu.com/';


// // // //  发出请求，得到数据
// // // superagent.get(urlStr).end(function(err, res){
// // //     if(err){
// // //         // return throw Error(err);
// // //         console.log(err);
// // //         // return false
// // //     }
// // //     let $ = cheerio.load(res.text);
// // //     console.log('$$$$$======='+$('#list-container'));

// // // })
// // /**
// //  * 获取依赖
// //  * @type {*}
// //  */
// // const superagent = require('superagent');
// // const cheerio = require('cheerio');
// // const fs = require('fs');
// // /**
// //  * 定义请求地址
// //  * @type {*}
// //  */
// // const reptileUrl = "http://www.jianshu.com/";
// // /**
// //  * 处理空格和回车
// //  * @param text
// //  * @returns {string}
// //  */
// // function replaceText(text) {
// //   return text.replace(/\n/g, "").replace(/\s/g, "");
// // }
// // /**
// //  * 核心业务
// //  * 发请求，解析数据，生成数据
// //  */
// // superagent.get(reptileUrl).end(function (err, res) {
// //     // 抛错拦截
// //     if (err) {
// //         return throw Error(err);
// //     }
// //     // 解析数据
// //     let $ = cheerio.load(res.text);
// //     /**
// //      * 存放数据容器
// //      * @type {Array}
// //      */
// //     let data = [];
// //     // 获取数据
// //     $('#list-container .note-list li').each(function (i, elem) {
// //         let _this = $(elem);
// //         data.push({
// //             id: _this.attr('data-note-id'),
// //             slug: _this.find('.title').attr('href').replace(/\/p\//, ""),
// //             author: {
// //                 slug: _this.find('.avatar').attr('href').replace(/\/u\//, ""),
// //                 avatar: _this.find('.avatar img').attr('src'),
// //                 nickname: replaceText(_this.find('.blue-link').text()),
// //                 sharedTime: _this.find('.time').attr('data-shared-at')
// //             },
// //             title: replaceText(_this.find('.title').text()),
// //             abstract: replaceText(_this.find('.abstract').text()),
// //             thumbnails: _this.find('.wrap-img img').attr('src'),
// //             collection_tag: replaceText(_this.find('.collection-tag').text()),
// //             reads_count: replaceText(_this.find('.ic-list-read').parent().text()) * 1,
// //             comments_count: replaceText(_this.find('.ic-list-comments').parent().text()) * 1,
// //             likes_count: replaceText(_this.find('.ic-list-like').parent().text()) * 1
// //         });
// //     });
// //    // 生成数据
// //     // 写入数据, 文件不存在会自动创建
// //     fs.writeFile(__dirname + '/data/article.json', JSON.stringify({
// //         status: 0,
// //         data: data
// //     }), function (err) {
// //         if (err) throw err;
// //         console.log('写入完成');
// //     });
// // });




// // function getArticle(item) {
// //     // 拼接请求地址
// //       let url = reptileUrl + '/p/' + item.slug;
// //        /**
// //      * 核心业务
// //      * 发请求，解析数据，生成数据
// //      */
// //         superagent.get(url).end(function (err, res) {
// //             // 抛错拦截
// //         if (err) {
// //             return throw Error(err);
// //         }
// //           // 解析数据
// //             let $ = cheerio.load(res.text);
// //         // 获取容器，存放在变量里，方便获取
// //             let $post = $('div.post');
// //         // 获取script里的json数据
// //             let note = JSON.parse($('script[data-name=page-data]').text());
// //             /**
// //              * 存放数据容器
// //              * @type {Array}
// //              */
// //             let data = {
// //                 article: {
// //                     id: note.note.id,
// //                     slug: note.note.slug,
// //                     title: replaceText($post.find('.article .title').text()),
// //                     content: replaceText($post.find('.article .show-content').html()),
// //                     publishTime: replaceText($post.find('.article .publish-time').text()),
// //                     wordage: $post.find('.article .wordage').text().match(/\d+/g)[0]*1,
// //                     views_count: note.note.views_count,
// //                     comments_count: note.note.comments_count,
// //                     likes_count: note.note.likes_count
// //                 },
// //                 author: {
// //                     id: note.note.user_id,
// //                     slug: $post.find('.avatar').attr('href').replace(/\/u\//, ""),
// //                     avatar: $post.find('.avatar img').attr('src'),
// //                     nickname: replaceText($post.find('.author .name a').text()),
// //                     signature: replaceText($post.find('.signature').text()),
// //                     total_wordage: note.note.author.total_wordage,
// //                     followers_count: note.note.author.followers_count,
// //                     total_likes_count: note.note.author.total_likes_count
// //                 }
// //             };
// //            // 生成数据
// //             // 写入数据, 文件不存在会自动创建
// //             fs.writeFile(__dirname + '/data/article_' + item.slug + '.json', JSON.stringify({
// //                 status: 0,
// //                 data: data
// //             }), function (err) {
// //                 if (err) throw err;
// //                 console.log('写入完成');
// //             });
// //         });
// //     }

    






//     var http = require('http');
// var fs = require('fs');
// var cheerio = require('cheerio');
// var request = require('request');
// var i = 0;
// var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; 
// //初始url 

// function fetchPage(x) {     //封装了一层函数
//     startRequest(x); 
// }


// function startRequest(x) {
//      //采用http模块向服务器发起一次get请求      
//     http.get(x, function (res) {     
//         var html = '';        //用来存储请求网页的整个html内容
//         var titles = [];        
//         res.setEncoding('utf-8'); //防止中文乱码
//      //监听data事件，每次取一块数据
//         res.on('data', function (chunk) {   
//             html += chunk;
//         });
//      //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
//         res.on('end', function () {

//          var $ = cheerio.load(html); //采用cheerio模块解析html

//          var time = $('.article-info a:first-child').next().text().trim();
//          var news_item = {
//             //获取文章的标题
//               title: $('div.article-title a').text().trim(),
//            //获取文章发布的时间
//               Time: time,   
//            //获取当前文章的url
//               link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
//            //获取供稿单位
//               author: $('[title=供稿]').text().trim(),  
//           //i是用来判断获取了多少篇文章
//               i: i = i + 1,     
  
//               };
  
//     console.log(news_item);     //打印新闻信息
//     var news_title = $('div.article-title a').text().trim();
  
//     savedContent($,news_title);  //存储每篇文章的内容及文章标题
  
//     savedImg($,news_title);    //存储每篇文章的图片及图片标题
  
  
//                //下一篇文章的url
//     var nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
//               str1 = nextLink.split('-');  //去除掉url后面的中文
//               str = encodeURI(str1[0]);  
//               //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
//               if (i <= 500) {                
//                   fetchPage(str);
//               }
  
//           });
//         }).on('error', function (err) {
//             console.log(err);
//         });
    
//     }
//            //该函数的作用：在本地存储所爬取的新闻内容资源
//     function savedContent($, news_title) {
//         $('.article-content p').each(function (index, item) {
//             var x = $(this).text();       
    
//            var y = x.substring(0, 2).trim();
    
//             if (y == '') {
//             x = x + '\n';   
//     //将新闻文本内容一段一段添加到/data文件夹下，并用新闻的标题来命名文件
//             fs.appendFile('./data/' + news_title + '.txt', x, 'utf-8', function (err) {
//                 if (err) {
//                     console.log(err);
//                 }
//             });
//         }
//         })
//     }
//     //该函数的作用：在本地存储所爬取到的图片资源
//     function savedImg($,news_title) {
//         $('.article-content img').each(function (index, item) {
//             var img_title = $(this).parent().next().text().trim();  //获取图片的标题
//             if(img_title.length>35||img_title==""){
//              img_title="Null";}
//             var img_filename = img_title + '.jpg';
    
//             var img_src = 'http://www.ss.pku.edu.cn' + $(this).attr('src'); //获取图片的url
    
//     //采用request模块，向服务器发起一次请求，获取图片资源
//             request.head(img_src,function(err,res,body){
//                 if(err){
//                     console.log(err);
//                 }
//             });
//             request(img_src).pipe(fs.createWriteStream('./image/'+news_title + '---' + img_filename));     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
//         })
//     }
//     fetchPage(url);      //主程序开始运行

// var request = require('request');
// var fs = require('fs');
// var cheerio = require('cheerio');

// var index = 2;
// function getHtml(url){
//     request(url, function(err, reponse, body){
//         if(!err && reponse.statusCode == 200){//请求码等于200的时候运行
//             var $ = cheerio.load(body, {decodeEntities: false}); //获取DOM，后面的参数解决乱码用的
//             var content = $('.inner').html();
//             console.log(content);
//             // fs.writeFileSync('content.txt', content);//内容写入到文件中
//             // var nextArcLick = $('#nextArcLink').attr('href')
//             var nextHtml =  'http://www.yikedou.com/index_'+index+'.html';
//             // fs.appendFileSync('yikkedou.txt',content);//内容插入到文件中
//             document.getElementById('addContest').innerText += content;
//             getHtml(nextHtml);
//             index++;
//         }
//     });
// }

// var url = 'http://www.yikedou.com/';
// getHtml(url);



// var express = require('express');
// var cheerio = require('cheerio');
// var superagent = require('superagent');

// var app = express();

// app.get('/', function (req, res, next) {
//   superagent.get('https://cnodejs.org/')
//     .end(function (err, sres) {
//       if (err) {
//         return next(err);
//       }
//       var $ = cheerio.load(sres.text);
//       var items = [];
//       $('#topic_list .topic_title').each(function (idx, element) {
//         var $element = $(element);
//         items.push({
//           title: $element.attr('title'),
//           href: $element.attr('href')
//         });
//       });

//       res.send(items);
//     });
// });


// app.listen(3000, function () {
//   console.log('app is listening at port 3000');
// });







var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs')
var url = 'http://www.jikexueyuan.com/course/nodejs/';// 要爬取的网址


function filterHtml(html){
    var $ = cheerio.load(html);

    var lesson_list = $('.lesson-list').find('ul').children('li');//nodejs 类型下所有课程

    //预期想抓取的每个课程结构
    /*[{
        lesson_name: '',
        lesson_desc:'',
        lesson_num:'',
        lesson_href:''
        
    }]*/

    var nodeData = {
        lessonersNum:0,
        dataArray:[]
    };
    var lessonersTotalNum = 0;

    lesson_list.each(function(item) {
        var lesson = $(this); //获得每个课程li


        var lesson_box = lesson.find('.lessonimg-box');
        var lesson_href = $(lesson_box.find('a')[0]).attr('href');//课程链接

        var lesson_infor = lesson.find('.lesson-infor');//课程详情
        var lesson_name = $(lesson_infor.find('.lesson-info-h2').find('a')[0]).text();//课程名
        var lesson_desc = lesson_infor.find('p').text().trim();//课程介绍
        var lesson_num = lesson_infor.find('.timeandicon').find('.learn-number').text();
        lessonersTotalNum += parseInt(lesson_num);

        var lessonData = {
            lesson_name: lesson_name,
            lesson_desc:lesson_desc,
            lesson_num:lesson_num,
            lesson_href:lesson_href
        }

        nodeData.dataArray.push(lessonData)
    })
    nodeData.lessonersNum = lessonersTotalNum;

    return nodeData;
}


function printInfo(info, course) {

    var desStr = course + '系列共有: ' + info.dataArray.length + '门课程,总学习人数：' + info.lessonersNum +'\r\n'
    console.log(desStr);
    fs.writeFileSync('./output.txt',desStr, {flag:'a'})

    console.log('********** 具体信息如下 **********'+ '\r\n');

    info.dataArray.forEach(function(item){
        var itemDesc = '课程名称: ' + item.lesson_name + '\r\n' +
                       '课程介绍：' + item.lesson_desc + '\r\n' +
                       '课程链接：' + item.lesson_num + '\r\n' +
                       '学习人数：' + item.lesson_href + '\r\n\r\n';

        console.log(itemDesc);
        fs.writeFileSync('./output.txt',itemDesc, {flag:'a'})
        
    })
}

http.get(url, function(res){
    var html = '';

    res.on('data', function(data) {
        // console.log('html========',html)
        html += data;
    })

    res.on('end', function(){
        
        
        var output = filterHtml(html);
        
        printInfo(output, 'nodejs')
    })

}).on('error', function() {
    console.log('出错了')
})
