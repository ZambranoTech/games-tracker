<template>
  <div class="mt-2 w-[364px] md:w-[350px] lg-w[364px]">
    <router-link :to="{name: 'game', params: {id: game.id}}">
      <img
        :src="imageUrl"
        :alt="game.name"
        style="width: auto; height: 252px; object-fit: cover"
        class="rounded hover:opacity-75 tansition easy-in-out duration-150"
      />
    </router-link>
    <p>{{ game.name }}</p>
    <div class="flex">
      <p>{{ game.released }}</p>
      <div class="ms-4 flex">
        <p>{{ game.metacritic !== null ? game.metacritic + '%' : 'N/A' }}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 ms-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            stroke="currentColor"
            class="text-yellow-500 fill-current"
          />
        </svg>
      </div>
    </div>
    <p class="text-gray-400">{{ game.genres?.map(genre => genre.name).join(', ') }}</p>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      required: true,
    }
  },
  computed: {
    imageUrl() {
      // Si la imagen está disponible en el objeto game, se devuelve su URL.
      if (this.game.background_image) {
        return this.game.background_image;
      }
      // De lo contrario, se devuelve una imagen por defecto.
      return 'https://via.placeholder.com/364x252';
    }
  }
}
</script>

<style></style>