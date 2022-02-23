

function init() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    'all': () => {
      // 문구 배경 이벤트
      onGsapChipBackground();
    },
    // pc
    '(min-width: 769px)': () => {
      // 이미지 슬라이더
      const tl1 = onGsapImageSlider(202);
      // 링 이벤트
      const tl2 = onGsapRingProgress();
      // 플레이리스트
      const tl3 = onGsapPlaylistPhone('pc');

      return () => {
        tl1.kill();
        tl2.kill();
        tl3.kill();
      };
    },
    // mobile
    '(max-width: 768px)': () => {
      // 이미지 슬라이더
      const tl1 = onGsapImageSlider(129);
      // 링 이벤트
      const tl2 = onGsapRingProgress();
      // 플레이리스트
      const tl3 = onGsapPlaylistPhone('mobile');

      return () => {
        tl1.kill();
        tl2.kill();
        tl3.kill();
      };
    }
  });
}

function onGsapChipBackground() {
  const chips = document.querySelectorAll('.chip');
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.exercise-section',
      start: '-30% top',
      toggleActions: 'play none none reset'
    }
  });

  chips.forEach((item) => {
    timeline.from(item, {
      backgroundColor: '#fff',
      duration: 0.5
    });
  });

  return timeline;
}

function onGsapBodyThemeColor() {

}

function onGsapImageSlider(width) {
  const wrapper = document.querySelector('.js-img-slider');
  const slides = document.querySelectorAll('.js-img-slider img');
  const options = {
    slides: 7,
    pause: 1.5,
    width: width
  };
  const init = () => {
    for (let i = 0; i < 2; i++) {
      wrapper.appendChild(slides[i].cloneNode(true));
    }
  };
  if (slides.length <= options.slides) {
    init();
  }
  gsap.set(wrapper, {
    clearProps: 'all'
  });
  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 0
  });
  for (let i = 0; i < slides.length; i++) {
    timeline.to(wrapper, {
      duration: 0.5,
      x: `-=${options.width}`,
      ease: Expo.easeOut
    }, `+=${options.pause}`);
  }

  return timeline;
}

function onGsapRingProgress() {
  const ringContent = document.querySelector('.js-ring-content');
  const rings = document.querySelectorAll('.js-ring-content .js-ring');
  const svg = document.querySelector('.js-ring-content svg');
  const recorders = document.querySelectorAll('.js-ring-content .recorder');
  const comments = document.querySelectorAll('.js-ring-content .record-comment');

  const onCircleStroke = (ringElem, percent) => {
    const totalLength = ringElem.getTotalLength();
    const offset = totalLength - percent / 100 * totalLength;
    ringElem.style.strokeDashoffset = offset;
  };

  const onStart = () => {
    rings.forEach(item => {
      onCircleStroke(item, 0);
    });
  };

  const onUpdate = self => {
    let percent = calcScrollPercent(self.start, self.end) * 100;
    if (isNaN(percent))
      percent = 0;
    
    const stepNum = percent < 1 ? 1 : Math.ceil(percent / 25);
    svg.style.backgroundImage = `url('images/home_training/Ring_Step${stepNum}.gif')`;
    comments.forEach(item => {
      if (item.dataset.step == stepNum) {
        item.classList.add('active');
        return;
      }
      item.classList.remove('active');
    });
    rings.forEach(item => {
      onCircleStroke(item, percent);
    });
    recorders.forEach(item => {
      const min = item.dataset.min;
      const max = item.dataset.max;
      const value = Math.round((max - min) * percent / 100);
      item.innerText = isNaN(value) ? 0 : value;
    });
  };

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.js-ring-trigger',
      start: () => {
        return `${ringContent.offsetHeight / 2}px center`;
      },
      end: 'bottom bottom',
      scrub: 1,
      pin: true,
      onStart: onStart,
      onUpdate: onUpdate
    }
  });

  return timeline;
}

function onGsapPlaylistPhone(device) {
  const phoneWrap = document.querySelector('.js-playlist-phone');
  const phones = document.querySelectorAll('.js-playlist-phone .phone');
  gsap.set([phoneWrap, phones], {
    clearProps: 'all'
  });
  
  // pc(min-width: 769px)일 경우
  if (device == 'pc') {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.home-training-playlist-section',
        start: '-30% top'
      }
    });
  
    phones.forEach((item) => {
      timeline.from(item, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: Power2.easeOut
      });
    });
  
    return timeline;
  }
  
  // mobile(max-width: 768px)일 경우
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.home-training-playlist-section',
      start: 'top top',
      end: 'bottom 50%',
      scrub: 1,
      onUpdate: (self) => {
        let percent = calcScrollPercent(self.start, self.end);
        if (percent > 1)
          percent = 1;
        
        gsap.set(phoneWrap, {
          x: `-${percent * 250}`
        });
      }
    },
    clearProps: 'all'
  });
}

function calcScrollPercent(start, end) {
  let scrollTop = window.pageYOffset;
  
  if (scrollTop < start) {
    scrollTop = start + 1;
  } else if (scrollTop > end) {
    scrollTop = end;
  }

  return (scrollTop - start) / (end - start);
}

export default {
  init
}