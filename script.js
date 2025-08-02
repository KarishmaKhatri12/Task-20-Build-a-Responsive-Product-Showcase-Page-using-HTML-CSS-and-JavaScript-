const productData = {
  1: {
    title: "Smartphone X",
    desc: "Powerful performance in a sleek design.",
    price: "$699",
    images: [
      "Smartphone X(1).jpg",
      "Smartphone X(2).jpg",
      "Smartphone X(3).jpg"
    ]
  },
  2: {
    title: "Wireless Headphones",
    desc: "Noise‑cancelling and immersive sound.",
    price: "$199",
    images: [
      "Wireless Headphones(1).jpg",
      "Wireless Headphones(2).jpg",
      "Wireless Headphones(3).jpg"
    ]
  },
  3: {
    title: "Smartwatch Pro",
    desc: "Fitness tracking and smart connectivity.",
    price: "$299",
    images: [
      "Smartwatch Pro(1).jpg",
      "Smartwatch Pro(2).jpg",
      "Smartwatch Pro(3).jpg"
    ]
  },
  4: {
    title: "Portable Charger",
    desc: "Keep your devices powered on the go.",
    price: "$49",
    images: [
      "Portable Charger(1).jpg",
      "Portable Charger(2).jpg",
      "Portable Charger(3).jpg"
    ]
  }
};

const modal = document.getElementById("modal");
const dotsContainer = document.querySelector(".dots");
let currentIndex = 0;

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    const data = productData[id];
    currentIndex = 0;

    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-desc").textContent = data.desc;
    document.getElementById("modal-price").textContent = data.price;
    document.getElementById("qty").value = 1;

    document.getElementById("modal-img").src = data.images[currentIndex];
    dotsContainer.innerHTML = data.images
      .map((_, idx) => `<span class="dot${idx === 0 ? " active" : ""}" data-idx="${idx}"></span>`)
      .join("");

    modal.style.display = "flex";
    setupSlider(data.images);
  });
});

function setupSlider(images) {
  document.getElementById("prev").onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlide(images);
  };
  document.getElementById("next").onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlide(images);
  };
  document.querySelectorAll(".dot").forEach(dot => {
    dot.onclick = () => {
      currentIndex = +dot.getAttribute("data-idx");
      updateSlide(images);
    };
  });
}

function updateSlide(images) {
  document.getElementById("modal-img").src = images[currentIndex];
  document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
  document.querySelector(`.dot[data-idx="${currentIndex}"]`).classList.add("active");
}

document.querySelector(".close-btn").onclick = () => {
  modal.style.display = "none";
};

// Quantity controls
document.getElementById("plus").addEventListener("click", () => {
  const qtyInput = document.getElementById("qty");
  let value = parseInt(qtyInput.value);
  qtyInput.value = value + 1;
});

document.getElementById("minus").addEventListener("click", () => {
  const qtyInput = document.getElementById("qty");
  let value = parseInt(qtyInput.value);
  if (value > 1) {
    qtyInput.value = value - 1;
  }
});

// Scroll to Top
const topBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  topBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
