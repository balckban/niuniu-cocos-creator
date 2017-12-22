

cc.Class({
    extends: cc.Component,

    properties: {


        creatRoom:cc.Sprite,
        joinRoom:cc.Sprite,
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        settingsWin:cc.Node,
        helpWin:cc.Node,
        xiaoxiWin:cc.Node,
        lblNotice:cc.Label,

    },

    // use this for initialization
    onLoad: function () {
        var self =this;
        this.initButtonHandler("Canvas/right_btn/bt_setting");
        this.initButtonHandler("Canvas/right_btn/bt_help");
        this.initButtonHandler("Canvas/right_btn/bt_message");
        this.helpWin.addComponent("OnBack");
        this.xiaoxiWin.addComponent("OnBack");
     
      this.creatRoom.node.on('mousedown',function(){
        cc.vv.audioMgr.playSFX("button.mp3");
        cc.director.loadScene('playnn');
    })
    this.joinRoom.node.on('mousedown',function(){
        cc.vv.audioMgr.playSFX("button.mp3");
        cc.director.loadScene('playnn');
    })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    onBtnClicked:function(event){
        if(event.target.name === "bt_setting"){
            cc.vv.audioMgr.playSFX("button.mp3");
            this.settingsWin.active = true;
    
        }   
        else if(event.target.name === "bt_help"){
            cc.vv.audioMgr.playSFX("button.mp3");
            this.helpWin.active = true;
        }
        else if(event.target.name === "bt_message"){
            cc.vv.audioMgr.playSFX("button.mp3");
            this.xiaoxiWin.active = true;
        }
        
    },
    


    //获取按钮
    initButtonHandler:function(btnPath){
        var btn = cc.find(btnPath);
        cc.vv.utils.addClickEvent(btn,this.node,"Hall","onBtnClicked"); 
    },

    //update生命周期
    update: function (dt) {
        var x = this.lblNotice.node.x;
        x -= dt*100;
        if(x + this.lblNotice.node.width < -1000){
            x = 500;
        }
        this.lblNotice.node.x = x;
    
    },

});
