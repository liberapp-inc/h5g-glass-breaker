　class GameOver extends eui.UILayer {
    //  変数
    private retryButtonStyle : egret.DisplayObject;
    private euiGroup : eui.Group ;

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
     * Titleの生成
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


        //Playボタン
        //EXML.load("resource/eui_skins/GreenButtonSkin.exml",this.loadretryButton,this);
        const retryButton : eui.Button = new eui.Button();
        retryButton.skinName = "resource/eui_skins/GreenRetryButton.exml";
        retryButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this.euiGroup.addChild(retryButton);

        const titleButton : eui.Button = new eui.Button();
        titleButton.skinName = "resource/eui_skins/GreenTitleButton.exml";
        titleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.title, this);
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
        console.log("retry");
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        
    }

    private title() : void {
        console.log("title");
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        const createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        
    }
    


}