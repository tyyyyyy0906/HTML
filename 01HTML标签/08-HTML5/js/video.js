(function (window, document) {
    let video = document.querySelector('video');
    let playe = document.querySelector('.switch');
    let currTime = document.querySelector('.curr-time');
    let totalTime = document.querySelector('.total-time');
    let fullScreen = document.querySelector('.video-full');
    let control = document.querySelector('.control-item');
    let handler = document.querySelector('.handler-item');
    let container = document.querySelector('.player-item');

    const playerControl = {
        init: function () {
            let that = this;
            that.initControls();
            that.itemControls();
        },
        initControls: function () {
            playerControl.showHideControls();
        },
        showHideControls: function () {
            eventBand(video, 'ended', shownControlItem);
            eventBand(container, 'mouseover', shownControlItem);
            eventBand(container, 'mouseout', hideControlItem);
        },
        itemControls: function () {
            eventBand(playe, 'click', playControl);
            eventBand(video, 'dblclick', itemFullScreen);
            eventBand(video, 'ended', shownControlItem);
            eventBand(fullScreen, 'click', itemFullScreen);
            eventBand(video, 'canplay', totalVideoTime);
            eventBand(video, 'timeupdate', updateCurrTime);
        },
    };

    playerControl.init();

    function eventBand(ele, eventname, callback) {
        if (window.addEventListener) {
            ele.addEventListener(eventname, callback);
        } else {
            ele.attachEvent('on' + eventname, callback);
        }
    }

    // 视频播放控制
    function playControl() {
        if (video.paused || video.ended) {
            if (video.ended) video.currentTime = 0;
            video.play();
        } else {
            video.pause();
        }
    }

    // 全屏控制
    function itemFullScreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.msRequestFullScreen) {
            video.msRequestFullScreen();
        }
    }

    // 视频操作item的shown
    function shownControlItem() {
        control.style.opacity = 1;
        control.style.bottom = 10 + 'px';
        control.style.visibility = 'unset';
    }

    // 视频操作item的hide
    function hideControlItem() {
        control.style.bottom = -50 + 'px';
        control.style.visibility = 'hidden';
        control.style.opacity = 0;
    }

    function updateCurrTime() {
        currTime.innerHTML = timerFormat(video.currentTime);
        let percent = video.currentTime / video.duration;
        handler.style.width = 100 * percent + '%';
    }

    function totalVideoTime() {
        totalTime.innerHTML = timerFormat(video.duration);
    }

    function timerFormat(value) {
        let vhour = Math.floor(value / 3600);
        let vmina = Math.floor((value % 3600) / 60);
        let vseco = Math.floor(value % 60);

        vhour = vhour >= 10 ? vhour : '0' + vhour;
        vmina = vmina >= 10 ? vmina : '0' + vmina;
        vseco = vseco >= 10 ? vseco : '0' + vseco;

        return vhour + ':' + vmina + ':' + vseco;
    }
})(this, document);
