　class Main extends egret.DisplayObjectContainer {

        public constructor() {
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
        this.createGameScene();
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
     * 変数まとめ
     */
    private stageLevel : number = StageLevel.STAGE1;//ステージレベルの設定
    private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント

    /**
     * ゲームシーンの作成
     */
    private createGameScene(): void {

        //Instance of background
        const createGameStage = new CreateGameStage(this.stageLevel);
        this.stage.addChild(createGameStage);

        //Instance of glassPlate
        let glassEvent : egret.Event;

        //Instance of Time
        const timeDisplay = new TimeDisplay();
        this.stage.addChild(timeDisplay);

        let timer:egret.Timer = new egret.Timer(1000,0);
        timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
        timer.start();

        
    }

    /**
     * Generate Glass Plates
     */
    public generatePlates(){
        let generatePlate = new GeneratePlate();//プレートを生み出すクラスの設定
        this.stage.addChild(generatePlate);
    }

}

enum StageLevel{
    STAGE1,
}

