(function(){

  let yOffset = 0; // window.pageYOffset 변수
  let prevScrollHeight = 0; // 현재 스크롤 보다 이전 씬의 높이값
  let currentScene = 0 // 현재 활성화된(눈앞에서 보고 잇는) 씬(scroll-section)
  let enterNewScene = false; //새로운 씬이 시작될때 true

	const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity: {
          in: { from: 0, to: 1, start: 0.1, end: 0.2, },
          out: { from: 1, to: 0, start: 0.25, end: 0.3, }
        },
        messageA_translateY: {
          in: { from: 20, to: 0, start: 0.1, end: 0.2, },
          out: { from: 0, to: -20, start: 0.25, end: 0.3, }
        },
        messageB_opacity: {
          in: { from: 0, to: 1, start: 0.3, end: 0.4, },
          out: { from: 1, to: 0, start: 0.45, end: 0.5, }
        },
        messageB_translateY: {
          in: { from: 20, to: 0, start: 0.3, end: 0.4, },
          out: { from: 0, to: -20, start: 0.45, end: 0.5, }
        },
        messageC_opacity: {
          in: { from: 0, to: 1, start: 0.5, end: 0.6, },
          out: { from: 1, to: 0, start: 0.65, end: 0.7, }
        },
        messageC_translateY: {
          in: { from: 20, to: 0, start: 0.5, end: 0.6, },
          out: { from: 0, to: -20, start: 0.65, end: 0.7, }
        },
        messageD_opacity: {
          in: { from: 0, to: 1, start: 0.7, end: 0.8, },
          out: { from: 1, to: 0, start: 0.85, end: 0.9, }
        },
        messageD_translateY: {
          in: { from: 20, to: 0, start: 0.7, end: 0.8, },
          out: { from: 0, to: -20, start: 0.85, end: 0.9, }
        },
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs : {
        container: document.querySelector('#scroll-section-3')
      }
    }
  ];

  function currentSceneChk(){
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    prevScrollHeight = 0;
    for( let i=0; i < sceneInfo.length; i++){
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if(totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    for(let i = 0; i < currentScene; i++){
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  //각 스크롤 셋션의 높이 세팅
  function setLayout(){
    for(let i = 0; i < sceneInfo.length; i++){
      if(sceneInfo[i].type === 'sticky'){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = sceneInfo[i].scrollHeight + 'px';
      }else if(sceneInfo[i].type === 'normal'){
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
    }
    currentSceneChk();
  }

  function calcValues(values) {
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    let scrollRatio = currentYOffset / scrollHeight;
    function inOutCalc(value){
      let returnVal;
      const partScrollStart = value.start * scrollHeight;
      const partScrollEnd = value.end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      if(currentYOffset < partScrollStart){
        scrollRatio = 0;
      }else if(partScrollEnd < currentYOffset){
        scrollRatio = 1;
      }else{
        scrollRatio = (currentYOffset - partScrollStart) / partScrollHeight;
      }
      returnVal = scrollRatio * (value.to - value.from) + value.from;
      return returnVal;
    }

    let rv;
    if(values.in){
      rv = inOutCalc(values.in);
    }
    if(values.out && rv === values.out.from){
      rv = inOutCalc(values.out);
    }
    return rv;
  }

  function playAnimation(){
    const $objs = sceneInfo[currentScene].objs;
    const $values = sceneInfo[currentScene].values;
    // const currentYOffset = yOffset - prevScrollHeight;
    // const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight;

    switch(currentScene){
      case 0:
        // scence 1
        const messageA_opacity = calcValues($values.messageA_opacity);
        const messageA_translateY = calcValues($values.messageA_translateY);
        const messageB_opacity = calcValues($values.messageB_opacity);
        const messageB_translateY = calcValues($values.messageB_translateY);
        const messageC_opacity = calcValues($values.messageC_opacity);
        const messageC_translateY = calcValues($values.messageC_translateY);
        const messageD_opacity = calcValues($values.messageD_opacity);
        const messageD_translateY = calcValues($values.messageD_translateY);
        $objs.messageA.style.opacity = messageA_opacity;
        $objs.messageA.style.transform = 'translateY('+messageA_translateY+'%)';
        $objs.messageB.style.opacity = messageB_opacity;
        $objs.messageB.style.transform = 'translateY('+messageB_translateY+'%)';
        $objs.messageC.style.opacity = messageC_opacity;
        $objs.messageC.style.transform = 'translateY('+messageC_translateY+'%)';
        $objs.messageD.style.opacity = messageD_opacity;
        $objs.messageD.style.transform = 'translateY('+messageD_translateY+'%)';
        break;
      case 1:
        console.log('1 play');
        break;
      case 2:
        console.log('2 play');
        break;
      case 3:
        console.log('3 play');
        break;
    }
  };
  
  function scrollLoop() { 
    enterNewScene = false;
    currentSceneChk();
    // prevScrollHeight = 0;
    // for(let i = 0; i < currentScene; i++){
    //   prevScrollHeight += sceneInfo[i].scrollHeight;
    // }
    // console.log(currentScene, prevScrollHeight)

    // if( yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
    //   enterNewScene = true;
    //   currentScene += 1;
    //   document.body.setAttribute('id', `show-scene-${currentScene}`);
    // }
    // if( yOffset < prevScrollHeight){
    //   enterNewScene = true;
    //   if(currentScene === 0) return; // 브라우저 바운스 효과 방지
    //   currentScene -= 1;
    //   document.body.setAttribute('id', `show-scene-${currentScene}`);
    // }

    // if(enterNewScene) return;

    playAnimation();
  }

  //init
  window.addEventListener('scroll', function(){
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();