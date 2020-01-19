let walls;
let size = {x: 40, y: 20}
let waveFront;
let currentIndex = 0
let matrixWaveFront = generateMatrix();
let ultNumber = matrixWaveFront[0][0];
let cordsArray = [];
let currentLine;

function setup() {
	walls = generateWalls(200);
	createCanvas(1000, 500);
	for(let i = 0; i < 200; i ++) {
		waveFrontGenerate(walls);
	}
	console.table(matrixWaveFront);
	currentLine = createVector(0, 0);
}
function draw() {
	background(100);
	drawWalls(walls);
	drawSpawnAndGoal();
	drawPath()

}
function drawPath() {
	let cords = {i: 0, j: 0}
	while(ultNumber != 0) {
		let tempCords = []
		if(typeof matrixWaveFront[cords.i-1] != 'undefined') tempCords.push({i: cords.i-1, j: cords.j})
		if(typeof matrixWaveFront[cords.i+1] != 'undefined') tempCords.push({i: cords.i+1, j: cords.j})
		if(typeof matrixWaveFront[cords.i][cords.j+1] != 'undefined') tempCords.push({i: cords.i, j: cords.j+1})
		if(tempCords.length < 3) tempCords.push(cords);
		if(matrixWaveFront[tempCords[0].i][tempCords[0].j] == matrixWaveFront[tempCords[1].i][tempCords[1].j]) cords = tempCords[0];
		if(matrixWaveFront[tempCords[0].i][tempCords[0].j] == matrixWaveFront[tempCords[2].i][tempCords[2].j]) cords = tempCords[0];

		if(matrixWaveFront[tempCords[1].i][tempCords[1].j] == matrixWaveFront[tempCords[2].i][tempCords[2].j]) cords = tempCords[1];




		if(matrixWaveFront[tempCords[0].i][tempCords[0].j] < matrixWaveFront[tempCords[1].i][tempCords[1].j] && matrixWaveFront[tempCords[0].i][tempCords[0].j] < matrixWaveFront[tempCords[2].i][tempCords[2].j]) cords = tempCords[0];
		if(matrixWaveFront[tempCords[1].i][tempCords[1].j] < matrixWaveFront[tempCords[0].i][tempCords[0].j] && matrixWaveFront[tempCords[1].i][tempCords[1].j] < matrixWaveFront[tempCords[2].i][tempCords[2].j]) cords = tempCords[1];
		if(matrixWaveFront[tempCords[2].i][tempCords[2].j] < matrixWaveFront[tempCords[1].i][tempCords[1].j] && matrixWaveFront[tempCords[2].i][tempCords[2].j] < matrixWaveFront[tempCords[0].i][tempCords[0].j]) cords = tempCords[2];
		ultNumber = matrixWaveFront[cords.i][cords.j];
		cordsArray.push(cords);
	}
	cordsArray.forEach((cordenada, i) => {
		push();
		//strokeWeight(10);
		fill('rgba(0,255,0, 0.05)');
		if(typeof cordsArray[i+1] != 'undefined') rect(cordenada.j*25, cordenada.i*25, 25, 25);
		//if(typeof cordsArray[i+1] != 'undefined') line(cordenada.j*50, cordenada.i*50, cordsArray[i+1].j*50, cordsArray[i+1].i*50)
		pop();
	})
}
function drawSpawnAndGoal() {
	push();
	fill(0, 255, 0);
	rect(0, 0, 25, 25);
	pop();
	push();
	fill(255, 0, 0)
	rect(1000-25, floor(size.y/2)*25, 25, 25);
	pop()
}
function generateWalls(quantidade) {
	let mapMatrix = generateMatrix();
	let i = 0;
	mapMatrix[floor(size.y/2)][size.x-1] = 0;
	mapMatrix[0][0] = Infinity;
	while(i < quantidade) {
		let pos = {i: floor(random(size.y)), j: floor(random(size.x))}
		if(mapMatrix[pos.i][pos.j] == null && (pos.j) != size.x-1 && pos.j != 0) {
			mapMatrix[pos.i][pos.j] = -1;
			i++;
		}
	}
	return mapMatrix;
}
function waveFrontGenerate(matrixWalls) {
	let cords = [];
	matrixWaveFront[floor(size.y/2)][size.x-1] = 0;
	for(let i = 0; i < matrixWalls.length; i++) {
		for(let j = 0; j < matrixWalls[i].length; j++) {
			if(matrixWalls[i][j] == -1) matrixWaveFront[i][j] = Infinity;
			if(matrixWaveFront[i][j] == currentIndex) cords.push({i: i, j: j});
		}
	}
	for(let i = 0; i < cords.length; i++) {
		let currentCord = cords[i];
		if(typeof matrixWaveFront[currentCord.i+1] != 'undefined' && matrixWaveFront[currentCord.i+1][currentCord.j] == null ) matrixWaveFront[currentCord.i+1][currentCord.j] = currentIndex+1;
		if(typeof matrixWaveFront[currentCord.i-1] != 'undefined' && matrixWaveFront[currentCord.i-1][currentCord.j] == null) matrixWaveFront[currentCord.i-1][currentCord.j] = currentIndex+1;
		if(typeof matrixWaveFront[currentCord.i][currentCord.j+1] != 'undefined' && matrixWaveFront[currentCord.i][currentCord.j+1] == null) matrixWaveFront[currentCord.i][currentCord.j+1] = currentIndex+1;
		if(typeof matrixWaveFront[currentCord.i][currentCord.j-1] != 'undefined' && matrixWaveFront[currentCord.i][currentCord.j-1] == null) matrixWaveFront[currentCord.i][currentCord.j-1] = currentIndex+1;
	
	}
	currentIndex++;
}




function generateMatrix() {
	let mapMatrix = [];
	for(let i  = 0; i < size.y; i++) {
		mapMatrix[i] = [];
		for(let j = 0; j < size.x; j ++) {
			mapMatrix[i][j] = null;
		}
	}
	return mapMatrix;
}


function drawWalls(arrayWalls) {
	for(let i = 0; i < arrayWalls.length; i++) {
		for(let j = 0; j < arrayWalls[i].length; j++) {
			if(arrayWalls[i][j] == -1) rect(j*25, i*25, 25 ,25)
		}
	}
}