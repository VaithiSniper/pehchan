<template>
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gold">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{{ title }}</div>
      <button type="button" @click="$emit('connect')"
        class="inline-block px-6 py-4 bg-black text-white font-medium text-md uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        <span class="flex align-middle my-auto space-x-1 gap-x-4">
          {{ text }}
          <img width="20" alt="MetaMask Fox"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png" />
        </span>
      </button>
    </div>
  </div>
</template>

<style src="@/assets/css/main.css">

</style>

<script>
export default {
  name: 'Card',
  props: ['title', 'text'],
  methods: {}
}
</script>
