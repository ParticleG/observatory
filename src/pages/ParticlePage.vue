<script setup lang="ts">
import { loadFull } from 'tsparticles';
import { Container, Engine, Options } from 'tsparticles-engine';
import { ref } from 'vue';
import { ParticlesComponent as VueParticles } from 'vue3-particles';

import { ws } from 'boot/ws';
import { WsAction } from 'types/actions';
import { DeviceEvent, DeviceEventType, MouseEvent } from 'types/devices';

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container) => {
  console.log('Particles container loaded', container);
};

const options = {
  autoPlay: true,
  background: {
    color: {
      value: '#0d47a1',
    },
    opacity: 0.75,
  },
  delay: 0,
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'window',
    events: {
      onDiv: {
        selectors: '#interact-div',
        enable: true,
        mode: 'repulse',
        type: 'circle',
      },
      resize: {
        delay: 0.5,
        enable: true,
      },
    },
    modes: {
      trail: {
        delay: 1,
        pauseOnStop: false,
        quantity: 1,
      },
      attract: {
        distance: 200,
        duration: 0.4,
        easing: 'ease-out-quad',
        factor: 1,
        maxSpeed: 50,
        speed: 1,
      },
      bounce: {
        distance: 200,
      },
      bubble: {
        distance: 400,
        duration: 2,
        mix: false,
        opacity: 0.8,
        size: 40,
        divs: {
          distance: 200,
          duration: 0.4,
          mix: false,
          selectors: [],
        },
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 100,
        links: {
          blink: false,
          consent: false,
          opacity: 1,
        },
      },
      push: {
        default: true,
        groups: [],
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        easing: 'ease-out-quad',
        divs: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: 'ease-out-quad',
          selectors: [],
        },
      },
    },
  },
  manualParticles: [],
  particles: {
    bounce: {
      horizontal: {
        value: 1,
      },
      vertical: {
        value: 1,
      },
    },
    color: {
      value: '#ffffff',
    },
    groups: {},
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      center: {
        x: 50,
        y: 50,
        mode: 'percent',
        radius: 0,
      },
      decay: 0,
      distance: {},
      direction: 'none',
      drift: 0,
      enable: true,
      outModes: {
        default: 'out',
        bottom: 'out',
        left: 'out',
        right: 'out',
        top: 'out',
      },
      random: false,
      size: false,
      speed: 2,
      straight: false,
      vibrate: false,
      warp: false,
    },
    number: {
      density: {
        enable: true,
        width: 3840,
        height: 2160,
      },
      limit: 0,
      value: 300,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      value: {
        min: 0.2,
        max: 0.6,
      },
      animation: {
        count: 0,
        enable: true,
        speed: 3,
        decay: 0,
        delay: 0,
        sync: false,
        mode: 'auto',
        startValue: 'random',
        destroy: 'none',
        minimumValue: 0.1,
      },
    },
    reduceDuplicates: false,
    shape: {
      close: true,
      fill: true,
      options: {},
      type: 'circle',
    },
    size: {
      random: {
        enable: true,
        minimumValue: 1,
      },
      value: {
        min: 0.1,
        max: 5,
      },
      animation: {
        count: 0,
        enable: true,
        speed: 20,
        decay: 0,
        delay: 0,
        sync: false,
        mode: 'auto',
        startValue: 'random',
        destroy: 'none',
        minimumValue: 0.1,
      },
    },
    zIndex: {
      value: 0,
      opacityRate: 1,
      sizeRate: 1,
      velocityRate: 1,
    },
    destroy: {
      bounds: {},
      mode: 'none',
      split: {
        count: 1,
        factor: {
          value: 3,
        },
        rate: {
          value: {
            min: 4,
            max: 9,
          },
        },
        sizeOffset: true,
        particles: {},
      },
    },
    links: {
      blink: false,
      color: {
        value: '#ffffff',
      },
      consent: true,
      distance: 200,
      enable: true,
      frequency: 1,
      opacity: 0.4,
      width: 1,
      warp: true,
    },
  },
  pauseOnBlur: false,
  pauseOnOutsideViewport: false,
  responsive: [],
  smooth: true,
  style: {},
  themes: [],
  zLayers: 100,
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true,
    },
  },
};

ws.setHandler(WsAction.Device, (event) => {
  if (event.result === 'success') {
    const deviceEvent = <DeviceEvent>event.data;
    if (
      deviceEvent.event === DeviceEventType.MouseDown ||
      deviceEvent.event === DeviceEventType.MouseMove ||
      deviceEvent.event === DeviceEventType.MouseUp
    ) {
      mouseInfo.value = deviceEvent;
    }
  }
});

const mouseInfo = ref<MouseEvent>({
  event: DeviceEventType.MouseMove,
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
  x: 0,
  y: 0,
  button: undefined,
  clicks: 0,
});
</script>
<template>
  <q-page class="row items-center justify-evenly">
    <vue-particles
      id="particles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options as Options"
    />
    <div
      id="interact-div"
      class="fixed"
      :style="{
        background: 'rgba(255,255,255,.5)',
        borderRadius: '50%',
        top: `${(mouseInfo.y / 2160) * 100}%`,
        left: `${((mouseInfo.x % 3840) / 3840) * 100}%`,
        height: '10rem',
        width: '10rem',
      }"
    />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="text-h3 text-white" style="white-space: pre-wrap">
        Mouse info: {{ JSON.stringify(mouseInfo, null, 2) }}
      </div>
    </q-page-sticky>
  </q-page>
</template>
