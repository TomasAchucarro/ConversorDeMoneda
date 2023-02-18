const cantidadInput = document.getElementById("cantidad");

cantidadInput.addEventListener("input", (event) => {
  const value = event.target.value;

  if (isNaN(value)) {
    event.target.value = "";
  }
});

function cantidadConvertida() {
  let selectFrom = document.getElementById("firstSelect").value;
  let selectTo = document.getElementById("secondSelect").value;
  let cantidad = document.getElementById("cantidad");
  let resultado = document.getElementById("cantidadConvertida");
  if (selectFrom === selectTo) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se puede convertir a la misma moneda",
    });
    cantidad.value = "";

    return;
  }

  fetch("./monedas/divisas.json")
    .then((response) => response.json())
    .then((data) => {
      let firstSelect = data[selectFrom];
      let secondSelect = firstSelect[selectTo];
      let operationInput = cantidad.value * secondSelect;
      resultado.innerText = `${operationInput} ${selectTo}`;
      Toastify({
        text: "Operación realizada correctamente",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "green",
        stopOnFocus: true,
      }).showToast();
    })
    .catch((error) => {
      console.log(error);
    });
}

let btn = document.getElementById("btnPral");
btn.addEventListener("click", cantidadConvertida);
