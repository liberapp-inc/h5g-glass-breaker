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
var Title = (function (_super) {
    __extends(Title, _super);
    function Title() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Title.prototype.titleDisplay = function () {
        //euiグループ
        this.euiGroup = new eui.Group();
        /*        this.euiGroup.width = this.stage.stageWidth;
                this.euiGroup.height = this.stage.stageHeight;*/
        this.addChild(this.euiGroup);
        //背景
        var background = this.createBitmapByName("wood_background_png");
        var stageW = Main.stageWidth;
        var stageH = Main.stageHeight;
        background.width = stageW;
        background.height = stageH;
        this.euiGroup.addChild(background);
        //Playボタン
        var playButton = new eui.Button();
        playButton.skinName = "resource/eui_skins/GreenButtonSkin.exml";
        playButton.once(egret.TouchEvent.TOUCH_TAP, this.sceneTransition, this);
        this.euiGroup.addChild(playButton);
    };
    Title.prototype.sceneTransition = function () {
        Main.stageLevel = Stage.STAGE1;
        var createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.addChild(createGameStage);
        this.removeChild(this.euiGroup);
        //BGM
        if (Title.bgmPlayFlag == false || Title.bgmPlayFlag == undefined) {
            var audio = new LoopGameAudio("resource/bgm/tsukitoiruka.mp3");
            audio.startLoad();
            Title.bgmPlayFlag = true;
        }
    };
    return Title;
}(GameObject));
__reflect(Title.prototype, "Title");
//# sourceMappingURL=Title.js.map