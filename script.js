document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gastosForm");
    const resultadosDiv = document.getElementById("resultados");
    const errorDiv = document.getElementById("error");
    const borrarBtn = document.getElementById("borrarDatos");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        errorDiv.textContent = "";

        const sueldo = parseFloat(document.getElementById("sueldo").value) ?? 0;
        const alquiler = parseFloat(document.getElementById("alquiler").value) ?? 0;
        const comida = parseFloat(document.getElementById("comida").value) ?? 0;
        const transporte = parseFloat(document.getElementById("transporte").value) ?? 0;

        if (sueldo <= 0 || isNaN(sueldo)) {
            mostrarError("Por favor, ingresa un sueldo válido.");
            return;
        }

        if (alquiler < 0 || comida < 0 || transporte < 0) {
            mostrarError("Los gastos no pueden ser negativos.");
            return;
        }

        const totalGastos = alquiler + comida + transporte;
        const saldoRestante = sueldo - totalGastos;

        guardarEnLocalStorage({ sueldo, alquiler, comida, transporte });

        mostrarResultados(totalGastos, saldoRestante);
    });

    borrarBtn.addEventListener("click", () => {
        
        form.reset();
        
        resultadosDiv.innerHTML = "";
        errorDiv.textContent = "";
    });

    function mostrarResultados(totalGastos, saldoRestante) {
        resultadosDiv.innerHTML = `
            <p>Total de gastos: $${totalGastos}</p>
            <p>Saldo restante: $${saldoRestante}</p>
        `;
    }

    function mostrarError(mensaje) {
        errorDiv.textContent = mensaje;
    }

    function guardarEnLocalStorage(datos) {
        localStorage.setItem("simuladorGastos", JSON.stringify(datos));
    }
});
