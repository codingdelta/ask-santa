<template>
  <!-- <ContentDoc
    :path="route.params.slug ? `/blog/${route.params.slug[0]}` : '/blog'"
  >
    <template #not-found>
      <h2>Blog slug ({{ route.params.slug }}) not found</h2>
    </template>
  </ContentDoc> -->
  <section class="flex flex-col items-center">
    <img :src="images[post.imageUrl]" alt="" class="object-cover h-56 w-full" />
    <div class="max-w-7xl">
      <div class="max-w-xl mx-auto mt-10 flex flex-col gap-5 px-3 md:px-0">
        <time :datetime="post.datetime" class="text-gray-500">{{
          new Date(post.date).toLocaleDateString("nl-NL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}</time>
        <h1 class="text-4xl">{{ post.title }}</h1>
        <ContentDoc class="my-5 prose lg:prose-xl" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { filename } from "pathe/utils";

const route = useRoute();

const glob = import.meta.glob("~/assets/**/*", { eager: true });
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const post = await queryContent("/blog").where({ _path: route.path }).findOne();

useServerSeoMeta({
  title: post.title,
  ogTitle: post.title,
  description: post.description,
  ogDescription: post.description,
  ogImage: post.imageUrl,
  twitterCard: "summary_large_image",
});
</script>
