import menuMusic from '../sounds/3 Menu Music.wav';

var context = new AudioContext();
let source;
export default context;
export const stopMenuMusic = () => {
  source.stop();
};
export const playMenuMusic = () => {
  var url = menuMusic;
  source = context.createBufferSource();

  console.log('at start', source.buffer);
  //connect it to the destination so you can hear it.
  source.connect(context.destination);

  /* --- load buffer ---  */
  var request = new XMLHttpRequest();
  //open the request
  request.open('GET', url, true);
  //webaudio paramaters
  request.responseType = 'arraybuffer';
  //Once the request has completed... do this
  request.onload = function() {
    context.decodeAudioData(
      request.response,
      function(response) {
        /* --- play the sound AFTER the buffer loaded --- */
        //set the buffer to the response we just received.
        console.log('in response', source.buffer);
        source.buffer = response;
        //start(0) should play asap.
        source.start(0);
        source.loop = true;
      },
      function() {
        console.error('The request failed.');
      }
    );
  };
  //Now that the request has been defined, actually make the request. (send it)
  request.send();
};
