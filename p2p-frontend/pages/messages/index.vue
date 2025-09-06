<template>
    <div>
      <Navbar />
      <div class="bg-slate-100 py-10 h-max">
          <div class="max-w-[96rem] px-6 mx-auto grid grid-cols-8 gap-4 ">
      <!--          Display all the connected users-->
              <div class="col-span-2 bg-white rounded-md " style="height: 760px;">
                  <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                      <h2>Messages</h2>
                  </div>
                <div>
                  <div
                      v-for="user in conversations"
                      :key="user._id"
                      class="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 rounded-lg cursor-pointer"
                      @click="handleMessageDisplay(user)"
                  >
                    <div class="relative" @click="handleMessageDisplay(user)">
                      <img
                          :src="user.images[0] || extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-36.png')"
                          class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                          alt="User Avatar"
                      />
                      <div
                          :class="[
                'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white',
                user.isVerified ? 'bg-green-400' : 'bg-gray-400'
              ]"
                      >
                      </div>
                    </div>
                    <div class="flex flex-col ml-4 flex-grow">
                      <div class="flex items-center justify-between">
                        <div>
                          <h2 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                            {{ user.name }}
                          </h2>
                          <div class="flex items-center mt-0.5 space-x-10">
                  <span class="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {{ user.user.replace(/"/g, '') }}
                  </span>
                            <span class="text-xs text-gray-500 ml-3">
                    {{ formatTimeAgo(user.createdAt) }}
                  </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!--Current conversation-->
              <div class="col-span-4 bg-white rounded-md">
                <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                  <div class="flex items-center ">
                    <div class="w-[50px] relative">
                      <img :src="userSelected.images ?? '' "
                           class="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                           alt="User Avatar">
                      <div
                          class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                      </div>
                    </div>
      
      <!--                  {{userSelected}}-->
                    <h6>{{ userSelected.name }}</h6>
                  </div>
                </div>
                <div class="grids grid-rows-4 h-[600px]">
                  <ul  class="space-y-5 px-8 overflow-y-auto row-span-3 h-full">
                    <div v-for="message in messages" :key="message._id">
                      <!-- Sent messages (by current user) -->
                      <li v-if="message.senderId === user._id" class="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                        <div class="grow text-end space-y-3">
                          <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                            <p class="text-sm text-white">
                              {{ message.message }}
                            </p>
                            <small class="text-xs text-gray-200">
                              {{ new Date(message.createdAt).toLocaleTimeString() }}
                            </small>
                          </div>
                        </div>
                      </li>
                      <!-- Received messages -->
                      <li v-else class="max-w-lg flex gap-x-2 sm:gap-x-4">
                        <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3">
                          <p class="text-sm text-gray-800">
                            {{ message.message }}
                          </p>
                          <small class="text-xs text-gray-500">
                            {{ new Date(message.createdAt).toLocaleTimeString() }}
                          </small>
                        </div>
                      </li>
                    </div>
                <!-- Chat -->
                </ul>
                  <div class="row-span-1 h-1/4">
                  <MessagesMessageInput @handleGetMessages="getMessages" :id="userSelected._id"/>
                  </div>
                </div>
      <!--                <MessagesMessageContainer />-->
              </div>
              
              <!-- tractor buying -->
             <div class="col-span-2 bg-white rounded-md p-4 flex flex-col" style="height: 760px;">
                  <div>
                    <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                        <h2>{{ tractor.tractorName }}</h2>
                    </div>
                     <!-- <div class="w-2/6"> -->
                        <img :src="tractor?.images?.[0]" alt="" class="bg-[#e8f8fb]">
                      <!-- </div> -->
                                     <div class="flex flex-col gap-4 pl-4 mt-8 my-3">
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/Hello Tractor_RGB_BLACK_-Settings.png')" class="h-[30px] w-[30px]" alt="">
                      <p>{{ tractor?.engineHoursUsed }} hrs</p>
                    </div>
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png')" class="h-[30px] w-[30px]" alt="">
                      <p>{{ tractor?.year }}</p>
                    </div>
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-55.png')" class="h-[30px] w-[30px]" alt="">
                      <p>{{ tractor?.HPCategory }}hp</p>
                    </div>
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-56.png')" class="h-[30px] w-[30px]" alt="">
                      <p>Hydraulic Cost</p>
                    </div>
                                    </div>
                  </div>

        <div class="allign-bottom mt-auto mb-4 px-4 flex flex-col gap-4">
          <button class="btn btn-primary outlined w-full" @click.prevent="matchUser()">Buy for ${{ tractor.price }}</button>
          <div>
            <InputText
                v-model="discountAmount"
                type="number"
                class="w-full p-4 border-b border-gray-200"
                placeholder="Enter Discount amount"
            />
            <button class="btn btn-primary outlined w-full mt-2" @click.prevent="matchUser()">Request Discount</button>
          </div>
        </div>

              </div>

              <!-- dealer buying -->
              <div class="col-span-2 bg-white rounded-md p-4 flex flex-col" style="height: 760px;">
                  <div>
                    <div class=" border-b-[1px] mb-4 pb-[8px] px-4 py-3">
                        <h2>Dealer service</h2>
                    </div>
                     <!-- <div class="w-2/6"> -->
                        <!-- <img :src="tractor?.images?.[0]" alt="" class="bg-[#e8f8fb]"> -->
      <img :src="extractPhotos('/../../assets/images/hero-4.jpg')" class="w-[400px] h-[240px] rounded-md" alt="">
                      

                      <!-- </div> -->
                                     <div class="flex flex-col gap-4 pl-4 mt-8 my-3">
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/../../assets/images/hero-4.jpg')" class="w-[40px] h-[40px] rounded-lg" alt="">
                      <h6>Wesley Waka</h6>
                    </div>
                    
                                      <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/Hello Tractor_RGB_BLACK_-Settings.png')" class="h-[30px] w-[30px]" alt="">
                      Engine,Hydraulics,Transmission
                    </div>

                    

                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/../../assets/images/starRating.png')" class="w-[20px] h-[20px] rounded-lg" alt="">
      <h6>5.0</h6>
                    </div>

                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/Hello Tractor_RGB_BLACK_-Schedule.png')" class="h-[30px] w-[30px]" alt="">
                      <p>Member since August,2025</p>
                    </div>
                    <div class="flex flex-row space-x-1 items-center">
                      <img :src="extractPhotos('/public/Black/HT_ICONS_BLACK_RGB-55.png')" class="h-[30px] w-[30px]" alt="">
                      <p>Nakuru</p>
                    </div>
                   
                                    </div>
                  </div>

        <div class="allign-bottom mt-auto mb-4 px-4 flex flex-col gap-4">
          <button class="btn btn-primary outlined w-full" @click.prevent="matchUser()">Buy for ${{ tractor.price }}</button>
          <div>
            <InputText
                v-model="discountAmount"
                type="number"
                class="w-full p-4 border-b border-gray-200"
                placeholder="Enter Discount amount"
            />
            <button class="btn btn-primary outlined w-full mt-2" @click.prevent="matchUser()">Request Discount</button>

            <DotLottieVue style="height: 500px; width: 500px" autoplay loop src="https://lottie.host/embed/14d4187e-cd70-4c80-8612-83bf9d87b88d/sZFyyWahbN.lottie" />
          </div>
        </div>

              </div>
      
      
          </div>
      </div>
      <Footer />
    </div>

