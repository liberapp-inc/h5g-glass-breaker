　class BrokenGlassDisplay extends eui.UILayer {
    constructor() {
        super();
        this.once( egret.Event.ADDED_TO_STAGE, this.runGame, this );
/*        this.runGame().catch(e => {
            console.log(e);
        })*/
        
    }

    /** 
     *  リソース準備後にゲームシーンを作成する
    */
    public async runGame() {
        await this.loadResource()
        this.brokenGlassDisplay();
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
     * 破壊したガラスの枚数を表示する変数
     */
    private brokenGlassText : egret.TextField;

    /**
     * ガラス破壊枚数を表示
     */
    private brokenGlassDisplay(){
        this.brokenGlassText = new egret.TextField();
        this.brokenGlassText.x = 300;
        this.brokenGlassText.scaleX = 0.5;
        this.brokenGlassText.scaleY = 0.5;
        this.brokenGlassText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "破壊枚数" + GeneratePlate.glassBreakNumber.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
        this.addChild(this.brokenGlassText);

        this.addEventListener(egret.Event.ENTER_FRAME, this.addBrokenGlassNumber, this);

    }


    private addBrokenGlassNumber() : void{
        this.brokenGlassText.text =  "破壊枚数" + GeneratePlate.glassBreakNumber.toString();
        this.brokenGlassText.textFlow = <Array<egret.ITextElement>>[ 
            {text: "破壊枚数" + GeneratePlate.glassBreakNumber.toString(), 
                style: {
                    "textColor": 0x336699, "size": 100, "strokeColor": 0x6699cc, "stroke": 2, "fontFamily": "Meiryo"
                }
            }
        ];
    }


   


}