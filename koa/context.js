let context = {
    
}
function intercept(property,name){
    Object.defineProperty(context,name,{
        get(){
            return this[property][name];
        },
        set(newValue){
            this[property][name] = newValue;
        }
    })
}
intercept("request","url");
intercept("request","path");
intercept("response","body");
module.exports = context;