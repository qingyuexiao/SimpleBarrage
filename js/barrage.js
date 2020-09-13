(function(window, $) {

    class Barrage {
        constructor(container, options) {
            this.container = typeof container == 'string' ? $(container) : container;
            if(options.opacity) {
                this.setOpacity(options.opacity)
            }
            this.comments = options.initialComments || [];
            this.rows = options.rows || 3;
            this.lineHeight = 24;
            this.marginLeft = 50;
            this.latestComments = [];
            this.rightestItem = null;
            this.enabled = false;
            if(options.autoStart !== false) {  //default auto start
                this.enableBarrage();
                this.enabled = true;
            }
        }
        setOpacity(opacity) {
            this.container.css({'opacity': opacity});
        }
        addCycleListener() {
            this.cycleListener = setInterval(() => {
                var pos = this.rightestItem.position();
                if(pos.left <= (0 - this.rightestItem.width())) {
                    this.latestComments = [];
                    this.initialBarrage();
                }
            }, 1000);
            return this.cycleListener;
        }
        clearCycleListener() {
            if(this.cycleListener) {
                clearInterval(this.cycleListener);
                this.cycleListener = null;
            }
        }
        initialBarrage() {
            this.container.empty();
            this.comments.map((item) => {
                this.upWall(item);
            });
        }
        upWall(item) {
            var pos = this.getPosition();
            var barrageItem = $('<span>').addClass('barrage-item ' + (item.color || '')).css({
                left: pos.left + 'px',
                top: pos.top + 'px'
            }).text(item.text).appendTo(this.container);

            if(this.rightestItem == null || ((pos.left + barrageItem.width()) > (this.rightestItem.position().left + this.rightestItem.width()))) {
                this.rightestItem = barrageItem;
            }

            if(this.latestComments.length >= (this.rows * 2)) {
                this.latestComments.shift();
            }
            this.latestComments.push(barrageItem);
            
            barrageItem.animate({
                left: 0 - Math.ceil(barrageItem.width())
            }, ((barrageItem.position().left + barrageItem.width())/100) * 1000, 'linear');
        }
        getPosition() {
            var containerWidth = $(this.container).width();
            if(this.latestComments.length == 0) {
                return {
                    top: 0,
                    left: containerWidth
                };
            }
            var lastItem = this.latestComments[this.latestComments.length - 1],
                posOfLastItem = {
                    left: Number(lastItem.css('left').replace('px', '')),
                    top: Number(lastItem.css('top').replace('px', ''))
                },
                posForNewItem = {};
            if(posOfLastItem.top == (this.lineHeight * (this.rows - 1))) {
                posForNewItem.top = 0;
            } else {
                posForNewItem.top = posOfLastItem.top + this.lineHeight;
            }
            if(this.latestComments.length < this.rows) {
                posForNewItem.left = (containerWidth + Math.ceil((Math.random() * 100)));
            } else {
                var previousItem = this.latestComments[this.latestComments.length - this.rows],
                    startLeft = previousItem.position().left + previousItem.width() + this.marginLeft + Math.ceil(Math.random() * 50);
                posForNewItem.left = startLeft < containerWidth ? containerWidth : startLeft;
            }
            return posForNewItem;
        }
        toggleBarrage() {
            this.enabled = !this.enabled;
            if(this.enabled) {
                this.enableBarrage();
            } else {
                this.disableBarrage();
            }
        }
        enableBarrage() {
            this.initialBarrage();
            this.addCycleListener();
        }
        disableBarrage() {
            this.container.empty();
            this.latestComments = [];
            this.rightestItem = null;
            this.clearCycleListener();
        }
        addComment({text, color}) {
            var comment = {
                id: this.comments.length + 1,
                text,
                color
            };
            this.comments.push(comment);
            this.upWall(comment);
        }
    };

    window.Barrage = Barrage;

})(window, jQuery);
