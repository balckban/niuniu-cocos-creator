
// Compatible with v1.5.0+
if (!cc.loader.loadResAll) {
    cc.loader.loadResAll = cc.loader.loadResDir;
}

function urlParse(){
    var params = {};
    if(window.location == null){
        return params;
    }
    var name,value; 
    var str=window.location.href; //取得整个地址栏
    var num=str.indexOf("?") 
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            params[name]=value;
        } 
    }
    return params;
}
function initMgr(){
    cc.vv = {};
    var Utils = require("Utils");
    cc.vv.utils = new Utils();
    
    var AudioMgr = require("AudioMgr");
    cc.vv.audioMgr = new AudioMgr();
    cc.vv.audioMgr.init();

    cc.args = urlParse();
}
    
var waiting=require("WaitingConnect")
cc.Class({
    extends: cc.Component,

    properties: {

        splash:cc.Sprite,
        loginBt:cc.Sprite,
        loginqBt:cc.Sprite,
        waitingconnect:{
            default:null,
            type:waiting
        },
    },

    // use this for initialization
    onLoad: function () {
        initMgr();
        var self =this;
        this.showSplash(function(){
            cc.vv.audioMgr.playBGM("bg.mp3");
        });
        this.loginBt.node.on('touchstart',function(){
            cc.vv.audioMgr.playSFX("button.mp3");
            self.waitingconnect.show("正在登入游戏..");
            setTimeout(()=> {
                self.waitingconnect.hide();
                cc.director.loadScene('hall');
            },1500);
        
        })
        this.loginqBt.node.on('touchstart',function(){
            cc.vv.audioMgr.playSFX("button.mp3");
            self.waitingconnect.show("正在登入游戏..");
            setTimeout(()=> {
                self.waitingconnect.hide();
                cc.director.loadScene('hall');
            },1500);
           
        })
    },
    
    //显示标志
    showSplash:function(callback){
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 500;
        this._splash = cc.find("Canvas/splash");
        if(true || cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
            this._splash.active = true;
            if(this._splash.getComponent(cc.Sprite).spriteFrame == null){
                callback();
                return;
            }
            var t = Date.now();
            var fn = function(){
                var dt = Date.now() - t;
                if(dt < SHOW_TIME){
                    setTimeout(fn,33);
                }
                else {
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    if(op < 0){
                        self._splash.opacity = 0;
                        callback();
                    }
                    else{
                        self._splash.opacity = op;
                        setTimeout(fn,33);   
                    }
                }
            };
            setTimeout(fn,33);
        }
        else{
            this._splash.active = false;
            callback();
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
