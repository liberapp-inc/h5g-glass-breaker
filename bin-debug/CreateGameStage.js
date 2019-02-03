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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CreateGameStage = (function (_super) {
    __extends(CreateGameStage, _super);
    function CreateGameStage() {
        var _this = _super.call(this) || this;
        _this.glassGenerateSpeed = 1000;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.runGame, _this);
        return _this;
        /*        this.runGame().catch(e => {
                    console.log(e);
                })*/
    }
    /**
     *  リソース準備後にゲームシーンを作成する
    */
    CreateGameStage.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    CreateGameStage.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    CreateGameStage.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * ゲームシーンの作成
     */
    CreateGameStage.prototype.createGameScene = function () {
        switch (Main.stageLevel) {
            case Stage.TITLE:
                var title = new Title();
                this.addChild(title);
                break;
            case Stage.STAGE1:
                // 背景画像の設定/描画
                var background = this.createBitmapByName("wood_background_png");
                var stageW = this.stage.stageWidth;
                var stageH = this.stage.stageHeight;
                background.width = stageW;
                background.height = stageH;
                this.addChild(background);
                //Instance of Time
                var timeDisplay = new TimeDisplay();
                this.stage.addChild(timeDisplay);
                //ガラスの破壊枚数の表示
                var brokenGlassDisplay = new BrokenGlassDisplay();
                this.stage.addChild(brokenGlassDisplay);
                //スコアの表示
                var scoreDisplay = new ScoreDisplay();
                this.stage.addChild(scoreDisplay);
                //Instance of glassPlate
                this.timer = new egret.Timer(this.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlates, this);
                this.timer.start();
                break;
        }
    };
    /**
     * ガラスの生成
     * Generate Glass Plates
     */
    CreateGameStage.prototype.generatePlates = function () {
        this.changeStageLevel();
        var generatePlate = new GeneratePlate(); //プレートの生成
        this.stage.addChild(generatePlate);
    };
    /**
     * ステージレベルの変更
     * Change stage level
     */
    CreateGameStage.prototype.changeStageLevel = function () {
        switch (TimeDisplay.leftTime) {
            case 60:
                Main.stageLevel = Stage.STAGE1;
                this.glassGenerateSpeed = 600;
                break;
            case 55:
                Main.stageLevel = Stage.STAGE2;
                //ガラスの生成スピードの変更
                this.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlates, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 2;
                break;
            case 50:
                Main.stageLevel = Stage.STAGE3;
                this.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlates, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 3;
                break;
            case 45:
                Main.stageLevel = Stage.STAGE4;
                this.glassGenerateSpeed = 500;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlates, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 4;
                break;
            case 40:
                Main.stageLevel = Stage.STAGE5;
                this.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(this.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlates, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 10;
                break;
        }
    };
    return CreateGameStage;
}(egret.DisplayObjectContainer));
__reflect(CreateGameStage.prototype, "CreateGameStage");
//# sourceMappingURL=CreateGameStage.js.map