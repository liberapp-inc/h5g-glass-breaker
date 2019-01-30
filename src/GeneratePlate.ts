　class GeneratePlate extends eui.UILayer {

    /**
     * ステージ追加時に一度発生する
     * (UILayerクラスの継承元(Groupクラス)のメソッド)
     */
    protected createChildren(): void {
        super.createChildren();
        
        this.runGame().catch(e => {
            console.log(e);
        })
        this.once(egret.Event.ADDED_TO_STAGE, this.generateGlassPlate, this);
    }

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    private async runGame() {
        await this.loadResource()
        //this.generateGlassPlate();
    }

    /** 
     * リソース読み込み準備
     * default.res.jsonから画像データを取得する為のRES設定を行う
    */
    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload");
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 引数のnameからBitmapデータを取得する。name属性の参考：resources/resource.json
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * ガラス関連の変数
     */
    private glassPlate : number = GlassPlate.GLASS;
    private glassPlateImage : egret.Bitmap;
    private glassPlateImagePositionX : number;
    private glassPlateImagePositionY : number;
    private glassPlateMoveFlag : boolean = false;//trueで移動可能
    
    /**
     * ガラスの生成
     */
    protected generateGlassPlate(event:egret.Event): void {
        switch(this.glassPlate){
            case GlassPlate.GLASS:
                // 描画
                this.glassPlateImage = this.createBitmapByName("glass_plate_png");
                this.glassPlateImage.scaleX = 0.5;
                this.glassPlateImage.scaleY = 0.5;
/*                this.glassPlateImage.x = 0;
                this.glassPlateImage.y = 0;*/
                this.glassPlateMoveFlag = true;

                //Enable touchEvent
                this.glassPlateImage.touchEnabled =true;
                this.glassPlateImage.pixelHitTest = true;
                this.addChild(this.glassPlateImage);

            break;
        }

        //画面にタッチした瞬間にtouchMethodを実行
        this.glassPlateImage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.glassTouch, this );

        egret.startTick(this.moveGlassPlate, this);
    }

    /**
     * Move glasses
     */
    private moveGlassPlate() : boolean{
        if(this.glassPlateMoveFlag == true){
            this.glassPlateImage.x += 1;
            this.glassPlateImage.y += 1;
            
        }
        return false;

    }

    private moveStop() : boolean{
        this.glassPlateMoveFlag = false;//Enabled move
        this.glassPlateImage.touchEnabled = false;//Enabled touch
        
        return false;
    }

    /**
     * TouchEvent
     */
    private glassTouch(evt:egret.TouchEvent){

        this.moveStop();

        //Preserve the variables of glass that are position and scale
        let clickedGlassPositionX : number = this.glassPlateImage.x;
        let clickedGlassPositionY : number = this.glassPlateImage.y;
        let clickedGlassScaleX : number = this.glassPlateImage.scaleX;
        let clickedGlassScaleY : number = this.glassPlateImage.scaleY;
        
        //Change a glass image to broken glass image
        this.removeChild(this.glassPlateImage);
        this.glassPlateImage = this.createBitmapByName("glass_plate-broken_png");
        this.glassPlateImage.x = clickedGlassPositionX
        this.glassPlateImage.y = clickedGlassPositionY
        this.glassPlateImage.scaleX =clickedGlassScaleX;
        this.glassPlateImage.scaleY =clickedGlassScaleY;
        this.addChild(this.glassPlateImage);

        this.fadeBrokenGlass();

        
    }

    /**
     * Fade broken glass
     */
    private fadeTime : number = 0;
    private fadeSpeed : number = 0.01;
    private fadeFlag : boolean = false;

    private fadeBrokenGlass(){
        console.log("b");
        if(this.fadeFlag == false){
            this.fadeTime = egret.getTimer();
            egret.startTick(this.fadeMethod,this);
            this.fadeFlag = true;

        }
        
    }
    /**
     * Make the broked glass transparent
     */
    private fadeMethod() :boolean {

        if(this.fadeFlag == true){
            this.glassPlateImage.alpha -= this.fadeSpeed;
            

            if(this.glassPlateImage.alpha <= 0){
                this.glassPlateImage.alpha = 0;
                egret.stopTick(this.fadeMethod,this.glassPlateImage);
                // stopTickした後にremoveChildしているけれど、tickが続いているのかnull でエラーになる
                // this.removeChild(this);
            }

        }
        return false;
    }
    





}

// GeneratePlate Class　ここまで

enum GlassPlate{
    GLASS,
    IRON,
}
