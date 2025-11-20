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

webCam();