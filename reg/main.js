// ==================== LOADING ====================
// Detect when the page is loaded from cache
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        console.log("Page loaded from cache, reloading...");

        // Show a blank overlay to hide the old content
        const overlay = document.getElementById("reloading-overlay");
        overlay.style.display = "flex";

        // Reload the page
        window.location.reload();
    }
});

// Prevent caching by appending a timestamp to the URL
// if (!window.performance.getEntriesByType("navigation")[0].type.includes("reload")) {
//     const url = new URL(window.location.href);
//     url.searchParams.set("t", Date.now());
//     history.replaceState(null, "", url.toString());
// }

// ==================== SET CUSTOM HEIGHT OF THE MAIN CONTAINER ====================
function setVh() {
    // Get the actual viewport height
    let vh = window.innerHeight;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Call the function once to set the initial value
setVh();

// Listen to the resize and orientationchange events and call the function again
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);


// ==================== OPEN CAMERA AND MIC ON CLICK ====================
// Function to start the camera
var cameraPrompt = $(".camera-prompt");
var arAnimation = $(".ar-into-animation");
var mainContainer = $(".main-container");
var aiChat = $(".ai-chat ");
var aiVO = $("#ai-vo")[0];
var aiMusic = $("#ai-music")[0];
var aiMusic2 = $("#ai-music-2")[0];
var dummySound = $("#dummy-sound")[0];

var arIntro = $("#ar-intro")[0];
var arFlex = $("#ar-flex")[0];
var arBench = $("#ar-bench")[0];
var arDumbBell = $("#ar-dumb-bell")[0];
var arBag = $("#ar-bag")[0];


function enableMic() {
    recognition.start();

    setTimeout(offMic, 100);
    function offMic() {
        recognition.stop();
    }
}

