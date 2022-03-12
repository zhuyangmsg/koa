const http = require("http");
const context = require("./context.js");
const request = require("./request.js");
const response = require("./response.js");
function Koa(){
    this.callback = []
}
Koa.prototype.use = function(fn){
    this.callback.push(fn);
}
Koa.prototype.getCtx = function(req,res){
    let ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
}
Koa.prototype.compose = function(ctx,callback){
    function dispath(index){
        if(index == callback.length) return;
        let exe = callback[index];
        return Promise.resolve(exe(ctx,()=>dispath(index+1)));
    }
    return dispath(0)
}
Koa.prototype.server = async function(req,res){
    let ctx = this.getCtx(req,res);
    await this.compose(ctx,this.callback);
    let content = "";
    if(ctx.body){
        content = ctx.body;
    }else{
        res.statusCode = 404;
        content = "Not Found";
    }
    res.end(content);
}
Koa.prototype.listen = function(){
    const server = http.createServer(this.server.bind(this));
    server.listen(...arguments);
}
module.exports = Koa;