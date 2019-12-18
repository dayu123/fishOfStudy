var token = null;
var DEFAULT_CONFIG = {
    "force new connection" : true
};

class IOSocket {
    constructor(config, callback) {
        this.socket = null;
        this.callback = callback;
        this.isOpened = false;//连接是否已经初始化过

        this.init(config);
    }

    init (config) {
        token = config.token;
        Object.assign(DEFAULT_CONFIG, config);
        
        try{
            this.connect();
        }catch(e){
            console.error(e);
        }
    }
    connect () {
        this.socket = io.connect(DEFAULT_CONFIG.URL, DEFAULT_CONFIG);

        this.socket.on("router", this.onData.bind(this));
        this.socket.on("connect", function(){ this.callback("io.open"); }.bind(this));
        this.socket.on('connect_error', function (data) { this.callback("io.error", data); }.bind(this));
        this.socket.on('reconnecting', function() { this.callback("io.reconnect"); }.bind(this));
        this.socket.on('disconnect', function() { this.callback("io.close"); }.bind(this));
    }
    onData (data) {
        var decodeData = Base64.decode(data);
        var parsedData = JSON.parse(decodeData);

        Sail.DEBUG && console.log("命令：" + parsedData.cmd + "\n<<<=====接收到'IO-Socket'数据, 时间:" + Date.now() + "\n" + decodeData);
        this.callback(parsedData.cmd, parsedData.res || parsedData.rep || parsedData.data, parsedData.code, parsedData.error || parsedData.msg);
    }

    emit (cmd, params) {
        var DATA_TEMPLATE = {
            "cmd" : cmd,
            "params" : {
                "token" : token,
            },
            "status" : {
                "time" : Date.now()
            }
        };
        
        utils.extend(true, DATA_TEMPLATE, {params : params});

        var data = JSON.stringify(DATA_TEMPLATE);

        Sail.DEBUG && console.log("====>>发送命令：" + cmd + ", 时间:" + Date.now() + ", 命令类型：'IO-Socket'\n数据：" + data);
        this.socket.emit("router", Base64.encode(data));
    }
    end () {
        this.socket.close();
        this.socket.removeAllListeners();
    }
}

export default IOSocket;