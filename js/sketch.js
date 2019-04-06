// var symbol;
var symbolSize = 30;
var streams = [];


function setup() {
    createCanvas(
        width = 1850,
        height = 900,
    );
    background(0);
    var x = 0;
    // var y = 0;
    for (let i = 0; i < width/ symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));     
        streams.push(stream);
        x += symbolSize;   
    }
    // stream = new Stream();
    // stream.generateSymbols();
    // symbol = new Symbol(
    //     width / 2,
    //     0, 
    //     random(2, 4),
    // );
    // symbol.setToRandomSymbol();
    textSize(symbolSize);
}

function draw() {
    background(0, 150);
    // stream.render();
    streams.forEach(function(stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.switchInterval = round(random(10, 20));
    this.first = first;

    this.setToRandomSymbol = function() {
        if (frameCount % this.switchInterval === 0) {
            this.value = String.fromCharCode(
                0x4E00 + round(random(0, 214))
            );
        } 
    }    

    // this.render = function() {
    //     // fill(0, 255, 70);
    //     // text(this.value, this.x, this.y);
    //     // this.rain();
    //     // this.setToRandomSymbol();
    // }

    this.rain = function() {
        if (this.y >= height){
            this.y = 0;
        }
        else {
            this.y += this.speed;
        }
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(10, 30));
    this.speed = random(2, 5);
    this.generateSymbols = function(x, y){
        var first = round(random(0, 1)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }
    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(180, 255, 180);
            }
            else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        })
    }
}
