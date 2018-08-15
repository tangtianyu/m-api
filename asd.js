const cheerio = require('cheerio');
const request = require('request');
const async = require('async');


const fs = require('fs');


let header ='https://www.ai107.com/';

let _pageUrl = [];

for (let i  = 1;i<10;i++){
    _pageUrl.push('https://www.ai107.com/htm/piclist3/'+i+'.htm');
}
async.mapLimit(_pageUrl,_pageUrl.length,(_page,_cb)=> {

    request(_page,(err,res)=>{
        const $ = cheerio.load(res.body);
        let t = $('.textList')[0];
        let c = $(t).children('li');
        let pageUrl = [];
        for (let i  = 0;i<c.length;i++){
            let y = c[i];
            pageUrl.push(header+$(y).children('a').attr('href'));
        }
        async.mapLimit(pageUrl,pageUrl.length,(page,cb)=>{
            // console.log(page);
            request(page,(err,res)=>{
                const $ = cheerio.load(res.body);
                let t = $('.picContent')[0];
                let c = $(t).children('img');
                let imgUrl=[];
                for (let i  = 0;i<c.length;i++){
                    let y = c[i];
                    imgUrl.push($(y).attr('src'));
                }
                async.mapLimit(imgUrl,imgUrl.length,(src,cb)=>{

                    // let name =(new Date()).getTime();
                    //   request(src).pipe(fs.createWriteStream('./img/'+name+'.jpg'))
                    //       .on('close',()=>{
                    //           console.log(name+'.jpg 下载完成');
                    //       })
                    fs.writeFileSync('./img/data.txt', src+'\n', {flag: 'as'},  (err) => {});
                });

                cb();
            })
        })
    });
    _cb();

});


