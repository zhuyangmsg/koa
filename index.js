const Koa = require("./koa/application.js");
const app = new Koa();
app.use(async function(ctx,next){
    console.log(ctx.url);
    console.log(ctx.request.path);
    await next();
    ctx.body = "hello world";
})
app.use(async function(ctx,next){
    await log();
    await next();
    console.log(3333);
})
app.use(function(ctx,next){
    console.log(4444);
    next();
    console.log(5555);
})
app.listen(8888,function(){
    console.log("localhost:8888")
})

function log(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            console.log('异步加载');
            resolve();
        },3000)
    })
}