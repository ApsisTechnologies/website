<style scoped>
.debug {
  color: black;
  font-size: .6rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* border: 1px dashed cyan; */
  z-index: 10000;
  opacity: .7;
}

@media (--res-mobile-legacy) {
  .debug::before {
    content: 'mobile-legacy';
    background-color: red;
  }
}

@media (--res-mobile) {
  .debug::before {
    content: 'mobile';
    background-color: cyan;
  }
}

@media (--res-desktop) {
  .debug::before {
    content: 'desktop';
    background-color: yellow;
  }
}

@media (--res-desktop-large) {
  .debug::before {
    content: 'desktop-large';
    background-color: magenta;
  }
}
</style>

<template>
  <span class="debug pos-fixed" />
</template>
