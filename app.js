const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia;

//select everything in my html
const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
//set the context of the canvas
const context = canvas.getContext("2d");
let model;

//status: it is loaded and everything is good or it is not 
//all the stream is basically info from webcam, passing that into the video source
handTrack.startVideo(video)
    .then(status => {
        if(status) {
            //whole thing is object
            navigator.getUserMedia({video:{}}, stream =>{
                video.srcObject  =  stream;
                //run it every 1000 seconds
                //setInterval(runDetection, 1000);
                runDetection();

            },
            err => console.log(err)
            ); 
        }
    });

function runDetection(){
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            //model.renderPredictions(predictions, canvas, context, video);
            if(predictions.length > 0){
                audio.play();
            }
            requestAnimationFrame(runDetection);
        }) //predictions: position of your hands and everything else
}



/*gonna take back the promise so after is is loaded
then we are gonna have the access to the loaded model*/
handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });