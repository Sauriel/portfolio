<template>
  <svg
    class="sauriel-logo"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    style="enable-background: new 0 0 100 100"
    xml:space="preserve"
  >
    <g>
      <path id="dice-1" class="red" d="M46.4,82.7 L15.6,64.9 L28.6,62.5 Z" />
      <path id="dice-2" class="red" d="M27.5,60.4 L13.6,62.7 L13.6,24.7 Z" />
      <path id="dice-3" class="red" d="M29.1,57.7 L15.2,21.9 L48.5,24.4 Z" />
      <path id="dice-4" class="red" d="M17.3,19.6 L48.6,21.9 L48.6,1.5 Z" />
      <path id="dice-5" class="red" d="M53.6,82.7 L84.4,64.9 L71.4,62.5 Z" />
      <path id="dice-6" class="red" d="M72.5,60.4 L86.4,62.7 L86.4,24.7 Z" />
      <path id="dice-7" class="red" d="M70.9,57.7 L84.8,21.9 L51.5,24.4 Z" />
      <path id="dice-8" class="red" d="M82.7,19.6 L51.4,21.9 L51.4,1.5 Z" />
      <path id="dice-9" class="red" d="M67.7,62.7 L32.3,62.7 L50,82.7 Z" />
      <path id="dice-10" class="red" d="M50,26.9 L30.6,60.3 L69.4,60.3 Z" />
      <path
        id="left-wing"
        class="white"
        d="M46.4,90.1 L7.2,67.5 L7.2,25.1 L0,29.3 L0,71.4 L46.4,98.5 Z"
      />
      <path
        id="right-wing"
        class="white"
        d="M53.6,90.1 L92.8,67.5 L92.8,25.1 L100,29.3 L100,71.4 L53.6,98.5 Z"
      />
    </g>
  </svg>
</template>

<style scoped>
.sauriel-logo {
  --logo-animation: 10s ease-in-out infinite alternate;
}

.white {
  fill: #efefef;
}

.red {
  fill: #aa0000;
}

#left-wing {
  animation: morph-left-wing var(--logo-animation);
}

@keyframes morph-left-wing {
  0%,
  40% {
    d: path('M46.4,90.1 L7.2,67.5 L7.2,25.1 L0,29.3 L0,71.4 L46.4,98.5 Z');
  }
  60%,
  100% {
    d: path('M33,62.6 L8.2,52.1 L33,41.5 L29.8,34.2 L-10.4,52.1 L29.8,70.1 Z');
  }
}

#right-wing {
  animation: morph-right-wing var(--logo-animation);
}

@keyframes morph-right-wing {
  0%,
  40% {
    d: path('M53.6,90.1 L92.8,67.5 L92.8,25.1 L100,29.3 L100,71.4 L53.6,98.5 Z');
  }
  60%,
  100% {
    d: path('M67,62.6 L91.7,52.1 L67,41.5 L70.2,34.2 L110.3,52.1 L70.2,70.1 Z');
  }
}

#dice-1 {
  animation: morph-dice-1 var(--logo-animation);
}

@keyframes morph-dice-1 {
  0%,
  40% {
    d: path('M46.4,82.7 L15.6,64.9 L28.6,62.5 Z');
  }
  60%,
  100% {
    d: path('M45.5,86.2 L55,15 L63.5,17 Z');
  }
}

#dice-2 {
  animation: morph-dice-2 var(--logo-animation);
}

@keyframes morph-dice-2 {
  0%,
  40% {
    d: path('M27.5,60.4 L13.6,62.7 L13.6,24.7 Z');
  }
  60%,
  100% {
    d: path('M45.5,86.2 L36.9,84.2 L55,15 Z');
  }
}

#dice-3 {
  animation: morph-dice-3 var(--logo-animation);
}

@keyframes morph-dice-3 {
  0%,
  40% {
    d: path('M29.1,57.7 L15.2,21.9 L48.5,24.4 Z');
  }
  60%,
  100% {
    d: path('M36.9,84.2 L55,15 L63.5,17 Z');
  }
}

#dice-4 {
  animation: morph-dice-4 var(--logo-animation);
}

@keyframes morph-dice-4 {
  0%,
  40% {
    d: path('M17.3,19.6 L48.6,21.9 L48.6,1.5 Z');
  }
  60%,
  100% {
    d: path('M36.9,84.2 L45.5,86.2 L55,15 Z');
  }
}

#dice-5 {
  animation: morph-dice-5 var(--logo-animation);
}

@keyframes morph-dice-5 {
  0%,
  40% {
    d: path('M53.6,82.7 L84.4,64.9 L71.4,62.5 Z');
  }
  60%,
  100% {
    d: path('M36.9,84.2 L45.5,86.2 L55,15 Z');
  }
}

#dice-6 {
  animation: morph-dice-6 var(--logo-animation);
}

@keyframes morph-dice-6 {
  0%,
  40% {
    d: path('M72.5,60.4 L86.4,62.7 L86.4,24.7 Z');
  }
  60%,
  100% {
    d: path('M55,15 L45.5,86.2 L63.5,17 Z');
  }
}

#dice-7 {
  animation: morph-dice-7 var(--logo-animation);
}

@keyframes morph-dice-7 {
  0%,
  40% {
    d: path('M70.9,57.7 L84.8,21.9 L51.5,24.4 Z');
  }
  60%,
  100% {
    d: path('M45.5,86.2 L63.5,17 L36.9,84.2 Z');
  }
}

#dice-8 {
  animation: morph-dice-8 var(--logo-animation);
}

@keyframes morph-dice-8 {
  0%,
  40% {
    d: path('M82.7,19.6 L51.4,21.9 L51.4,1.5 Z');
  }
  60%,
  100% {
    d: path('M45.5,86.2 L55,15 L63.5,17 Z');
  }
}

#dice-9 {
  animation: morph-dice-9 var(--logo-animation);
}

@keyframes morph-dice-9 {
  0%,
  40% {
    d: path('M67.7,62.7 L32.3,62.7 L50,82.7 Z');
  }
  60%,
  100% {
    d: path('M63.5,17 L36.9,84.2 L45.5,86.2 Z');
  }
}

#dice-10 {
  animation: morph-dice-10 var(--logo-animation);
}

@keyframes morph-dice-10 {
  0%,
  40% {
    d: path('M50,26.9 L30.6,60.3 L69.4,60.3 Z');
  }
  60%,
  100% {
    d: path('M55,15 L36.9,84.2 L63.5,17 Z');
  }
}
</style>
