const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const stickyCartCount = document.getElementById("stickyCartCount");

function showLoginMessage(message) {
  if (!loginMessage) {
    return;
  }

  loginMessage.textContent = message;
  loginMessage.classList.remove("d-none");
}

function updateLoginCartCount() {
  if (!stickyCartCount) {
    return;
  }

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  stickyCartCount.textContent = totalQuantity;
}

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", function () {
    const isPassword =
      passwordInput.type === "password";

    passwordInput.type =
      isPassword ? "text" : "password";

    togglePassword.textContent =
      isPassword ? "Sembunyikan" : "Lihat";

    togglePassword.setAttribute(
      "aria-label",
      isPassword
        ? "Sembunyikan password"
        : "Tampilkan password"
    );
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (loginMessage) {
      loginMessage.classList.add("d-none");
      loginMessage.textContent = "";
    }

    const nama =
      document.getElementById("nama").value.trim();

    const username =
      document.getElementById("username").value.trim();

    const password =
      passwordInput.value;

    const role =
      document.getElementById("role").value;

    const validUser = {
      username: "diniasyfaaa",
      password: "PemrogramanWeb1"
    };

    if (
      username !== validUser.username ||
      password !== validUser.password
    ) {
      showLoginMessage(
        "Username atau password yang dimasukkan salah."
      );

      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("nama", nama);
    localStorage.setItem("role", role);

    if (role === "pelanggan") {
      const redirectAfterLogin =
        localStorage.getItem("redirectAfterLogin");

      localStorage.removeItem("redirectAfterLogin");

      window.location.href =
        redirectAfterLogin || "../katalog/produk.html";

      return;
    }

    if (role === "kasir") {
      window.location.href = "../d-keuangan.html";
      return;
    }

    if (role === "admin") {
      window.location.href = "../d-system.html";
    }
  });
}

updateLoginCartCount();