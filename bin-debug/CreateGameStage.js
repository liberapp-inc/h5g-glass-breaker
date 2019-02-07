/*　class CreateGameStage extends egret.DisplayObjectContainer {








}*/
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
var Stage;
(function (Stage) {
    Stage[Stage["TITLE"] = 0] = "TITLE";
    Stage[Stage["STAGE1"] = 1] = "STAGE1";
    Stage[Stage["STAGE2"] = 2] = "STAGE2";
    Stage[Stage["STAGE3"] = 3] = "STAGE3";
    Stage[Stage["STAGE4"] = 4] = "STAGE4";
    Stage[Stage["STAGE5"] = 5] = "STAGE5";
    Stage[Stage["GAME_OVER"] = 6] = "GAME_OVER";
})(Stage || (Stage = {}));
var CreateGameStage = (function (_super) {
    __extends(CreateGameStage, _super);
    //private audio : LoopGameAudio;
    function CreateGameStage(stageLevel) {
        return _super.call(this) || this;
        //this.stageLevel = stageLevel;
    }
    CreateGameStage.prototype.createGameScene = function () {
        switch (Main.stageLevel) {
            case Stage.TITLE:
                var title = new Title();
                title.titleDisplay();
                this.addChild(title);
                break;
            case Stage.STAGE1:
                // 背景画像の設定/描画
                var background = this.createBitmapByName("wood_background_png");
                var stageW = Main.stageWidth;
                var stageH = Main.stageHeight;
                background.width = stageW;
                background.height = stageH;
                this.addChild(background);
                //残り時間の表示
                var leftTime = new TimeText();
                leftTime.timeDisplay();
                this.addChild(leftTime);
                //ガラスの破壊枚数の表示
                var brokenGlassText = new BrokenGlassText();
                brokenGlassText.brokenGlassDisplay();
                this.addChild(brokenGlassText);
                //スコアの表示
                var scoreText = new ScoreText();
                scoreText.scoreDisplay();
                this.addChild(scoreText);
                break;
            case Stage.GAME_OVER:
                break;
        }
    };
    //private touchGlassEvent : egret.Event;//ガラスをタッチした時のイベント
    CreateGameStage.glassGenerateSpeed = 1000;
    return CreateGameStage;
}(GameObject));
__reflect(CreateGameStage.prototype, "CreateGameStage");
//# sourceMappingURL=CreateGameStage.js.map