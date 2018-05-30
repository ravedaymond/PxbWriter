/**
 * @author Dave Raymond <daveraymond@pixelblue.io>
 * @version 1.0.0
 */
class PxbWriterBuilder{
    /**
     * WriterBuilder constructor.
     * @param {String} target The ID of the HTMLElement being targeted.
     * @param {Number} speed The initial TypeSpeed of the Message.
     */
    constructor(target, speed){
        this.target             = document.getElementById(target);
        this.typeSpeed          = speed*1000;
        this.message            = this.target.innerText;
        this.cursor             = document.getElementById(this.target.id + "-cursor");
        this.cursorAnimated     = false;
        this.cursorSpeed        = 800;
        this.mark               = document.getElementById(this.target.id + "-mark");
        this.markAnimated       = false;
        this.markSpeed          = 800;
        this.rewind             = false;
        this.rewindDelay        = 3000;
        this.redo               = false;
        this.redoDelay          = 3000;
    }
    /**
     * Sets the associated HTMLElements for the Builder, based on passed ID of the Target element.
     * @param {String} target The ID of the new HTMLElement being targeted.
     */
    setTarget(target){
        this.target = document.getElementById(target);
        this.mark   = document.getElementById(target+"-mark");
        this.cursor = document.getElementById(target+"-cursor");
    }
    /**
     * @return {HTMLElement} Returns the current HTMLElement being targeted.
     */
    getTarget(){
        return this.target;
    }
    /**
     * Sets a new Message for the Builder.
     * @param {String} message The String Message being set.
     */
    setMessage(message){
        this.message = message;
    }
    /**
     * @return {String} Returns the current Message.
     */
    getMessage(){
        return this.message;
    }
    /**
     * Sets the Cursor of the Builder.
     * @param {String} cursor The new String/Character being set as the Cursor.
     */
    setCursor(cursor){
        this.cursor.innerText = cursor;
    }
    /**
     * @return {String} Returns the current String/Character being used as the Cursor.
     */
    getCursor(){
        return this.cursor.innerText;
    }
    /**
     * Sets the Animation status of the Cursor.
     * @param {Boolean} bool True: On (Default); False: Off;
     */
    enableCursorAnimation(bool){
        this.cursorAnimated = bool;
    }
    /**
     * Sets the animation speed of the Cursor. Converts Seconds (S) => Milliseconds (ms).
     * @param {Number} speed The speed in Seconds(S) at which the Cursor will animate. (Default: 0.8)
     */
    setCursorSpeed(speed){
        this.cursorSpeed = speed*1000;
    }
    /**
     * Sets the Mark of the Builder.
     * @param {String} mark The new String/Character being set as the Mark.
     */
    setMark(mark){
        this.mark.innerText = mark;
    }
    /**
     * @return {String} Returns the current String/Character being used as the Mark.
     */
    getMark(){
        return this.mark.innerText;
    }
    /**
     * Sets the Animation status of the Mark.
     * @param {Number} bool True: On; False: Off (Default); 
     */
    enableMarkAnimation(bool){
        this.markAnimated = bool;
    }
    /**
     * Sets the animation speed of the Mark. Converts Seconds (S) => Milliseconds (ms).
     * @param {Number} speed The speed in Seconds(S) at which the Mark will animate. (Default: 0.8)
     */
    setMarkSpeed(speed){
        this.markSpeed = speed*1000;
    }
    /**
     * Sets the TypeSpeed of the Builder. Converts Seconds (S) => Milliseconds (ms).
     * @param {Number} speed The speed in Seconds(S) at which the whole message will be typed.
     */
    setTypeSpeed(speed){
        this.typeSpeed = speed*1000;
    }
    /**
     * @return {Number} Returns the current TypeSpeed in Seconds (S).
     */
    getTypeSpeed(){
        return typeSpeed/1000;
    }
    /**
     * On call changes TypeSpeed to be based on the length of the Message, rather than individual Characters.
     */
    toggleSpeedType(){
        this.typeSpeed /= (this.getMessage().length);
    }
    /**
     * Sets the Rewind status of the Builder.
     * @param {Boolean} bool True: On; False: Off (Default);
     */
    enableRewind(bool){
        this.rewind = bool;
    }
    /**
     * Sets the Rewind Delay of the Builder. Converts Seconds (S) => Milliseconds (ms). Rewind Delay requires Rewind to be enabled.
     * @param {Number} delay The delay in Seconds (S) to wait before starting Rewind.
     */
    setRewindDelay(delay){
        this.rewindDelay = delay*1000;
    }
    /**
     * @return {Number} Returns the current Rewind Delay in Seconds (S).
     */
    getRewindDelay(){
        return this.rewindDelay/1000;
    }
    /**
     * Sets the Redo status of the Builder. Erasing does not Redo correctly without Rewind enabled.
     * @param {Boolean} bool True: On; False: Off (Default);
     */
    enableRedo(bool){
        this.redo = bool;
    }
    /**
     * Sets the Redo Delay of the Builder. Converts Seconds (S) => Milliseconds (ms). Redo Delay requires Redo to be enabled.
     * @param {Number} delay The delay in Seconds (S) to wait before starting Redo.
     */
    setRedoDelay(delay){
        this.redoDelay = delay*1000;
    }
    /**
     * @return {Number} Returns the current RedoDelay in Seconds (S).
     */
    getRedoDelay(){
        return this.redoDelay/1000;
    }
    /**
     * @return {Object} Returns a fully built and independent Writer object based on the settings of the Builder.
     */
    build(){
        return new PxbWriter(
            this.target,
            this.message,
            this.typeSpeed,
            this.cursor,
            this.cursorAnimated,
            this.cursorSpeed,
            this.mark,
            this.markAnimated,
            this.markSpeed,
            this.redo,
            this.redoDelay,
            this.rewind,
            this.rewindDelay
        );
    }
}

