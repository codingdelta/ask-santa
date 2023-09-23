<template>
  <div id="container" class="w-full min-h-screen bg-sky-200 py-5">
    <div class="flex flex-col items-center text-center my-20 gap-10">
      <div class="text-8xl">
        <span class="text-red-600">Santa</span> is almost here
      </div>

      <div class="text-3xl">
        But still wondering what the perfect gift is? Santa's assistant will
        help!
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <div
        id="chat"
        class="bg-white rounded-lg h-[600px] w-full md:w-2/3 text-center flex justify-center"
      >
        <div
          v-if="page === 'intro'"
          class="flex flex-col justify-center h-full items-center w-full gap-5 p-5"
        >
          <div class="">
            Describe the person, their hobbies, interests, and Santa will sort
            out the presents.
          </div>
          <button
            type="button"
            @click="page = 'chat'"
            class="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Continue
          </button>
        </div>
        <div v-if="page === 'chat'" class="flex h-full flex-col py-2">
          <div
            id="chat"
            ref="chatContainer"
            class="flex-grow justify-end overflow-y-auto px-2 py-4"
          >
            <div class="flex flex-col gap-3">
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="max-w-prose rounded-lg py-3 px-3 text-left"
                :class="
                  message.role === 'assistant'
                    ? ' bg-sky-100 justify-start mr-auto'
                    : 'flex justify-end bg-slate-100 ml-auto'
                "
              >
                <div
                  v-if="message.role === 'assistant'"
                  v-html="marked(message.content)"
                  class="prose"
                ></div>
                <div v-else>
                  {{ message.content }}
                </div>
                <div
                  v-if="message.products && message.products.length > 0"
                  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5"
                >
                  <div
                    v-for="(product, index) in message.products"
                    :key="index"
                    class="bg-white p-2 rounded-lg"
                  >
                    <div class="flex flex-col justify-between gap-y-2 h-full">
                      <div>
                        <div class="flex justify-center">
                          <img
                            :src="product.image"
                            class="h-48 w-48 object-contain"
                          />
                        </div>
                        <div class="flex flex-col justify-between">
                          <div class="text-center font-semibold text-lg">
                            {{ product.name }}
                          </div>
                        </div>
                      </div>

                      <NuxtLink
                        class="rounded-md cursor-pointer bg-sky-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >Shop on Amazon</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="chat-input"
            class="sticky bottom-0 mt-3 py-1 pr-4 flex border rounded-md border-gray-300"
          >
            <textarea
              type="text"
              class="w-full placeholder:text-base rounded-md px-4 resize-none border-0 focus:ring-0 focus-visible:ring-0 focus:outline-none max-h-32"
              v-model="message"
              placeholder="Describe the person you want to give a gift to"
              rows="2"
              maxlength=""
              @keydown.enter="sendMessage"
            ></textarea>
            <div
              @click="sendMessage"
              class="self-center h-10 bg-sky-400 p-2 rounded-xl cursor-pointer"
            >
              <PaperAirplaneIcon class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Snowflakes from "magic-snowflakes";
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";
import { marked } from "marked";

const page = ref("intro");
const chatContainer = ref(null);
const loading = ref(false);
const error = ref(false);
const message = ref(
  "My dad loves the ocean and do some hikes. He is 56 years old. He used to go a lot to the Alps and the Himilaya. But now is sitting a lot at home. I would love to get him moving again."
);
const messages = ref([]);

messages.value.push({
  role: "assistant",
  content:
    "Hi, I'm Santa's assistant. Describe the person you want to give a gift to and I'll help you find the perfect present.",
});

async function sendMessage() {
  if (!message.value) return;
  loading.value = true;
  error.value = false;
  messages.value.push({
    role: "user",
    content: message.value,
  });
  message.value = "";
  scrollToBottom();

  try {
    let res = await $fetch(`/api/v1/chat`, {
      method: "POST",
      body: JSON.stringify({
        messages: messages.value,
      }),
    });
    message.value = "";

    let newMessage = ref({
      role: "assistant",
      content: res.explanation,
      products: res.products,
    });
    messages.value.push(newMessage.value);
  } catch (err) {
    error.value = true;
  }

  loading.value = false;
  scrollToBottom();
  message.value = "";
}

onMounted(() => {
  const snowflakes = new Snowflakes({
    container: document.querySelector("#container"),
    color: "white",
    zIndex: -1,
  });
});

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}
</script>

<style scoped></style>
