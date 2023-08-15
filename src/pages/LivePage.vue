<script setup lang="ts">
import { KeepLiveWS } from 'bilibili-live-ws';
import { Notify } from 'quasar';
import { ref } from 'vue';
import { DanmakuMessage, IDanmakuMessage } from 'types/bililive';

const roomId = 1050729;
const popularity = ref(0);

const live = new KeepLiveWS(roomId);
live.on('open', () =>
  Notify.create({
    type: 'positive',
    message: 'Bili Live websocket connected',
    icon: 'check',
  })
);
live.on('heartbeat', (online: number) => {
  popularity.value = online;
});
live.on('live', () => {
  Notify.create({
    type: 'positive',
    message: `Connected to Room ID ${roomId}`,
    icon: 'check',
  });
});

live.on('DANMU_MSG', (data: IDanmakuMessage) => {
  const message = new DanmakuMessage(data);
  console.log(message);
});
</script>

<template>
  <q-page-container>
    <q-page padding>
      <q-card>
        <q-card-section>
          <q-item-label header>Room ID: {{ roomId }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-item-label>Popularity: {{ popularity }}</q-item-label>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<style scoped></style>
