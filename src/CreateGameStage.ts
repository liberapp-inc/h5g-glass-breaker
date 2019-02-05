　class CreateGameStage extends egret.DisplayObjectContainer {

    //Get stageLevel
/*    private stageLevel : number;
    static stageLevel : number ;//ステージレベルの設定*/
    private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント
    static glassGenerateSpeed : number = 1000;
    private timer : egret.Timer;

    private audio;

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
     * ゲームシーンの作成
     */
    public createGameScene(): void {      

        switch(Main.stageLevel){

            case Stage.TITLE:
            let title : Title = new Title();
            this.stage.addChild(title);
            break;

            case Stage.STAGE1:

                //BGM
                this.audio = new LoopGameAudio("resource/bgm/tsukitoiruka.mp3");

                // 背景画像の設定/描画
                let background = this.createBitmapByName("wood_background_png");
                let stageW = this.stage.stageWidth;
                let stageH = this.stage.stageHeight;
                background.width = stageW;
                background.height = stageH;
                this.stage.addChild(background);

                //Instance of Time
                const timeDisplay = new TimeDisplay();
                this.stage.addChild(timeDisplay);

                //ガラスの破壊枚数の表示
                const brokenGlassDisplay = new BrokenGlassDisplay();
                this.stage.addChild(brokenGlassDisplay);

                //スコアの表示
                const scoreDisplay = new ScoreDisplay();
                this.stage.addChild(scoreDisplay);

                //Instance of glassPlate
                this.timer = new egret.Timer(CreateGameStage.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

            break;

            case Stage.GAME_OVER:

            break;
        }
    }

    /**
     * ガラスの生成
     * Generate Glass Plates
     */
    public generatePlates(){
        
        if(Main.stageLevel != Stage.TITLE && Main.stageLevel != Stage.GAME_OVER){

            this.changeStageLevel();
            let generatePlate = new GeneratePlate();//プレートの生成
            this.stage.addChild(generatePlate);
        }
    }

    /**
     * ステージレベルの変更
     * Change stage level
     */
    public changeStageLevel(){
       
        switch(TimeDisplay.leftTime){
            case 60:
                Main.stageLevel = Stage.STAGE1
                CreateGameStage.glassGenerateSpeed = 600;
            break;
            case 55:
                Main.stageLevel = Stage.STAGE2
                //ガラスの生成スピードの変更
                CreateGameStage.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(CreateGameStage.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 2;

            break;
            case 50:
                Main.stageLevel = Stage.STAGE3
                CreateGameStage.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(CreateGameStage.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 3;
            break;
            case 45:
                Main.stageLevel = Stage.STAGE4
                CreateGameStage.glassGenerateSpeed = 500;
                this.timer.stop();
                this.timer = new egret.Timer(CreateGameStage.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 4;
            break;
            case 40:
                Main.stageLevel = Stage.STAGE5
                CreateGameStage.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(CreateGameStage.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlates,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 10;
            break;
        }
    }




}

enum Stage{
    TITLE,
    STAGE1,
    STAGE2,
    STAGE3,
    STAGE4,
    STAGE5,
    GAME_OVER
}
