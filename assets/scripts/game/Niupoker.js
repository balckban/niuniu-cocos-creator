cc.Class({
    extends: cc.Component,

    properties: {
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
          //牛牛展示数组
          spriteNn:{
            default:[],
            type:cc.SpriteFrame,
        },




    },

    // use this for initialization
    onLoad: function () {
         //定义sprite
         this.spriten=this.node.getComponent(cc.Sprite);
         this.niudate=0;
         this.m_nnListData = new Array();
         this.m_nnListData=[ 1,2,3,4,5,6,7,8,9,10,11,12,13]

    },
    setnnDataView:function(data){
        cc.log(">>>>>>>this><<<<"+data);
      for(var i=0;i<this.m_nnListData.length;i++){
          if(this.m_nnListData[i]==data){
              this.niudate = i;
          }
      }
      this.spriten.spriteFrame = this.spriteNn[this.niudate];
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
