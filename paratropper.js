

function playSound(){
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = 'heli-sound.mp3';
  audio.autoplay = true;
  audio.loop = true;
  /*audio.onended = function(){
    audio.remove() //Remove when played.
  };*/
  document.body.appendChild(audio);
  console.log('playing!');
}
window.onkeydown = evt => {
  
    switch (evt.keyCode) {
        case 120:
            playSound();
            break;
        //Fallback to default browser behaviour
        default:
            return true;
    }
    //Returning false overrides default browser event
    return false;
};
function changeHeight(aircraftName){
        var currTop = document.getElementById(aircraftName).style.top;
        currTop.replace('px','');
        var randomUpDown = Math.floor((Math.random() * 2) + 1);
        if(randomUpDown==1){          
          currTop = parseInt(currTop)-10;        
        }else{
          currTop = parseInt(currTop)+10;        
        }
        if(currTop <= 20) currTop = 30;
        if(currTop >= 40) currTop = 40;
        document.getElementById(aircraftName).style.top = currTop + 'px';
        console.log(aircraftName+' at Altitude of '+currTop + ' pixels!'); 
}


function showExplosion(topValue, rightValue){
    document.getElementById('collision').style.display = 'block';
    document.getElementById('collision').style.top = topValue + 'px';
    document.getElementById('collision').style.right = rightValue + 'px';
    console.log('I am exploding at '+topValue);
    setTimeout(function(){
      document.getElementById('collision').style.display = 'none';
    }, 2000);
  }

setInterval(function(){
  var hr = parseInt(document.getElementById('heli').style.right.replace('px',''));
  var ht = parseInt(document.getElementById('heli').style.top.replace('px',''));
  var ar = parseInt(document.getElementById('aircraft').style.right.replace('px',''));
  var at = parseInt(document.getElementById('aircraft').style.top.replace('px',''));
  console.log(at,ht,Math.abs(ar-hr));
    if(ht==at && Math.abs(ar-hr) <=70) {showExplosion(ht-15,hr);document.getElementById('blast').play();}  
  },1000);

var direction='rtol';
var speed = 10;
setInterval(function(){ 
  var currRight = document.getElementById('heli').style.right;
  currRight.replace('px','');
  if(currRight=='') {
    document.getElementById('heli').style.right = "200px";
    document.getElementById('heli').style.top = "40px";
  }else{
    if(parseInt(currRight)>1650){ 
        direction='ltor';      
        document.getElementById('heli').classList.add('reverse');
        
        changeHeight('heli');
      }
      if(parseInt(currRight)<-200){              
        direction='rtol';      
        document.getElementById('heli').classList.remove('reverse');
        changeHeight('heli');
      }
    
    if(direction=='rtol'){      
      currRight = parseInt(currRight)+speed;
    }else{
      currRight = parseInt(currRight)-speed;
      }
    document.getElementById('heli').style.right = currRight+'px';
    //console.log(currRight);
  }
  
 },60);
 
 var a_direction='ltor';
var a_speed = 10;
setInterval(function(){ 
  var currRight = document.getElementById('aircraft').style.right;
  currRight.replace('px','');
  if(currRight=='') {
    document.getElementById('aircraft').style.right = "200px";
    document.getElementById('aircraft').style.top = "20px";
  }else{
    if(parseInt(currRight)>1650){ 
        a_direction='ltor';      
        document.getElementById('aircraft').classList.remove('a_reverse');
        changeHeight('aircraft');
      }
      if(parseInt(currRight)<-200){              

        a_direction='rtol';      
        document.getElementById('aircraft').classList.add('a_reverse');
        changeHeight('aircraft');
      }
      
    
    if(a_direction=='rtol'){      
      currRight = parseInt(currRight)+a_speed;
    }else{
      currRight = parseInt(currRight)-a_speed;
      }
    document.getElementById('aircraft').style.right = currRight+'px';
    //console.log(currRight);
  }
  
 },100);  
  setTimeout(function(){ 
    document.getElementById('audioControl').play(); 
    //playSound();
    //console.log('Called playSound!');
  },500);


