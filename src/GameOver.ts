

class GameOver extends GameObject{

    private retryButtonStyle : egret.DisplayObject;
    private euiGroup : eui.Group ;
    private scoreText : MyText;

        /**
     * GameOver画面の生成
     */
    public GameOverDisplay(): void {
        const background = this.createBitmapByName("wood_background_png");
        let stageW = Main.stageWidth;
        let stageH = Main.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.addChild(background);

        //euiグループ
        this.euiGroup = new eui.Group();
        this.euiGroup.width = Main.stageWidth;
        this.euiGroup.height =Main.stageHeight;
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

    private retry() : void {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        const createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.parameterReset();
        
    }

    private title() : void {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        const createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.stage.addChild(createGameStage);
        this.parameterReset();

    }
    
    private score(){
        this.scoreText = new MyText("スコア" + GeneratePlate.score.toString());
/*        this.scoreText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "スコア" + GeneratePlate.score.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];*/
        this.euiGroup.addChild(this.scoreText);
        this.scoreText.anchorOffsetX = this.scoreText.width/2;
        this.scoreText.anchorOffsetY = this.scoreText.height/2;
        this.scoreText.x = Main.stageWidth/2;
        this.scoreText.y = Main.stageHeight/2;
        this.scoreText.scaleX = 1.5;
        this.scoreText.scaleY = 1.5;
        
    }

    /**
     * スコアやタイム、ガラス破壊枚数やコンボ数等の初期化
     */
    private parameterReset(){
        GeneratePlate.score = 0;
        TimeText.leftTime = 60;
        GeneratePlate.glassBreakNumber = 0;
        GeneratePlate.breakComboNumber = 0;
        GeneratePlate.breakComboBonus  = 1;
        CreateGameStage.glassGenerateSpeed = 1000;

    }


}