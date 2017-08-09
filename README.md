# Pixel Blue Writer
_Typewriter styled text animations for any webpage using HTML5, CSS3, JavaScript, and jQuery._

## About
Initially this script was created to animate certain webpage text with a typewriter styled effect for my personal website. Since then, I've wanted to update it with more additional features and animations. I've also been working on making it easy to plug-n-play for anyone else looking for a similair script. All functions are documented with JSDoc notation. 

For a live demo, view on [CodePen](https://codepen.io/pxlblue/full/WOmddR).

## v1.0 Progress
- [ ] Visual Writer Creation Tool
- [x] Write/Erase
    - [x] Write un-written messages
    - [x] Erase pre-written messages
    - [x] Auto-Erase messages after being written
    - [x] Write/Erase message(s) endlessly
- [ ] Animations
    - [x] "Type-Writer" animation
    - [ ] "Scramble" and "Unscramble" animation
    - [ ] "Random-Character" animation
    - [ ] "Slot-Machine" animation
- [x] Cursor
    - [x] Set Character
    - [x] "Blink" animation
- [x] Terminal Mark...? The thing on the left.

## How-To Use
pxbWriter.js uses a combination of HTML elements and JavaScript (using jQuery).

### HTML Setup
The `<html>` uses `<span>` elements to manage the individual Writer sections; **Target**, **Cursor**, and **Mark**. If you don't want to use a certain section, just leave it out of your `<html>`.

```HTML
<span id="target-mark"></span><span id="target"></span><span id="target-cursor"></span>
```

Next you'll need to call the pxbWriter.js file from the `<body>` element in your`<html>` file using the Writer. Make sure to call your local jQuery file as well, placing it above your Writer call.
```HTML
<html>
    <body>
        <div class="container">
            <p>
                <span id="target-mark"></span><span id="target"></span><span id="target-cursor"></span>
            </p>
        </div>
        <!-- Load pxbWriter.js -->
        <script src="jquery-3.2.1.min.js"></script>
        <script src="pxbWriter.js"></script>
    </body>
</html>
```
### JavaScript Setup
All documentation is available in the pxbWriter.js in JSDoc notation.

To start using the Writer, you first need to create a new Writer object. If you are choosing to not use certain `<html>` elements, substitute `$("")` for any elements not being used.
```JavaScript
var targetWriter = new Writer($("#target"), $("#target-cursor"), $("#target-mark"), 400, false, false, 0);
```
The above creates a writer object that only writes at a speed of 400ms/character. Now, we can use targetWriter to write to the target `<span>`.
```JavaScript
targetWriter.write("Hello World!", 0);
```
This will write the message 'Hello World!', starting at the String index of 0.

And that's it! You've created a Writer object and written your first message.

### Basic Functions
Set a Cursor
```JavaScript
targetWriter.setCursor("_");
```
Animate Cursor
```JavaScript
setInterval(function(){
    targetWriter.animateCursor(600);
}, 0);
```
Set a Terminal Mark
```JavaScript
targetWriter.setMark(">");
```
### List of Functions (A - Z)
- .animateCursor(speed);
    - Animate the blink of the cursor at the set speed.
- .erase(message, index);
    - Erase the specified message starting at the set String index.
- .setAutoErase(bool);
    - Set AutoErase to On (true) or Off (false).
- .setCursor(char);
    - Set the character for the cursor.
- .setEraseDelay(delay);
    - Set the AutoErase delay in ms.
- .setLoop(bool);
    - Set Loop to On (true) or Off (false).
- .setMark(char);
    - Set the character for the mark.
- .setTypeSpeed(speed);
    - Set the TypeSpeed for writing each character in ms.
- .write(message, index);
    - Write the specified message starting at the set String index.


## Version History
#### 07.17.17 14:13 v0.5
Additions
- Added demo.js file - executing JS from [CodePen](https://codepen.io/pxlblue/pen/WOmddR)

Revisions
- Updated README.md
---
#### 07.17.17 10:20 v0.4
Additions
- Added Endless-Loop option
- Created README.md documentation

Revisions
- Updated JSDoc notation
- Re-organized code
---
#### 07.14.17 22:35 v0.3
Additions
- Writer Object Creation
- Write message(s)
- Erase message(s)
- Auto-Erase message(s)
- Added functions for changing parameters to created Writers
- Added Re-Run button

Revisions
- Updated comments for re-used functions
- Re-organized code for new Object
---
#### 07.14.17 17:32 v0.2
Additions
- Added function to set Cursor
- Added function to set Mark

Revisions
- Updated all comments to JSDoc notation
- Re-organized function below executing js
---
#### 07.14.17 13:17 v0.1
Additions
- Animated Cursor
- Customizable Cursor (w/ charset)
- Customizable Mark (w/ charset)
- Typewriter Effect Message
- Typewriter Effect Erase
- Speed/Delay Control

Revisions
