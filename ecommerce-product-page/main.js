const cartBtn = document.querySelector('.cart');
const shoppingCart = document.querySelector('.shopping-cart');
const overlay = document.querySelector('.overlay');
const lightboxGallery = document.querySelector('.lightbox-gallery');
const lightboxGalleryMainPic = document.querySelector('.big-img .prod-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const mainPic = document.querySelector('.main-pic img');
const sliderPics = document.querySelectorAll('.slider-pics img');
const overlaySlider = document.querySelectorAll('.overlay-slider img');
const minusBtn = document.querySelector('.counter img[src*="minus"]');
const plusBtn = document.querySelector('.counter img[src*="plus"]');
const countDisplay = document.querySelector('.counter p');
const addToCartBtn = document.querySelector('button');
const cartItemsContainer = document.querySelector('.shopping-cart');
const cartContent = document.querySelector('.shopping-cart .item');
const cartTotalSpan = document.querySelector('.total');
const cartNumber = document.querySelector('.cart span');

let currentIndex = 0;
let count = 1;

cartContent.innerHTML = `<p class="text-center w-full mt-10 text-gray-500">Your cart is empty.</p>`;


const closeGallery = () => {
  overlay.classList.add('hidden');
  lightboxGallery.classList.add('hidden');
};

const handleImageClick = (index) => {
  currentIndex = index;
  let newSrc = sliderPics[index].src.replace('-thumbnail', '');
  mainPic.src = newSrc;
  lightboxGalleryMainPic.src = newSrc;
  sliderPics.forEach(el => el.classList.remove('active'));
  overlaySlider.forEach(el => el.classList.remove('active'));
  sliderPics[index].classList.add('active');
  overlaySlider[index].classList.add('active');
};

cartBtn.addEventListener('click', () => {
  shoppingCart.classList.toggle("hidden");
});

mainPic.addEventListener('click', () => {
  overlay.classList.remove('hidden');
  lightboxGallery.classList.remove('hidden');
});

closeBtn.addEventListener('click', closeGallery);
overlay.addEventListener('click', closeGallery);

sliderPics.forEach((pic, i) => {
  pic.addEventListener('click', () => {
    handleImageClick(i);
  });
});

overlaySlider.forEach((pic, i) => {
  pic.addEventListener('click', () => {
    handleImageClick(i);
  });
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % sliderPics.length;
  handleImageClick(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + sliderPics.length) % sliderPics.length;
  handleImageClick(currentIndex);
});

handleImageClick(0);

plusBtn.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

minusBtn.addEventListener('click', () => {
  if (count > 1) {
    count--;
    countDisplay.textContent = count;
  }
});

addToCartBtn.addEventListener('click', () => {
  const unitPrice = 125.00;
  const totalPrice = unitPrice * count;

  cartContent.innerHTML = `
    <div class="flex items-center justify-between mt-5 p-3">
      <img class="w-[15%] rounded-xl" src="images/image-product-1-thumbnail.jpg" alt="">
      <div class="flex flex-col justify-between">
        <p class="text-xs">Fall Limited Edition Sneakers</p>
        <p class="text-xs"> $${unitPrice.toFixed(2)} x ${count} | 
          <span class="total text-md font-medium pl-2">$${totalPrice.toFixed(2)}</span>
        </p>
      </div>
      <img class="delete-btn w-[24px] h-[24px] transition-[.3s] cursor-pointer hover:scale-[1.2]" src="images/icon-delete.svg" alt="">
    </div>
    <div class="px-3 pb-3">
      <button class="checkout-btn w-full mt-3 bg-orange-500 hover:bg-orange-400 text-white px-7 py-2 rounded-md font-semibold text-sm">
        Checkout
      </button>
    </div>
  `;

  cartNumber.textContent = count;
  cartNumber.classList.remove('hidden');

  const deleteBtn = document.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => {
    cartContent.innerHTML = `<p class="text-center w-full mt-10 text-gray-500">Your cart is empty.</p>`;
    cartNumber.classList.add('hidden');
  });
});
