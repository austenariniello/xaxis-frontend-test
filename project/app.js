beginBannerAnimation(document.getElementsByClassName("img-160x600"));
beginBannerAnimation(document.getElementsByClassName("img-300x250"));
beginBannerAnimation(document.getElementsByClassName("img-300x600"));
beginBannerAnimation(document.getElementsByClassName("img-728x90"));

function beginBannerAnimation(frames) {

    for (var i = 0; i < frames.length; ++i) {
        frames[i].style.opacity = 1;
    }

    // z-index of top most frame
    var top = 1;

    // order of frames in the animation
    const frameOrder = [1, 0, 2, 0, 3, 4];
    // index of the frame order
    var iFrameOrder = 0;

    // index of the starting frame
    var curr = frameOrder[iFrameOrder];

    // initialize with the correct frame on top
    frames[curr].style.zIndex = top + 1;

    setInterval(changeFrame, 3000);

    async function changeFrame() {

        // index of next frame
        var nextFrame = frameOrder[(1+iFrameOrder) % frameOrder.length];

        // set the current frame to have a z index of top+1
        // set the next frame to have a z index of top
        // ensures that the current frame is on top
        // and the next frame is behind the current one
        frames[curr].style.zIndex = top + 1;
        frames[nextFrame].style.zIndex = top;

        // wait for the animation to be complete
        await transition();

        // put the current frame behind the next frame
        frames[curr].style.zIndex = top;
        frames[nextFrame].style.zIndex = top + 1;

        top = top + 1;

        frames[curr].style.opacity = 1;

        curr = nextFrame;

        iFrameOrder = iFrameOrder + 1;
    }

    // function for changing the opacity of the current frame at regular intervals
    function transition() {
        return new Promise(function (resolve, reject) {

            // val by which opacity is decreased every interval
            var del = 0.01;

            var id = setInterval(changeOpacity, 10);

            function changeOpacity() {
                frames[curr].style.opacity -= del;
                if (frames[curr].style.opacity <= 0) {
                    clearInterval(id);
                    resolve();
                }
            }
        })
    }

}