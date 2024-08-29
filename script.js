document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("gastosForm");
    const resultadosDiv = document.getElementById("resultados");
    const errorDiv = document.getElementById("error");
    const borrarBtn = document.getElementById("borrarDatos");
    let gastos = [];
    async function cargarDatos() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            const data = await response.json();
            gastos = data.categorias;
        } catch (error) {
            console.error('Error:', error);
            mostrarError('No se pudieron cargar los datos.');
        }
    }
    cargarDatos();
    function mostrarError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    }
    function mostrarResultados(totalGastos, saldoRestante) {
        resultadosDiv.innerHTML = `
            <p>Total de gastos: $${totalGastos}</p>
            <p>Saldo restante: $${saldoRestante}</p>
        `;
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let sueldo = parseFloat(document.getElementById("sueldo").value);
        if (isNaN(sueldo) || sueldo <= 0) {
            mostrarError("Por favor, ingresa un sueldo válido.");
            return;
        }
        let totalGastos = 0;
        gastos.forEach(gasto => {
            let monto = parseFloat(document.getElementById(gasto.descripcion).value);
            if (isNaN(monto) || monto < 0) {
                mostrarError(`Por favor, ingresa un monto válido para ${gasto.descripcion}.`);
                return;
            }
            gasto.monto = monto;
            totalGastos += monto;
        });
        let saldoRestante = sueldo - totalGastos;
        mostrarResultados(totalGastos, saldoRestante);
        localStorage.setItem('gastos', JSON.stringify(gastos));
        localStorage.setItem('sueldo', sueldo);
    });
    borrarBtn.addEventListener("click", () => {
        form.reset();
        resultadosDiv.innerHTML = "";
        errorDiv.textContent = "";
    });
});
