
// 页面初始化
window.onload=function(){
  $('#beforeLoad').hide();
  $('#beforeLoad').siblings().css('visibility','visible');
}


$(function(){
  // fullpage插件初始化
  var lineWidth = 0.84;
  var beforeLeft = 0;
  $('#main').fullpage({
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],
    menu: '.menu',
    scrollingSpeed: 500,
    onLeave: function (num,nextNum) {
      if(num == 1){
        $('#head').addClass('leave');
        lineWidth = 0.76;
      }else if(nextNum == 1){
        $('#head').removeClass();
        lineWidth = 0.84;
      }
      $('#head .menu .line').css('left',(nextNum-1)*0.76+'rem');
    }
  });
  $('#head .menu').on('mouseenter',function(){
    beforeLeft = $('#head .menu .line').css('left');
    $('#head .menu').on('mouseleave',function(){
      $('#head .menu .line').css('left',beforeLeft);
    })
  })
  $('#head .menu a').on('mouseenter',function(){
    $('#head .menu .line').css('left', ($(this).parent().index() - 1) * lineWidth + 'rem');
  })
  $('#head .menu a').on('click',function(){
    $('#head .menu').off('mouseleave')
  })
  
  
  
  // swiper插件初始化
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay:3000,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    grabCursor: true,
    autoplayDisableOnInteraction: false
  })
  
  var aboutSwiper = new Swiper ('.about-swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay:3000,
    grabCursor: true,
    autoplayDisableOnInteraction: false,
    onSlideChangeStart: function(swiper){
      setTimeout(function(){
        $('#about .tabs li').removeClass();
        $('#about .tabs li').eq(swiper.realIndex).addClass('active');
      },250)
      $('#about .tabs .bg').css('top',swiper.realIndex*0.42 + 'rem');
    }
  })
  
  $('#about .tabs li').mouseenter(function(){
    aboutSwiper.slideTo($(this).index()+1, 300)
  })
  
  // #right相关特效
  $('#right .icon-list input').focus(function(){
    $(this).addClass('focus')
  })
  $('#right .icon-list input').blur(function(){
    $(this).removeClass('focus')
  })
  $('#right .icon-list li:first-child').click(function(){
    $.fn.fullpage.moveSectionUp();
  })
  $('#right .icon-list li:last-child').click(function(){
    $.fn.fullpage.moveSectionDown();
  })
  $('#right .switch .icon').click(function(){
    if($(this).hasClass('icon-tab')){
      $('#right .icon-list').css({'right': 0,"opacity":1});
      $(this).removeClass('icon-tab');
    }else{
      $('#right .icon-list').css({'right': -5+'rem',"opacity":0.6});
      $(this).addClass('icon-tab');
    }
  })
  
  // #home页面
  var newsIndex = 0;
  var timer = setInterval(function(){
    if (newsIndex == 4) {
      newsIndex = 0;
    }else{
      newsIndex++;
    }
    $('#home .news ul').css('top', newsIndex * (-0.2) + 'rem')
  },3000);
    $('#home .moveDown').click(function(){
      $.fn.fullpage.moveSectionDown();
    })
  // #business页面特效
  var timer=null;
  $('#business .business-list li').mouseenter(function(){
    $this = $(this);
    $this.find('.cl').css('clip','rect(1.56rem, 1.56rem, 1.56rem, 0)');
    $this.find('.cr').css('clip','rect(0rem, 1.56rem, 0rem, 0)');
    timer = setTimeout(function(){
      $this.find('.item-title').css('color','#fff');
      $this.find('.bg').css('display','block');
      $this.find('.bg').animate({top:'0'},400);
      var bpX;
      switch($this.index()){
        case 0:
          bpX = -1.68;
          break;
        case 1:
          bpX = -3.36;
          break;
        case 2:
          bpX = -3.27;
          break;
        case 3:
          bpX = -1.67;
          break;
        case 4:
          bpX = -3.35;
          break;
      }
      $this.find('.icon').addClass('transition').css('backgroundPositionX',bpX+'rem');
    },400)
  })
  $('#business .business-list li').mouseleave(function(){
    clearTimeout(timer);
    $(this).find('.bg').stop();
    $(this).find('.bg').css({'top':'100%','display':'none'});
    $this.find('.cl').css('clip','rect(0, 1.56rem, 1.56rem, 0)');
    $this.find('.cr').css('clip','rect(0rem, 1.56rem, 1.56rem, 0)');
    $this.find('.item-title').css('color','#000');
    var bpX;
    switch($this.index()){
      case 0:
        bpX = -2.45;
        break;
      case 1:
        bpX = -4.16;
        break;
      case 2:
        bpX = -4.15;
        break;
      case 3:
        bpX = -2.47;
        break;
      case 4:
        bpX = -4.21;
        break;
    }
    $this.find('.icon').removeClass('transition').css('backgroundPositionX',bpX+'rem');
  })
  
  // client页面特效
  $('#client .client-list').mouseleave(function(){
    $(this).children('.bg').hide();
  })
  $('#client .client-list li').mouseenter(function(e){
    $(this).siblings('.bg').show();
    var oLeft = $(this).offset().left-$('#client .client-list').offset().left;
    var oTop = $(this).offset().top-$('#client .client-list').offset().top;
    $('#client .client-list .bg').css({'left': oLeft + 'px','top': oTop + 'px'})
  })
})