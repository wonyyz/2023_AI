let speech;

function setup(){
  noCanvas();
  speechRec= new p5.SpeechRec('en-US', gotSpeech);
  let continuous = true;
  let interimResults = false;
  speechRec.start(continuous, interimResults);
  let output = select('#speech');
}

function gotSpeech(){
  console.log(speechRec);
  if (speechRec.resultValue){
    let said = speechRec.resultString;

    output.html(said);
  }
