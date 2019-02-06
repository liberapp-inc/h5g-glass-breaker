class MyText extends GameObject{

    private myText : egret.TextField;
    private myTextContent : string;

    public constructor(myTextContent : string){
        super();
        this.myTextContent = myTextContent;
        this.textDisplay();
    }

    protected textDisplay(): void {
        
        this.myText = new egret.TextField();
        this.myText.scaleX = 0.5;
        this.myText.scaleY = 0.5;
        this.myText.textFlow = <Array<egret.ITextElement>>[ 
            {text: this.myTextContent, 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];    
        this.addChild(this.myText);

    }

    public updateText(myText : string){
        this.myText.scaleX = 0.5;
        this.myText.scaleY = 0.5;
        this.myText.textFlow = <Array<egret.ITextElement>>[ 
            {text: myText, 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];    
        this.addChild(this.myText);   
    }

}

class TimeText extends GameObject{
    static leftTime : number = 60;
    private timeText : MyText;
    private timer : egret.Timer;
    /**
     * Timerの生成
     */
    public timeDisplay(): void {
        this.timeText = new MyText("残り時間" + TimeDisplay.leftTime.toString());
/*        this.timeText.scaleX = 0.5;
        this.timeText.scaleY = 0.5;
        this.timeText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "残り時間" + TimeDisplay.leftTime.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];    */
        this.addChild(this.timeText);

        this.timer = new egret.Timer(1000,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.decreaseTime,this);
        this.timer.start();

    }

    /**
     * 残り時間を減らす
     */
    public decreaseTime() : boolean{
        if(Main.stageLevel != Stage.GAME_OVER){
            TimeDisplay.leftTime -= 1;
            this.timeText.updateText("残り時間" + TimeDisplay.leftTime.toString());
            //this.timeText.text = "残り時間" + TimeDisplay.leftTime.toString();
            
/*            this.timeText.textFlow = <Array<egret.ITextElement>>[ 
                {text: "残り時間" + TimeDisplay.leftTime.toString(), 
                    style: {
                        "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                    }
                }
            ];    
*/
        }
        else{
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.decreaseTime,this);
        }
        return false;

    }

}

class BrokenGlassText extends GameObject{

    private brokenGlassText : MyText;

    /**
     * ガラス破壊枚数を表示
     */
    public brokenGlassDisplay(){
        this.brokenGlassText = new MyText("破壊枚数" + GeneratePlate.glassBreakNumber.toString());
        this.brokenGlassText.x = 300;
/*        this.brokenGlassText.scaleX = 0.5;
        this.brokenGlassText.scaleY = 0.5;
        this.brokenGlassText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "破壊枚数" + GeneratePlate.glassBreakNumber.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];*/
        this.addChild(this.brokenGlassText);

        this.addEventListener(egret.Event.ENTER_FRAME, this.addBrokenGlassNumber, this);

    }


    private addBrokenGlassNumber() : void{
        if(Main.stageLevel != Stage.GAME_OVER){
            this.brokenGlassText.updateText("破壊枚数" + GeneratePlate.glassBreakNumber.toString());
        }
        else{
            this.removeEventListener(egret.Event.ENTER_FRAME, this.addBrokenGlassNumber, this);

        }

/*        this.brokenGlassText.text =  "破壊枚数" + GeneratePlate.glassBreakNumber.toString();
        this.brokenGlassText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "破壊枚数" + GeneratePlate.glassBreakNumber.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];*/
    }


}

class ScoreText extends GameObject {

    private scoreText : MyText;

    public scoreDisplay(){
        this.scoreText = new MyText("スコア" + GeneratePlate.score.toString());
        this.scoreText.x = 300;
        this.scoreText.y = 100;
/*        this.scoreText.scaleX = 0.5;
        this.scoreText.scaleY = 0.5;
        this.scoreText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "スコア" + GeneratePlate.score.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
*/        this.addChild(this.scoreText);

        this.addEventListener(egret.Event.ENTER_FRAME, this.addScore, this);

    }

    
    private addScore() : void{
        if(Main.stageLevel != Stage.GAME_OVER){
            this.scoreText.updateText("スコア" + GeneratePlate.score.toString());
        }
        else{
            this.removeEventListener(egret.Event.ENTER_FRAME, this.addScore, this);

        }
    }


}