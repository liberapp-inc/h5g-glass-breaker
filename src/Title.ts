　class Title extends eui.UILayer {
    //  変数
    private playButtonStyle : egret.DisplayObject;
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
        this.titleDisplay();
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
    private titleDisplay(): void {
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
        const playButton : eui.Button = new eui.Button();
        playButton.skinName = "resource/eui_skins/GreenButtonSkin.exml";
        playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
        this.euiGroup.addChild(playButton);



    }

/*    private loadPlayButton(clazz:any,url:string) :void {
        const playButton : eui.Button = new eui.Button();
        playButton.skinName =clazz;
        this.addChild(playButton);
        playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
    }
*/
    private sceneTransition() : void {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage();
        this.stage.addChild(createGameStage);
        
    }

    


}

/**
 * Titleの生成
 */
class Title2 extends GameObject{

    private euiGroup : eui.Group;

    public titleDisplay(): void {

        //euiグループ
        this.euiGroup = new eui.Group();
/*        this.euiGroup.width = this.stage.stageWidth;
        this.euiGroup.height = this.stage.stageHeight;*/
        this.addChild(this.euiGroup);
       
       //背景
        const background = this.createBitmapByName("wood_background_png");
        let stageW = Main.stageWidth;
        let stageH = Main.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.euiGroup.addChild(background);



        //Playボタン
        const playButton : eui.Button = new eui.Button();
        playButton.skinName = "resource/eui_skins/GreenButtonSkin.exml";
        playButton.once(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
        this.euiGroup.addChild(playButton);



    }

/*    private loadPlayButton(clazz:any,url:string) :void {
        const playButton : eui.Button = new eui.Button();
        playButton.skinName =clazz;
        this.addChild(playButton);
        playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
    }
*/
    private sceneTransition() : void {
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage2(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.removeChild(this.euiGroup);
        //BGM
        const audio = new LoopGameAudio("resource/bgm/tsukitoiruka.mp3");
        audio.startLoad();
    }

}