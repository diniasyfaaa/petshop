const cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateHomeCartCount() {
  const stickyCartCount =
    document.getElementById("stickyCartCount");

  if (!stickyCartCount) {
    return;
  }

  const totalQuantity = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  stickyCartCount.textContent = totalQuantity;
}

updateHomeCartCount();