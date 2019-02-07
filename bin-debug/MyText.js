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
var MyText = (function (_super) {
    __extends(MyText, _super);
    function MyText(myTextContent) {
        var _this = _super.call(this) || this;
        _this.myTextContent = myTextContent;
        _this.textDisplay();
        return _this;
    }
    MyText.prototype.textDisplay = function () {
        this.myText = new egret.TextField();
        this.myText.scaleX = 0.5;
        this.myText.scaleY = 0.5;
        this.myText.textFlow = [
            { text: this.myTextContent,
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
        this.addChild(this.myText);
    };
    MyText.prototype.updateText = function (myText) {
        this.myText.scaleX = 0.5;
        this.myText.scaleY = 0.5;
        this.myText.textFlow = [
            { text: myText,
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
        this.addChild(this.myText);
    };
    return MyText;
}(GameObject));
__reflect(MyText.prototype, "MyText");
var TimeText = (function (_super) {
    __extends(TimeText, _super);
    function TimeText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Timerの生成
     */
    TimeText.prototype.timeDisplay = function () {
        this.timeText = new MyText("残り時間" + TimeText.leftTime.toString());
        this.addChild(this.timeText);
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.decreaseTime, this);
        this.timer.start();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    /**
     * 残り時間を減らす
     */
    TimeText.prototype.decreaseTime = function () {
        if (Main.stageLevel != Stage.GAME_OVER) {
            TimeText.leftTime -= 1;
            this.timeText.updateText("残り時間" + TimeText.leftTime.toString());
        }
        else {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.decreaseTime, this);
        }
        return false;
    };
    TimeText.prototype.update = function () {
        if (Main.stageLevel == Stage.GAME_OVER) {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.decreaseTime, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            TimeText.leftTime = 60;
        }
    };
    TimeText.leftTime = 60;
    return TimeText;
}(GameObject));
__reflect(TimeText.prototype, "TimeText");
var BrokenGlassText = (function (_super) {
    __extends(BrokenGlassText, _super);
    function BrokenGlassText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ガラス破壊枚数を表示
     */
    BrokenGlassText.prototype.brokenGlassDisplay = function () {
        this.brokenGlassText = new MyText("破壊枚数" + GeneratePlate.glassBreakNumber.toString());
        this.brokenGlassText.x = 300;
        this.addChild(this.brokenGlassText);
        this.addEventListener(egret.Event.ENTER_FRAME, this.addBrokenGlassNumber, this);
    };
    BrokenGlassText.prototype.addBrokenGlassNumber = function () {
        if (Main.stageLevel != Stage.GAME_OVER) {
            this.brokenGlassText.updateText("破壊枚数" + GeneratePlate.glassBreakNumber.toString());
        }
        else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.addBrokenGlassNumber, this);
        }
    };
    return BrokenGlassText;
}(GameObject));
__reflect(BrokenGlassText.prototype, "BrokenGlassText");
var ScoreText = (function (_super) {
    __extends(ScoreText, _super);
    function ScoreText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScoreText.prototype.scoreDisplay = function () {
        this.scoreText = new MyText("スコア" + GeneratePlate.score.toString());
        this.scoreText.x = 300;
        this.scoreText.y = 100;
        this.addChild(this.scoreText);
        this.addEventListener(egret.Event.ENTER_FRAME, this.addScore, this);
    };
    ScoreText.prototype.addScore = function () {
        if (Main.stageLevel != Stage.GAME_OVER) {
            this.scoreText.updateText("スコア" + GeneratePlate.score.toString());
        }
        else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.addScore, this);
        }
    };
    return ScoreText;
}(GameObject));
__reflect(ScoreText.prototype, "ScoreText");
//# sourceMappingURL=MyText.js.map