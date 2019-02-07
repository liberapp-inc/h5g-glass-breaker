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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.generatePlate = [];
        _this.plateNumber = 0;
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        Main.stageLevel = Stage.TITLE;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.runGame, _this);
        return _this;
    }
    /**
     *  リソース準備後にゲームシーンを作成する
    */
    Main.prototype.runGame = function () {
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
    Main.prototype.loadResource = function () {
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
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * ゲームシーンの作成
     */
    Main.prototype.createGameScene = function () {
        Main.stageWidth = this.stage.stageWidth;
        Main.stageHeight = this.stage.stageHeight;
        egret.log(this.stage.stageWidth);
        Main.stageLevel = Stage.TITLE;
        var createGameStage = new CreateGameStage(Main.stageLevel);
        createGameStage.createGameScene();
        this.stage.addChild(createGameStage);
        /*        //Plateの生成
                for(let i =0; i <= 500; i++){
        
                }*/
        //一個目のガラスPlateの生成　これがないとfixedUpdateのmoveGlassPlateが0個目のplateがなくてエラーになる
        this.generatePlate[0] = new GeneratePlate();
        this.stage.addChild(this.generatePlate[0]);
        this.timer = new egret.Timer(Main.glassGenerateSpeed, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlateTimer, this);
        this.timer.start();
        //繰り返しメソッド
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        egret.startTick(this.fixedUpdate, this);
    };
    /**
     * 繰り返し
     */
    Main.prototype.update = function () {
    };
    /**
     * 固定フレームの繰り返し
     */
    Main.prototype.fixedUpdate = function () {
        switch (Main.stageLevel) {
            case Stage.TITLE:
                break;
            case Stage.GAME_OVER:
                break;
            default:
                for (var i = 0; i <= this.plateNumber; i++) {
                    this.generatePlate[i].moveGlassPlate();
                }
                break;
        }
        return false;
    };
    Main.prototype.generatePlateTimer = function () {
        switch (Main.stageLevel) {
            case Stage.TITLE:
                break;
            case Stage.GAME_OVER:
                break;
            default:
                this.plateNumber += 1;
                this.generatePlate[this.plateNumber] = new GeneratePlate();
                this.generatePlate[this.plateNumber].generateGlassPlate();
                this.stage.addChild(this.generatePlate[this.plateNumber]);
                this.changeStageLevel();
                //タイムアップでゲームオーバー
                if (TimeText.leftTime <= 0) {
                    TimeText.leftTime = 0;
                    Main.stageLevel = Stage.GAME_OVER;
                    var gameOver = new GameOver();
                    gameOver.GameOverDisplay();
                    this.stage.addChild(gameOver);
                }
                break;
        }
    };
    /**
     * ステージレベルの変更
     * Change stage level
     */
    Main.prototype.changeStageLevel = function () {
        switch (TimeText.leftTime) {
            case 60:
                Main.stageLevel = Stage.STAGE1;
                Main.glassGenerateSpeed = 600;
                break;
            case 55:
                Main.stageLevel = Stage.STAGE2;
                //ガラスの生成スピードの変更
                Main.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlateTimer, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 2;
                break;
            case 50:
                Main.stageLevel = Stage.STAGE3;
                Main.glassGenerateSpeed = 600;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlateTimer, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 3;
                break;
            case 45:
                Main.stageLevel = Stage.STAGE4;
                Main.glassGenerateSpeed = 500;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlateTimer, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 4;
                break;
            case 40:
                Main.stageLevel = Stage.STAGE5;
                Main.glassGenerateSpeed = 400;
                this.timer.stop();
                this.timer = new egret.Timer(Main.glassGenerateSpeed, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.generatePlateTimer, this);
                this.timer.start();
                //ガラスの移動スピードの変更
                GeneratePlate.glassPlateMoveSpeedMagnification = 10;
                break;
        }
    };
    Main.glassGenerateSpeed = 1000;
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
// Main Class はここまで
/**
 * ゲームオブジェクトを呼び出すときのテンプレjsonの読み込み等
 */
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        return _this;
    }
    /**
     *  リソース準備後にゲームシーンを作成する
    */
    GameObject.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameObject();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    GameObject.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
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
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    GameObject.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    GameObject.prototype.createGameObject = function () {
    };
    return GameObject;
}(egret.DisplayObjectContainer));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=Main.js.map