

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
      // 플레이리스트
      const tl3 = onGsapBodyPlaylistPhone('pc');

      return () => {
        tl1.kill();
        tl3.kill();
      };
    },
    // mobile
    '(max-width: 768px)': () => {
      // 이미지 슬라이더
      const tl1 = onGsapImageSlider(129);
      // 플레이리스트
      const tl3 = onGsapBodyPlaylistPhone('mobile');

      return () => {
        tl1.kill();
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

function onGsapBodyPlaylistPhone(device) {
  const phoneWrap = document.querySelector('.js-playlist-phone');
  const phones = document.querySelectorAll('.js-playlist-phone .phone');
  gsap.set([phoneWrap, phones], {
    clearProps: 'all'
  });
  
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
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: '.home-training-playlist-section',
      start: 'top top',
      end: 'bottom 50%',
      scrub: 1,
      onUpdate: (self) => {
        const start = self.start;
        const end = self.end;
        let scrollTop = window.pageYOffset;
        
        if (scrollTop < start) {
          scrollTop = start + 1;
        } else if (scrollTop > end) {
          scrollTop = end;
        }

        let percent = (scrollTop - start) / (end - start);
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

export default {
  init
}