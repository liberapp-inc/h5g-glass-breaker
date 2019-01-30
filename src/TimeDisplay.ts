　class TimeDisplay extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
    }
    /**
     * ステージ追加時に一度発生する
     * (UILayerクラスの継承元(Groupクラス)のメソッド)
     */
/*    protected createChildren(): void {
        super.createChildren();
        
        this.runGame().catch(e => {
            console.log(e);
        })
    }*/

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    private async runGame() {
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
    private leftTime : number = 60;
    private timeText : egret.TextField;

    /**
     * Timerの生成
     */
    protected timeDisplay(): void {
        this.timeText = new egret.TextField();
        this.timeText.text = this.leftTime.toString();
        this.addChild(this.timeText);

        let timer:egret.Timer = new egret.Timer(1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.decreaseTime,this);
        timer.start();


    }

    /**
     * 残り時間を減らす
     */
    public decreaseTime() : boolean{
        this.leftTime -= 1;
        this.timeText.text = this.leftTime.toString();
        return false;

    }


}