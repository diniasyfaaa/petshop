let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalItems = document.getElementById("totalItems");
const subtotal = document.getElementById("subtotal");
const totalPrice = document.getElementById("totalPrice");
const checkoutButton = document.getElementById("checkoutButton");

const receiptModal = document.getElementById("receiptModal");
const receiptItems = document.getElementById("receiptItems");
const receiptTotal = document.getElementById("receiptTotal");
const finishCheckout = document.getElementById("finishCheckout");

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.classList.remove("d-none");
    checkoutButton.disabled = true;

    totalItems.textContent = "0";
    subtotal.textContent = "Rp0";
    totalPrice.textContent = "Rp0";

    return;
  }

  emptyCart.classList.add("d-none");
  checkoutButton.disabled = false;

  cart.forEach(function (item, index) {
    const itemSubtotal = item.harga * item.qty;

    const cartItem = document.createElement("div");

    cartItem.className =
      "cart-item bg-white rounded-4 p-3 p-md-4 shadow-sm mb-3";

    cartItem.innerHTML = `
      <div class="row align-items-center g-3">

        <div class="col-4 col-md-2">
          <img
            src="${item.gambar}"
            alt="${item.nama}"
            class="cart-product-image"
          >
        </div>

        <div class="col-8 col-md-4">
          <h3 class="h6 mb-1">
            ${item.nama}
          </h3>

          <p class="text-muted small mb-1">
            ${item.merk || ""}
          </p>

          <strong>
            ${formatRupiah(item.harga)}
          </strong>
        </div>

        <div class="col-7 col-md-3">
          <div class="quantity-control">

            <button
              type="button"
              class="quantity-button decrease-button"
              data-index="${index}"
            >
              −
            </button>

            <span class="quantity-value">
              ${item.qty}
            </span>

            <button
              type="button"
              class="quantity-button increase-button"
              data-index="${index}"
            >
              +
            </button>

          </div>
        </div>

        <div class="col-5 col-md-3 text-end">
          <div class="fw-semibold mb-2">
            ${formatRupiah(itemSubtotal)}
          </div>

          <button
            type="button"
            class="btn btn-sm btn-outline-danger remove-button"
            data-index="${index}"
          >
            Hapus
          </button>
        </div>

      </div>
    `;

    cartItems.appendChild(cartItem);
  });

  updateSummary();
  attachCartEvents();
}

function updateSummary() {
  const totalQuantity = cart.reduce(function (total, item) {
    return total + item.qty;
  }, 0);

  const subtotalValue = cart.reduce(function (total, item) {
    return total + item.harga * item.qty;
  }, 0);

  totalItems.textContent = totalQuantity;
  subtotal.textContent = formatRupiah(subtotalValue);
  totalPrice.textContent = formatRupiah(subtotalValue);
}

function increaseQuantity(index) {
  cart[index].qty += 1;

  saveCart();
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);

  saveCart();
  renderCart();
}

function attachCartEvents() {
  const increaseButtons = document.querySelectorAll(".increase-button");
  const decreaseButtons = document.querySelectorAll(".decrease-button");
  const removeButtons = document.querySelectorAll(".remove-button");

  increaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      increaseQuantity(index);
    });
  });

  decreaseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      decreaseQuantity(index);
    });
  });

  removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);
      removeItem(index);
    });
  });
}

function showReceipt() {
  if (cart.length === 0) {
    return;
  }

  receiptItems.innerHTML = "";

  let total = 0;

  cart.forEach(function (item) {
    const itemTotal = item.harga * item.qty;

    total += itemTotal;

    const receiptItem = document.createElement("div");

    receiptItem.className =
      "d-flex justify-content-between gap-3 mb-2";

    receiptItem.innerHTML = `
      <span>
        ${item.nama} × ${item.qty}
      </span>

      <span>
        ${formatRupiah(itemTotal)}
      </span>
    `;

    receiptItems.appendChild(receiptItem);
  });

  receiptTotal.textContent = formatRupiah(total);
  receiptModal.classList.remove("d-none");
}

function finishTransaction() {
  cart = [];

  saveCart();
  renderCart();

  receiptModal.classList.add("d-none");
}

if (checkoutButton) {
  checkoutButton.addEventListener("click", function () {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    localStorage.getItem("role");

  if (!isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", "cart.html");

    alert("Silakan login terlebih dahulu untuk melakukan checkout.");

    window.location.href = "../login/login.html";
    return;
  }

  if (role !== "pelanggan") {
    alert("Checkout hanya dapat dilakukan oleh pelanggan.");
    return;
  }

  showReceipt();
});
}

if (finishCheckout) {
  finishCheckout.addEventListener("click", finishTransaction);
}

renderCart();