async function enableCamera() {
    enableMic();
    try {
        // Request access to the rear camera
        const constraints = {
            video: { facingMode: { ideal: 'environment' } }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        // Set the video stream as the video source
        video.srcObject = stream;
        loadAllAnimations();
        loadAllAudio();
        $(".camera-prompt").addClass("d-none");
        $(".custom-popup").removeClass("d-none");

    } catch (error) {
        // Handle errors (e.g., permissions denied, no camera found)
        console.log(`Error: ${error.message}`);
    }
}
// $('.click-camera').on('click', enableCamera);

$(".click-camera").click(function () {
    enableCamera();
});



// ==================== AFTER ACCESS OPEN ELEMENTS ====================
// open this after all permissions are granted
function afterAccess() {
    $(".custom-popup").addClass("d-none");
    // ---------- CUSTOM CALLS ----------
    // $(".splash-page").removeClass("d-none");
    $(".all-prompts-container").addClass("d-none");
    $(".splash-page")[0].play();
    cameraPrompt.addClass("d-none");
    mainContainer.addClass("no-bg");

    setTimeout(doAfterLoad500, 500);
    function doAfterLoad500() {
        aiChat.removeClass("d-none");
    }

    setTimeout(doAfterLoad3000, 3000);
    function doAfterLoad3000() {
        $(".splash-page").addClass("d-none");
        $(".splash-page")[0].pause();

        $(".ivybears-header").removeClass("d-none");

        $('.suggestions-slider').slick({ // Slick slider options 
            dots: false,
            arrows: false,
            // infinite: true,
            speed: 300,
            slidesToShow: 1,
            touchThreshold: 10,
            variableWidth: true, // Allow different widths
            swipeToSlide: true, // Enable free scrolling effect

        });
    }
}

// ==================== BACK BUTTON ====================
$(".ivybears-header .back-button").click(function () {
    // CUSTOM CALL AFTER BACK
    $(".hold-to-speak.outside").removeClass("op-0-1");
    $(".hold-to-speak.outside").addClass("startVoice");
    $(".ai-chat .menu-container").removeClass("menu-done");
    $(".chatbot_inner_2").addClass("d-none");
    $(".mic-guide").addClass("d-none");
    $(".suggestions-slider").removeClass("d-none");
    $(".chatbot__box").addClass("op-0");
    $(".ivybears-header .back-button").addClass("d-none");
    // $('.suggestions-slider').slick('reinit');
    // stopAllSpeech();
    // $(".sound-toggle.off").removeClass("d-none");
    // $(".sound-toggle.on").addClass("d-none");

    $(".chatbot__chat.incoming").removeClass("listen-text");
    $(".sound-toggle.off").removeClass("d-none");
    $(".sound-toggle.on").addClass("d-none");
    stopAllSpeech();
    stopAnimation();
    // stopAnimateSpeaking();
    // stopIdleAnimation();
    // playIdleAnimation();

    // WITH CHAT
    $(".name-title").removeClass("op-0-1-none");
    $(".ai-chat .menu-container").removeClass("d-none");
    $(".ai-chat").removeClass("with-chat");
    $(".animation-sequence-container").removeClass("with-chat");
    $(".chatbot-content").removeClass("with-chat");
    $(".chatbot__box").removeClass("with-chat");

    $('.suggestions-slider').slick({ // Slick slider options 
        dots: false,
        arrows: false,
        // infinite: true,
        speed: 300,
        slidesToShow: 1,
        touchThreshold: 10,
        variableWidth: true, // Allow different widths
        swipeToSlide: true, // Enable free scrolling effect

    });
});

// ==================== PLUS ICON ====================
$(".plus-icon").click(function () {
    $(".plus-content").toggleClass("d-none");
});

// ==================== CLICK TO PLAY CHANGE CONTENT ====================
var clickToPlay = 0;
var timeOutPop = 0;
var timeOutPop1 = 0;
var timeOutPopAudio = 0;

var popWhole = $("#pop-whole")[0];
popWhole.load();

$(".click-to-play").click(function () {
    clickToPlay += 1;
    $(".hold-to-speak.outside").removeClass("op-0-1");
    $(".hold-to-speak.outside").addClass("startVoice");
    $(".ai-chat .menu-container").removeClass("menu-done");
    $(".chatbot_inner_2").addClass("d-none");
    $(".mic-guide").addClass("d-none");
    $(".suggestions-slider").removeClass("d-none");
    $(".chatbot__box").addClass("op-0");
    $(".ai-chat.back-button").addClass("d-none");

    $(".ai-chat").removeClass("op-1");
    $(".ai-chat").addClass("op-0");
    $(".ar-into-animation").removeClass("d-none");



    setTimeout(doAfterLoad, 500);
    function doAfterLoad() {
        $(".ai-chat").addClass("d-none");
        $(".ar-into-animation").removeClass("op-0");
        $(".ar-into-animation").addClass("op-1");
        $('.suggestions-slider').slick('unslick');
    }
    $(".chatbot__chat.incoming").removeClass("listen-text");
    $(".sound-toggle.off").removeClass("d-none");
    $(".sound-toggle.on").addClass("d-none");
    stopAllSpeech();
    stopAnimation();
    // stopAnimateSpeaking();
    stopIdleAnimation();
    aiMusic2.currentTime = 0;
    aiMusic2.play();


    // if first clicked
    if (clickToPlay <= 1) {
        popWhole.currentTime = 0;
        popWhole.play();
        setTimeout(doAfterLoad500, 500);
        function doAfterLoad500() {
            $(".png-sequence-ar").removeClass("d-none");
            playArIntroAnimation();
        }

        timeOutPop = setTimeout(delayPop, 5000);
        function delayPop() {
            $(".gadget-container .gadget-item:nth-child(1)").removeClass("op-0-1-none");
            $(".gadget-container .gadget-item:nth-child(1)").addClass("pop-item");

            timeOutPop1 = setTimeout(delayPop1, 150);
            function delayPop1() {
                $(".gadget-container .gadget-item:nth-child(2)").removeClass("op-0-1-none");
                $(".gadget-container .gadget-item:nth-child(2)").addClass("pop-item");

                timeOutPop1 = setTimeout(delayPop1, 150);
                function delayPop1() {
                    $(".gadget-container .gadget-item:nth-child(3)").removeClass("op-0-1-none");
                    $(".gadget-container .gadget-item:nth-child(3)").addClass("pop-item");

                    timeOutPop1 = setTimeout(delayPop1, 150);
                    function delayPop1() {
                        $(".gadget-container .gadget-item:nth-child(4)").removeClass("op-0-1-none");
                        $(".gadget-container .gadget-item:nth-child(4)").addClass("pop-item");

                        timeOutPop1 = setTimeout(delayPop1, 150);
                        function delayPop1() {
                            $(".menu-items .ask-me-anyting").removeClass("op-0-1-none");
                            $(".menu-items .ask-me-anyting").addClass("pop-item");

                        }
                    }

                }
            }
        }
    }

    else {
        playArIdleAnimation();
    }
});


function stopAllAr() {
    stopArIntroAnimation();
    stopArIdleAnimation();
    stopArFlexAnimation();
    stopArBenchAnimation();
    stopArDumbBellAnimation();
    stopArBagAnimation();
}

// ==================== CLICK FLEX ====================
$(".gadget-container .gadget-item:nth-child(1) .no-glow").click(function () {
    stopArIntroAnimation();
    stopArIdleAnimation();
    playArFlexAnimation();
    stopArBenchAnimation();
    stopArDumbBellAnimation();
    stopArBagAnimation();
    // setTimeout(doAfterLoad1, 1);
    // function doAfterLoad1() {
    // }
});

// ==================== CLICK BENCH ====================
$(".gadget-container .gadget-item:nth-child(2) .no-glow").click(function () {
    stopArIntroAnimation();
    stopArIdleAnimation();
    stopArFlexAnimation();
    playArBenchAnimation();
    stopArDumbBellAnimation();
    stopArBagAnimation();
});

// ==================== CLICK DUMB BELL ====================
$(".gadget-container .gadget-item:nth-child(3) .no-glow").click(function () {
    stopArIntroAnimation();
    stopArIdleAnimation();
    stopArFlexAnimation();
    stopArBenchAnimation();
    playArDumbBellAnimation();
    stopArBagAnimation();
});

// ==================== CLICK BAG ====================
$(".gadget-container .gadget-item:nth-child(4) .no-glow").click(function () {
    stopArIntroAnimation();
    stopArIdleAnimation();
    stopArFlexAnimation();
    stopArBenchAnimation();
    stopArDumbBellAnimation();
    playArBagAnimation();
});


// ==================== ASK ME ANYTHING CHANGE CONTENT ====================
$(".ask-me-anyting").click(function () {
    $(".ar-into-animation").removeClass("op-1");
    $(".ar-into-animation").addClass("op-0");
    $(".ai-chat").removeClass("d-none");
    playIdleAnimation();
    stopAllAr();
    aiMusic2.pause();
    // $('.suggestions-slider').slick('reinit');
    setTimeout(doAfterLoad, 500);
    function doAfterLoad() {
        $(".ar-into-animation").addClass("d-none");
        $(".ai-chat").removeClass("op-0");
        $(".ai-chat").addClass("op-1");
        $(".tap-to-learn-container").removeClass("d-none");
    }

    $('.suggestions-slider').slick({ // Slick slider options 
        dots: false,
        arrows: false,
        // infinite: true,
        speed: 300,
        slidesToShow: 1,
        touchThreshold: 10,
        variableWidth: true, // Allow different widths
        swipeToSlide: true, // Enable free scrolling effect

    });
});

// ==================== REMOVE ACCIDENTAL CLICK ON SLICK SLIDER ====================
let startX, startY;
$(".suggestions-box").on('mousedown touchstart', function (event) {
    startX = event.pageX || event.originalEvent.touches[0].pageX;
    startY = event.pageY || event.originalEvent.touches[0].pageY;
});

$(".suggestions-box").click(function (event) {
    const endX = event.pageX || event.originalEvent.changedTouches[0].pageX;
    const endY = event.pageY || event.originalEvent.changedTouches[0].pageY;

    // Check if the movement is significant enough to be considered a drag
    if (Math.abs(startX - endX) < 10 && Math.abs(startY - endY) < 10) {
        var childTextValues = $(this).children().map(function () {
            return $(this).text();
        }).get().join(' ');

        $('.chatbot__textarea').val(childTextValues);
        $("#send-btn").trigger("click");

        $(".suggestions-slider").addClass("d-none");
    }
});


// ==================== MAKE SUGGESTION BOXES SAME HEIGHT ====================
// all height the same
function suggestionBoxHeight() {
    //COPY MAX HEIGHT
    $(".suggestions-text").css("height", "auto");
    var maxHeight = 0;
    $('.suggestions-text').each(function () {
        var height = $(this).outerHeight();
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    // Set the maximum height to all divs
    $('.suggestions-text').css('height', maxHeight + 'px');
}
suggestionBoxHeight();

// Recalculate the height when the SLICK SLIDER position changes
$('.suggestions-slider').on('setPosition', function () {
    suggestionBoxHeight();
});


// ==================== AR BUTTON ANIMATIONS ====================
$(".no-glow").click(function () {
    $(this).addClass("d-none");
    $(this).parent().find(".with-glow").removeClass("d-none");

    $(this).parent().addClass("animation-select");
    $(this).parent().siblings().removeClass("animation-select");

    $(this).parent().siblings().find(".with-glow").addClass("d-none");
    $(this).parent().siblings().find(".no-glow").removeClass("d-none");

    $(".tap-to-learn-container").addClass("d-none");
});

// $(".with-glow").click(function () {
//     $(this).addClass("d-none");
//     $(this).parent().find(".no-glow").removeClass("d-none");

//     $(this).parent().removeClass("animation-select");
// });

// ==================== PNG SEQUENCE ====================
var introStart = 0;

// --------------- INTRO ANIMATION ---------------
let pngSeqframe = 0;
const totalFrames = 215; // Total frames from 00000 to 00180
const frameRate = 1000 / 30; // 30 frames per second
let pngSeqInterval;
const images = [];


function playAnimation() {
    const aiIntroImg = document.getElementById('aiIntroImg');
    pngSeqInterval = setInterval(function () {
        if (pngSeqframe < totalFrames) {
            aiIntroImg.src = `assets/Media/AIIntro/06_AI_Intro_${pngSeqframe.toString().padStart(5, '0')}.webp`;
            pngSeqframe++;
        } else {
            introStart += 1;
            pngSeqframe = 0;
            clearInterval(pngSeqInterval);
            playIdleAnimation();
            setTimeout(doAfterLoad, 200);
            function doAfterLoad() {
                $('.png-frame-ai.intro').addClass("d-none");
                $('.png-frame-ai.idle').removeClass("d-none");
            }
            // aiVO.play();
            // aiMusic.pause();
        }
    }, frameRate);
}

function stopAnimation() {
    clearInterval(pngSeqInterval);
    pngSeqframe = 0;
    aiMusic.pause();
    aiVO.pause();
}


// --------------- SPEAKING ANIMATION ---------------
// let speakingFrame = 0;
// const speakingTotalFrames = 550;
// const speakingFrameRate = 1000 / 30;
// let speakingInterval;
// const speakingImages = [];

// function playSpeakingAnimation() {
//     const aiSpeakingImg = document.getElementById('aiSpeakingImg');
//     speakingInterval = setInterval(function () {
//         if (speakingFrame < speakingTotalFrames) {
//             aiSpeakingImg.src = `assets/Media/AISpeaking/07_AI_Speaking_${speakingFrame.toString().padStart(5, '0')}.webp`;
//             speakingFrame++;
//         } else {
//             speakingFrame = 0; // Reset for looping animation
//         }
//     }, speakingFrameRate);
// }

// function stopSpeakingAnimation() {
//     clearInterval(speakingInterval);
//     speakingFrame = 0;
// }

// --------------- IDLE ANIMATION ---------------
let idleFrame = 0;
const idleTotalFrames = 350; // Set total frames for idle animation
const idleFrameRate = 1000 / 30; // Adjust frame rate for idle animation
let idleInterval;
const idleImages = [];

function playIdleAnimation() {
    const aiIdleImg = document.getElementById('aiIdleImg');
    idleFrame = 0;
    idleInterval = setInterval(function () {
        if (idleFrame < idleTotalFrames) {
            aiIdleImg.src = `assets/Media/AIIdle/08_AI_Idle_${idleFrame.toString().padStart(5, '0')}.webp`;
            idleFrame++;
        } else {
            idleFrame = 0; // Reset for looping animation
        }
    }, idleFrameRate);
}

function stopIdleAnimation() {
    clearInterval(idleInterval);
    idleFrame = 0;
}


// --------------- AR INTRO ANIMATION ---------------
let arIntroFrame = 0;
const arIntroTotalFrames = 540; // Set total frames for AR intro animation
const arIntroFrameRate = 1000 / 30; // Adjust frame rate for AR intro animation
let arIntroInterval;
const arIntroImages = [];

var timeoutIntro = 0;
function playArIntroAnimation() {

    arFlex.currentTime = 0;
    timeoutIntro = setTimeout(introVODelay, 1700);
    function introVODelay() {
        arIntro.play();
    }

    const arIntroImg = document.getElementById('arIntroImg');
    arIntroInterval = setInterval(function () {
        if (arIntroFrame < arIntroTotalFrames) {
            arIntroImg.src = `assets/Media/ARIntro/00_AR_Intro_${arIntroFrame.toString().padStart(5, '0')}.webp`;
            arIntroFrame++;
        } else {
            stopArIntroAnimation();
            playArIdleAnimation();
        }
    }, arIntroFrameRate);
}

function stopArIntroAnimation() {
    $('.png-frame-ar.intro').addClass("d-none");
    clearInterval(arIntroInterval);
    clearTimeout(timeoutIntro);
    arIntroFrame = 0;
    arIntro.pause();
}

// --------------- AR IDLE ANIMATION ---------------
let arIdleFrame = 0;
const arIdleTotalFrames = 300; // Set total frames for AR idle animation
const arIdleFrameRate = 1000 / 30; // Adjust frame rate for AR idle animation
let arIdleInterval;
const arIdleImages = [];

function playArIdleAnimation() {
    $('.png-frame-ar.idle').removeClass("d-none");
    const arIdleImg = document.getElementById('arIdleImg');
    arIdleInterval = setInterval(function () {
        if (arIdleFrame < arIdleTotalFrames) {
            arIdleImg.src = `assets/Media/ARIdle/05_AR_Idle_${arIdleFrame.toString().padStart(5, '0')}.webp`;
            arIdleFrame++;
        } else {
            arIdleFrame = 0; // Reset for looping animation
        }
    }, arIdleFrameRate);
}

function stopArIdleAnimation() {
    $('.png-frame-ar.idle').addClass("d-none");
    clearInterval(arIdleInterval);
    arIdleFrame = 0;
}

// --------------- AR FlEX ANIMATION ---------------
let arFlexFrame = 0;
const arFlexTotalFrames = 210; // Set total frames for AR flex animation
const arFlexFrameRate = 1000 / 30; // Adjust frame rate for AR flex animation
let arFlexInterval;
const arFlexImages = [];

var timeoutFlex = 0;
function playArFlexAnimation() {
    arFlexFrame = 0;
    clearInterval(arFlexInterval);
    $('.png-frame-ar.flex').removeClass("d-none");
    arFlex.currentTime = 0;
    timeoutFlex = setTimeout(flexVODelay, 1300);
    function flexVODelay() {
        arFlex.play();
    }
    const arFlexImg = document.getElementById('arFlexImg');
    arFlexInterval = setInterval(function () {
        if (arFlexFrame < arFlexTotalFrames) {
            arFlexImg.src = `assets/Media/ARSquishMe/04_AR_Squish Me_${arFlexFrame.toString().padStart(5, '0')}.webp`;

            arFlexFrame++;
            if (arFlexFrame == 180) {
                $(".shop-now-popup").removeClass("op-0-1");
            }
        }


        else {
            stopArFlexAnimation();
            playArIdleAnimation();

        }
    }, arFlexFrameRate);
}

function stopArFlexAnimation() {
    $('.png-frame-ar.flex').addClass("d-none");
    clearInterval(arFlexInterval);
    arFlexFrame = 0;
    arFlex.pause();
    clearTimeout(timeoutFlex);

    $(".gadget-container .gadget-item:nth-child(1)").removeClass("animation-select");
    $(".gadget-container .gadget-item:nth-child(1) .with-glow").addClass("d-none");
    $(".gadget-container .gadget-item:nth-child(1) .no-glow").removeClass("d-none");
}

$(".shop-now-popup .close-popup").click(function () {
    $(".shop-now-popup").addClass("op-0-1");
});

// --------------- AR BENCH ANIMATION ---------------
let arBenchFrame = 0;
const arBenchTotalFrames = 400; // Set total frames for AR bench animation
const arBenchFrameRate = 1000 / 30; // Adjust frame rate for AR bench animation
let arBenchInterval;
const arBenchImages = [];

var timeoutBench = 0;
function playArBenchAnimation() {
    arBenchFrame = 0;
    clearInterval(arBenchInterval);
    $('.png-frame-ar.bench').removeClass("d-none");
    arBench.currentTime = 0;

    timeoutBench = setTimeout(doAfterLoad3000, 3000);
    function doAfterLoad3000() {
        arBench.play();
    }

    const arBenchImg = document.getElementById('arBenchImg');
    arBenchInterval = setInterval(function () {
        if (arBenchFrame < arBenchTotalFrames) {
            arBenchImg.src = `assets/Media/ARBenchPress/01_AR_BenchPress_${arBenchFrame.toString().padStart(5, '0')}.webp`;

            arBenchFrame++;
        }
        else {
            stopArBenchAnimation();
            playArIdleAnimation();
        }
    }, arBenchFrameRate);
}


function stopArBenchAnimation() {
    $('.png-frame-ar.bench').addClass("d-none");
    clearInterval(arBenchInterval);
    arBenchFrame = 0;
    arBench.pause();
    clearTimeout(timeoutBench);
    $(".gadget-container .gadget-item:nth-child(2)").removeClass("animation-select");
    $(".gadget-container .gadget-item:nth-child(2) .with-glow").addClass("d-none");
    $(".gadget-container .gadget-item:nth-child(2) .no-glow").removeClass("d-none");
}


// --------------- AR DUMB BELL ANIMATION ---------------
let arDumbBellFrame = 0;
const arDumbBellTotalFrames = 280; // Set total frames for AR dumb bell animation
const arDumbBellFrameRate = 1000 / 30; // Adjust frame rate for AR dumb bell animation
let arDumbBellInterval;
const arDumbBellImages = [];

var timeoutDumbBell = 0;

function playArDumbBellAnimation() {
    arDumbBellFrame = 0;
    clearInterval(arDumbBellInterval);
    $('.png-frame-ar.dumb-bell').removeClass("d-none");
    arDumbBell.currentTime = 0;
    timeoutDumbBell = setTimeout(doAfterLoad3200, 3200);
    function doAfterLoad3200() {
        arDumbBell.play();
    }

    const arDumbBellImg = document.getElementById('arDumbBellImg');
    arDumbBellInterval = setInterval(function () {
        if (arDumbBellFrame < arDumbBellTotalFrames) {
            arDumbBellImg.src = `assets/Media/ARDumbbell/02_AR_Dumbell_${arDumbBellFrame.toString().padStart(5, '0')}.webp`;

            arDumbBellFrame++;
        } else {
            stopArDumbBellAnimation();
            playArIdleAnimation();
        }
    }, arDumbBellFrameRate);
}

function stopArDumbBellAnimation() {
    $('.png-frame-ar.dumb-bell').addClass("d-none");
    clearInterval(arDumbBellInterval);
    arDumbBellFrame = 0;
    arDumbBell.pause();
    clearTimeout(timeoutDumbBell);

    $(".gadget-container .gadget-item:nth-child(3)").removeClass("animation-select");
    $(".gadget-container .gadget-item:nth-child(3) .with-glow").addClass("d-none");
    $(".gadget-container .gadget-item:nth-child(3) .no-glow").removeClass("d-none");
}


// --------------- AR BAG ANIMATION ---------------
let arBagFrame = 0;
const arBagTotalFrames = 280; // Set total frames for AR bag animation
const arBagFrameRate = 1000 / 30; // Adjust frame rate for AR bag animation
let arBagInterval;
const arBagImages = [];

var timeoutBag = 0;
function playArBagAnimation() {
    arBagFrame = 0;
    clearInterval(arBagInterval);
    $('.png-frame-ar.bag').removeClass("d-none");
    arBag.currentTime = 0;

    timeoutBag = setTimeout(doAfterLoad2500, 2500);
    function doAfterLoad2500() {
        arBag.play();
    }

    const arBagImg = document.getElementById('arBagImg');
    arBagInterval = setInterval(function () {
        if (arBagFrame < arBagTotalFrames) {
            arBagImg.src = `assets/Media/ARPunchingBag/03_AR_Punching Bag_${arBagFrame.toString().padStart(5, '0')}.webp`;

            arBagFrame++;
        } else {
            stopArBagAnimation();
            playArIdleAnimation();
        }
    }, arBagFrameRate);
}

function stopArBagAnimation() {
    $('.png-frame-ar.bag').addClass("d-none");
    clearInterval(arBagInterval);
    clearInterval(timeoutBag);
    arBagFrame = 0;
    arBag.pause();

    $(".gadget-container .gadget-item:nth-child(4)").removeClass("animation-select");
    $(".gadget-container .gadget-item:nth-child(4) .with-glow").addClass("d-none");
    $(".gadget-container .gadget-item:nth-child(4) .no-glow").removeClass("d-none");
}

// =============== LOADING IMAGES ===============
let loadedImages = 0; // Tracks loaded images
const totalImages =
    totalFrames +
    // speakingTotalFrames +
    idleTotalFrames +
    arIntroTotalFrames +
    arIdleTotalFrames +
    arFlexTotalFrames +
    arBenchTotalFrames +
    arDumbBellTotalFrames +
    arBagTotalFrames; // Calculate total frames


let loadedAudio = 0; // Tracks loaded audio
const totalAudio = 7; // Number of audio files

function updateLoadingBar() {
    const progress = Math.floor((loadedImages + loadedAudio) / (totalImages + totalAudio) * 100);
    document.getElementById("loading-bar").style.width = `${progress}%`;
    document.querySelector(".loading-percentage").textContent = `${progress}%`;

    // Hide loading bar when complete
    // if (loadedImages + loadedAudio === totalImages + totalAudio) {

    // }

    if (progress >= 98) {
        $(".popup-container").removeClass("d-none");
        $(".loading-container").addClass("d-none");
    }
    console.log(progress);
}

function preloadImages(totalFrames, pathTemplate, targetArray, animationName) {
    for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = pathTemplate.replace('{frame}', i.toString().padStart(5, '0'));
        targetArray.push(img);

        img.onload = () => {
            loadedImages++;
            updateLoadingBar();
        };

        img.onerror = () => {
            console.error(`Failed to load ${animationName} frame: ${img.src}`);
            loadedImages++;
            updateLoadingBar(); // Still update progress even on error
        };
    }
}

function preloadAudio(audioArray, totalAudio) {
    audioArray.forEach((audio, index) => {
        audio.oncanplaythrough = () => {
            loadedAudio++;
            updateLoadingBar();
        };

        audio.onerror = () => {
            console.error(`Failed to load audio: ${audio.src}`);
            loadedAudio++;
            updateLoadingBar(); // Still update progress even on error
        };
    });
}

$(".on-sound").click(function () {
    afterAccess();
    aiMusic.play();
    aiVO.play();

    setTimeout(doAfterLoad10, 10);
    function doAfterLoad10() {
        aiMusic.pause();
        aiMusic.currentTime = 0;
        aiVO.pause();
        aiVO.currentTime = 0;
    }

    setTimeout(doAfterLoad3000, 3000);
    function doAfterLoad3000() {
        aiMusic.play();
        playAnimation();
    }

    // delay to start from 14th frame
    setTimeout(doAfterLoad3467, 3467);
    function doAfterLoad3467() {
        aiVO.play();
    }
});



function loadAllAnimations() {
    const animations = [
        { totalFrames: totalFrames, path: 'assets/Media/AIIntro/06_AI_Intro_{frame}.webp', target: images, name: 'Intro Animation' },
        // { totalFrames: speakingTotalFrames, path: 'assets/Media/AISpeaking/07_AI_Speaking_{frame}.webp', target: speakingImages, name: 'Speaking Animation' },
        { totalFrames: idleTotalFrames, path: 'assets/Media/AIIdle/08_AI_Idle_{frame}.webp', target: idleImages, name: 'Idle Animation' },
        { totalFrames: arIntroTotalFrames, path: 'assets/Media/ARIntro/00_AR_Intro_{frame}.webp', target: arIntroImages, name: 'AR Intro Animation' },
        { totalFrames: arIdleTotalFrames, path: 'assets/Media/ARIdle/05_AR_Idle_{frame}.webp', target: arIdleImages, name: 'AR Idle Animation' },
        { totalFrames: arFlexTotalFrames, path: 'assets/Media/ARSquishMe/04_AR_Squish Me_{frame}.webp', target: arFlexImages, name: 'AR Flex Animation' },
        { totalFrames: arBenchTotalFrames, path: 'assets/Media/ARBenchPress/01_AR_BenchPress_{frame}.webp', target: arBenchImages, name: 'AR Bench Animation' },
        { totalFrames: arDumbBellTotalFrames, path: 'assets/Media/ARDumbbell/02_AR_Dumbell_{frame}.webp', target: arDumbBellImages, name: 'AR Nail Polish Animation' },
        { totalFrames: arBagTotalFrames, path: 'assets/Media/ARPunchingBag/03_AR_Punching Bag_{frame}.webp', target: arBagImages, name: 'AR Bag Animation' }
    ];

    animations.forEach(({ totalFrames, path, target, name }) => {
        preloadImages(totalFrames, path, target, name);
    });
}

function loadAllAudio() {
    const audioFiles = [
        aiVO,
        aiMusic,
        aiMusic2,
        dummySound,
        arIntro,
        arFlex,
        arBench,
        arDumbBell,
        arBag
    ];

    preloadAudio(audioFiles, totalAudio);
}
