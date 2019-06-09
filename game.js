const canvas = wx.createCanvas()
const ctx = canvas.getContext('2d')
var score = 0
var speed = 0
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


function renderGameScore(ctx, score) {
  ctx.fillStyle = "#1aad19"
  ctx.font = "20px Arial"

  ctx.fillText(
    score,
    10,
    30
  )
}


function randomNum(min, max) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1);
      break;
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min);
      break;
    default:
      return 0;
      break;
  }
}
var x1 = 0;
function fn(min, max) {

  //准备一个空数组用于返回
  var result;
  //创建一个随机数
  var num = randomNum(min, max);
  //对随机数检查 ，是否重复
  result = num;
  x1 = result;
  //           return result;

  console.log(result);

}
fn(0, 200);


const context = canvas.getContext('2d')// 创建一个 2d context
const context1 = canvas.getContext('2d')
const bg = wx.createImage()
bg.src = 'images/background.jpg'


function setup() {

  bg.onload = function () {
    context.drawImage(bg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

    console.log(0);
  }
}
setup()
var y2;
var x2;
context.fillStyle = '#1aad19' // 矩形颜色
context1.fillStyle = '#1aad19'
context.fillRect(canvas.width, 0, 50, x1); // 矩形左上角顶点为(canvas.width, 0)，右下角顶点为(50, x1)
context1.fillRect(canvas.width, x1 + 120, 50, canvas.height - (x1 + 120))
function drawRect(x, y) {
  x2=x;
  y2=y;
  if (speed < 4) {
    context.clearRect(x + 1 + speed + 0.41, y, 50, x1)
    context.drawImage(bg, x + 1 + speed + 0.41, y, 50, x1, x + 1 + speed + 0.41, y, 50, x1);
    context1.clearRect(x + 1 + speed + 0.41, x1 + 120, 50, canvas.height - (x1 + 120))
    context.drawImage(bg, x + 1 + speed + 0.41, x1 + 120, 50, canvas.height - (x1 + 120), x + 1 + speed + 0.41, x1 + 120, 50, canvas.height - (x1 + 120));
  }
  else {
    context.clearRect(x + 1 + speed, y, 50, x1)
    context.drawImage(bg, x + 1 + speed, y, 50, x1, x + 1 + speed, y, 50, x1)
    context1.clearRect(x + 1 + speed, x1 + 120, 50, canvas.height - (x1 + 120))
    context1.drawImage(bg, x + 1 + speed, x1 + 120, 50, canvas.height - (x1 + 120), x + 1 + speed, x1 + 120, 50, canvas.height - (x1 + 120))
  }
  context.fillRect(x, y, 50, x1)
  context1.fillRect(x, x1 + 120, 50, canvas.height - (x1 + 120))
}



const image = wx.createImage()
let imgX = canvas.width / 3
let imgY = canvas.height / 2 - 26
image.onload = function () {
  context.drawImage(image, imgX, imgY)
}
image.src = 'images/bird.png'


let rectX = canvas.width
const rectY = 0

var interval = setInterval(function test() {
  ctx.clearRect(0, 0, 50, 50);
  ctx.drawImage(bg, 0, 0, 50, 50, 0, 0, 50, 50);

  renderGameScore(ctx, score)
  rectX = rectX - 1 - speed
  drawRect(rectX, rectY)
  context.clearRect(imgX, imgY - 1, 33, 26);
  context1.drawImage(bg, imgX, imgY - 1, 33, 26, imgX, imgY - 1, 33, 26);
  context.drawImage(image, imgX, imgY++);



  let touchX = imgX;
  let touchY = imgY;
  if ((touchX >= rectX && touchX <= rectX + 50 && touchY <= x1) || (touchX + 33 >= rectX && touchX + 33 <= rectX + 50 && touchY <= x1) || (touchX >= rectX && touchX <= rectX + 50 && touchY + 26 >= x1 + 120) || (touchX + 33 >= rectX && touchX + 33 <= rectX + 50 && touchY + 26 >= x1 + 120)) { // bird与矩形发生碰撞
    clearInterval(interval); 
    wx.showModal({
      title: '它死了',
      content: '重新开始',
      showCancel: false,//是否显示取消按钮
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          context.clearRect(imgX-50, 0, imgX+50, canvas.height)
          context.drawImage(bg, imgX-50, 0, imgX + 50, canvas.height, imgX-50, 0, imgX + 50, canvas.height);
          context.clearRect(imgX, imgY - 1, 33, 26);
          context1.drawImage(bg, imgX, imgY - 1, 33, 26, imgX, imgY - 1, 33, 26);
          console.log(5);
          speed = 0;
          score=0;
          renderGameScore(ctx, score);
          rectX = canvas.width
          imgX = canvas.width / 3
          imgY = canvas.height / 2 - 26
          context.drawImage(image, imgX, imgY++);
          interval = setInterval(test, 16);
        }
      }


    })
  }

  if (imgY + 26 >= canvas.height||imgY<=0) {
    clearInterval(interval);                 //停止循环进行
    wx.showModal({
      title: '它死了',
      content: '重新开始',
      showCancel: false,//是否显示取消按钮
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          context.clearRect(0, 0, canvas.width, canvas.height)
          context.drawImage(bg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
          context.clearRect(imgX, imgY - 1, 33, 26);
          context1.drawImage(bg, imgX, imgY - 1, 33, 26, imgX, imgY - 1, 33, 26);
          console.log(5);
          speed = 0;
          score = 0;
          renderGameScore(ctx, score);
          rectX = canvas.width
          imgX = canvas.width / 3
          imgY = canvas.height / 2 - 26
          context.drawImage(image, imgX, imgY++);
          interval = setInterval(test, 16);
        }
      }
    })
  }


  if (rectX <= -50) {
    speed = speed + 0.4;
    if (speed > 4) { speed = 4 }
    score = score + 1;
    console.log(score);
    renderGameScore(ctx, score);
    context.clearRect(rectX, rectY, 1, x1);
    context1.clearRect(rectX, x1 + 33, 1, canvas.height - (x1 + 33));
    fn(0, 200);
    rectX = canvas.width
  }
}, 16)

wx.onTouchStart(function () {
  context.clearRect(imgX, imgY, 33, 26);
  context1.drawImage(bg, imgX, imgY, 33, 26, imgX, imgY, 33, 26);
  imgY = imgY - 30

  context.drawImage(image, imgX, imgY);
})





