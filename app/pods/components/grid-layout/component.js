import Component from '@ember/component';

function Game2048(){
    this.startTiles = 2;
    this.boardSize = 4;
    this.matrixValues = [];
    this.availableSpace = [];
    this.score = 0;
    this.lose = false;
}

Game2048.prototype.startGame = function(){
    this.resetGame();
    for (let tmp=0 ; tmp < this.startTiles ; tmp++){
        this.generateRandomIndex(this.boardSize);
    }
    this.setUserAction();
}

Game2048.prototype.resetGame = function(){
    var matrix = [];
    for ( var y = 0; y < this.boardSize; y++ ) {
        matrix[ y ] = [];
        for ( var x = 0; x < this.boardSize; x++ ) {
            matrix[ y ][ x ] = 0;
        }
    }
    this.matrixValues = matrix;
}

Game2048.prototype.insertGrid = function(index){
    console.log("placeVlUES ---- " + index);
    var value = 0;
    let i = index[0];
    let j = index[1];
    value = i < 1 ? 2 : 4;
    this.matrixValues[i][j] = value; 
}

Game2048.prototype.renderGrid = function(){
    console.log("VALUE BEFORE RENDER -- " + this.matrixValues);
    let len = this.boardSize;
    let value;
    for (let i=0 ; i<len ; i++){
        for(let j=0 ; j<len ; j++){
            value = this.matrixValues[i][j];
            document.querySelectorAll(".grid-row")[i].children[j].style.backgroundColor = this.getBackground(value);
            document.querySelectorAll(".grid-row")[i].children[j].style.color = this.getForeground(value);
            document.querySelectorAll(".grid-row")[i].children[j].firstChild.innerHTML =  value == 0 ? null : value;
        }
    }
}

