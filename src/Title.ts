class Title extends GameObject{

    private euiGroup : eui.Group;

    static bgmPlayFlag :boolean;

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

    private sceneTransition() : void {
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.removeChild(this.euiGroup);
        
        //BGM
        if(Title.bgmPlayFlag == false || Title.bgmPlayFlag == undefined){
            const audio = new LoopGameAudio("resource/bgm/tsukitoiruka.mp3");
            audio.startLoad();
            Title.bgmPlayFlag = true;

        }
    }

}