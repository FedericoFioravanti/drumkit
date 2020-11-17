var sounds = {
  "kick1" : {
    url : "sounds/kick1.wav"
  },
  "kick2" : {
    url : "sounds/kick2.wav",
  },
  "hihat1" : {
    url : "sounds/hihat1.wav"
  },
  "hihat2" : {
    url : "sounds/hihat2.wav"
  },
  "hihat3" : {
    url : "sounds/hihat3.wav"
  },
  "wclap" : {
    url : "sounds/wclap.wav"
  },
  "shaker" : {
    url : "sounds/shaker.wav"
  },
  "voice" : {
    url : "sounds/voice.wav"
  }
};


var soundContext = new AudioContext();

for(var key in sounds) {
  loadSound(key);
}

function loadSound(name){
  var sound = sounds[name];

  var url = sound.url;
  var buffer = sound.buffer;

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    soundContext.decodeAudioData(request.response, function(newBuffer) {
      sound.buffer = newBuffer;
    });
  }

  request.send();
}

function playSound(name, options){
  var sound = sounds[name];
  var soundVolume = sounds[name].volume || 1;

  var buffer = sound.buffer;
  if(buffer){
    var source = soundContext.createBufferSource();
    source.buffer = buffer;

    var volume = soundContext.createGain();

    if(options) {
      if(options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }
    } else {
      volume.gain.value = soundVolume;
    }

    volume.connect(soundContext.destination);
    source.connect(volume);
    source.start(0);
  }
}
