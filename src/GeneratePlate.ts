　class GeneratePlate extends  egret.DisplayObjectContainer {

        public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.generateGlassPlate, this);
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
     * ガラスのプロパティ
     * propaty of glass
     */
    private glassPlateType : number = GlassPlateType.GLASS;
    private glassPlateMoveDirection : number;
    private glassPlateImage : egret.Bitmap;
    private glassPlateImagePosition : number;
    //private glassPlateImagePositionX : number;
    //private glassPlateImagePositionY : number;
    private glassPlateMoveFlag : boolean = false;//trueで移動可能
    private glassPlateMoveSpeedX : number = 1;
    private glassPlateMoveSpeedY : number = 1;
    static glassPlateMoveSpeedMagnification : number = 1;

    static glassBreakNumber : number = 0;//ガラスを破壊した数
    
    /**
     * ガラスの生成
     */
    public generateGlassPlate(event:egret.Event): void {

        // ガラスの位置や移動方向を決定
        this.decideProperty();

        //画面にタッチした瞬間にtouchMethodを実行
        this.glassPlateImage.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.glassTouch, this );

        egret.startTick(this.moveGlassPlate, this);
    }

    /**
     * ガラスの生成位置と動く方向を決定
     * Decide the direction and position of the glasses
     */
    private decideProperty(){
        // 描画
        this.glassPlateImage = this.createBitmapByName("glass_plate_png");
        this.glassPlateImage.scaleX = 0.5;
        this.glassPlateImage.scaleY = 0.5;

        // 移動方向の乱数
        this.glassPlateImagePosition =  0 + Math.floor( Math.random() * 4 );//0~3
        //this.glassPlateMoveDirection = 0 + Math.floor( Math.random() * 4 );

        //ガラスの画像が画面外に生成されないようにする補正値
        let dx : number = this.glassPlateImage.width * this.glassPlateImage.scaleX;
        let dy : number = this.glassPlateImage.height * this.glassPlateImage.scaleY;


        //ガラスの出現位置の決定
        switch(this.glassPlateImagePosition){

            case GlassPosition.UP:
                this.glassPlateImage.x = 0 + Math.floor( Math.random() * (this.stage.stageWidth + 1)) - dx;
                this.glassPlateImage.y = 0 - dy;
                this.glassPlateMoveSpeedX = 0;
                this.glassPlateMoveSpeedY = 1;

            break;

            case GlassPosition.DOWN:
                this.glassPlateImage.x = 0 + Math.floor( Math.random() * (this.stage.stageWidth + 1)) - dx;
                this.glassPlateImage.y = this.stage.stageHeight;
                this.glassPlateMoveSpeedX = 0;
                this.glassPlateMoveSpeedY = -1;
            break;

            case GlassPosition.RIGHT:
                this.glassPlateImage.x = this.stage.stageWidth;
                this.glassPlateImage.y = 0 + Math.floor( Math.random() * (this.stage.stageHeight + 1)) - dy;
                this.glassPlateMoveSpeedX = -1;
                this.glassPlateMoveSpeedY = 0;
            break;

            case GlassPosition.LEFT:
                this.glassPlateImage.x = 0 -dx;
                this.glassPlateImage.y = 0 + Math.floor( Math.random() * (this.stage.stageHeight + 1)) - dy;
                this.glassPlateMoveSpeedX = 1;
                this.glassPlateMoveSpeedY = 0;
            break;
        }
        
        //各プレートの種類ごとの挙動の決定
        switch(this.glassPlateType){

            case GlassPlateType.GLASS:

                this.glassPlateMoveFlag = true;

                //Enable touchEvent
                this.glassPlateImage.touchEnabled =true;
                this.glassPlateImage.pixelHitTest = true;
                this.addChild(this.glassPlateImage);

            break;
        }
    }

    /**
     * ガラスを移動させる
     * Move glasses
     */
    private moveGlassPlate() : boolean{
        if(this.glassPlateMoveFlag == true){
            
            //ガラスの出現位置の決定
            switch(this.glassPlateImagePosition){

                case GlassPosition.UP:
                    this.glassPlateMoveSpeedX = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = 1 * GeneratePlate.glassPlateMoveSpeedMagnification;
                break;

                case GlassPosition.DOWN:
                    this.glassPlateMoveSpeedX = 0 * GeneratePlate.glassPlateMoveSpeedMagnification;
                    this.glassPlateMoveSpeedY = -1* GeneratePlate.glassPlateMoveSpeedMagnification;
                break;

                case GlassPosition.RIGHT:
                    this.glassPlateMoveSpeedX = -1* GeneratePlate.glassPlateMoveSpeedMagnification;
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

        return false;
    }

    /**
     * ガラスの動きを止める
     */
    private moveStop() : boolean{
        this.glassPlateMoveFlag = false;//Enabled move
        this.glassPlateImage.touchEnabled = false;//Enabled touch
        
        return false;
    }

    /**
     * タッチイベント
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
        if(this.fadeFlag == false){
            this.fadeTime = egret.getTimer();
            egret.startTick(this.fadeMethod,this);
            this.fadeFlag = true;
            GeneratePlate.glassBreakNumber +=1;
            console.log("破壊数" + GeneratePlate.glassBreakNumber);
           

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
                //this.removeChild(this.glassPlateImage);
            }

        }
        return false;
    }
    
    /**
     * Get Set
     */
    get getGlassPlateMoveSpeedX() : number{
        return this.glassPlateMoveSpeedX;
    }
    set setGlassPlateMoveSpeedX(value : number) {
        this.glassPlateMoveSpeedX = value;
    }

    get getGlassPlateMoveSpeedY() : number{
        return this.glassPlateMoveSpeedY;
    }
    set setGlassPlateMoveSpeedY(value : number) {
        this.glassPlateMoveSpeedY = value;
    }
/*    get getGlassPlateMoveSpeedMagnification() : number {
        return this.glassPlateMoveSpeedMagnification;
    }
    set setGlassPlateMoveSpeedMagnification(value : number) {
        this.glassPlateMoveSpeedMagnification = value;
    }
*/


}

// GeneratePlate Class　ここまで

enum GlassPlateType{
    GLASS,
    IRON,
}

//ガラスが移動する方向
enum MoveDirection{
    UP,
    DOWN,
    RIGHT,
    LEFT,
}

// ガラスが出現する位置
enum GlassPosition{
    UP,
    DOWN,
    RIGHT,
    LEFT,
}