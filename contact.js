function sendToMail(event) {
  event.preventDefault();

  const inputName = document.getElementById("name").value;
  const inputEmail = document.getElementById("email").value;
  const inputPhone = document.getElementById("phone").value;
  const inputSelect = document.getElementById("select").value;
  const inputMessage = document.getElementById("message").value;

  if (inputName == "") {
    return alert("Nama tidak boleh kosong!");
  } else if (inputEmail == "") {
    return alert("Email tidak boleh kosong!");
  } else if (inputPhone == "") {
    return alert("Nomor Telepon tidak boleh kosong!");
  } else if (inputSelect == "") {
    return alert("Pilih salah satu!");
  } else if (inputMessage == "") {
    return alert("Pesan tidak boleh kosong!");
  }

  const a = document.createElement("a");

  a.href = `mailto:${inputEmail}?subject=${inputSelect}&body=${inputMessage}`;

  a.click();
}
