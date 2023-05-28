// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
var texts = "Hello! Hello! Hello!";
var chars = [];
var up, down;
var directionX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  chars = texts.split('');
  up = 5;
  down =5;
  directionX =1;

  video = createCapture(VIDEO);
  video.size(width, height);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
//  background(255,255,255);
  if(pmouseX < mouseX){
    directionX =-1;
  }
  if(pmouseX>=mouseX){
    directionX =1;
  }
  for (var i =0; i<chars.length; i++){
    text(chars[i], mouseX+i*directionX*10, random(mouseY-down, mouseY+up));
  }
  
  drawKeypoints();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function drawKeypoints()  {
  for (let i=0; i<poses.length; i+=1){
    const pose = poses[i].pose;
    const keypoint = pose.keypoints[0];
    text("nose", keypoint.position.x, keypoint.position.y);
  }
}

