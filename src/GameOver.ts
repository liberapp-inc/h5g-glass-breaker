　class GameOver extends eui.UILayer {
    //  変数
    private retryButtonStyle : egret.DisplayObject;
    private euiGroup : eui.Group ;
    private scoreText : egret.TextField;

    constructor() {
        super();
/*        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());*/
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
        this.runGame().catch(e => {
            console.log(e);
        })
        
    }

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    public async runGame() {
        await this.loadResource()
        this.GameOverDisplay();
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
     * GameOver画面の生成
     */
    private GameOverDisplay(): void {
        const background = this.createBitmapByName("wood_background_png");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.addChild(background);

        //euiグループ
        this.euiGroup = new eui.Group();
        this.euiGroup.width = this.stage.stageWidth;
        this.euiGroup.height = this.stage.stageHeight;
        this.addChild(this.euiGroup);


        //スコアの表示
        this.score();

        //Retryボタン Titleボタン
        const retryButton : eui.Button = new eui.Button();
        retryButton.skinName = "resource/eui_skins/GreenRetryButton.exml";
        retryButton.once(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this.euiGroup.addChild(retryButton);

        const titleButton : eui.Button = new eui.Button();
        titleButton.skinName = "resource/eui_skins/GreenTitleButton.exml";
        titleButton.once(egret.TouchEvent.TOUCH_TAP, this.title, this);
        this.euiGroup.addChild(titleButton);

    }

/*    private loadretryButton(clazz:any,url:string) :void {
        const retryButton : eui.Button = new eui.Button();
        retryButton.skinName =clazz;
        this.addChild(retryButton);
        retryButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
    }
*/
    private retry() : void {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        this.parameterReset();
        
    }

    private title() : void {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        const createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        this.parameterReset();

    }
    
    private score(){
        this.scoreText = new egret.TextField();
        this.scoreText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "スコア" + GeneratePlate.score.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
        this.stage.addChild(this.scoreText);
        this.scoreText.anchorOffsetX = this.scoreText.width/2;
        this.scoreText.anchorOffsetY = this.scoreText.height/2;
        this.scoreText.x = this.stage.stageWidth/2;
        this.scoreText.y = this.stage.stageHeight/2;
        this.scoreText.scaleX = 1;
        this.scoreText.scaleY = 1;
        
    }

    /**
     * スコアやタイム、ガラス破壊枚数やコンボ数等の初期化
     */
    private parameterReset(){
        GeneratePlate.score = 0;
        TimeDisplay.leftTime = 60;
        GeneratePlate.glassBreakNumber = 0;
        GeneratePlate.breakComboNumber = 0;
        GeneratePlate.breakComboBonus  = 1;
        CreateGameStage.glassGenerateSpeed = 1000;

    }
    


}