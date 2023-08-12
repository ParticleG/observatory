<script setup lang="ts">
import { ref } from 'vue';
import { ws } from 'boot/ws';
import { WsAction } from 'types/actions';
import { DeviceEvent, DeviceEventType, MouseEvent } from 'types/devices';

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
    <div class="text-h3" style="white-space: pre-wrap">
      Mouse info: {{ JSON.stringify(mouseInfo, null, 2) }}
    </div>
  </q-page>
</template>
