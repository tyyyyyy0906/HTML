// 获取视频标签
let video = document.querySelector('video');
// 获取播放按钮
let playBtn = document.querySelector('.switch');
// 获取进度条
let progress = document.querySelector('.play-progress');
// 获取当前时间
let currTime = document.querySelector('.curr-time');
// 获取视频总时间
let totalTime = document.querySelector('.total-time');
// 获取全屏
let fullScreen = document.querySelector('.video-full');
// 控制区域
let control = document.querySelector('.control-item');
// 进度条handler
let handler = document.querySelector('.handler-item');
// 主题内容
let container = document.querySelector('.player-item');
// 时间
let tempTime = 0;
// 控制control栏的动画显示
let controlBar = undefined;
// control timer
let cTimer;

playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else video.pause();
    video.classList.remove(video.paused ? 'icon-play' : 'icon-pause');
    video.classList.add(video.paused ? 'icon-pause' : 'icon-play');
});

video.addEventListener('canplay', () => {
    timeFormat((tempTime = video.duration), totalTime);
});

video.addEventListener('timeupdate', () => {
    timeFormat(video.currentTime, currTime);
});

video.addEventListener('click', () => {
    clearTimeout(cTimer);
});

video.addEventListener('dblclick', () => {
    playScreenFull();
});

video.addEventListener('ended', () => {
    control.style.opacity = 1;
    control.style.bottom = 10 + 'px';
    control.style.visibility = 'unset';
});

container.onmouseover = () => {
    playBarAnimation('show');
};

container.onmouseout = () => {
    playBarAnimation('hide');
};

fullScreen.addEventListener('click', () => {
    playScreenFull();
});

function playBarAnimation(state) {
    controlBar = state;
    if (video.paused) return;
    if (parseInt(control.style.bottom) < 0 && state === 'show') {
        control.style.opacity = 1;
        control.style.bottom = 10 + 'px';
        control.style.visibility = 'unset';
    } else {
        control.style.bottom = -50 + 'px';
        control.style.visibility = 'hidden';
        control.style.opacity = 0;
    }
}

function playScreenFull() {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
    else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
    else if (video.msRequestFullScreen) video.msRequestFullScreen();
}

function timeFormat(value, item) {
    let vhour = Math.floor(value / 3600);
    let vmina = Math.floor((value % 3600) / 60);
    let vseco = Math.floor(value % 60);

    vhour = vhour >= 10 ? vhour : '0' + vhour;
    vmina = vmina >= 10 ? vmina : '0' + vmina;
    vseco = vseco >= 10 ? vseco : '0' + vseco;

    item.innerHTML = vhour + ':' + vmina + ':' + vseco;

    if (item === currTime) {
        let stepTime = value / tempTime;
        console.log('curr progress update value = ', stepTime * 100);
        handler.style.width = 100 * stepTime + '%';
    }
}
