export const test_11 = `
<template>
  <div class="pet-website">
    <header class="header">
      <h1 class="logo">Pet Paradise</h1>
      <div class="search-bar">
        <input
          v-model="state.searchQuery"
          type="text"
          placeholder="Search pets..."
          class="search-input"
        >
        <button class="search-btn">🔍</button>
      </div>
    </header>

    <div class="category-tabs">
      <button
        v-for="category in state.categories"
        :key="category"
        :class="{ active: state.activeCategory === category }"
        @click="state.activeCategory = category"
        class="category-btn"
      >
        {{ category }}
      </button>
    </div>

    <div class="pet-grid">
      <div v-for="pet in filteredPets" :key="pet.id" class="pet-card">
        <div class="pet-image"></div>
        <div class="pet-details">
          <h3>{{ pet.name }}</h3>
          <p class="breed">{{ pet.breed }}</p>
          <p class="age">{{ pet.age }} years old</p>
          <div class="pet-tags">
            <span v-for="tag in pet.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <button class="adopt-btn">Adopt Me</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent, reactive, computed } from 'vue';
  import { useProvider } from '@vtj/renderer';
  export default defineComponent({
    name: 'Fff',
    setup(props) {
      const provider = useProvider({ id: '14k5bykc', version: '1745586215833' });
      const state = reactive({
        pets: [
          {
            id: 1,
            name: 'Max',
            breed: 'Golden Retriever',
            age: 2,
            image: 'https://source.unsplash.com/random/300x300/?dog,golden-retriever',
            category: 'Dogs',
            tags: ['Friendly', 'Playful', 'Smart']
          },
          {
            id: 2,
            name: 'Whiskers',
            breed: 'Persian Cat',
            age: 3,
            image: 'https://source.unsplash.com/random/300x300/?cat,persian',
            category: 'Cats',
            tags: ['Calm', 'Affectionate']
          },
          {
            id: 3,
            name: 'Bella',
            breed: 'Parrot',
            age: 5,
            image: 'https://source.unsplash.com/random/300x300/?parrot',
            category: 'Birds',
            tags: ['Colorful', 'Talkative']
          },
          {
            id: 4,
            name: 'Rocky',
            breed: 'Hamster',
            age: 1,
            image: 'https://source.unsplash.com/random/300x300/?hamster',
            category: 'Small Pets',
            tags: ['Active', 'Cute']
          }
        ],
        categories: ['All', 'Dogs', 'Cats', 'Birds', 'Small Pets'],
        activeCategory: 'All',
        searchQuery: ''
      });
      return { state, props, provider };
    },
    computed: {
      filteredPets() {
        return this.state.pets.filter(pet => {
          const matchesCategory = this.state.activeCategory === 'All' || 
                                pet.category === this.state.activeCategory;
          const matchesSearch = pet.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()) || 
                              pet.breed.toLowerCase().includes(this.state.searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
      }
    }
  })
</script>

<style lang="css" scoped>

</style>
`;
