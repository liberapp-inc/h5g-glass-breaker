var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
 * GameOver画面の生成
 */
    GameOver.prototype.GameOverDisplay = function () {
        var background = this.createBitmapByName("wood_background_png");
        var stageW = Main.stageWidth;
        var stageH = Main.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.addChild(background);
        //euiグループ
        this.euiGroup = new eui.Group();
        this.euiGroup.width = Main.stageWidth;
        this.euiGroup.height = Main.stageHeight;
        this.addChild(this.euiGroup);
        //スコアの表示
        this.score();
        //Retryボタン Titleボタン
        var retryButton = new eui.Button();
        retryButton.skinName = "resource/eui_skins/GreenRetryButton.exml";
        retryButton.once(egret.TouchEvent.TOUCH_TAP, this.retry, this);
        this.euiGroup.addChild(retryButton);
        var titleButton = new eui.Button();
        titleButton.skinName = "resource/eui_skins/GreenTitleButton.exml";
        titleButton.once(egret.TouchEvent.TOUCH_TAP, this.title, this);
        this.euiGroup.addChild(titleButton);
    };
    GameOver.prototype.retry = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.STAGE1;
        var createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver.prototype.title = function () {
        this.removeChild(this.euiGroup);
        Main.stageLevel = Stage.TITLE;
        var createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.parameterReset();
    };
    GameOver.prototype.score = function () {
        this.scoreText = new MyText("スコア" + GeneratePlate.score.toString());
        /*        this.scoreText.textFlow = <Array<egret.ITextElement>>[
                    {text: "スコア" + GeneratePlate.score.toString(),
                        style: {
                            "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                        }
                    }
                ];*/
        this.euiGroup.addChild(this.scoreText);
        this.scoreText.anchorOffsetX = this.scoreText.width / 2;
        this.scoreText.anchorOffsetY = this.scoreText.height / 2;
        this.scoreText.x = Main.stageWidth / 2;
        this.scoreText.y = Main.stageHeight / 2;
        this.scoreText.scaleX = 1.5;
        this.scoreText.scaleY = 1.5;
    };
    /**
     * スコアやタイム、ガラス破壊枚数やコンボ数等の初期化
     */
    GameOver.prototype.parameterReset = function () {
        GeneratePlate.score = 0;
        TimeText.leftTime = 60;
        GeneratePlate.glassBreakNumber = 0;
        GeneratePlate.breakComboNumber = 0;
        GeneratePlate.breakComboBonus = 1;
        Main.plateNumber = 0;
        CreateGameStage.glassGenerateSpeed = 500;
        GeneratePlate.glassPlateMoveSpeedMagnification = 1;
        Main.gameOverFlag = false;
    };
    return GameOver;
}(GameObject));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map