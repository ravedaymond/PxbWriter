# Pixel Blue Writer
*Typewriter styled text animations for any webpage using HTML5, JavaScript, and GSAP TweenLite.*

[TOC]
## About
This library was created to animate webpage text with a typewriter styled effect. Since then, plans have been made to update it with additional features and possibly typing styles. I've also been working on making it more available to anyone else with ease of plug-n-play.

If you do not wish to use or learn to use the full library, the [~~PxbWriter Creation Tool~~](https://pixelblue.io/portfolio/labs/pxbwriter/creationtool.html) can be used to create a lighter, minified version to write any desired message.

This is the first "release" of any code-base that I have created myself. Constructive criticism is appreciated!

All functions are documented with JSDoc notation.

[^note]: The PxbWriter Creation Tool is currently under development. It will be available at the concurrent link once completed, and the strikethrough will be removed from this documentation.

## How-To Use
To use this library you must use a combination of HTML elements and JavaScript (using [GSAP TweenLite](https://greensock.com/tweenlite)).

This How-To will be going over very basic usage of the PxbWriter library. At the end of this How-To, we will have created a Writer object that writes "Hello World!".

[^note]: Full tutorial documentation is planned, however it is not on my project stack at this moment.

### HTML Setup
On your desired webpages `<html>`, you will be required to use three elements to manage the sections of the writer; **Target**, **Cursor**, and **Mark**. If you don't want to use a certain section, just leave the corresponding element out of your `<html>`. However, the **Target** section is required at all times as it holds the message that the PxbWriter will be affecting.

```HTML
<span id="target-mark"></span><span id="target">Hello World!</span><span id="target-cursor"></span>
```

[^note]: The above example does not set any character or symbol for the Cursor or Mark sections being used. It also uses `<span>` elements. This is recommended for consistency, but this library should work with any three `<html>` elements.

For both the **Cursor** and **Mark** elements, ensure that they have the same ID as the **Target** element, with the addition of `-cursor` or `-mark` respectively.

Next you'll need to reference PxbWriter.js from the `<body>` element in your webpages `<html>` via an external `<script>` call. Make sure to add your local GSAP files for reference, or use the references in the following example.

```HTML
<!-- Reference GSAP TweenLite -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/TweenLite.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/plugins/CSSPlugin.min.js"></script>
<!-- Reference PxbWriter.js file -->
<script src="PxbWriter.js"></script>
```

[^note]: The above external `<script>` call for PxbWriter.js is assuming that you have the file stored in the same directory as the webpage using it.

### JavaScript Setup
Now that you have the necessary `<html>` elements and `<script>` calls in your webpage, you will need to create a new Builder object. The Builder controls all features and functions of your end Writer. 

```JavaScript
var builder = new PxbWriterBuilder("target", .15);
```

[^note]: There are a number of other functionalities to the PxbWriterBuilder class however, as stated earlier, this How-To will not be covering any feature but writing a given message.

The above will create a new Builder that will assign `<span id="target">` element that we created to be the message holder of the writer. It will also make the speed at which each character is typed 0.15 seconds. 

Now that we have our `builder` created and set the way we want, we can create a Writer object, and tell it to write our desired message starting at the first character in the message (String index of 0). This will write the message "Hello World!".

```JavaScript
var writer = builder.build();
writer.write(0);
```

![](C:\Users\daver\Desktop\write.gif)

Alternatively, we can also erase our message starting from its end. However, to do so we'll need to point at the last character in the message (String index of the message length - 1). We can use the `.getLength()` function for this. This will erase the message "Hello World!".

```JavaScript
writer.erase(writer.getLength());
```

![](C:\Users\daver\Desktop\erase.gif)

And that's it! You've created a PxbWriter object and written (or erased) your first message.

### Other Basic Functions
Enable Rewind

```JavaScript
/* Sets the Rewind status of the Writer. */
builder.enableRewind(true);
```

Enable Redo

```JavaScript
/* Sets the Redo status of the Writer. Erasing does not Redo correctly without Rewind enabled. */
builder.enableRedo(true);
```

Toggle Speed Type

```JavaScript
/* On call changes TypeSpeed to be based on the length of the Message, rather than individual Characters. */
builder.toggleSpeedType();
```

## List of Functions (A - Z)

### PxbWriterBuilder Object

- .setTarget(target);
    - *Sets the associated HTMLElements for the Builder, based on the ID of the Target element.*
- .getTarget();
    - *Returns the current HTMLElement being targeted.*
- .setMessage();
    - *Sets a new Message for the Builder.*
- .getMessage();
    - *Returns the current Message.*
- .setCursor(cursor);
    - *Sets the Cursor of the Builder.*
- .getCursor();
    - *Returns the current String/Character being used as the Cursor.* 
- .enableCursorAnimation(bool);
    - *Sets the Animation status of the Cursor.* 
- .setCursorSpeed(speed);
    - *Sets the animation speed of the Cursor. Converts Seconds (S) => Milliseconds (ms).*
- .setMark(mark);
    - *Sets the Mark of the Builder.*
- .getMark();
    - *Returns the current String/Character being used as the Mark.*
- .enableMarkAnimation(bool);
    - *Sets the Animation status of the Mark.*
- .setMarkSpeed(speed);
    - *Sets the animation speed of the Mark. Converts Seconds (S) => Milliseconds (ms).*
- .setTypeSpeed(speed);
    - *Sets the TypeSpeed of the writer. Converts Seconds (S) => Milliseconds (ms).*
- .getTypeSpeed();
    - *Returns the current TypeSpeed in Seconds (S).*
- .toggleSpeedType();
    - *On call changes TypeSpeed to be based on the length of the Message, rather than individual Characters.*
- .enableRewind(bool);
    - *Sets the Rewind status of the Builder.*
- .setRewindDelay(delay);
    - *Sets the RewindDelay of the Builder. Converts Seconds (S) => Milliseconds (ms). RewindDelay requires Rewind to be enabled.*
- .getRewindDelay();
    - *Returns the current RewindDelay in Seconds (S).*
- .enableRedo(bool);
    - *Sets the Redo status of the Writer.*
- .setRedoDelay();
    - *Sets the RedoDelay of the Builder. Converts Seconds (S) => Milliseconds (ms). RedoDelay requires Redo to be enabled.*
- .getRedoDelay();
    - *Returns the current RedoDelay in Seconds (S).*
- .build();
    - *Returns a fully built and independent Writer object based on the settings of the Builder.*

### PxbWriter Object

- .animateCursor();
  - *Begins animations of the Cursor based on the CursorSpeed set.*
- .animateMark();
  - *Begins animations of the Mark based on the MarkSpeed set.*
- .erase(index);
  -  *Erase the Message starting from the given String index.*
- .getLength();
  - *Returns the length of the Message used in this Writer*.
- .getStatus();
  - *Returns the status of the Writer.*
- .pause();
  - *Pauses the Writer and saves the last typed String index. Recommended for use with Event Listeners.*
- .resume();
  - *Resumes writing or erasing from the last String index it was paused at. Recommended for use with Event Listeners.*
- .stopCursor();
  - *On call, stops any animations of the Cursor and sets opacity to full.*
- .stopMark();
  - *On call, stops any animations of the Mark and sets opacity to full.*
- .write(index);
  - *Write the message starting from the given String index.*
## Version History

### 05.30.18 14:35UTC v1.0.0
Additions
- PxbWriterBuilder Class Object
- PxbWriter Class Object

Revisions

- Refactored existing code-base
- Library no-longer relies on jQuery - now utilizing [GSAP TweenLite](https://greensock.com/tweenlite)
- Updated README.md
  - Previous version history has been strike-d (deprecated) due to inaccuracy, but will be kept on this document for record.
---
#### ~~07.17.17 14:13 v0.5~~
~~Additions~~
- ~~Added demo.js file - executing JS from [CodePen](https://codepen.io/pxlblue/pen/WOmddR)~~

~~Revisions~~
- ~~Updated README.md~~
---
#### ~~07.17.17 10:20 v0.4~~
~~Additions~~
- ~~Added Endless-Loop option~~
- ~~Created README.md documentation~~

~~Revisions~~
- ~~Updated JSDoc notation~~
- ~~Re-organized code~~
---
#### ~~07.14.17 22:35 v0.3~~
~~Additions~~
- ~~Writer Object Creation~~
- ~~Write message(s)~~
- ~~Erase message(s)~~
- ~~Auto-Erase message(s)~~
- ~~Added functions for changing parameters to created Writers~~
- ~~Added Re-Run button~~

~~Revisions~~
- ~~Updated comments for re-used functions~~
- ~~Re-organized code for new Object~~
---
#### ~~07.14.17 17:32 v0.2~~
~~Additions~~
- ~~Added function to set Cursor~~
- ~~Added function to set Mark~~

~~Revisions~~
- ~~Updated all comments to JSDoc notation~~
- ~~Re-organized function below executing js~~
---
#### ~~07.14.17 13:17 v0.1~~
~~Additions~~
- ~~Animated Cursor~~
- ~~Customizable Cursor (w/ charset)~~
- ~~Customizable Mark (w/ charset)~~
- ~~Typewriter Effect Message~~
- ~~Typewriter Effect Erase~~
- ~~Speed/Delay Control~~
