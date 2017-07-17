/* *************************
    The below code is the Writer object control.
************************* */
/**
 * Create a new Writer object.
 * @param {Object} target - The target HTML element being written to.
 * @param {Object} cursor - The cursor HTML element.
 * @param {Object} mark - The mark HTML element.
 * @param {number} typeSpeed - The speed in ms at which each character is typed.
 * @param {boolean} autoErase - True: Erase after writing. False: Don't.
 * @param {boolean} loop - True: Write then Erase infinitum. False: Don't.
 * @param {number} eraseDelay - The time in ms which Auto-Erase takes effect after writing.
 * @returns {Object} Return the newly built Writer object.
 */
function Writer(target, cursor, mark, typeSpeed, autoErase, loop, eraseDelay){
    var writer = {};
    
    writer.target       = target;
    writer.cursor       = cursor;
    writer.mark         = mark;    
    writer.typeSpeed    = typeSpeed;
    writer.autoErase    = autoErase;
    writer.loop         = loop;
    writer.eraseDelay   = eraseDelay;
    
    
    /**
     * Sets the mark of the writer.
     * @param {string} char - The character being set as the mark.
     */
    writer.setMark = function(char){
        writer.mark.text(char);
    };
    
    /**
     * Sets the cursor of the writer.
     * @param {string} char - The character being set as the cursor.
     */
    writer.setCursor = function(char){
        writer.cursor.text(char);
    };
    
    /**
     * Sets the Type-Speed of the writer.
     * @param {number} speed - The speed in ms at which each character is typed.
     */
    writer.setTypeSpeed = function(speed){
        writer.typeSpeed = speed;
    };
    
    /**
     * Sets the Auto-Erase function of the writer.
     * @param {boolean} bool - True: On, False: Off
     */
    writer.setAutoErase = function(bool){
        writer.autoErase = bool;
    };
    
    /**
     * Sets the Delay until Auto-Erase begins.
     * @param {number} delay - The time in ms to delay auto-erase.
     */
    writer.setEraseDelay = function(delay){
        writer.eraseDelay = delay;
    };
    
    /**
     * Sets the Loop function of the writer.
     * @param {boolean} bool - True: On, False: Off
     */
    writer.setLoop = function(bool){
        writer.loop = bool;
    };

    /**
     * Animate the cursor from opacity of 0 to opacity of 1.
     * @param {number} speed - The speed of the blinking cursor.
     */
    writer.animateCursor = function(speed){
        writer.cursor.animate({
            opacity:0
        }, speed, "linear").animate({
            opacity:1
        }, speed, "linear");
    };
    
    /**
     * Write the desired message to the target element. Auto-Erase if True, after desired delay. Otherwise, don't.
     * @param {string} message  - The message being written.
     * @param {number} index - The index of the message to start writing from.
     */
    writer.write = function(message, index){
        writer.target.text(message.substr(0, index));
        if(index < message.length+1){
            setTimeout(function(){
                writer.write(message, index+1);
            }, writer.typeSpeed);
        } else {
            if(autoErase){
                setTimeout(function(){
                    writer.erase(message, message.length);
                }, eraseDelay);
            }
        }
    };
    
    /**
     * Erase the desired message from the target element. Repeat if True, after desired delay. Otherwise, don't.
     * @param {string} message - The message being erased.
     * @param {number} index - The index of the message to start erasing from.
     */
    writer.erase = function(message, index){
        writer.target.text(message.substr(0, index));
        if(index > 0){
            setTimeout(function(){
                writer.erase(message, index-1);
            }, writer.typeSpeed);
        } else {
            if(loop){
                setTimeout(function(){
                    writer.write(message, 0);
                }, eraseDelay);
            }
        }
    };
    
    return writer;
}

/* *************************
    The below code is an example of any executable javascript calling the Writer object functions.
************************* */
var write = new Writer($("#write"), $("#write-cursor"), $("#write-mark"), 400, false, false, 0);
var both = new Writer($("#both"), $("#both-cursor"), $("#both-mark"), 100, true, false, 1000);
var erase = new Writer($("#erase"), $("#erase-cursor"), $("#erase-mark"), 300, false, false, 0);
var repeat = new Writer($("#repeat"), $("#repeat-cursor"), $("#repeat-mark"), 100, true, true, 1000);

write.setMark(">");
write.setCursor("_");
both.setMark(">");
both.setCursor("_");
erase.setMark(">");
erase.setCursor("_");
repeat.setMark(">");
repeat.setCursor("_");

setInterval(function(){
    write.animateCursor(800);
    erase.animateCursor(600);
    both.animateCursor(200);
    repeat.animateCursor(400);
}, 0);

var writeMessage = "Hello World";
var eraseMessage = "Goodbye World";
var bothMessage = "Hello and Goodbye World";
var repeatMessage = "Hello forever, Goodbye forever";

setTimeout(function(){
    write.write(writeMessage, 0);
    both.write(bothMessage, 0);
    erase.erase(eraseMessage, eraseMessage.length);
    repeat.write(repeatMessage, 0);
}, 500);
