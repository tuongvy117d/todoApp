<template>
<h3>Hello {{ username }}</h3>
<form>
  <label><input type="checkbox" name="option1" /> Option 1</label><br>
  <label><input type="checkbox" name="option2" /> Option 2</label><br>
  <label><input type="checkbox" name="option3" /> Option 3</label><br>
</form>
<h3>That is all, {{ username }}</h3>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const username = ref('Bate');
    
    return {
      username
    };
  }
});
</script>