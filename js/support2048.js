//存储number-cell中board[i][j]对应的文字信息显示在div中
var obj={
    0:'',
    2:'小白',
    4:'实习生',
    8:'程序员',
    16:'项目经理',
    32:'构架师',
    64:'技术经理',
    128:'高级经理',
    256:'技术总监',
    512:'副总裁',
    1024:'CTO',
    2048:'总裁'
}

//获取棋盘格每个的上偏移量
//兼容移动端尺寸，获取屏幕宽度
var documentWidth=window.screen.availWidth//当前设备可以使用的宽度;
// 棋盘格的宽度

var gridWidth=0.92*documentWidth;
var cellSideLength=0.18*documentWidth;
var cellSpace=0.04*documentWidth;
function getPosTop(i,j){
	return cellSpace+i*(cellSpace+cellSideLength);
}
//获取棋盘格每个的左偏移量
function getPosLeft(i,j){
	return cellSpace+j*(cellSpace+cellSideLength);
}
// 获取不同数字的不同背景色
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return '#eee4da';break;
		case 4:return '#ede0c8';break;
		case 8:return '#f2b179';break;
		case 16:return '#f59563';break;
		case 32:return '#f67c5f';break;
		case 64:return '#f65e3b';break;
		case 128:return '#edcf72';break;
		case 256:return '#edcc61';break;
		case 512:return '#9c0';break;
		case 1024:return '#33b5e5';break;
		case 2048:return '#09c';break;
		case 4096:return '#e6c';break;
		case 8192:return '#93c';break;
	}
	return 'black';

}
// 获取不同数字在不同背景色下的字体颜色
function getNumberColor(number){
	if(number<=4) return '#776e65';
	return 'white';

}
//判断能否向左移动
function canMoveLeft(board){
     	for(var i=0;i<4;i++){
     		for(var j=1;j<4;j++){//左边一束不用算
     			if(board[i][j]!=0){//元素不为空时
     			//左边元素为空或者左边元素等于该元素,依然可以向左移动
     			if(board[i][j-1]==0||board[i][j-1]==board[i][j]) return true;
     			

     			}
     		}
     	}

     return false;
 }
function canMoveRight(board){
     	for(var i=0;i<4;i++){
     		for(var j=2;j>=0;j--){//左边一束不用算
     			if(board[i][j]!=0){//元素不为空时
     			//左边元素为空或者左边元素等于该元素,依然可以向左移动
     			if(board[i][j+1]==0||board[i][j+1]==board[i][j]) return true;
     			

     			}
     		}
     	}

     return false;
 }
function canMoveUp(board){
     	for(var j=0;j<4;j++){//上边一行不用算
     		for(var i=1;i<4;i++){
     			if(board[i][j]!=0){//元素不为空时
     			//左边元素为空或者左边元素等于该元素,依然可以向左移动
     			if(board[i-1][j]==0||board[i-1][j]==board[i][j]) return true;
     			

     			}
     		}
     	}

     return false;
 }
 function canMoveDown(board){
     	for(var j=0;j<4;j++){//上边一行不用算
     		for(var i=2;i>=0;i--){
     			if(board[i][j]!=0){//元素不为空时
     			//左边元素为空或者左边元素等于该元素,依然可以向左移动
     			if(board[i+1][j]==0||board[i+1][j]==board[i][j]) return true;
     			

     			}
     		}
     	}

     return false;
 }
//判断棋盘格是否还有位置
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0) return false;
			//如果棋盘格中还有0的值就代表还有空位置，否则表示棋盘格被覆盖满了	
		}
	}
	return true;

}
// 判断元素前面是否有障碍物
function  noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!==0) return false;//表明两者之间存在障碍物
		
	}
	return true;

}
function  noBlockS(col,row1,row2,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!==0) return false;//表明两者之间存在障碍物
		
	}
	return true;

}
//是否能移动
function nomove(board){
	if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)) return false;
	return true;
	

}
