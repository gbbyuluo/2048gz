function showAnimate(i,j,randNumber){
 	//h获取number-cell元素
 	var numberCell=$('#number-cell-'+i+'-'+j);
 	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
 	numberCell.css('color',getNumberColor(randNumber));
 	numberCell.text(obj[randNumber]);
    //实现动画
    numberCell.animate({
    	width:cellSideLength,
    	height:cellSideLength,
    	top:getPosTop(i,j),
    	left:getPosLeft(i,j)
    },200)
 }
 // 实现数字移动动画函数,从原来位置top，left变成所要移动到的top left值
function showMoveAnimate(fromx,fromy,tox,toy){
 	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
 	numberCell.animate({
 		top:getPosTop(tox,toy),
 		left:getPosLeft(tox,toy)
 	},200);
 	

 }
 // 将分数添加到前台页面的函数
 function updateScore(score){
 	$('#score').text(score);

 }