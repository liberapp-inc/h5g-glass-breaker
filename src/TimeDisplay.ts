　class TimeDisplay extends eui.UILayer {
    constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
/*        this.runGame().catch(e => {
            console.log(e);
        })*/
        
    }

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    public async runGame() {
        await this.loadResource()
        this.timeDisplay();
    }

    /** 
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 変数
     */
    static leftTime : number = 60;
    private timeText : egret.TextField;
    
    /**
     * Timerの生成
     */
    private timeDisplay(): void {
        this.timeText = new egret.TextField();
        this.timeText.scaleX = 0.5;
        this.timeText.scaleY = 0.5;
        this.timeText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "残り時間" + TimeDisplay.leftTime.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];    
        this.addChild(this.timeText);

        let timer:egret.Timer = new egret.Timer(1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.decreaseTime,this);
        timer.start();

    }

    /**
     * 残り時間を減らす
     */
    public decreaseTime() : boolean{
        TimeDisplay.leftTime -= 1;
        //this.timeText.text = "残り時間" + TimeDisplay.leftTime.toString();
        this.timeText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "残り時間" + TimeDisplay.leftTime.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];    
        return false;

    }



    /**
     * Get Set
     */
/*    get getLeftTime() : number{
        return this.leftTime;
    }
    set setLeftTime(value : number){
        this.leftTime = value;
    }*/

    


}