var isMobile = false
var x,y,d;
var sample = []
var v = []


for(var i=0;i<6;i++) {
  sample[i] = new Tone.Player(`./Gyro_FX/Gyro_FX${i + 1}.wav`).toMaster();
  v[i] = 0;
}


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
  if (sample[0].state == 'stopped') {
      sample.forEach((s)=> {
        s.start()
      })
    } else {
      sample.forEach((s)=> {
        s.stop()
      })
    }
}



function draw() {
  

  if(sample[0].state == 'started') {
    if (isMobile){
      
      if(rotateX > 0) {
        v[0] = Math.floor(map(rotationX, 0, 180, 0, 100))
        v[1] = 0
      } else {
        v[0] = 0
        v[1] = Math.floor(map(rotationX, 0, -180, 0, 100))
      }
      
      Z = (rotationZ > 180) ? rotationZ - 360 : rotationZ

      if (Z > 0 ) {
        v[2] = Math.floor(map(Z, 0, 180, 0, 100))
        v[3] = 0
      }else {
        v[2] = 0
        v[3] = Math.floor(map(Z, 0, -180, 0, 100))
      }


      if (rotationY > 0) {
        v[4] = Math.floor(map(rotationY, 0, 90, 0, 100))
        v[5] = 0
      } else {
        v[4] = 0
        v[5] = Math.floor(map(rotationY, 0, -90, 0, 100))
      }

      var sum =  v.reduce((a, b) => a + b);  

      for(var i=0;i<6;i++) {
        sample[i].volume.value = ( (v[i]) / (sum) ) * 80
      }
      // x = map(rotationZ, -180, 180, 0, windowWidth)
      // y = map(rotationY, -90, 90, 0,windowHeight)
      // d = map(rotationX, 0, 180, 100, 200)
      
      // oscFirst.volume.value  =  map((rotationZ > 180)?rotationZ-360:rotationZ,-180,180,0,100)
      // oscSecond.volume.value =  map(rotationX,-90,90,0,100)
      
      
    }else{
      x = mouseX
      y = mouseY
      
      v[0] = Math.floor(map(mouseX, 0, windowWidth, 0, 100))
      v[1] = Math.floor(map(mouseY, 0, windowHeight, 0, 100))
      v[2] = 0
      v[3] = 0
      v[4] = 0
      v[5] = 0

      var sum = v.reduce((a, b) => a + b);  
      for(var i = 0;i<6;i++) {
        sample[i].volume.value = Math.floor(((v[i]) / (sum)) * 80)
      }

    }
      
  }

  background(22)
  text(`X:${rotationX}`, 10, 30);
  text(`Y:${rotationY}`, 10, 50);
  text(`Z:${rotationZ}`, 10, 70);
  text(`Sum:${sum}`, 10, 90);
  text(v, 10, 110)
  textSize(20);
  fill('white');
  
  circle(x, y, d)

}