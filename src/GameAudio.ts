class GameAudio extends egret.DisplayObjectContainer {

    private url :string;

    public constructor(url : string) {
        super();
        this.url = url;
        //this.startLoad();
    }

    public startLoad():void {
        //创建 Sound 对象
        const sound = new egret.Sound();
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(this.url);
    }

    protected onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        const sound:egret.Sound = <egret.Sound>event.target;
        //播放音乐
        const channel:egret.SoundChannel = sound.play(0,1);
        channel.volume = 0.5;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }

    protected onSoundComplete(event:egret.Event):void {
        
        //egret.log("onSoundComplete");
    }
}

class LoopGameAudio  extends egret.DisplayObjectContainer {

    private url :string;
    private channel : egret.SoundChannel;

    public constructor(url : string) {
        super();
        this.url = url;
        //this.startLoad();
    }

    public startLoad():void {
        //创建 Sound 对象
        const sound = new egret.Sound();
        //添加加载完成侦听
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        //开始加载
        sound.load(this.url);
    }

    protected onLoadComplete(event:egret.Event):void {
        //获取加载到的 Sound 对象
        const sound:egret.Sound = <egret.Sound>event.target;
        //播放音乐
        this.channel = sound.play(0,-1);
        this.channel.volume = 0.3;
        this.channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    }


    protected onSoundComplete(event:egret.Event):void {
        egret.log("onSoundComplete");
    }

}