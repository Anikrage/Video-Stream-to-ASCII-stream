const density = "Ñ@#W$9876543210?!abc;:+=-,._";
// const density = '       .:-i|=+%O#@';
// const density = '        .:░▒▓█';

let video;
let asciiDiv;
let captureFrames = true;  // Set to true to start saving frames

function setup() {
  noCanvas();
  video = createVideo(['./video.mp4']);  // Load local video file
  video.size(80, 50);
  video.loop();  // Loop the video
  video.hide();  // Hide the actual video element
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);

  // Save frames as images
  if (captureFrames) {
    saveFrames('./output/ascii_video_frame', 'png', 1, 30, function(data) {
      // Callback after frames are saved, if needed
      console.log('Frames saved:', data);
    });
  }
}
