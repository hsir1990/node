const Koa = require('koa');
const app = new Koa();

app.use(async ( ctx ) => {
    ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('port 3000')





function getSyncTime() {
    return new Promise((resolve, reject) => {
      try {
        let startTime = new Date().getTime()
        setTimeout(() => {
          let endTime = new Date().getTime()
          let data = endTime - startTime
          resolve( data )
        }, 500)
      } catch ( err ) {
        reject( err )
      }
    })
  }
  
  async function getSyncData() {
    let time = await getSyncTime()
    let data = `endTime - startTime = ${time}`
    return data
  }
  
  async function getData() {
    let data = await getSyncData()
    console.log( data )
  }
  
  getData()

  // 500ms后打印
  // endTime - startTime = 501

function getSynctime() {
  return new Promise((resolve, reject)=>{
    try{
      let startTime = new Date().getTime();
      setTimeout(()=>{
        let endTime = new Date().getTime()
        let data = endTime - startTime
        resolve( data );
      },1000)
    }catch(err){
      reject(err)
    }
  }).then(() => {
    console.log('111111');
  })
}

async function getSyncData() {
  let time = await getSynctime();
  let data = `endTime - startTime = ${time}`;
  return data;
}

async function getData() {
  let data = await getSyncData();
  console.log(data)
}

getData();

  // 1秒后打印
  // 1111
//  endTime - startTime = undefined