var isMobile = false
var oscFirst = new Tone.Oscillator({
  type  : 'sine' ,
  frequency  : 440 ,
}).toMaster();
var oscSecond = new Tone.Oscillator({
  type  : 'square' ,
  frequency  : 200 ,
}).toMaster();

var button_start;
var button_stop;
var x,y,d;



if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  isMobile=true
  if(window.DeviceOrientationEvent){
    window.addEventListener("deviceorientation", orientation, false);
  }else{
    console.log("DeviceOrientationEvent is not supported");
  }
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  d = 100
  x = (windowWidth-d)/2  
  y = (windowHeight-d)/2
  frameRate(120)
}


function touchStarted() {
    console.log(oscFirst.state)
    if(oscFirst.state == 'stopped') {
      oscFirst.start()
      oscSecond.start()
    } else {
      oscFirst.stop()
      oscSecond.stop()
    }
}



function draw() {
  
  background(22)
  text(`X:${rotationX}`, 10, 30);
  text(`Y:${rotationY}`, 10, 50);
  text(`Z:${rotationZ}`, 10, 70);
  textSize(20);
  fill('white');

  if(oscFirst.state == 'started') {
    if (isMobile){
      
      // x = map(rotationZ, -180, 180, 0, windowWidth)
      // y = map(rotationY, -90, 90, 0,windowHeight)
      // d = map(rotationX, 0, 180, 100, 200)
      
      oscFirst.volume.value  =  map((rotationZ > 180)?rotationZ-360:rotationZ,-180,180,0,100)
      oscSecond.volume.value =  map(rotationX,-90,90,0,100)
      
      
    }else{
      x = mouseX
      y = mouseY
      oscFirst.volume.value  =  map(mouseX,0,windowWidth,0,100)
      oscSecond.volume.value =  map(mouseY,0,windowHeight,0,100)
    }
      
  }

  
  
  circle(x, y, d)

}