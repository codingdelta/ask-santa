<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Santa is coming
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
          Welcome to <span class="text-red-700">christmasgifts</span>, a place
          where you can find the perfect gifts for christmas.
        </p>
        <div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
          <article v-for="post in posts" :key="post.id">
            <NuxtLink
              :to="post._path"
              class="relative isolate flex flex-col gap-8 lg:flex-row"
            >
              <div
                class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"
              >
                <img
                  :src="images[post.imageUrl]"
                  alt=""
                  class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                />
                <div
                  class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
                />
              </div>
              <div>
                <div class="flex items-center gap-x-4 text-xs">
                  <time :datetime="post.date" class="text-gray-500">{{
                    new Date(post.date).toLocaleDateString("us-EN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}</time>
                </div>
                <div class="group relative max-w-xl">
                  <h3
                    class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                  >
                    <span class="absolute inset-0" />
                    {{ post.title }}
                  </h3>
                  <p class="mt-5 text-sm leading-6 text-gray-600">
                    {{ post.description }}
                  </p>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { filename } from "pathe/utils";

const posts = await queryContent("/blog")
  .sort({ date: -1 })
  .where({ _partial: false })
  .find();

console.log("posts", posts);

const glob = import.meta.glob("~/assets/**/*", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
</script>
