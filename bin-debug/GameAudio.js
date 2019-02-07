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
var GameAudio = (function (_super) {
    __extends(GameAudio, _super);
    function GameAudio(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        return _this;
        //this.startLoad();
    }
    GameAudio.prototype.startLoad = function () {
        //创建 Sound 对象
        var sound = new egret.Sound();
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(this.url);
    };
    GameAudio.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        var channel = sound.play(0, 1);
        channel.volume = 0.5;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    GameAudio.prototype.onSoundComplete = function (event) {
        //egret.log("onSoundComplete");
    };
    return GameAudio;
}(egret.DisplayObjectContainer));
__reflect(GameAudio.prototype, "GameAudio");
var LoopGameAudio = (function (_super) {
    __extends(LoopGameAudio, _super);
    function LoopGameAudio(url) {
        var _this = _super.call(this) || this;
        _this.url = url;
        return _this;
        //this.startLoad();
    }
    LoopGameAudio.prototype.startLoad = function () {
        //创建 Sound 对象
        var sound = new egret.Sound();
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(this.url);
    };
    LoopGameAudio.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        this.channel = sound.play(0, -1);
        this.channel.volume = 0.3;
        this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    LoopGameAudio.prototype.onSoundComplete = function (event) {
        egret.log("onSoundComplete");
    };
    return LoopGameAudio;
}(egret.DisplayObjectContainer));
__reflect(LoopGameAudio.prototype, "LoopGameAudio");
//# sourceMappingURL=GameAudio.js.map