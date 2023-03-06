
//aliases
var Application = PIXI.Application,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Sprite = PIXI.Sprite,
    AnimatedSprite = PIXI.extras.AnimatedSprite;
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Rectangle = PIXI.Rectangle,
    loader = PIXI.loader,
    resources = PIXI.loader.resources
    b = new Bump(PIXI);
    
var app = new Application(800, 600, { background: '#0f0f0f' });

app.view.style.position = "absolute";
app.view.style.display = "block";
app.view.style.left = ((window.innerWidth - app.view.width)*0.5);
app.view.style.top = ((window.innerHeight - app.view.height)*0.5);

room = {
    x: Number(app.view.style.left.toString().replace("px","").trim()),
    y: Number(app.view.style.top.toString().replace("px","").trim()),
    width: app.view.width,
    height: app.view.height,
    bounds: {},
    current: {
        get: function() {
            return app.stage;
        },
        set: function(rm) {
            app.stage = rm;
        },
        compare: function(rm) {
            return rm.stage === app.stage;
        }
    },
    loop: {
        method: null,
        bindTo: null
    }
};



