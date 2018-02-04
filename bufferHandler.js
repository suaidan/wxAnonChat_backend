/**
 * Created by 一苏 on 2018/2/4.
 * statement:
 */
let BufferHelper = function () {
    this.chunks = [];
    this.size = 0;//总共接收到的数据长度
    this.status = "inital";
}
BufferHelper.prototype.concat = function (chunk) {
    function _concat(chunk) {
        this.chunks.push(chunk);
        this.size += chunk.length;
        this.status = "processing";
    }

    for (let i = 0; i < arguments.length; i++) {
        _concat(arguments[i]);
    }
    return this;
}
BufferHelper.prototype._toBuffer = function (chunks) {
    let len = chunks.length;
    let size = this.size;
    let buffer = new Buffer(size);
    if (len === 0) {
        this.data = new Buffer(0);
        return this.data;
    }
    for (let i = 0,pos=0; i < len; i++) {
        try {
            chunks[i].copy(buffer,pos);
            pos+=chunks[i].length;
        }
        catch(ex){
            //throws()错误处理机制，未完成
            console.error("chunk拼接成buffer错误");
        }
    }
    this.data=buffer;
    this.status="completed";
    return this.data;
}
BufferHelper.prototype.toBuffer=function(){
    return this.status==="completed"?this.data:this._toBuffer(this.chunks);
}
BufferHelper.prototype.toString=function(){
    return Buffer.prototype.toString.call(this.toString,arguments)
}
module.exports=BufferHelper;