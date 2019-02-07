　class Main extends egret.DisplayObjectContainer {

        static stageLevel : number ;//ステージレベルの設定
        static stageWidth : number;
        static stageHeight : number;

        //timer
        private timer : egret.Timer;
        private generatePlate : GeneratePlate[] = [];
        static plateNumber : number = 0;
        static glassGenerateSpeed : number = 1000;

        static gameOverFlag : boolean = false;


        
        public constructor() {
        super();
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        Main.stageLevel = Stage.TITLE;
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
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
    private createGameScene(): void {
        Main.stageWidth = this.stage.stageWidth;
        Main.stageHeight = this.stage.stageHeight;
        
        Main.stageLevel = Stage.TITLE;
        const createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.stage.addChild(createGameStage);

        //一個目のガラスPlateの生成　これがないとfixedUpdateのmoveGlassPlateが0個目のplateがなくてエラーになる
        this.generatePlate[0] = new GeneratePlate();
        this.stage.addChild(this.generatePlate[0]);
        

        this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
        this.timer.start();

        //繰り返しメソッド
        this.addEventListener(egret.Event.ENTER_FRAME,this.update,this);
        egret.startTick(this.fixedUpdate, this);

        
    }


    /**
     * 繰り返し
     */
    private update(){

    }

    /**
     * 固定フレームの繰り返し
     */
    private fixedUpdate() : boolean{
        switch(Main.stageLevel){

            case Stage.TITLE:

            break;

            case Stage.GAME_OVER:
            
                if(Main.gameOverFlag == true){
                    
                    for(let i = 0; i <= Main.plateNumber; i++){
                        this.stage.removeChild(this.generatePlate[i]);
                    }
                    this.generatePlate[0] = new GeneratePlate();
                    this.stage.addChild(this.generatePlate[0]);
                    const gameOver : GameOver = new GameOver();
                    gameOver.GameOverDisplay();
                    this.stage.addChild(gameOver);
                    Main.gameOverFlag = false;
                }
            break;

            default:
                for(let i = 0; i <= Main.plateNumber; i++){
                    this.generatePlate[i].moveGlassPlate();
                }
            break;
        }
        return false;
    }

    private generatePlateTimer(){
        switch(Main.stageLevel){

            case Stage.TITLE:

            break;

            case Stage.GAME_OVER:

            break;

            default:

                Main.plateNumber +=1;
                this.generatePlate[Main.plateNumber] = new GeneratePlate();
                this.generatePlate[Main.plateNumber].generateGlassPlate();
                this.stage.addChild(this.generatePlate[Main.plateNumber]);
                this.changeStageLevel();

                //タイムアップでゲームオーバー
                if(TimeText.leftTime <= 0 ){
                    TimeText.leftTime = 0;
                    Main.stageLevel = Stage.GAME_OVER;
                    const gameOver : GameOver = new GameOver();
                    gameOver.GameOverDisplay();
                    this.stage.addChild(gameOver);
                    
                }
                
            break;
        }

    }

    /**
     * ステージレベルの変更
     * Change stage level
     */
    public changeStageLevel(){
       
        switch(TimeText.leftTime){
            case 60:
                Main.stageLevel = Stage.STAGE1
                Main.glassGenerateSpeed = 500;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 1;


            break;
            case 55:
                Main.stageLevel = Stage.STAGE2
                //ガラスの生成スピードの変更
                Main.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 2;

            break;
            case 50:
                Main.stageLevel = Stage.STAGE3
                Main.glassGenerateSpeed = 300;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 3;
            break;
            case 40:
                Main.stageLevel = Stage.STAGE4
                Main.glassGenerateSpeed = 200;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 5;
            break;
            case 30:
                Main.stageLevel = Stage.STAGE5
                Main.glassGenerateSpeed = 100;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 10;
            break;
            case 20:
                Main.stageLevel = Stage.STAGE5
                Main.glassGenerateSpeed = 100;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 15;
            break;
            case 10:
                Main.stageLevel = Stage.STAGE5
                Main.glassGenerateSpeed = 100;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.generatePlateTimer,this);
                this.timer.start();

                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification =20;
            break;


        }
    }




}

// Main Class はここまで

/**
 * ゲームオブジェクトを呼び出すときのテンプレjsonの読み込み等
 */
class GameObject extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

    }

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    protected async runGame() {
        await this.loadResource()
        this.createGameObject();
    }

    /** 
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    protected async loadResource() {
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
    protected createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public createGameObject(){

    }

}
