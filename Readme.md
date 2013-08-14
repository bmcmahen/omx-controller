## omx-controller
A simple wrapper for controlling OMXPlayer through node.


## Install

	npm install omx-controller

## Example
```javascript
var OMXControl = require('omx-controller');
var path = '/some/path/to/my/video/file.mp4';
var omx = new OMXControl(path, {
	'--vol' : 6,
	'-l': 'local'
});

omx.pause();

omx.on('error', function(err){
	console.log('uh oh');
});

omx.on('closed', function(){
	// player has closed, and the video has stopped.
});

omx.play();
```

Check the source for further playback methods, including `nextChapter`, `volumeUp`, etc.