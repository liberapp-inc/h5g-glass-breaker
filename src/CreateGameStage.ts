/*　class CreateGameStage extends egret.DisplayObjectContainer {








}*/

enum Stage{
    TITLE,
    STAGE1,
    STAGE2,
    STAGE3,
    STAGE4,
    STAGE5,
    GAME_OVER
}


class CreateGameStage extends GameObject{

    //private stageLevel : number;
    private generatePlate : GeneratePlate;

    //private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント
    static glassGenerateSpeed : number = 1000;
    private timer : egret.Timer;

    //private audio : LoopGameAudio;


    public constructor(stageLevel : number) {
        super();
        //this.stageLevel = stageLevel;
    }

    public createGameScene(): void {      

        switch(Main.stageLevel){

            case Stage.TITLE:
            let title : Title = new Title();
            title.titleDisplay();
            this.addChild(title);
            
            break;

            case Stage.STAGE1:

                // 背景画像の設定/描画
                let background = this.createBitmapByName("wood_background_png");
                let stageW = Main.stageWidth;
                let stageH = Main.stageHeight;
                background.width = stageW;
                background.height = stageH;
                this.addChild(background);

                //残り時間の表示
                const leftTime = new TimeText();
                leftTime.timeDisplay();
                this.addChild(leftTime);

                //ガラスの破壊枚数の表示
                const brokenGlassText = new BrokenGlassText();
                brokenGlassText.brokenGlassDisplay();
                this.addChild(brokenGlassText);

                //スコアの表示
                const scoreText = new ScoreText();
                scoreText.scoreDisplay();
                this.addChild(scoreText);


            break;

            case Stage.GAME_OVER:

            break;
        }
    }



}