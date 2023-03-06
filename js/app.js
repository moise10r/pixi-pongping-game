
var textures;
var key;
function loaded() {
    room.loader.loading();
}

room.loader = {
    data: {
        stage: new Container(),
        load: {
            total: 6,
            current: 0
        }
    },
    methods: {
        loading: function() {
            room.loader.progress.text = Math.floor(++room.loader.load.current 
                    * 100 / room.loader.load.total) + "%";
            
        }
    },
    init: function() {
        for(let key in room.loader.data) {
            room.loader[key] = room.loader.data[key];
        }
        for(let key in room.loader.methods) {
            room.loader[key] = room.loader.methods[key];
        }
    },
    setup: function() {
        room.loader.init();
        createObject(new Text("Loading...", styles.title), room.loader.stage,
                room.width/2, room.height*0.4, 0.5);
        room.loader.progress = createObject(new Text("0%", styles.subtitle), 
                room.loader.stage, room.width/2, room.height*0.6, 0.5);
        room.current.set(room.loader.stage);
        render();
    }
};

room.menu = {
    data: {
        movePlay: {
            is: false,
            frame: 30,
            count: 0,
            opacity: 0,
            moved: false,
            reset: function() {
                room.menu.movePlay.is = false;
                room.menu.movePlay.count = 0;
                room.menu.movePlay.moved = false;
            }
        },
        stage: new Container(),
        button: {}
    },
    methods: {
        
    },
    init: function() {
        for(let key in this.data) {
            this[key] = this.data[key];
        }
        for(let key in this.methods) {
            this[key] = this.methods[key];
        }
    },
    setup: function() {
        this.init.bind(this)();
        
        createObject(new Sprite(textures['title.png']), this.stage,
                room.width/2, room.height/7, 0.5);
        
        this.button.play = createObject(new Sprite(textures['play-default.png']),
                this.stage, room.width/2, room.height*.7, 0.5);
        
        this.button.play.moveTo = (room.height*.7 - room.height * .5) / this.movePlay.frame;
        this.button.play.shrinkTo = 0.5 / this.movePlay.frame;
        
        this.button.play.sprites = {
            default: textures['play-default.png'],
            hover: textures['play-hover.png'],
            clicked: textures['play-clicked.png'],
            selected: textures['play-selected.png']
        };
        
        this.button.play.buttonMode = true;
        this.button.play.interactive = true;
        this.button.play.stats = {
            inside: false,
            clicked: false,
            selected: false
        };
        
        this.button.play.on('pointerdown', function() {
            if(this.stats.selected) return;
            this.stats.clicked = true;
            this.setTexture(this.stats.inside ? this.sprites.clicked 
                    : this.sprites.default);
        }.bind(this.button.play));
        
        this.button.play.on('pointerup', function() {
            if(this.stats.selected) return;
            this.stats.clicked = false;
            this.stats.selected = true;
            this.setTexture(this.sprites.selected);
            //do the animation here
            room.menu.movePlay.is = true;
        }.bind(this.button.play));
        
        this.button.play.on('pointerupoutside', function() {
            if(this.stats.selected) return;
            this.stats.clicked = false;
        }.bind(this.button.play));
        
        this.button.play.on('pointerover', function() {
            if(this.stats.selected) return;
            this.stats.inside = true;
            this.setTexture(this.stats.clicked ? this.sprites.clicked 
                    : this.sprites.hover);
        }); 
        
        this.button.play.on('pointerout', function() {
            if(this.stats.selected) return;
            this.stats.inside = false;
            this.setTexture(this.sprites.default);
        }.bind(this.button.play));
        
        this.movePlay.opacity = 1 / this.movePlay.frame;
        
        this.button.easy = createObject(new Sprite(textures['easy-default.png']),
            this.stage, 3*room.width/20, room.height*0.75, 0.5);
        this.button.easy.keyword = 'easy';
        
        this.button.normal = createObject(new Sprite(textures['normal-default.png']),
            this.stage, room.width/2, room.height*0.75, 0.5);
        this.button.normal.keyword = 'normal';
            
        this.button.hard = createObject(new Sprite(textures['hard-default.png']),
            this.stage, 17*room.width/20, room.height*0.75, 0.5);
        this.button.hard.keyword = 'hard';
        
        this.button.difficulty = [
            this.button.easy,
            this.button.normal,
            this.button.hard
        ];
        
        for(let i in this.button.difficulty) {
            this.button.difficulty[i].alpha = 0.0;
            this.button.difficulty[i].sprites = {
                default: textures[this.button.difficulty[i].keyword + '-default.png'],
                hover: textures[this.button.difficulty[i].keyword + '-hover.png'],
                clicked: textures[this.button.difficulty[i].keyword + '-clicked.png']
            };
            this.button.difficulty[i].buttonMode = false;
            this.button.difficulty[i].interactive = false;
            this.button.difficulty[i].stats = { inside: false, clicked: false };
            
            this.button.difficulty[i].on('pointerdown', function() {
                this.stats.clicked = true;
                this.setTexture(this.stats.inside ? this.sprites.clicked : this.sprites.default);
            }.bind(this.button.difficulty[i]));
            
            this.button.difficulty[i].on('pointerup', function() {
                this.stats.clicked = false;
                //next room here
                this.setTexture(this.sprites.hover);
                //reset 
                room.game.difficulty = i;
                setRoom(room.game, true);
            }.bind(this.button.difficulty[i]));
            
            this.button.difficulty[i].on('pointerupoutside', function() {
                this.stats.clicked = false;
                this.setTexture(this.sprites.default);
            }.bind(this.button.difficulty[i]));
            
            this.button.difficulty[i].on('pointerover', function() {
                this.stats.inside = true;
                this.setTexture(this.stats.clicked ? this.sprites.clicked : this.sprites.hover);
            }.bind(this.button.difficulty[i]));
            
            this.button.difficulty[i].on('pointerout', function() {
                this.stats.inside = false;
                this.setTexture(this.sprites.default);
            }.bind(this.button.difficulty[i]));
        }
        
        this.button.reset = function() {
            this.play.setTexture(this.play.sprites.default);
            this.play.interactive = true;
            this.play.buttonMode = true;
            this.play.stats.inside = false;
            this.play.stats.clicked = false;
            this.play.stats.selected = false;
            setPosition(this.play, room.width/2, room.height*.7, 0.5);
            this.play.scale.set(1, 1);
            
            for(let i in this.difficulty) {
                this.difficulty[i].setTexture(this.difficulty[i].sprites.default);
                this.difficulty[i].stats.inside = false;
                this.difficulty[i].stats.clicked = false;
                this.difficulty[i].alpha = 0.0;
                this.difficulty[i].buttonMode = false;
                this.difficulty[i].interactive = false;
            }
        };
        
        
        key.enter.addReleaseEvent(function() {
            if(!room.current.compare(room.menu)) return;
            if(!room.menu.movePlay.is && !room.menu.movePlay.moved) {
                this.play.stats.clicked = false;
                this.play.stats.selected = true;
                this.play.setTexture(this.play.sprites.selected);
                room.menu.movePlay.is = true;
            }
            else if(room.menu.movePlay.moved) {
                room.game.difficulty = 1;
                setRoom(room.game, true);
            }
            
        }, this.button);
        
        loaded();
    },
    loop: function() {
        if(this.movePlay.is) {
            this.movePlay.moved = true;
            this.button.play.y -= this.button.play.moveTo;
            this.button.play.scale.x -= this.button.play.shrinkTo;
            this.button.play.scale.y -= this.button.play.shrinkTo;
            for(let i in this.button.difficulty) 
                this.button.difficulty[i].alpha += this.movePlay.opacity;
            if(++this.movePlay.count >= this.movePlay.frame) {
                this.movePlay.is = false;
                for(let i in this.button.difficulty) {
                    this.button.difficulty[i].alpha = 1.0;
                    this.button.difficulty[i].buttonMode = true;
                    this.button.difficulty[i].interactive = true;
                }
                this.button.play.interactive = false;
                this.button.play.buttonMode = false;
            }
        }
    },
    reset: function() {
        this.button.reset.bind(this.button)();
        this.movePlay.reset();
    }
};




function setup() {
    textures = resources['assets/pongping.json'].textures;
    key = {
        left: new Key(['A'.charCodeAt(0), 37]),
        right: new Key(['D'.charCodeAt(0), 39]),
        shift: new Key(16),
        enter: new Key([13, 32])
    };
    loaded();
    room.menu.setup.bind(room.menu)();
    // room.game.setup.bind(room.game)();
    // room.score.setup.bind(room.score)();
    setRoom(room.menu);
    loop();
}