Game2048.prototype.generateRandomIndex = function(size){
    var x = Math.floor(Math.random() * size);
    var y = Math.floor(Math.random() * size);
    // Tile space available
    var currentTile = this.matrixValues[x][y];
    if (currentTile > 0){
        console.log("DIFFERENT SIZE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        this.generateRandomIndex(size);
    }
    else{
        this.insertGrid([x, y]);
        this.renderGrid();
    }
}

Game2048.prototype.checkAvailableSpace = function(){
    // Has free space 
    let len = this.boardSize;
    let value;
    for (let i=0 ; i<len ; i++){
        for(let j=0 ; j<len ; j++){
            value = this.matrixValues[i][j];
            if (value == 0){
                return true;
            }
            return false;
        }
    }
    
}

Game2048.prototype.buildTile = function(){
    if (this.checkAvailableSpace()){
        this.generateRandomIndex(this.boardSize);
    }else{
        this.set('lose', true);
        // document.removeEventListener('keydown', function(){});
        // this.get('component').transitionTo('lost-overlay');
        // this.sendAction('showOverlay');
    }
}

Game2048.prototype.setUserAction = function(){
    let self = this;
    //document.removeEventListener('keydown', function(){});
    document.addEventListener('keydown', function(e){
        //console.log("INITIAL -- " + self.matrixValues);
        var len = self.boardSize;
        if (e.keyCode == '38') {
            // up arrow
            self.matrixValues = self.topMove(self, len);
            self.buildTile();   
        }
        else if (e.keyCode == '40') {
            // down arrow
            self.matrixValues = self.bottomMove(self, len);
            self.buildTile();   
        }
        else if (e.keyCode == '37') {
            // left arrow
            self.matrixValues = self.leftMove(self, len);
            self.buildTile();   
        } 
        else if (e.keyCode == '39') {
            // right arrow
            self.matrixValues = self.rightMove(self, len);
            self.buildTile();   
        }
    });
}

Game2048.prototype.leftMove = function(self, len){
    console.log("LEFT");
    let matrixValues = self.matrixValues;
    let refinedArray = [];
    let additiveArray = [];
    let positionCount = 0;
    for (let i=0; i < len; i++){
        refinedArray = [];
        for (let j=0; j < len; j++){
            // console.log("i - rowCount " + i);
            // console.log("j - cellCount " + j);
            let currValue = matrixValues[i][j];
            if (currValue != 0){
                matrixValues[i][j] = 0;
                refinedArray.push(currValue);
            }
        }
        additiveArray = this.mergeTiles(refinedArray);
        positionCount = 0;
        for (let l=0 ; l < additiveArray.length; l++){
            if (additiveArray[l] != 0){ 
                matrixValues[i][positionCount] = additiveArray[l]; 
                positionCount++;
            }
        }
    }
    return matrixValues;
}

Game2048.prototype.rightMove = function(self, len){
    console.log("RIGHT");
    let matrixValues = self.matrixValues;
    let refinedArray = [];
    let additiveArray = [];
    let positionCount = 0;
    for (let i=0; i < len; i++){
        refinedArray = [];
        for (let j=len-1; j >= 0; j--){
            // console.log("i - rowCount " + i);
            // console.log("j - cellCount " + j);
            let currValue = matrixValues[i][j];
            if (currValue != 0){
                matrixValues[i][j] = 0;
                refinedArray.push(currValue);
            }
        }
        additiveArray = this.mergeTiles(refinedArray);
        positionCount = self.boardSize-1;
        for (let l=0 ; l < additiveArray.length; l++){
            if (additiveArray[l] != 0){ 
                matrixValues[i][positionCount] = additiveArray[l]; 
                positionCount--;
            }
        }
    }
    return matrixValues;
}

Game2048.prototype.topMove = function(self, len){
    console.log("TOP");
    let matrixValues = self.matrixValues;
    let refinedArray = [];
    let additiveArray = [];
    let positionCount = 0;
    for (let i=0; i < len; i++){
        refinedArray = [];
        for (let j=0; j < len; j++){
            // console.log("i - rowCount " + i);
            // console.log("j - cellCount " + j);
            let currValue = matrixValues[j][i];
            if (currValue != 0){
                matrixValues[j][i] = 0;
                refinedArray.push(currValue);
            }
        }
        additiveArray = this.mergeTiles(refinedArray);
        positionCount = i;
        for (let l=0 ; l < additiveArray.length; l++){
            if (additiveArray[l] != 0){ 
                matrixValues[l][positionCount] = additiveArray[l]; 
            }
        }
    }
    return matrixValues;
}

Game2048.prototype.bottomMove = function(self, len){
    console.log("BOTTOM");
    let matrixValues = self.matrixValues;
    let refinedArray = [];
    let additiveArray = [];
    let positionCount = 0;
    for (let i=0; i < len; i++){
        refinedArray = [];
        for (let j=len-1; j >= 0; j--){
            // console.log("i - rowCount " + i);
            // console.log("j - cellCount " + j);
            let currValue = matrixValues[j][i];
            if (currValue != 0){
                matrixValues[j][i] = 0;
                refinedArray.push(currValue);
            }
        }
        additiveArray = this.mergeTiles(refinedArray);
        positionCount = i;
        for (let l=0 ; l < additiveArray.length; l++){
            if (additiveArray[l] != 0){ 
                matrixValues[len-1-l][positionCount] = additiveArray[l]; 
            }
        }
    }
    return matrixValues;
}
  
Game2048.prototype.mergeTiles = function(refinedArray){
    let tempArray = [];
    console.log("refinedArray after null -- " + refinedArray);
    for (let k=0 ; k < refinedArray.length; k++){
        if (refinedArray[k] == refinedArray[k+1]){
            tempArray.push(refinedArray[k]+ refinedArray[k+1]);
            refinedArray[k+1] = 0; 
        }else{
            tempArray.push(refinedArray[k]);
        }  
    }
    console.log("Additive Array -- "+ tempArray);
    return tempArray;
}

Game2048.prototype.getBackground = function(value){
    switch (value) {
        case 0:    return "rgba(238, 228, 218, 0.35)";
        case 2:    return "#eee4da";
        case 4:    return "#ede0c8";
        case 8:    return "#f2b179";
        case 16:   return "#f59563";
        case 32:   return "#f67c5f";
        case 64:   return "#f65e3b";
        case 128:  return "#edcf72";
        case 256:  return "#edcc61";
        case 512:  return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
    }
    return "0xcdc1b4";
}

Game2048.prototype.getForeground = function(value){
    return ( value >= 8 ? "#F2F6F9" : "#5A5C5D");
}

export default Component.extend({
    lose : true,
    actions: {
        resetGame(){
            location.reload();
        },
        startGame(){
            this.get('router').transitionTo('home');
        },
        showOverlay(){
            console.log("SHOW OVERLAY !! ");
        }
    },
    availableSpace() {},
    addNewTile() {
        this.availableSpace();
    },
    isFull() {
        return this.availableSpace().size() == 0;
    },
    canMove() {
        if(!this.isFull()){
            //logic
            //this.mergeTiles();
            return true
        }
        return false
    },
    didRender() {
        var game2048 = new Game2048();
        game2048.boardSize = 4;
        game2048.startGame();  
    }
});

