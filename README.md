# Barrage
Simple barrage sample based on jQuery lib (dom & animation).

## Get Start
1. Import barrage.js
``` html
<script src="js/barrage.js"></script>
```
2. Initial Barrage
``` javascript
var barrage = new Barrage('.barrage-container', {
    rows: 5,  //display rows, default as 3
    initialData: [{  //inital data if needed
      id: 1,
      text: 'hahaha',
      color: '' // default as white color, if not empty will apply as css class name
    }],
    opacity: 0.8,  //opacity of barrage font
    autoStart: false  //default start automatically
});
```

## APIs
* Use `addComment` to insert and display new comment.
``` javascript
barrage.addComment({
    text: 'that\'s funny',
    color: 'yellow'
});
```

* Use `toggleBarrage` to show/hide barrage.
``` javascript
barrage.toggleBarrage();  //toggle barrage
barrage.enableBarrage();  //show barrage
barrage.disableBarrage();  //hide barrage
```


* Use `setOpacity` to change the opacity of barrage font.
``` javascript
barrage.setOpacity(0.5);
```
