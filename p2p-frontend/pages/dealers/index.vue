<template>
<div>
    <Navbar/>
    <div>
         <div class="hero-section">
        <div class="relative ml-40 right-0 top-20">
          <h1 class="text-white font-merriWeatherBold">You Car repair and maintenance. <br> We inspect it and fix it
          </h1>
          <div class="rounded-lg w-[600px] bg-white mt-10 flex flex-col space-y-8 py-8 px-8 ">
            <div class="flex flex-row space-x-2">
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Type" />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Brand" />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-[200px]">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Engine hours" />
              </CustomInputContainer>
            </div>

            <div class="flex flex-row space-x-2">
              <CustomInputContainer label=" " class="w-1/2">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Registration From " />
              </CustomInputContainer>
              <CustomInputContainer label=" " class="w-1/2">
                <Select v-model="formData.idType" :options="idTypes" optionLabel="label" optionValue="value"
                  placeholder="Price up To" />
              </CustomInputContainer>
            </div>

            <div class="flex justify-end">
              <button class="btn btn-primary">112 Offers</button>
            </div>
            <!-- <Select
            optionLabel="label"
            optionValue="value"
            /> -->

          </div>
        </div>
      </div>

      <div class="">
        <div
          class="w-[70rem] rounded-md absolute bg-[#e8f8fb] h-48 z-10 top-[50rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex py-[40px] px-[20px] gap-3">
          <div class="flex align-middle gap-3 my-auto">
            <img :src="extractPhotos('/assets/images/characters/Wekeza Neutral.png')" class="h-[120px] " alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <Divider layout="vertical" />
          <div class="flex align-middle gap-3 my-auto">
            <img :src="extractPhotos('/assets/images/characters/Wekeza Gesture.png')" class="h-[120px] "  alt="">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
         
        </div>
      </div>

      <div class="w-full px-6 mx-auto my-[8rem] flex justify-center flex-col gap-6 items-center allign-middle">
          <Divider layout="horizontal" />

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center w-full mx-auto">
  <div class="w-[300px] mx-auto">
    <div>
      <img :src="extractPhotos('/assets/images/hero-4.jpg')" class="w-[300px] h-[240px] rounded-md" alt="">
    </div>
    <div class="mt-2 flex flex-row items-center gap-2">
      <img :src="extractPhotos('/assets/images/hero-4.jpg')" class="w-[40px] h-[40px] rounded-lg" alt="">
      <h6>Wesley Waka</h6>
    </div>
    <div class="flex flex-row items-center gap-2 mt-2">
      <img :src="extractPhotos('/assets/images/starRating.png')" class="w-[20px] h-[20px] rounded-lg" alt="">
      <h6>5.0</h6>
    </div>
    <div class="mt-2 flex flex-col items-center gap-2">
      <p>I will fix you car and engine and ensure you are new Lorem ipsum dolor sit amet.</p>
      <div class="flex flex-row items-center gap-2 w-full justify-between">
        <h5>300KES</h5>
        <button class="btn btn-primary outlined  mt-2" @click.prevent="matchUser()">Contact</button>
    </div>
    </div>
  </div>




</div>



      </div>


    </div>
</div>

</template>

<script setup>

const formData = ref({
  title: "",
  category: "",
  quantity: 0,
  price: 1,
  pv: 1,
  description: "",
  imageCover: null,
  images: [],
});


</script>


<style scoped>
.flip-horizontal {
  transform: scaleX(-1);

}

.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Adjust as needed */
}

.bg-grad {
  /* background-color: hsl(12, 100%, 56%); */
  background-image: radial-gradient(ellipse farthest-corner at right top, hsl(12, 100%, 97%) 10%, hsl(12, 100%, 96%) 25%, hsl(12, 100%, 82%) 54%, hsl(12, 100%, 56%) 100%);
  background-size: 'cover';

}

.hero-section {
  height: 750px;
  width: 100%;
  position: relative;
  background-image:
    radial-gradient(ellipse farthest-corner at right top,
      hsla(12, 100%, 97%, 0.3) 10%,
      /* More transparent at 10% */
      hsla(12, 100%, 96%, 0.4) 25%,
      /* More transparent at 25% */
      hsla(12, 100%, 82%, 0.85) 54%,
      /* Full opacity maintained */
      hsla(12, 100%, 56%, 0.85) 100%
      /* Full opacity maintained */
    ),
    url('/assets/images/mechanic.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>