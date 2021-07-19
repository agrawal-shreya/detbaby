od="";
img="";
status="";
objects=[];
name_person="";
l=0;
song="";
function preload() {    
    song=loadSound("song.mp3");
}
function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    od= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}
function draw() {
    image(video,0,0,380,380);
    
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        od.detect(video,gotResult);
       for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           
           if(objects[i].label=="person"){
            document.getElementById("baby_there").innerHTML = "Person Detected ="+objects.length;
            song.stop();
        }else{
            document.getElementById("baby_there").innerHTML = "Baby not Detected";
            song.play();    
        }
        }
       
        if(objects.length==0){
            document.getElementById("baby_there").innerHTML = "Baby not Detected";
            song.play();
        }

    }
}
function home() {
    window.location="index.html";
}
function modelLoaded() {
    console.log("model is loaded");
    status=true;
    od.detect(video,gotResult);
}
function gotResult(error,result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}