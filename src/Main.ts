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
    private stageLevel : number = StageLevel.STAGE1;

    /**
     * ゲームシーンの作成
     */
    protected createGameScene(): void {

        //Instance of background
        const createGameStage = new CreateGameStage(this.stageLevel);
        this.stage.addChild(createGameStage);

        //Instance of glassPlate
        const generateGameStage = new GeneratePlate();
        this.stage.addChild(generateGameStage);

        //Instance of Time
        const timeDisplay = new TimeDisplay();
        this.stage.addChild(timeDisplay);
    }
}

enum StageLevel{
    STAGE1,
}