document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("newName");
  const usernameInput = document.getElementById("newUsername");
  const passwordInput = document.getElementById("newPassword");
  const waInput = document.getElementById("newWA");

  const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
  const usernameRegex = /^[a-z0-9]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const waRegex = /^8[0-9]{8,11}$/; // karena sudah ada +62 di depan

  // Real-time validasi
  nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    document.getElementById("nameError").textContent =
      nameRegex.test(name) ? "" : "Nama harus Proper Case, hanya huruf dan spasi (Contoh: Dini Asyfa)";
  });

  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    document.getElementById("usernameError").textContent =
      usernameRegex.test(username) ? "" : "Username hanya huruf kecil dan angka tanpa spasi.";
  });

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    document.getElementById("passwordError").textContent =
      passwordRegex.test(password) ? "" : "Password 6-20 karakter, harus ada huruf besar, kecil, dan angka.";
  });

  waInput.addEventListener("input", () => {
    const wa = waInput.value.trim();
    document.getElementById("waError").textContent =
      waRegex.test(wa) ? "" : "No. WhatsApp harus diawali dengan 8..., total 11–14 digit.";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const wa = waInput.value.trim();

    let valid = true;

    if (!nameRegex.test(name)) {
      document.getElementById("nameError").textContent =
        "Nama harus Proper Case, hanya huruf dan spasi (Contoh: Dini Asyfa)";
      valid = false;
    }

    if (!usernameRegex.test(username)) {
      document.getElementById("usernameError").textContent =
        "Username hanya huruf kecil dan angka tanpa spasi.";
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      document.getElementById("passwordError").textContent =
        "Password 6-20 karakter, harus ada huruf besar, kecil, dan angka.";
      valid = false;
    }

    if (!waRegex.test(wa)) {
      document.getElementById("waError").textContent =
        "No. WhatsApp harus diawali dengan 8..., total 11–14 digit.";
      valid = false;
    }

    if (valid) {
      alert("Registrasi berhasil!");
      form.reset();
    } else {
      alert("Silakan periksa kembali isian formulir Anda.");
    }
  });
});
