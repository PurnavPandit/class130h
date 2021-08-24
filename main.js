song1 = "";
song2 = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;
function preload(){
	
    song1 = loadSound("believer Mp3 Imagine dragon.mp3");
    song2 = loadSound("Thunder.mp3");
}
function setup(){
    canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500); 
	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
	}
	

	if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);
	}
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
  }

  function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
    }
}
function play(){
	if(scoreLeftWrist > 0.2)
	{
		song.play(song2);
	}
	else if (scoreLeftWrist < 0.2){
        song.stop(song2);
	} 
    if(scoreRightWrist > 0.2)
	{
		song.play(song1);
	}
	else if (scoreRightWrist < 0.2){
        song.stop(song1)
	} 
}