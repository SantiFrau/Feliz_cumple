const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");


const popup = document.getElementById("popup-pin");
const pinInput = document.getElementById("pin-input");
const pinBtn = document.getElementById("pin-btn");
const pinError = document.getElementById("pin-error");
const candado = document.getElementById("candado");

const PIN_CORRECTO = "2236"; 

let sobreDesbloqueado = false;


function pedirPIN() {
    popup.classList.remove("popup-oculto");
    pinInput.value = "";
    pinError.textContent = "";
    pinInput.focus();
}

// --- VALIDAR PIN ---
pinBtn.addEventListener("click", () => {
    if (pinInput.value === PIN_CORRECTO) {
        sobreDesbloqueado = true;
        popup.classList.add("popup-oculto");

        // 🔥 eliminar candado visualmente
        candado.style.opacity = "0";
        setTimeout(() => candado.remove(), 300);

        // ahora sí se puede abrir el sobre
        envoltura.classList.toggle("abierto");
    } else {
        pinError.textContent = "PIN incorrecto ❌";
    }
});

// --- CLICK PRINCIPAL ---
document.addEventListener("click", (e) => {

    const esSobre = 
        e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon") ||
        e.target.matches("#candado");

    if (esSobre) {

        if (!sobreDesbloqueado) {
            pedirPIN();
            return;
        }

        envoltura.classList.toggle("abierto");
        return;
    }

    if (e.target.matches(".sobre *")) {

        if (!carta.classList.contains("abierta")) {

            carta.classList.add("mostrar-carta");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);

            envoltura.classList.add("desactivar-sobre");

        } else {

            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});
