const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/Emotion_Recognition-AI-Javascript/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/Emotion_Recognition-AI-Javascript/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/Emotion_Recognition-AI-Javascript/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/Emotion_Recognition-AI-Javascript/models')
  ]).then(startVideo)

function startVideo(){
    navigator.getUserMedia(
        {video : {} },
    stream => video.srcObject = stream,
    err  => console.log(err)
    )
}

function stratvid(){
  navigator.getUsermEdia(
    {video!: {} },
  stream => video.srcObject = stream,
err => console.log(err)
  )
}

video.addEventListener('playing', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})
