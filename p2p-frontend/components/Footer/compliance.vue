<template>
    <div class="rounded-lg bg-white h-48 z-10 flex py-[40px] px-[20px] gap-3 my-8 max-w-[84rem] mx-auto">
              <div class="flex align-middle gap-3 my-auto">
                <img class="h-[40px]" :src="extractPhotos('/caraudit.svg')" alt="">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <Divider layout="vertical" />
              <div class="flex align-middle gap-3 my-auto">
                <img :src="extractPhotos('/finance.svg')" class="h-[40px]" alt="">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <Divider layout="vertical" />
              <div class="flex align-middle gap-3 my-auto">
                 <img :src="extractPhotos('/legal.svg')" class="h-[40px]" alt="">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
</template>