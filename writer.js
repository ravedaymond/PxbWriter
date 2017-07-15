var write = new Writer($("#write-mark"), $("#write-cursor"), $("#write"), 400, false, 0);
var both = new Writer($("#both-mark"), $("#both-cursor"), $("#both"), 100, true, 1000);
var erase = new Writer($("#erase-mark"), $("#erase-cursor"), $("#erase"), 300, false, 0);

write.setMark(">");
write.setCursor("_");
both.setMark(">");
both.setCursor("_");
erase.setMark(">");
erase.setCursor("_");

setInterval(function(){
    write.animateCursor(600);
    erase.animateCursor(600);
    both.animateCursor(600);
}, 0);


var writeMessage = "Hello World";
var eraseMessage = "Goodbye World";
var bothMessage = "Hello and Goodbye World";

setTimeout(function(){
    write.write(writeMessage, 0);
    both.write(bothMessage, 0);
    erase.erase(eraseMessage, eraseMessage.length);
}, 500);

/**
 * Create a new Writer object.
 * @param {Object} mark - The mark HTML element.
 * @param {Object} cursor - The cursor HTML element.
 * @param {Object} target - The target HTML element being written to.
 * @param {number} typeSpeed - The speed in ms at which each character is typed.
 * @param {boolean} autoErase - True: Erase after writing. False: Don't.
 * @param {number} eraseDelay - The time in ms which Auto-Erase takes effect after writing.
 * @returns {Object} Return the newly built Writer object.
 */
function Writer(mark, cursor, target, typeSpeed, autoErase, eraseDelay){
    var writer = {};
    writer.mark         = mark;
    writer.cursor       = cursor;
    writer.target       = target;
    writer.typeSpeed    = typeSpeed;
    writer.autoErase    = autoErase;
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
     * Erase the desired message from the target element.
     * @param {string} message - The message being erased.
     * @param {number} index - The index of the message to start erasing from.
     */
    writer.erase = function(message, index){
        writer.target.text(message.substr(0, index));
        if(index > 0){
            setTimeout(function(){
                writer.erase(message, index-1);
            }, writer.typeSpeed);
        }
    };
    
    return writer;
}