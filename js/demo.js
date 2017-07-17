var write = new Writer(
  $("#write"),
  $("#write-cursor"),
  $("#write-mark"),
  400,
  false,
  false,
  0
);
var both = new Writer(
  $("#both"),
  $("#both-cursor"),
  $("#both-mark"),
  100,
  true,
  false,
  1000
);
var erase = new Writer(
  $("#erase"),
  $("#erase-cursor"),
  $("#erase-mark"),
  300,
  false,
  false,
  0
);
var repeat = new Writer(
  $("#repeat"),
  $("#repeat-cursor"),
  $("#repeat-mark"),
  100,
  true,
  true,
  1000
);

write.setMark(">");
write.setCursor("_");
both.setMark(">");
both.setCursor("_");
erase.setMark(">");
erase.setCursor("_");
repeat.setMark(">");
repeat.setCursor("_");

setInterval(function() {
  write.animateCursor(800);
  erase.animateCursor(600);
  both.animateCursor(200);
  repeat.animateCursor(400);
}, 0);

var writeMessage = "Hello World";
var eraseMessage = "Goodbye World";
var bothMessage = "Hello and Goodbye World";
var repeatMessage = "Hello forever, Goodbye forever";

setTimeout(function() {
  write.write(writeMessage, 0);
  both.write(bothMessage, 0);
  erase.erase(eraseMessage, eraseMessage.length);
  repeat.write(repeatMessage, 0);
}, 500);
