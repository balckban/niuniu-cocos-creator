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
        //牌组预制体
        pokercard_prefab:{
            default:null,
            type:cc.Prefab
        },
        pokerlocation:{
            default:null,
            type:cc.Node
        },
        pokerNN_prefab:{
            default:null,
            type:cc.Prefab
        },
        pokerNNlocation:{
            default:null,
            type:cc.Node
        },

    },

    // use this for initialization
    onLoad: function () {
        var cardIndex = 0;
        this.huase_data=[2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4]
        this.m_daxdate= [1,2,3,4,5,6,7,8,9,10,11,12,13,
            1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13,1,2,3,4,5,6,7,8,9,10,11,12,13 ]
        this.m_cbCardData= [1,2,3,4,5,6,7,8,9,10,10,10,10,
            1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10,1,2,3,4,5,6,7,8,9,10,10,10,10 ]
        this.pokerArray = ["0x02","0x03","0x04","0x05","0x06","0x07","0x08","0x09","0x10","0x11"
            ,"0x12","0x13","0x14","0x15","0x16","0x17","0x18","0x19","0x20","0x21","0x22",
            "0x23","0x24","0x25","0x26","0x27","0x28","0x29","0x30","0x31","0x32","0x33","0x34","0x35"
            ,"0x36","0x37","0x38","0x39","0x40","0x41","0x42","0x43","0x44","0x45","0x46","0x47","0x48","0x49"
            ,"0x50","0x51","0x52","0x53"];//手牌数组
        this.pokercard=[];//节点数组
        this.pokernn=[];
        this.nScore=1;
        this.pokerCarray=[];//随机取五张数组
        this.pokerdata=[];//每张牌对应的值
        this.huasedata=[];
        this.daxiaoMe=[];
        this.numdate=[];
        var x=this.pokerlocation.x;
        var y=this.pokerlocation.y;
        var x_int=x;
        
      
          for(var i=0;i<5;i++){
             var num =Math.floor(Math.random()*this.pokerArray.length);
             this.numdate.push(num);
             this.pokerCarray.push(this.pokerArray[num]);
             this.pokerdata.push(this.m_cbCardData[num]);
             this.huasedata.push(this.huase_data[num]);
             this.daxiaoMe.push(this.m_daxdate[num])
             this.pokerArray.splice(num,1);
             this.huase_data.splice(num,1);
             this.m_cbCardData.splice(num,1);
             this.m_daxdate.splice(num,1);
          }
        
            
           //对手牌数组进行发牌
           for (var j = 0; j < this.pokerCarray.length; j++)
           {
              if(this.pokerCarray[j] == 0x00)
               {
                   continue;
               }
               cardIndex++;
   
               x=x_int+100*j
               this.on_send_poker(j,this.pokerCarray[j],cardIndex,x,y);//发送单张扑克
           }

    },
    
    //获取牌组中最大花色
    getHuase:function(){
        for(var i=0;i<5;i++){
            for(var j=0;j<4-i;j++){
                if(this.daxiaoMe[j]>this.daxiaoMe[j+1]){
                    var huase=this.huasedata[j]
                    this.huasedata[j]=this.huasedata[j+1];
                    this.huasedata[j+1]=huase;
                    var temp=this.daxiaoMe[j];
                    this.daxiaoMe[j]=this.daxiaoMe[j+1];
                    this.daxiaoMe[j+1]=temp;
                }else if(this.daxiaoMe[j]===this.daxiaoMe[j+1]){
                    if(this.huasedata[j]>this.huasedata[j+1]){
                        var huase=this.huasedata[j]
                        this.huasedata[j]=this.huasedata[j+1];
                        this.huasedata[j+1]=huase;
                        var temp=this.daxiaoMe[j];
                        this.daxiaoMe[j]=this.daxiaoMe[j+1];
                        this.daxiaoMe[j+1]=temp;
                    }
                }
            }   
        }
        cc.log("xxxxxxx>>>>"+this.daxiaoMe+"xxxxxxx>>>>>"+this.huasedata)
        return {
            daxiao:this.daxiaoMe[4],
            huase:this.huasedata[4]
        }
       
    },


    //获取牛牛大小
    getNiuScore:function(){
       return this.nScore;
    },

    //比牌
    compare_card:function(){
        var niu_x=this.pokerNNlocation.x;
        var niu_y=this.pokerNNlocation.y;
        this.nScore=this.calculateNN();
        this.pokernn[0] = cc.instantiate(this.pokerNN_prefab);
        this.node.addChild(this.pokernn[0]);
        if( this.nScore!=-1&& this.nScore!=null){
          var niupoker = this.pokernn[0].getComponent('Niupoker');//得到提示脚本
          niupoker.setnnDataView( this.nScore);//初始化
          var pos = cc.v2(niu_x,niu_y);//设置初始化坐标
          this.pokernn[0].setPosition(pos);
    }
     
},

    //计算是否有牛
    calculateNN:function(){
        var finalValue = 0;
        for(var i=0;i<5;i++){
            finalValue=finalValue+this.pokerdata[i]
        }
     if(finalValue>=55){
        for(var i=0;i<5;i++){
            if(pokerdata[i]>10){
                if(i==4){
                    // setNiuNiuPosition(niufiveup);
                    return 12;
                }
            }else{
                break;
            }     
        } 
    }else if(finalValue<=10){  //当5张牌相加小于10时，判断为五小牛
        for(var i=0;i<5;i++){
            if(pokerdata[i]>4){
                break;
            }else{
                if(i==4){   
                    // setNiuNiuPosition(niufivedown);
                    return 11;        
                }
            }
        }
    }  
    //计算是否有牛
    for(var i=0;i<5;i++){
        for(var j=i+1;j<5;j++){
            for(var k=j+1;k<5;k++){
                if (i!=k&&i!=j&&j!=k){  /*确保i、j、k三位互不相同*/
                    console.log(this.pokerdata[i],this.pokerdata[j],this.pokerdata[k])
                    this.pokerdata[i]=this.pokerdata[i]>10?10:this.pokerdata[i];
                    this.pokerdata[j]=this.pokerdata[j]>10?10:this.pokerdata[j];
                    this.pokerdata[k]=this.pokerdata[k]>10?10:this.pokerdata[k];
                    if((this.pokerdata[i]+this.pokerdata[j]+this.pokerdata[k])%10==0){
                        console.log('有牛')
                        //计算另外两张牌的点数大小
                        finalValue = finalValue-(this.pokerdata[i]+this.pokerdata[j]+this.pokerdata[k]);
                        if(finalValue===10){
                            return 10;
                        }
                        return finalValue%10;
                    }
                } 
            }
        }
        if(i==4){   //循环走完没有发现牛，所以确定没有牛
            console.log('没牛')
            // setNiuNiuPosition(niuno);
            return 13;
        }
    }
    },

    //创建单个扑克牌
    on_send_poker:function(id,data,times,x,y){
        this.pokercard[id] = cc.instantiate(this.pokercard_prefab);
        this.node.addChild(this.pokercard[id]);
        this.pokercard[id].setScale(1.0);

        var poker = this.pokercard[id].getComponent('poker');//得到提示脚本
        poker.setCardDataView(0x00);//0x00
        var pos = cc.v2(0,0);//设置初始化坐标
        this.pokercard[id].setPosition(pos);
        
        //发牌移动到具体的位置
        var actionMoveTo = cc.moveTo(0.5,cc.p(x,y));
        //放大
        var actionScaleTo = cc.scaleTo(0.5, 1);
        //延时
        var delay = cc.delayTime(times * 0.1);

        var actionBy = cc.rotateBy(0.1, 180);
        var rep = cc.repeat(actionBy, 2);
        var action = cc.spawn(actionMoveTo, actionScaleTo,rep);


        // //缩小 换牌 放大
        var poker = this.pokercard[id].getComponent('poker');//得到提示脚本
        var scaleX1 = cc.scaleTo(0.2,0, 1);
        var func =cc.callFunc(function(target, data) {
            //target   默认是调用这个action的本体Node，Sprite等等
            //data  传递的参数，多个参数可以用[data1, data2] 的Array方式组合
                data[0].setCardDataView(data[1]);
            },
             this, //通常绑定最外围的HelloWorldLayer 之类的， 可以方便调用， 比如为了removeChild
             [poker,data] //参数，任意格式
        );
        var scaleX2 = cc.scaleTo(0.2,0.9,0.9);
        var seq = cc.sequence(delay,action,scaleX1,func,scaleX2);
        this.pokercard[id].runAction(seq);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
