
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


