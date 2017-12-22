
var playermy = require("playerme");
var player = require("player");


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
       //自己
        playerme:{
            default:null,
            type:playermy
        },

       //玩家1
       player1:{
       default:null,
       type:player
        },

        //玩家2
        player2:{
        default:null,
        type:player
             },
      //玩家3
       player3:{
       default:null,
       type:player
       },
        //玩家4
        player4:{
        default:null,
        type:player
       },

        prepare:{
            default:null,
            type:cc.Node
        },
        game:{
            default:null,
            type:cc.Node
        },
        sendcard:{
            default:null,
            type:cc.Sprite
        },
       
        comparecard:{
            default:null,
            type:cc.Sprite
        },
        backbutton:{
            default:null,
            type:cc.Sprite
        },
        notice:{
            default:null,
            type:cc.Node
        },
        lable:{
            default:null,
            type:cc.Label
        },
        sure:{
            default:null,
            type:cc.Button
        },
    },

    // use this for initialization
    onLoad: function () {
      var self=this;
      this.allScore=[];
      this.mapMe={};
      this.map1={};
      this.map2={};
      this.map3={};
      this.map4={};
      

      this.sure.node.on('touchstart',function(){
        cc.vv.audioMgr.playSFX("button.mp3");
        cc.director.loadScene('playnn');        
    });


      //看牌
      this.sendcard.node.on('touchstart',function(){
         cc.vv.audioMgr.playSFX("SendCard.mp3");
         self.prepare.active=false;
         self.game.active=true;
         self.sendcard.node.active=false;
         setTimeout(()=> {
            self.comparecard.node.active=true; 
        },1000);
    });
      //比牌
      this.comparecard.node.on("touchstart",function(){
        cc.vv.audioMgr.playSFX("chips_place.mp3");
        self.playerme.compare_card();
        self.mapMe=self.playerme.getHuase();
        self.mapMe.score=self.playerme.getNiuScore();
        self.mapMe.user=0;
        self.map1=self.player1.compare_card();
        self.map1.score=self.player1.getNiuScore();
        self.map1.user=1;
        self.map2= self.player2.compare_card();
        self.map2.score=self.player2.getNiuScore();
        self.map2.user=2;
        self.map3=self.player3.compare_card();
        self.map3.score=self.player3.getNiuScore();
        self.map3.user=3;
        self.map4=self.player4.compare_card();
        self.map4.score=self.player4.getNiuScore();
        self.map4.user=4;
        self.comparecard.node.active=false;
        var winuser=self.ScoreCompare();
        setTimeout(()=> {
            self.notice.active=true;
            cc.vv.audioMgr.playSFX("win.mp3");
            if(winuser===0){
                self.lable.string="玩家YB9527赢"
            }else if(winuser===1){
                self.lable.string="玩家云暴RT1赢"
            }else if(winuser===2){
                self.lable.string="玩家云暴RT2赢"
            }else if(winuser===3){
                self.lable.string="玩家云暴RT3赢"
            }else if(winuser===4){
                self.lable.string="玩家云暴RT4赢"
            }
        },1500);
      })


     //返回按钮
      this.backbutton.node.on("touchstart",function(){
         cc.vv.audioMgr.playSFX("button.mp3");
         cc.director.loadScene('hall');
      })
    },

     //数值比大小
     ScoreCompare:function(){
       var array=[this.mapMe,this.map1,this.map2,this.map3,this.map4]
       if(this.mapMe.score===13){
        this.mapMe.score=0;
       }
       if(this.map1.score===13){
        this.map1.score=0;
       }
       if(this.map2.score===13){
        this.map2.score=0;
       }
       if(this.map3.score===13){
        this.map3.score=0;
       }
       if(this.map4.score===13){
        this.map4.score=0;
       }

       var maxScoreUser=this.mapMe.user;
       var maxScore=this.mapMe.score;
       var maxHuase=this.mapMe.huase;
       var maxdaxiao=this.mapMe.daxiao;
       for(var i=1;i<5;i++){
          if(maxScore<array[i].score){
            maxScoreUser=array[i].user;
            maxScore=array[i].score;
            maxHuase=array[i].huase;
            maxdaxiao=array[i].daxiao;
          }else if(maxScore===array[i].score){
              if(maxdaxiao<array[i].daxiao){
                maxScoreUser=array[i].user;
                maxdaxiao=array[i].daxiao;
                maxHuase=array[i].huase;
              }else if(maxdaxiao===array[i].daxiao){
                    if(maxHuase<array[i].huase){
                        maxScoreUser=array[i].user;
                        maxHuase=array[i].huase;
                    }
              }
          }

       }
        return maxScoreUser;


     },




    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
