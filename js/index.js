var isMobile = false
var x,y,d;
var sample = []
var v = []


for(var i=0;i<6;i++) {
  sample[i] = new Tone.Player(`./Gyro_FX/Gyro_FX${i + 1}.wav`).toMaster();
  v[i] = 0;
}
var osc = new Tone.Oscillator({
  type: 'sine',
  frequency: 440,
}).toMaster();


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
    sample.forEach((s) => {
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
      
      if (rotationX > 0) {
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
        sample[i].volume.value = ( (v[i]) / (sum) ) * 90
      }

      
      
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
  text(sample[0].state + ' ' + sample[0].volume.value, 10, 130)
  text(sample[1].state + ' ' + sample[1].volume.value, 10, 150)
  text(sample[2].state + ' ' + sample[2].volume.value, 10, 170)
  text(sample[3].state + ' ' + sample[3].volume.value, 10, 190)
  text(sample[4].state + ' ' + sample[4].volume.value, 10, 210)
  text(sample[5].state + ' ' + sample[5].volume.value, 10, 230)
  textSize(20);
  fill('white');
  
  circle(x, y, d)

}