</template>



<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
// import { useToast } from '~/composables/useToast'; // Assuming you have a useToast composable
import { useAuthStore } from '~/stores/useAuthStore';
import { useSocketStore } from '~/stores/useSocketStore';
// import { useConversationStore } from '~/stores/useConversationStore';
// import useGetConversations from '~/composables/useGetConversations';
// import useGetMessages from '~/composables/useGetMessages';
// import useListenMessages from '~/composables/useListenMessages';
import { useCustomFetch } from '~/composables/useCustomFetch';
import notificationSound from '/Sounds/notification.mp3';
import io from 'socket.io-client';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const socket = io(process.env.API_URL);

const conversations = ref([]);
const loading = ref(false);
const messages = ref([]);
const userSelected = ref({});
const { user, token } = useAuthStore();
const socketStore = useSocketStore();
const toast = useToast();
const tractor = ref({});
const discountAmount = ref('');

// Listen for new messages
// useListenMessages();

const handleNewMessage = (newMessage) => {
  newMessage.shouldShake = true;
  const sound = new Audio(notificationSound);
  sound.play();
  messages.value = [...messages.value, newMessage]; // Update messages ref
};

// Attach socket event listener
if (socket) {
  socket.on('newMessage', handleNewMessage);
}

// Cleanup socket event listener on unmount
onUnmounted(() => {
  if (socket) {
    socket.off('newMessage', handleNewMessage);
  }
});




// Format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return 'yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 21) return '2 weeks ago';
  if (diffInDays < 28) return '3 weeks ago';
  return `${Math.floor(diffInDays / 30)} months ago`;
};

// Fetch messages for a specific conversation
const getMessages = async (id) => {
  loading.value = true;

  const URLparams = new URLSearchParams({
    id: user._id,
  });

  try {
    const res = await useCustomFetch(`/messages/fetch/${id}?${URLparams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res;
    messages.value = data;
  } catch (error) {
    console.error(error.message);
    toast.error('Failed to fetch messages'); // Notify user of error
  } finally {
    loading.value = false;
  }
};

// method for getting tractor for selected user
const fetchBuyerTractor = async (_id) => {
  // dataLoading.value = true;
  try{
    const res = await useCustomFetch(`/tractor/message/674759f21c2179c53b69c7c3`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res;
    console.log(data,'this is the tractor of the seller');
    tractor.value = data.productView;
    // dataLoading.value = false;
  }catch{
    toast.error('Failed to fetch tractor data'); // Notify user of error
  }
};

// Handle message display for a selected user
const handleMessageDisplay = (userDisplay) => {
  const { _id } = userDisplay;
  getMessages(_id);
  userSelected.value = userDisplay;
  fetchBuyerTractor(_id);
};

// Watch for changes in userSelected
watch(userSelected, (newUser) => {
  if (newUser) {
    handleMessageDisplay(newUser);
  }
});

// Fetch conversations
const getConversations = async () => {
  loading.value = true;

  const URLparams = new URLSearchParams({
    id: user._id,
  });

  try {
    const response = await useCustomFetch(`/messages/matched?${URLparams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    conversations.value = response;
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    toast.error('Failed to fetch conversations'); // Notify user of error
  } finally {
    loading.value = false;
  }
};

// Fetch conversations on mount
onMounted(async () => {
  await getConversations();
  socket.connect('')


//   socket.value = io(process.env.API_URL || 'http://localhost:3000')
//
//   socket.value.on('connect', () => {
//     console.log('Connected to Socket.IO server')
//     socket.value.emit('login', props.userId)
//   })
});
</script>