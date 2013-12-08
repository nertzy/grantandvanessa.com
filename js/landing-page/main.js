function slideshow(){
  var $slideshow = $(".slideshow");

  var $images = $slideshow.find("img");
  $slideshow.append($images.get().reverse());
  $images.show();

  window.nextSlide = function nextSlide(){
    var $images = $slideshow.find("img");
    var $lastImage = $images.last();
    $lastImage.addClass("fade");

    setTimeout(function(){
      var $lastImage = $images.last();
      $lastImage.remove().removeClass("fade").prependTo($slideshow);
    }, 1000);
  };
}

var transitions = [
  3095,
  10580,
  17502,
  24398,
  31321,
  38296,
  45349,
  52349,
  59376,
  66508,
  73535,
  80509,
  87615,
  94772,
  101799,
  109009,
  116036,
  123272,
  130403,
  137451,
  157700
];

function setUpTransitions(sound){
  var fadeDuration = 400;
  var offset = fadeDuration / 2;
  _.each(transitions, function(timing){
    sound.onPosition(timing-offset, nextSlide);
  });
}

soundManager.debugMode = false;

soundManager.setup({
  url: '/bower_components/soundmanager/swf',
  onready: function() {
    var backgroundMusic = soundManager.createSound({
      url: '/music/then_he_kissed_me.mp3',
      onsuspend: function() {
        setUpTransitions(backgroundMusic);
        backgroundMusic.stop();
        syncPlayPause();
        syncMute();
      }
    });

    var $playPause = $(".play-pause");
    var $volume = $(".volume");

    function syncPlayPause(){
      if(backgroundMusic.paused || !backgroundMusic.playState) {
        $playPause
          .addClass("icon-play")
          .removeClass("icon-pause");
      } else {
        $playPause
          .addClass("icon-pause")
          .removeClass("icon-play");
      }
    }

    function syncMute(){
      if(backgroundMusic.muted) {
        $volume
          .addClass("icon-volume-mute")
          .removeClass("icon-volume-high");
      } else {
        $volume
          .addClass("icon-volume-high")
          .removeClass("icon-volume-mute");
      }
    }

    $playPause.on("click", function(){
      backgroundMusic.togglePause();
      syncPlayPause();
    });

    $volume.on("click", function(){
      backgroundMusic.toggleMute();
      syncMute();
    });

    $(document.body).on("keydown", function(event){
      if(event.keyCode === 27) {
        backgroundMusic.toggleMute();
        syncMute();
      }
    });

    setUpTransitions(backgroundMusic);
    backgroundMusic.play();
    syncPlayPause();
    syncMute();
  }
});

$(slideshow);
