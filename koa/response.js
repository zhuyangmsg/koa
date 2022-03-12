let response = {
    get body(){
        return this._body;
    },
    set body(newValue){
        this._body = newValue;
    }
}
module.exports = response;