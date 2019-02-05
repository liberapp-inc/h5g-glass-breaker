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
var GeneratePlate = (function (_super) {
    __extends(GeneratePlate, _super);
    function GeneratePlate() {
        var _this = _super.call(this) || this;
        /**
         * ガラスのプロパティ
         * propaty of glass
         */
        _this.glassPlateType = GlassPlateType.GLASS;
        //private glassPlateImagePositionX : number;
        //private glassPlateImagePositionY : number;
        _this.glassPlateMoveFlag = false; //trueで移動可能
        _this.glassPlateMoveSpeedX = 1;
        _this.glassPlateMoveSpeedY = 1;
        /**
         * Fade broken glass
         */
        _this.fadeTime = 0;
        _this.fadeSpeed = 0.01;
        _this.fadeFlag = false;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.generateGlassPlate, _this);
        return _this;
    }
    /**
     *  リソース準備後にゲームシーンを作成する
    */
    /*    public async runGame(event:egret.Event) {
            await this.loadResource()
            this.generateGlassPlate(event);
        }*/
    /**
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    GeneratePlate.prototype.loadResource = function () {
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
    GeneratePlate.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * ガラスの生成
     */
    GeneratePlate.prototype.generateGlassPlate = function (event) {
        // ガラスの位置や移動方向を決定
        this.decideProperty();
        //画面にタッチした瞬間にtouchMethodを実行
        this.glassPlateImage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.glassTouch, this);
        egret.startTick(this.moveGlassPlate, this);
    };
    /**
     * ガラスの生成位置と動く方向を決定
     * Decide the direction and position of the glasses
     */
    GeneratePlate.prototype.decideProperty = function () {
        //出現するプレートの種類の決定
        this.glassPlateType = 0 + Math.floor(Math.random() * 2); //0~1
        //各プレートの描画とクリック判定の付与
        switch (this.glassPlateType) {
            case GlassPlateType.GLASS:
                this.glassPlateImage = this.createBitmapByName("glass_plate_png");
                this.glassPlateMoveFlag = true;
                //Enable touchEvent
                this.glassPlateImage.touchEnabled = true;
                this.glassPlateImage.pixelHitTest = true;
                this.addChild(this.glassPlateImage);
                break;
            case GlassPlateType.IRON:
                this.glassPlateImage = this.createBitmapByName("iron_plate_parallel_png");
                this.glassPlateMoveFlag = true;
                //Enable touchEvent
                this.glassPlateImage.touchEnabled = true;
                this.glassPlateImage.pixelHitTest = true;
                this.addChild(this.glassPlateImage);
                break;
        }
        //画像の大きさを調整（scaleを変更してもwidthは変更されないので注意）
        this.glassPlateImage.scaleX = 0.5;
        this.glassPlateImage.scaleY = 0.5;
        // 移動方向の乱数
        this.glassPlateImagePosition = 0 + Math.floor(Math.random() * 4); //0~3
        //this.glassPlateMoveDirection = 0 + Math.floor( Math.random() * 4 );
        //ガラスの画像が画面外に生成されないようにする補正値
        var dx = this.glassPlateImage.width * this.glassPlateImage.scaleX;
        var dy = this.glassPlateImage.height * this.glassPlateImage.scaleY;
        //ガラスの出現位置の決定
        switch (this.glassPlateImagePosition) {
            case GlassPosition.UP:
                this.glassPlateImage.x = 0 + Math.floor(Math.random() * (this.stage.stageWidth + 1)) - dx;
                this.glassPlateImage.y = 0 - dy;
                this.glassPlateMoveSpeedX = 0;
                this.glassPlateMoveSpeedY = 1;
                break;
            case GlassPosition.DOWN:
                this.glassPlateImage.x = 0 + Math.floor(Math.random() * (this.stage.stageWidth + 1)) - dx;
                this.glassPlateImage.y = this.stage.stageHeight;
                this.glassPlateMoveSpeedX = 0;
                this.glassPlateMoveSpeedY = -1;
                break;
            case GlassPosition.RIGHT:
                this.glassPlateImage.x = this.stage.stageWidth;
                this.glassPlateImage.y = 0 + Math.floor(Math.random() * (this.stage.stageHeight + 1)) - dy;
                this.glassPlateMoveSpeedX = -1;
                this.glassPlateMoveSpeedY = 0;
                break;
            case GlassPosition.LEFT:
                this.glassPlateImage.x = 0 - dx;
                this.glassPlateImage.y = 0 + Math.floor(Math.random() * (this.stage.stageHeight + 1)) - dy;
                this.glassPlateMoveSpeedX = 1;
                this.glassPlateMoveSpeedY = 0;
                break;
        }
    };
    /**
     * ガラスを移動させる
     * Move glasses
     */
    GeneratePlate.prototype.moveGlassPlate = function () {
        if (this.glassPlateMoveFlag == true && Main.stageLevel != Stage.GAME_OVER) {
            //ガラスの出現位置の決定
            switch (this.glassPlateImagePosition) {
                case GlassPosition.UP:
                    this.glassPlateMoveSpeedX = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = 1 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    break;
                case GlassPosition.DOWN:
                    this.glassPlateMoveSpeedX = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = -1 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    break;
                case GlassPosition.RIGHT:
                    this.glassPlateMoveSpeedX = -1 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    break;
                case GlassPosition.LEFT:
                    this.glassPlateMoveSpeedX = 1 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    break;
            }
            this.glassPlateImage.x += this.glassPlateMoveSpeedX;
            this.glassPlateImage.y += this.glassPlateMoveSpeedY;
        }
        else if (Main.stageLevel == Stage.GAME_OVER) {
            this.moveStop();
            this.glassPlateImage.alpha = 0;
            egret.stopTick(this.fadeMethod, this.glassPlateImage);
        }
        return false;
    };
    /**
     * ガラスの動きを止める
     */
    GeneratePlate.prototype.moveStop = function () {
        this.glassPlateMoveFlag = false; //Enabled move
        this.glassPlateImage.touchEnabled = false; //Enabled touch
        return false;
    };
    /**
     * タッチイベント
     * TouchEvent
     */
    GeneratePlate.prototype.glassTouch = function (evt) {
        this.moveStop();
        switch (this.glassPlateType) {
            case GlassPlateType.GLASS:
                //ガラスが割れる音
                var audioGlass = new GameAudio("resource/bgm/glass-break4.mp3");
                //Preserve the variables of glass that are position and scale
                var clickedGlassPositionX = this.glassPlateImage.x;
                var clickedGlassPositionY = this.glassPlateImage.y;
                var clickedGlassScaleX = this.glassPlateImage.scaleX;
                var clickedGlassScaleY = this.glassPlateImage.scaleY;
                //Change a glass image to broken glass image
                this.removeChild(this.glassPlateImage);
                this.glassPlateImage = this.createBitmapByName("glass_plate-broken_png");
                this.glassPlateImage.x = clickedGlassPositionX;
                this.glassPlateImage.y = clickedGlassPositionY;
                this.glassPlateImage.scaleX = clickedGlassScaleX;
                this.glassPlateImage.scaleY = clickedGlassScaleY;
                this.addChild(this.glassPlateImage);
                this.fadeBrokenGlass();
                break;
            case GlassPlateType.IRON:
                //鉄を叩く音
                var audioIron = new GameAudio("resource/bgm/bell04.mp3");
                Main.stageLevel = Stage.GAME_OVER;
                var gameOver = new GameOver();
                this.addChild(gameOver);
                break;
        }
    };
    GeneratePlate.prototype.fadeBrokenGlass = function () {
        if (this.fadeFlag == false) {
            this.fadeTime = egret.getTimer();
            egret.startTick(this.fadeMethod, this);
            this.fadeFlag = true;
            //破壊枚数の増加
            GeneratePlate.glassBreakNumber += 1;
            //スコアの増加
            this.calculateScore();
        }
    };
    /**
     * Make the broked glass transparent
     */
    GeneratePlate.prototype.fadeMethod = function () {
        if (this.fadeFlag == true) {
            this.glassPlateImage.alpha -= this.fadeSpeed;
            if (this.glassPlateImage.alpha <= 0) {
                this.glassPlateImage.alpha = 0;
                egret.stopTick(this.fadeMethod, this.glassPlateImage);
                // stopTickした後にremoveChildしているけれど、tickが続いているのかnull でエラーになる
                //this.removeChild(this.glassPlateImage);
            }
        }
        return false;
    };
    /**
     * スコアの計算 コンボボーナスの切り替え
     * Calculate score
     */
    GeneratePlate.prototype.calculateScore = function () {
        GeneratePlate.breakComboNumber += 1;
        switch (GeneratePlate.breakComboNumber) {
            case 0:
                GeneratePlate.breakComboBonus = 1;
                break;
            case 10:
                GeneratePlate.breakComboBonus = 2;
                break;
            case 20:
                GeneratePlate.breakComboBonus = 3;
                break;
            case 30:
                GeneratePlate.breakComboBonus = 4;
                break;
            case 40:
                GeneratePlate.breakComboBonus = 5;
                break;
            case 50:
                GeneratePlate.breakComboBonus = 6;
                break;
            case 60:
                GeneratePlate.breakComboBonus = 7;
                break;
            case 70:
                GeneratePlate.breakComboBonus = 8;
                break;
            case 80:
                GeneratePlate.breakComboBonus = 9;
                break;
            case 90:
                GeneratePlate.breakComboBonus = 10;
                break;
            case 100:
                GeneratePlate.breakComboBonus = 11;
                break;
        }
        GeneratePlate.score += 100 * GeneratePlate.breakComboBonus;
    };
    Object.defineProperty(GeneratePlate.prototype, "getGlassPlateMoveSpeedX", {
        /**
         * Get Set
         */
        get: function () {
            return this.glassPlateMoveSpeedX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneratePlate.prototype, "setGlassPlateMoveSpeedX", {
        set: function (value) {
            this.glassPlateMoveSpeedX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneratePlate.prototype, "getGlassPlateMoveSpeedY", {
        get: function () {
            return this.glassPlateMoveSpeedY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeneratePlate.prototype, "setGlassPlateMoveSpeedY", {
        set: function (value) {
            this.glassPlateMoveSpeedY = value;
        },
        enumerable: true,
        configurable: true
    });
    GeneratePlate.glassPlateMoveSpeedMagnification = 1;
    GeneratePlate.glassBreakNumber = 0; //ガラスを破壊した数
    GeneratePlate.breakComboNumber = 0; //コンボ数
    GeneratePlate.breakComboBonus = 1;
    GeneratePlate.score = 0;
    return GeneratePlate;
}(egret.DisplayObjectContainer));
__reflect(GeneratePlate.prototype, "GeneratePlate");
// GeneratePlate Class　ここまで
var GlassPlateType;
(function (GlassPlateType) {
    GlassPlateType[GlassPlateType["GLASS"] = 0] = "GLASS";
    GlassPlateType[GlassPlateType["IRON"] = 1] = "IRON";
})(GlassPlateType || (GlassPlateType = {}));
//ガラスが移動する方向
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["UP"] = 0] = "UP";
    MoveDirection[MoveDirection["DOWN"] = 1] = "DOWN";
    MoveDirection[MoveDirection["RIGHT"] = 2] = "RIGHT";
    MoveDirection[MoveDirection["LEFT"] = 3] = "LEFT";
})(MoveDirection || (MoveDirection = {}));
// ガラスが出現する位置
var GlassPosition;
(function (GlassPosition) {
    GlassPosition[GlassPosition["UP"] = 0] = "UP";
    GlassPosition[GlassPosition["DOWN"] = 1] = "DOWN";
    GlassPosition[GlassPosition["RIGHT"] = 2] = "RIGHT";
    GlassPosition[GlassPosition["LEFT"] = 3] = "LEFT";
})(GlassPosition || (GlassPosition = {}));
//コンボボーナス計算用
var ComboBonusStage;
(function (ComboBonusStage) {
    ComboBonusStage[ComboBonusStage["STAGE1"] = 0] = "STAGE1";
    ComboBonusStage[ComboBonusStage["STAGE2"] = 1] = "STAGE2";
    ComboBonusStage[ComboBonusStage["STAGE3"] = 2] = "STAGE3";
    ComboBonusStage[ComboBonusStage["STAGE4"] = 3] = "STAGE4";
    ComboBonusStage[ComboBonusStage["STAGE5"] = 4] = "STAGE5";
    ComboBonusStage[ComboBonusStage["STAGE6"] = 5] = "STAGE6";
    ComboBonusStage[ComboBonusStage["STAGE7"] = 6] = "STAGE7";
    ComboBonusStage[ComboBonusStage["STAGE8"] = 7] = "STAGE8";
    ComboBonusStage[ComboBonusStage["STAGE9"] = 8] = "STAGE9";
    ComboBonusStage[ComboBonusStage["STAGE10"] = 9] = "STAGE10";
})(ComboBonusStage || (ComboBonusStage = {}));
//# sourceMappingURL=GeneratePlate.js.map