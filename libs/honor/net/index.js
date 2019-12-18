var ACTIONS = {
    "conn::init" : function () {console.log("成功初始化连接");},
    "io.error" : function (data) {console.log("连接出错");},
    "io.reconnect" : function () {console.log("重连中");},
    "io.close" : function () {console.log("连接已关闭");},
    "io.open" : function () {console.log("连接成功");}
};
var DEFAULT_CONFIG = {
    "type" : "ajax",
    "timeout" : 300000
}

class IO {
    constructor () {
        this.type = null;
        this.socket = null;
        this.errorPlugin = null;
        this.isOpened = false;//连接是否已经初始化过

        this.register(ACTIONS, this);
    }

    dispatch (cmd, data, code, errormsg, type) {
        // if(!Laya.stage.isVisibility){
        // 	Sail.DEBUG && console.log("%c游戏已经隐藏，不发布IO事件。", "color:#f00");
        // 	return;
        // }
        if(cmd != "conn::init" && cmd != "io.error" && cmd != "io.reconnect" && cmd != "io.close" && cmd != "io.open"){
            if(this.errorPlugin){
                //error
                if(this.errorPlugin.checkError(cmd, data, code, errormsg, type)){
                    return;
                }
            }
        }

        (function (cmd, data, code, errormsg, _io) {
            setTimeout(function() {_io.publish(cmd || "no_cmd", data, code, errormsg, cmd);}, 0);
        })(cmd, data, code, errormsg, this);
    }

    ajax (cmd, type, url, data) {
        data = data ? data : {};
        if(type){
            type = type.toUpperCase();
            type = type === "POST" || type === "GET" ? type : "GET";
        }else{
            type = "GET";
        }

        Sail.DEBUG && console.log("====>>发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：'Ajax-" + type + "'\n数据：" + JSON.stringify(data));

        $.ajax({
            type     : type,
            url      : url || cmd,
            dataType : 'json',
            data     : data,
            timeout  : DEFAULT_CONFIG.timeout,
            success  : function (cmd, data) {
                Sail.DEBUG && console.log("命令：" + cmd + "\n<<<=====接收到'Ajax'数据, 时间:" + Date.now() + "\n" + JSON.stringify(data));
                this.dispatch(cmd, data, "success", null, "ajax");
            }.bind(this, cmd),
            error	 : function(e){
                Sail.DEBUG && console.log("命令：" + cmd + "\nAjax异常--->\n" + JSON.stringify(e));
                
                this.dispatch(cmd, e, "error", null, "ajax");
            }.bind(this)
        });
    }
    ajaxPost (cmd, url, data) {
        this.ajax(cmd, "POST", url, data);
    }
    ajaxGet (cmd, url, data) {
        this.ajax(cmd, "GET", url, data);
    }
    emit (cmd, params, ioType, ajaxType) {
        if(ioType === "ajax"){
            this.ajax(cmd, ajaxType, cmd, params);
        }else{
            if(!this.socket){
                console.error("没有可用的Socket连接");
                return;
            }
            this.socket.emit(cmd, params);
        }
    }
    end () {
        this.socket.end();
    }
    init (config, errorPlugin) {
        DEFAULT_CONFIG = utils.extend({}, DEFAULT_CONFIG, config);
        var type = DEFAULT_CONFIG.type;
        this.type = (type === "primus" || type === "socket" || type === "ajax") ? type : null;

        switch(this.type){
            case "socket":
                this.socket = new IOSocket(DEFAULT_CONFIG, this.dispatch.bind(this));
                break;
            case "primus":
                this.socket = new IOPrimus(DEFAULT_CONFIG, this.dispatch.bind(this));
                break;
            case "ajax":
                break;
            default:
                console.error("需要指定IO的类型为socket|primus");
        }

        if(typeof errorPlugin != "undefined"){
            this.errorPlugin = new errorPlugin;
        }
    }
}