
var board=new Array();
var score=0;
var hasConflicted=new Array();
//声明四个移动端手指触摸位置坐标
var startx=0,
starty=0,
endx=0,
endy=0;


$(document).ready(function(){
    //移动端尺寸
    prepareForMobile();
   newGame();//开始一个新的游戏
})
function newGame(){
    //初始化棋盘格
    init();

    // 在棋盘格两个格子中生成随机数
    generateOneNumber();
    generateOneNumber();

}
function generateOneNumber(){
    if(nospace(board)) return false;
         // 随机一个位置
         var randx=parseInt(Math.floor(Math.random()*4));
         var randy=parseInt(Math.floor(Math.random()*4));
         while (true){
            if(board[randx][randy]==0) break;
            randx=parseInt(Math.floor(Math.random()*4));
            randy=parseInt(Math.floor(Math.random()*4));
         }
         // 随机一个数字，随机生成二和四
         var randNumber=Math.random()<0.5?2:4;//以五五成的概率生成了2和4；
         // 在随机位置生成随机数字
         board[randx][randy]=randNumber; 
         //实现数字动画效果
         showAnimate(randx,randy,randNumber);
         return true;
     }
function prepareForMobile(){
    if(documentWidth>500){
        gridWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }
    //对整体容器设置
    $('#grid-container').css('width',gridWidth-2*cellSpace);
    $('#grid-container').css('height',gridWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridWidth);
    // 对每个棋盘格进行设置
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}
//初始化函数；
function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    for(var i=0;i<4;i++){
        board[i]=new Array();
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;//代表初始值没有发生任何碰撞


        }
    }

    updateBoardView();
    // 对分数的初始化
    score=0;
}
// 生成数字层函数
function updateBoardView(){
    $('.number-cell').remove();//初始化，开始将拥有number-cell值的删除
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            // 在页面上添加number-cell的div元素
            var str="<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>";
            $('#grid-container').append(str);
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            //设置每一个number-cell位置和颜色
            if(board[i][j]==0){//当number-cell值为0时，宽高为0，位置是居中
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);


            }else{//当有值时设置为宽高100，每个位置为覆盖grid-cell单元格
                theNumberCell.css('width',cellSideLength+'px');
                theNumberCell.css('height',cellSideLength+'px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(obj[board[i][j]]);


            }
            hasConflicted[i][j]=false;//从新归位
        }

       }
       $('.number-cell').css('line-height',cellSideLength+'px');
       $('.number-cell').css('font-size',0.24*cellSideLength+'px');
    }
    //产生随机数函数,生成随机位置和随机数字

     //获取玩家具体按键信息
     //这个是键盘事件，定义了四个键
     $(document).keydown(function(e){
        // 只需要判定玩家是否按下了上下左右四个键

        switch(e.keyCode){
            case 37://left
            //阻止滚动条的默认行为
            e.preventDefault();
            if(moveLeft()){
                setTimeout(generateOneNumber(),210);
                        //判断是否能够向左移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }

                     break;
            case 38://up
            //阻止滚动条的默认行为
            e.preventDefault();
            if(moveUp()){
                setTimeout(generateOneNumber(),210);
                        //判断是否能够向左移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }
                     break;
            case 39://right
            //阻止滚动条的默认行为
            e.preventDefault();
            if(moveRight()){
                setTimeout(generateOneNumber(),210);
                        //判断是否能够向左移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }
                     break;
            case 40://down
            //阻止滚动条的默认行为
            e.preventDefault();
            if(moveDown()){
                setTimeout(generateOneNumber(),210);
                        //判断是否能够向左移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }
                     break;
                     default:
                     break;
                 }

             })
// 移动端手指触摸事件,事件监听器
document.addEventListener('touchstart',function(e){
    startx=e.touches[0].pageX;
    starty=e.touches[0].pageY;


})
document.addEventListener('touchend',function(e){
    endx=e.changedTouches[0].pageX;
    endy=e.changedTouches[0].pageY;
    // 获取手机触摸开始到触摸结束时的移动位移

    var deltax=endx-startx;
    var deltay=endy-starty;
    if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth) return;
   //先判断是x移动位置大还是y移动位置大，来判断是向那个方向滑动
   if(Math.abs(deltax)>=Math.abs(deltay)){//x
    //判断x轴正向还是反向,
       if(deltax>0){//move right
        if(moveRight()){
            setTimeout(generateOneNumber(),210);
                        //判断是否能够向右移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }
       }else{//move left
        if(moveLeft()){
            setTimeout(generateOneNumber(),210);
                        //判断是否能够向左移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }

                 }
   }else{//y
    //判断x轴正向还是反向
       if(deltay>0){//move down
        if(moveDown()){
            setTimeout(generateOneNumber(),210);
                        //判断是否能够向下移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }

        }else{//move up
            if(moveUp()){
                setTimeout(generateOneNumber(),210);
                        //判断是否能够向上移动,
                        // 每新增一个数字都有可能导致游戏结束
                        setTimeout(isGameOver(),300);
                     }

                 }
             }

            })

     function moveLeft(){
        if(!canMoveLeft(board)) return false;   
        for(var i=0;i<4;i++){
            for(var j=1;j<4;j++){
                if(board[i][j]!=0){
                    for(var k=0;k<j;k++){//当此位置有值时判断他的左侧位置的
                        if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                             //如果该元素前面数字为空，且中间没有障碍物，就可以移动
                            //move
                            showMoveAnimate(i,j,i,k);//实现移动动画
                            board[i][k]=board[i][j];//将j位置元素赋值给k的位置
                            board[i][j]=0;//并将j位置元素赋值为0
                            continue;
                        }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
                            // 如果该元素前面有和自己数字相同的元素，而且二者之间也没有障碍物，就可以移动并且相加
                            //!hasConflicted表示没发生碰撞时，执行以下代码
                            //move
                            showMoveAnimate(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            //将j位置元素与k元素相加后赋值给k的位置

                            //分数叠加
                            score+=board[i][k];
                            //将分数添加到前台
                            updateScore(score);
                            board[i][j]=0;
                            hasConflicted[i][k]=true;
                            continue;

                        }


                    }
                }

            }
        }
        setTimeout("updateBoardView()", 200);//等动画执行完再对整体数据进行一次刷新
        return true; 
     }
     function moveRight(){
        if(!canMoveRight(board)) return false;
        for(var i=0;i<4;i++){
            for(var j=2;j>=0;j--){
                if(board[i][j]!=0){
                    for(var k=3;k>j;k--){//当此位置有值时判断他的左侧位置的
                        if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                             //如果该元素前面数字为空，且中间没有障碍物，就可以移动
                            //move
                            showMoveAnimate(i,j,i,k);//实现移动动画
                            board[i][k]=board[i][j];//将j位置元素赋值给k的位置
                            board[i][j]=0;//并将j位置元素赋值为0
                            continue;
                        }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
                            // 如果该元素前面有和自己数字相同的元素，而且二者之间也没有障碍物，就可以移动并且相加
                            //move
                            showMoveAnimate(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            //分数叠加
                            score+=board[i][k];
                            //将分数添加到前台
                            updateScore(score);//将j位置元素与k元素相加后赋值给k的位置
                            board[i][j]=0;
                            hasConflicted[i][k]=true;
                            continue;

                        }


                    }
                }

            }
        }
        setTimeout("updateBoardView()", 200);//等动画执行完再对整体数据进行一次刷新
        return true; 
        

     }
     function moveUp(){
        if(!canMoveUp(board)) return false;
        for(var j=0;j<4;j++){
            for(var i=1;i<4;i++){
                if(board[i][j]!=0){
                    for(var k=0;k<i;k++){//当此位置有值时判断他的左侧位置的
                        if(board[k][j]==0&&noBlockS(j,k,i,board)){
                             //如果该元素前面数字为空，且中间没有障碍物，就可以移动
                            //move
                            showMoveAnimate(i,j,k,j);//实现移动动画
                            board[k][j]=board[i][j];//将j位置元素赋值给k的位置
                            board[i][j]=0;//并将j位置元素赋值为0
                            continue;
                        }else if(board[k][j]==board[i][j]&&noBlockS(j,k,i,board)&&!hasConflicted[k][j]){
                            // 如果该元素前面有和自己数字相同的元素，而且二者之间也没有障碍物，就可以移动并且相加
                            //move
                            showMoveAnimate(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            //分数叠加
                            score+=board[k][j];
                            //将分数添加到前台
                            updateScore(score);//将j位置元素与k元素相加后赋值给k的位置
                            board[i][j]=0;
                            hasConflicted[k][j]=true;
                            continue;

                        }


                    }
                }

            }
        }
        setTimeout("updateBoardView()", 200);//等动画执行完再对整体数据进行一次刷新
        return true; 
        

     }
     function moveDown(){
        if(!canMoveDown(board)) return false;
        for(var j=0;j<4;j++){
            for(var i=2;i>=0;i--){
                if(board[i][j]!=0){
                    for(var k=3;k>i;k--){//当此位置有值时判断他的左侧位置的
                        if(board[k][j]==0&&noBlockS(j,i,k,board)){
                             //如果该元素前面数字为空，且中间没有障碍物，就可以移动
                            //move
                            showMoveAnimate(i,j,k,j);//实现移动动画
                            board[k][j]=board[i][j];//将j位置元素赋值给k的位置
                            board[i][j]=0;//并将j位置元素赋值为0
                            continue;
                        }else if(board[k][j]==board[i][j]&&noBlockS(j,i,k,board)&&!hasConflicted[k][j]){
                            // 如果该元素前面有和自己数字相同的元素，而且二者之间也没有障碍物，就可以移动并且相加
                            //move
                            showMoveAnimate(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            //分数叠加
                            score+=board[k][j];
                            //将分数添加到前台
                            updateScore(score);//将j位置元素与k元素相加后赋值给k的位置
                            board[i][j]=0;
                            hasConflicted[k][j]=true;
                            continue;

                        }


                    }
                }

            }
        }
        setTimeout("updateBoardView()", 200);//等动画执行完再对整体数据进行一次刷新
        return true; 
        

     }
     function isGameOver(){
        if(nospace(board)&&nomove(board)){
            gameover();
        }



     }
     function gameover(){
        alert('gameover');

     }

