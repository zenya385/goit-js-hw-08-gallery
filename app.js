const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  gallery: document.querySelector(".js-gallery"),
  openModalWindow: document.querySelector(".js-lightbox"),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalWindow: document.querySelector(".lightbox__image"),
  modalWindowOverlay: document.querySelector(".lightbox__overlay"),
};

const galleryMarkup = creatGalleryMarkup(galleryItems);

let activeImage = 0;

function creatGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          data-index="${index}"
        />
      </a>
    </li>
    `;
    })
    .join("");
}
refs.gallery.insertAdjacentHTML("beforeend", galleryMarkup);

refs.gallery.addEventListener("click", onGalleryClick);
refs.closeModalBtn.addEventListener("click", onCloseModalBtnClick);
refs.modalWindowOverlay.addEventListener("click", onModalWindowOverlayClick);

function onGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keyup", slideToggle);

  refs.openModalWindow.classList.add("is-open");
  refs.modalWindow.src = evt.target.dataset.source;
  activeImage = +evt.target.dataset.index;
}

const galleryItemsLength = galleryItems.length - 1;

function slideToggle({ code }) {
  if (code === "ArrowLeft") {
    activeImage -= 1;

    if (activeImage < 0) {
      activeImage = galleryItemsLength;
    }
  } else if (code === "ArrowRight") {
    activeImage += 1;

    if (activeImage > galleryItemsLength) {
      activeImage = 0;
    }
  }
  refs.modalWindow.src = galleryItems[activeImage].original;
}

function onCloseModalBtnClick() {
  window.removeEventListener("keydown", onEscKeyPress);
  refs.openModalWindow.classList.remove("is-open");
  refs.modalWindow.src = "";
}

function onModalWindowOverlayClick(event) {
  if (event.target.classList.contains(".lightbox__overlay")) {
    return;
  }
  refs.openModalWindow.classList.remove("is-open");
}

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    refs.openModalWindow.classList.remove("is-open");
  }
}
