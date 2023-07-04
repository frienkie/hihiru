'use strict';
function setSessionStorage(key, value) {
  if (!window.sessionStorage) return;
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    // console.log(e);
  }
}

const OP = {
  state: {
    session: {
      op: null,
    },
  },
  set() {
    this.state.session.op = sessionStorage.getItem('op');
    if (this.state.session.op) {
      $('.p-opening').css({display: 'none'});
      $('body').addClass('is-skip');
    } else {
      setTimeout(function () {
        $('body,html').stop().animate({scrollTop: 0});
        $('body').addClass('is-openingEnd');
      }, 4000);
      setSessionStorage('op', 'on');
    }
  },
  init() {
    this.set();
  },
};

let speed = 600; // スライドのスピード

// 動画スライド
let moviecswiper;
const Movie = () => {
  let _movieid = [];
  // サムネ取得
  $('.movie_swiper .swiper-slide').each((index, elm) => {
    _movieid.push($(elm).data('videoid'));
    let _thumb = '\n     <img src="//img.youtube.com/vi/'.concat(_movieid[index], '/maxresdefault.jpg" alt="">\n     ');

    $(elm).html(_thumb);
  });

  let movie_slide = $('.movie_swiper .swiper-slide').length;

  if (movie_slide > 1) {
    moviecswiper = new Swiper('.movie_swiper', {
      loop: true,
      slidesPerView: '1',
      spaceBetween: 0,
      centeredSlides: true,
      speed: speed,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: $('.p-movie__slide .swiper-pagination'),
        clickable: true,
        renderBullet: function (index, className) {
          // ページネーションのHTMLカスタマイズ className => swiperのクラス名
          return '\n          <div class="p-in_thumb '.concat(className, '">\n            <div class="is-img" style="background: url(//img.youtube.com/vi/').concat(_movieid[index], '/maxresdefault.jpg) no-repeat center center; background-size: cover;"></div>\n          </div>\n          ');
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    $('.movie_swiper').addClass('no-slide');
  }
};

// ギャラリースライド
let galleryswiper;
const Gallery = () => {
  let _imgpath = [];
  $('.gallery_swiper .swiper-slide').each((index, elm) => {
    _imgpath.push($(elm).children('img').attr('src'));
  });

  let gallery_slide = $('.gallery_swiper .swiper-slide').length;

  if (gallery_slide > 1) {
    galleryswiper = new Swiper('.gallery_swiper', {
      loop: true,
      slidesPerView: '1',
      spaceBetween: 0,
      centeredSlides: true,
      speed: speed,
      effect: 'fade',
      autoHeight: true,
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: $('.p-gallery__slide .swiper-pagination'),
        clickable: true,
        renderBullet: function (index, className) {
          // ページネーションのHTMLカスタマイズ className => swiperのクラス名
          return '\n        <div class="p-in_thumb '.concat(className, '">\n          <div class="is-img" style="background: url(').concat(_imgpath[index], ') no-repeat center center; background-size: cover;"></div>\n        </div>\n        ');
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } else {
    $('.gallery_swiper').addClass('no-slide');
  }
};

// キャラクタースライド
let charaswiper;
const Character = () => {
  let _imgpath = [];
  $('.character_swiper .swiper-slide').each((index, elm) => {
    _imgpath.push($(elm).find('.p-character__chara').children('img').attr('src'));
  });
  charaswiper = new Swiper('.character_swiper', {
    loop: true,
    slidesPerView: '1',
    spaceBetween: 0,
    centeredSlides: true,
    speed: speed,
    effect: 'fade',
    simulateTouch: false,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: $('.p-character__slide .swiper-pagination'),
      clickable: true,
      renderBullet: function (index, className) {
        // ページネーションのHTMLカスタマイズ className => swiperのクラス名
        return '\n        <div class="p-in_thumb '.concat(className, '">\n          <div class="is-img" style="background: url(').concat(_imgpath[index], ')  no-repeat center center; background-size: cover;"></div>\n        </div>\n        ');
      },
    },
  });
};

const ModalModule = {
  instance: null,
  set() {
    const _template_function_advanced = function (type, data, dataAll, elemOpen, elem) {
      if (type === 'youtube') {
        _template =
          '\n      <section class="m-modal {{ defaultClassName }}" id="{{ id }}" data-modal-type>\n        <div class="m-modal__bg"></div>\n        <div class="m-modal__content -movie">\n          {{ content }}\n          <div class="m-modal__close c-close" data-modal-ui-close>\n          <span></span>\n          <span></span>\n        </div>\n        </div>\n      </section>';

        _youtubeplay = true;
      } else {
        _template =
          '\n        <div class="m-modal is-close" id="{{ id }}" data-modal-type>\n          <div class="m-modal__wrap">\n            <div class="m-modal__bg" data-modal-ui-close></div>\n            <div class="m-modal__inner">\n              <div class="m-modal__content">\n                {{ content }}\n              </div>\n            </div>\n            <div class="m-modal__close c-close" data-modal-ui-close>\n              <span></span>\n              <span></span>\n            </div>\n          </div>\n        </div>\n        ';
      }
      return _template;
    };

    let _template = '';
    let _youtubeplay = false;

    this.instance = new MODAL_MODULE({
      duration: 800,
      zIndex: 10,
      removeWrapperTag: true,
      customModalHtml: _template_function_advanced,
      loadStart: false,
      elemOutputSelector: '.l-wrapper',
      elemYoutubePlayerAspectRatio: '16:9',
      defaultModalStyle: false,
      movie: {
        youtube: {
          height: '360',
          width: '640',
          playerVars: {
            autoplay: 1,
            playsinline: 1,
            controls: 1,
            disablekb: 0,
            fs: 1,
            loop: 0,
            rel: 0,
          },
        },
      },
      on: {
        prepOpen(data, target) {
          $('html').css({
            overflowY: 'hidden',
          });
        },
        afterOpen(data, target, type) {
          $('body').addClass('is-modal-show');
          if (type.elemOpenType === 'youtube' && playtype === true) {
            // モーダルのタイプがyoutubeかつBGM再生がtrueだったら
            $('#bgm').get(0).pause();
            $('body').removeClass('is-bgplay');
          }
        },
        afterClose(data, target, type) {
          $('body').removeClass('is-modal-show');
          if (_youtubeplay === true && playtype === true) {
            $('#bgm').get(0).play();
            $('body').addClass('is-bgplay');
          }
        },
        prepClose() {
          $('html').css({
            overflowY: 'auto',
          });
        },
      },
    });
  },
  update() {
    this.instance.Update();
  },
  click() {
    $('body').on('click', '[data-modal-close]', (event) => {
      this.instance.Close(event.currentTarget);
    });
  },
  init() {
    this.click();
    this.set();
  },
};

const ScrollAnimation = {
  module: null,
  param: {
    target: '[data-scroll]',
    classNameInview: 'is-active',
    displayRatio: 0.8,
    displayReverse: false,
    throttleInterval: 3,
    autoStart: true,
    on: {
      Scroll(top) {
        if (top > 50) {
          $('body').addClass('is-scrolled');
        } else {
          $('body').removeClass('is-scrolled');
        }
      },
    },
  },
  set() {
    this.module = new SCROLL_EFFECT_MODULE(this.param);
  },
  resize() {
    window.addEventListener('resize', () => {
      this.update();
    });
  },
  update() {
    if (this.module) {
      this.module.Update();
    }
  },
  init() {
    this.set();
    this.resize();
  },
};

const SmoothScroll = function (duration, easing) {
  $('a[href^="/#"]').on('click', function () {
    let $target = $(this.hash);
    let position = $target.offset().top;
    $('body,html').animate({scrollTop: position}, duration, easing);
    $('body').removeClass('menu-open');
  });
  $('.l-footer_pagetop').on('click', function () {
    $('html,body').animate({scrollTop: 0}, duration, easing);
  });
  let urlHash = location.hash;
  if (urlHash) {
    let target = $(urlHash);
    if (target.length) {
      setTimeout(function () {
        let position = target.offset().top;
        $('body,html').stop().animate({scrollTop: position}, duration, easing);
      }, 500);
    }
  }
};

const Menu = () => {
  $('.p-nav__btn').on('click', function () {
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
    } else {
      $('body').addClass('menu-open');
    }
  });
};

let playtype = false;

const SoundState = () => {
  // アクセス時の音楽再生許可
  $('[data-sound-state]').on('click', function () {
    let _playstate = $(this).data('sound-state');
    playtype = _playstate;
    if (playtype) {
      BgmPlayer(playtype);
    }
    Loaded();
  });

  // 音楽再生許可
  $('[data-sound-toggle]').on('click', function () {
    playtype = $(this).data('sound-toggle');
    BgmPlayer(playtype);
  });

  function Loaded() {
    $('body').addClass('is-decided');
    OP.init();
  }

  function BgmPlayer(_play) {
    if (_play) {
      // _playの値がtrueだったら 再生
      $('#bgm').get(0).play();
      $('#bgm').get(0).loop = true;
      $('body').addClass('is-bgplay');
    } else {
      $('#bgm').get(0).pause();
      $('body').removeClass('is-bgplay');
    }
  }
};

$(window).on('load', function () {
  $('body').addClass('is-load');
  SoundState();
  if ($('.p-hero').length) {
    Movie();
    Gallery();
    Character();
  }
  ScrollAnimation.init();
  SmoothScroll(1000, 'easeOutQuart');
  Menu();
  if ($('.p-hero').length) {
    ModalModule.init();
  }
});
let win_W;
$(window).on('load resize', function () {
  win_W = $(window).width();
  $('.p-hero').css({height: $(window).height()});
  target = $('.l-main').offset().top;
});
let target;
$(window).on('load scroll', function () {
  let win_scroll = $(window).scrollTop();
  if ($('.p-hero').length && win_W >= 768) {
    if (win_scroll >= target) {
      $('body').addClass('content-in');
    } else {
      $('body').removeClass('content-in');
    }
  }
});
