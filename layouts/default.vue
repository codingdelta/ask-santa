<template>
  <div class="w-full h-16 bg-red-600 flex items-center pl-10 text-white">
    <NuxtLink to="/" class="font-bold">ChristmasGifts Center</NuxtLink>
  </div>
  <slot />
  <div
    class="h-40 bg-sky-900 flex flex-col text-white justify-center items-center"
  >
    <div>© Coding Delta B.V., as of 2023</div>
    <a href="/privacy-policy.pdf" target="_blank">Privacy Policy</a>
    <a href="/terms.pdf">Terms and Conditions</a>
  </div>
</template>

<script setup></script>