class PxbWriter{
    constructor(aa, ab, ac, ba, bb, bc, ca, cb, cc, da, db, ea, eb){
        this.aa = aa; // target
        this.ab = ab; // message
        this.ac = ac; // type speed
        this.az; // writer timeout
        this.ba = ba; // cursor
        if(this.ba != undefined || this.ba != null){
            this.bb = bb; // cursor anim
            this.bc = bc; // cursor speed
            this.bz; // cursor interval
        } else {
            this.bb = false;
        }
        this.ca = ca; // mark
        if(this.ca != undefined || this.ca != null){
            this.cb = cb; // mark anim
            this.cc = cc; // mark speed
            this.cz; // mark interval
        } else {
            this.cb = false;
        }
        this.da = da; // redo
        this.db = db; // redo delay
        this.ea = ea; // rewind
        this.eb = eb; // rewind delay
        this.ya = ""; // substr placeholder
        this.yb; // last written index of substr when paused
        this.yy; // last Called - True: write(); False: rewind();
        this.yz = false; // Whether or not the writer is paused
        // x = locally used as this
        // z = locally used as index
    }
    /**
     * @return {Number} Returns the length of the Message used in this Writer.
     */
    getLength(){
        return this.ab.length;
    }
    /**
     * @return {String} Returns the status of the Writer. True: paused; False: running;
     */
    getStatus(){
        return "CursorAnim: "+this.bb+"\nMarkAnim: "+this.cb+"\nRedo: "+this.da+"\nRewind: "+this.ea+"\nPaused: "+this.yz;
    }
    /**
     * Pauses the Writer and saves the last typed String index. Recommended for use with EventListeners.
     */
    pause(){
        this.yz = true;
        this.yb = this.ya.length;
        clearTimeout(this.az);
    }
    /**
     * Resumes writing or erasing from the last String index it was paused at. Recommended for use with EventListeners.
     */
    resume(){
        this.yz = false;
        if(this.yy){
            this.write(this.yb);
        } else {
            this.erase(this.yb);
        }
    }
    /**
     * Begins animations of the Cursor based on the CursorSpeed set.
     */
    animateCursor(){
        if(this.bb){
            let x = this;
            this.bz = setInterval(function(){
                if(x.ba.style.opacity == 1.0){
                    TweenLite.to(x.ba, x.bc/1000, {css:{opacity:0.0}});
                } else if(x.ba.style.opacity == 0.0){
                    TweenLite.to(x.ba, x.bc/1000, {css:{opacity:1.0}});
                }
            }, 0);
        }
    }
    /**
     * On call, stops any animations of the Cursor and sets opacity to full.
     */
    stopCursor(){
        if(this.bb){
            clearInterval(this.bz);
            TweenLite.to(this.ba, this.bc/1000, {css:{opacity:1.0}});
        }
    }
    /**
     * Begins animations of the Mark based on the MarkSpeed set.
     */
    animateMark(){
        if(this.cb){
            let x = this;
            this.cz = setInterval(function(){
                if(x.ca.style.opacity == 1.0){
                    TweenLite.to(x.ca, x.cc/1000, {css:{opacity:0.0}});
                } else if(x.ca.style.opacity == 0.0){
                    TweenLite.to(x.ca, x.cc/1000, {css:{opacity:1.0}});
                }
            }, 0);
        }   
    }
    /**
     * On call, stops any animations of the Mark and sets opacity to full.
     */
    stopMark(){
        if(this.cb){
            clearInterval(this.cz);
            TweenLite.to(this.ca, this.cc/1000, {css:{opacity:1.0}});
        }
    }
    /**
     * Write the message starting from the given String index.
     * @param {Number} z The String index to begin writing the Message from.
     */
    write(z){
        this.yy = true;
        this.aa.innerText = "";
        this.ya = this.ab.substr(0, z);
        this.aa.innerText = this.ya;
        let x = this;
        if(z < this.ab.length){
            this.az = setTimeout(function(){
                x.write(z+1);
            }, this.ac);
        } else {
            if(this.ea){
                this.az = setTimeout(function(){
                    x.erase(x.ya.length);
                }, this.eb);
            } else if(this.da){
                this.az = setTimeout(function(){
                    x.write(0);
                }, this.db);
            }
        }
    }
    /**
     * Rewind the Message starting from the given String index.
     * @param {Number} z The String index to begin erasing the Message from.
     */
    erase(z){
        this.yy = false;
        this.ya = this.ab.substr(0, z);
        this.aa.innerText = this.ya;
        let x = this;
        if(z > 0){
            this.az = setTimeout(function(){
                x.erase(z-1);
            }, this.ac); 
        } else if(this.da){
            this.az = setTimeout(function(){
                x.write(0);
            }, this.db);
        }
    }
}