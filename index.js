var spawn = require('child_process').spawn;
var nodePath = require('path');
var util = require('util');
var events = require('events');

/**
 * OMXPlayer Controller
 * @param  {String} path    to video
 * @param  {Object} options Example: { '--vol': 1 }
 * @return {OMXPlayer}
 */

var OMXPlayer = function(path, options){
	if (!(this instanceof OMXPlayer)) return new OMXPlayer(path, options);
	events.EventEmitter.call(this);
	this.path = path;
	options = options || {};
	this.args = [path];
	for (var key in options) {
		if (options.hasOwnProperty(key)){
			this.args = this.args.concat([key, options[key]])
		}
	}
	this.start();
}

util.inherits(OMXPlayer, events.EventEmitter);

function mapKey(command, key, then){
	omx.prototype[command] = function(){
		omx.sendKey(key);
		if (then) then();
	}
}

OMXPlayer.prototype.start = function(){
	var omx = this.omx = spawn('omxplayer', this.args);

	omx.stdin.setEncoding('utf8');
	omx.stdout.setEncoding('utf8');
	omx.stderr.setEncoding('utf8');

	var self = this;

	omx.stderr.on('data', function(data){
		self.emit('data', data);
	});

	omx.stderr.on('data', function(data){
		self.emit('error', data);
	});

	omx.on('close', function(){
		self.emit('closed');
	});
};

OMXPlayer.prototype.sendKey = function(key){
	if (!this.omx) return;
	this.omx.stdin.write(key);
};

mapKey('pause', 'p');
mapKey('play', 'p');
mapKey('quit', 'q');
mapKey('forward', "\x5b\x43");
mapKey('backward', "\x5b\x43");
mapKey('volumeUp', '+');
mapKey('volumeDown', '-');
mapKey('toggleSubtitles', 's');
mapKey('nextSubtitleStream', 'm');
mapKey('previousSubtitleStream', 'n');
mapKey('nextChapter', 'o');
mapKey('previousChapter', 'i');

