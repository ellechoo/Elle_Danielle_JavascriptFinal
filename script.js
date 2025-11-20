const video = document.getElementById('video');

function webCam() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  }).then((stream) => {
    video.srcObject = stream;
  }).catch((err) => {
    console.error('Error accessing webcam: ', err);
  });
}

Promise.all([
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(webCam);

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);

  setInterval(async ()=>{
      const detection = await faceapi.detectAllFaces(video, new faceapi.withFaceLandmarks().withFaceExpressions());
      
      console.log(detection);

    }, 100);

  });