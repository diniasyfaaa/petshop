// produk.js

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const products = [
    {
        nama: "Cat Choize Chicken Liver Adult Makanan Kucing 75gram",
        merk: "Cat Choize",
        harga: 6500,
        ukuran: 75,
        gambar: "../product/1.png"
    },
    {
        nama: "Cat Choize Pouch Cat Food Mackerel 75gram",
        merk: "Cat Choize",
        harga: 6200,
        ukuran: 75,
        gambar: "../product/2.png"
    },
    {
        nama: "Cat Choize Pouch Cat Food Tuna 75gram",
        merk: "Cat Choize",
        harga: 6500,
        ukuran: 75,
        gambar: "../product/3.png"
    },
    {
        nama: "Cat Choize Pouch Cat Kitten Tuna Makanan Basah Kucing 75gram",
        merk: "Cat Choize",
        harga: 6100,
        ukuran: 75,
        gambar: "../product/4.png"
    },
    {
        nama: "Me-O Kitten Food Otak-Otak with White Fish Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/a.png"
    },
    {
        nama: "Me-O Nusantara Otak-Otak With White Fish & Crabstick Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/b.png"
    },
    {
        nama: "Me-O Nusantara Pempek With White Fish & Egg Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/c.png"
    },
    {
        nama: "Me-O Ocean Fish in Jelly Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/d.png"
    },
    {
        nama: "Me-O Otak-Otak White Fish & Carrot Adult Makanan Kucing 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/e.png"
    },
    {
        nama: "Me-O Pempek With White Fish & Shrimp Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/f.png"
    },
    {
        nama: "Me-O Pouch Cat Adult Chicken Chunk In Gravy Makanan Kucing 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/g.png"
    },
    {
        nama: "Me-O Pouch Cat Adult Mackerel Makanan Kucing 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/h.png"
    },
    {
        nama: "Me-O Pouch Cat Adult Sardine & Red Snapper Makanan Kucing 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/i.png"
    },
    {
        nama: "Me-O Pouch Cat Adult Tuna & White Fish Makanan Kucing 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/j.png"
    },
    {
        nama: "Me-O Sardine, Chicken & Rice Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8700,
        ukuran: 80,
        gambar: "../product/k.png"
    },
    {
        nama: "Me-O Tuna in Jelly Adult Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/l.png"
    },
    {
        nama: "Me-O Tuna in Jelly Kitten Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/m.png"
    },
    {
        nama: "Me-O Tuna with Sardine in Jelly Kitten Makanan Kucing Pouch 80gram",
        merk: "Me-O",
        harga: 8000,
        ukuran: 80,
        gambar: "../product/n.png"
    },
    {
        nama: "Whiskas Mackerel Junior Makanan Kucing Pouch 80gram",
        merk: "Whiskas",
        harga: 7700,
        ukuran: 80,
        gambar: "../product/11.png"
    },
    {
        nama: "Whiskas Tasty Mix Tuna Katsuo Carrot Junior Makanan Kucing 70gram",
        merk: "Whiskas",
        harga: 9400,
        ukuran: 70,
        gambar: "../product/12.png"
    },
    {
        nama: "Whiskas Tasty Mix Wet Cat Food Seafood Cocktail Pouch 70gram",
        merk: "Whiskas",
        harga: 8900,
        ukuran: 70,
        gambar: "../product/13.png"
    },
    {
        nama: "Whiskas Tuna Adult Makanan Kucing Pouch 80gram",
        merk: "Whiskas",
        harga: 7700,
        ukuran: 80,
        gambar: "../product/14.png"
    }
  ]; // array produk

// DOM references
const productContainer = document.getElementById("productContainer");
const sortBy = document.getElementById("sortBy");
const searchInput = document.getElementById("searchInput");

// Tampilkan produk
function displayProducts(data) {
  productContainer.innerHTML = "";
    if (data.length === 0) {
    productContainer.innerHTML = `
      <div class="col-12">
        <div class="empty-product-state">
          <div class="empty-product-icon">🔍</div>

          <h2>Produk tidak ditemukan</h2>

          <p>
            Coba gunakan kata kunci atau filter yang berbeda.
          </p>
        </div>
      </div>
    `;

    return;
  }
  data.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4 col-xl-3";

col.innerHTML = `
  <article class="product-card h-100">

    <div class="product-image-wrapper">
      <img
        src="${product.gambar}"
        class="product-image"
        alt="${product.nama}"
      >

      <span class="product-brand">
        ${product.merk}
      </span>
    </div>

    <div class="product-card-body">

      <p class="product-size">
        ${product.ukuran} gram
      </p>

      <h2 class="product-name">
        ${product.nama}
      </h2>

      <p class="product-price">
        Rp${product.harga.toLocaleString("id-ID")}
      </p>

      <button
        type="button"
        class="product-cart-button"
        onclick="addToCart(
          '${product.nama.replace(/'/g, "\\'")}',
          ${product.harga},
          '${product.gambar}',
          '${product.merk}',
          ${product.ukuran}
        )"
      >
        <span>＋</span>
        Tambah ke Keranjang
      </button>

    </div>

  </article>
`;
    productContainer.appendChild(col);
  });
}

// Tambah ke keranjang
function addToCart(nama, harga, gambar, merk, ukuran) {
  const existing = cart.find(item => item.nama === nama);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      nama,
      harga,
      gambar,
      merk,
      ukuran,
      qty: 1
    });
  }

  saveCart();
  updateCartCount();
  showCartToast();
}

let cartToastTimeout;

function showCartToast() {
  const toast = document.getElementById("cartToast");

  if (!toast) {
    return;
  }

  toast.classList.add("show");

  clearTimeout(cartToastTimeout);

  cartToastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Update jumlah keranjang (sticky bawah)
function updateCartCount() {
  const totalQty = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const badge =
    document.getElementById("stickyCartCount");

  if (badge) {
    badge.textContent = totalQty;
  }
}

// Filter produk berdasarkan pencarian
searchInput.addEventListener("input", applyProductFilter);

// Urutkan produk
sortBy.addEventListener("change", applyProductFilter);

// Awal: tampilkan semua produk
displayProducts(products);
function applyProductFilter() {
  const keyword = searchInput.value.toLowerCase().trim();
  const selectedValue = sortBy.value;

  let filteredProducts = products.filter(product =>
    product.nama.toLowerCase().includes(keyword) ||
    product.merk.toLowerCase().includes(keyword)
  );

  if (selectedValue === "harga-asc") {
    filteredProducts.sort((a, b) => a.harga - b.harga);
  } else if (selectedValue === "harga-desc") {
    filteredProducts.sort((a, b) => b.harga - a.harga);
  } else if (selectedValue === "ukuran-asc") {
    filteredProducts.sort((a, b) => a.ukuran - b.ukuran);
  } else if (selectedValue === "ukuran-desc") {
    filteredProducts.sort((a, b) => b.ukuran - a.ukuran);
  } else if (selectedValue !== "all") {
    filteredProducts = filteredProducts.filter(
      product => product.merk === selectedValue
    );
  }

  displayProducts(filteredProducts);
}
updateCartCount();

