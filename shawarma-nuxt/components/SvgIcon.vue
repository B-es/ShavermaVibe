<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- tools / wrench -->
    <path v-if="name === 'tools'" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    <!-- x / close -->
    <path v-else-if="name === 'x'" d="M18 6 6 18M6 6l12 12" />
    <!-- check -->
    <path v-else-if="name === 'check'" d="M20 6 9 17l-5-5" />
    <!-- plus -->
    <path v-else-if="name === 'plus'" d="M12 5v14M5 12h14" />
    <!-- minus -->
    <path v-else-if="name === 'minus'" d="M5 12h14" />
    <!-- trash -->
    <path v-else-if="name === 'trash'" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <!-- edit / pencil -->
    <path v-else-if="name === 'edit'" d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <!-- package / box -->
    <path v-else-if="name === 'package'" d="M16.5 9.4 7.55 4.24M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><path v-else-if="name === 'package'" d="M3.3 7.7 12 12l8.7-4.3M12 22V12" />
    <!-- dollar / cash -->
    <path v-else-if="name === 'cash'" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    <!-- trending-up / chart -->
    <path v-else-if="name === 'trending-up'" d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path v-else-if="name === 'trending-up'" d="M16 7h6v6" />
    <!-- star -->
    <path v-else-if="name === 'star'" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <!-- clipboard / list -->
    <path v-else-if="name === 'clipboard'" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path v-else-if="name === 'clipboard'" d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
    <!-- burger / menu -->
    <path v-else-if="name === 'burger'" d="M3 12h18M3 6h18M3 18h18" />
    <!-- folder -->
    <path v-else-if="name === 'folder'" d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    <!-- bar-chart / analytics -->
    <path v-else-if="name === 'bar-chart'" d="M12 20V10M18 20V4M6 20v-4" />
    <!-- map-pin / location -->
    <path v-else-if="name === 'map-pin'" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle v-else-if="name === 'map-pin'" cx="12" cy="10" r="3" />
    <!-- phone -->
    <path v-else-if="name === 'phone'" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <!-- message / chat -->
    <path v-else-if="name === 'message'" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <!-- eye -->
    <path v-else-if="name === 'eye'" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle v-else-if="name === 'eye'" cx="12" cy="12" r="3" />
    <!-- log-out -->
    <path v-else-if="name === 'log-out'" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline v-else-if="name === 'log-out'" points="16 17 21 12 16 7" /><line v-else-if="name === 'log-out'" x1="21" y1="12" x2="9" y2="12" />
    <!-- shopping-cart -->
    <path v-else-if="name === 'cart'" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line v-else-if="name === 'cart'" x1="3" y1="6" x2="21" y2="6" /><path v-else-if="name === 'cart'" d="M16 10a4 4 0 0 1-8 0" />
    <!-- heart -->
    <path v-else-if="name === 'heart'" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <!-- clock -->
    <circle v-else-if="name === 'clock'" cx="12" cy="12" r="10" /><polyline v-else-if="name === 'clock'" points="12 6 12 12 16 14" />
    <!-- send -->
    <line v-else-if="name === 'send'" x1="22" y1="2" x2="11" y2="13" /><polygon v-else-if="name === 'send'" points="22 2 15 22 11 13 2 9 22 2" />
    <!-- globe -->
    <circle v-else-if="name === 'globe'" cx="12" cy="12" r="10" /><line v-else-if="name === 'globe'" x1="2" y1="12" x2="22" y2="12" /><path v-else-if="name === 'globe'" d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <!-- chevron-right -->
    <polyline v-else-if="name === 'chevron-right'" points="9 18 15 12 9 6" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
  color: { type: String, default: "currentColor" },
})
</script>
