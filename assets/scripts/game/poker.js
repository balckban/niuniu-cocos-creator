cc.Class({
    extends: cc.Component,

    properties: {

        //牌数组
        spriteCard:{
            default:[],
            type:cc.SpriteFrame,
        },



    },

    // use this for initialization
    onLoad: function () {
     //定义sprite
     this.sprite=this.node.getComponent(cc.Sprite)
     this.cardid=0
     this.m_cbCardListData = new Array();
     this.m_cbCardListData=[
        0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x10,0x11
        ,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x20,0x21,0x22,
        0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x30,0x31,0x32,0x33,0x34,0x35
        ,0x36,0x37,0x38,0x39,0x40,0x41,0x42,0x43,0x44,0x45,0x46,0x47,0x48,0x49
        ,0x50,0x51,0x52,0x53
       ];

    },
    
      
    setCardDataView:function(data){
        cc.log(">>>>>>>this><<<<"+data);
      for(var i=0;i<this.m_cbCardListData.length;i++){
          if(this.m_cbCardListData[i]==data){
              this.cardid = i;
          }
      }
      this.sprite.spriteFrame = this.spriteCard[this.cardid];
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
