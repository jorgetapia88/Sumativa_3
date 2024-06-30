var selectedRow = null
// Lo ideal es que comience por crear  todas las funciones  con sus nombres
//y luego definir sus contenidos, facilitara la escritura de codigo y su comprensión
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();

        // Agregar mensaje de éxito
        var mensajeExito = document.getElementById("mensaje-exito");
        mensajeExito.innerText = "";
        alert("GRACIAS POR TU VALIOSO APORTE!!!")
    }
}


function readFormData() {
    var formData = {}; // Objeto para almacenar los datos del formulario
    formData["nombreCompleto"] = document.getElementById("nombreCompleto").value;
    
    // Obtener el valor del radio button seleccionado
    var formaDePagoRadios = document.getElementsByName("formaDePago");
    for (var i = 0; i < formaDePagoRadios.length; i++) {
        if (formaDePagoRadios[i].checked) {
            formData["formaDePago"] = formaDePagoRadios[i].value;
            break;
        }
    }
    
    formData["monto"] = document.getElementById("monto").value;
    formData["comuna"] = document.getElementById("comuna").value;
    return formData;
}


function insertNewRecord(data) {
    var table = document.getElementById("empleadoList").getElementsByTagName('tbody')[0]; //aquí tomamos la parte de la tabla que dejamos vacía
    var newRow = table.insertRow(table.length);                                          // creamos una fila  con cuatro elementos
    cell1 = newRow.insertCell(0);                                                       // asignamos la celda en una variable
    cell1.innerHTML = data.nombreCompleto;                                            //ingresamos el contenido de la celda a 4esa variable
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.formaDePago;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.monto;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.comuna;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick='onEdit(this)'>Editar </a>
                       <a onClick='onDelete(this)'>Eliminar </a>`;
}

function resetForm() {                                      //una vez hecho el ingreso de datos es necesario limpiar el formulario.
    document.getElementById("nombreCompleto").value = "";
    document.getElementsByName("formaDePago").forEach(function(radio) {
        radio.checked = false; // Deseleccionar todos los radio buttons con el nombre 'formaDePago'
    });
    document.getElementById("monto").value = "";
    document.getElementById("comuna").value = "";
    selectedRow = null;
}


function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nombreCompleto").value = selectedRow.cells[0].innerHTML;
    document.getElementsByName("formaDePago").forEach(function(radio) {
        if (radio.value === selectedRow.cells[1].innerHTML) {
            radio.checked = true; // Seleccionar el radio button correspondiente
        }
    });
    document.getElementById("monto").value = selectedRow.cells[2].innerHTML;
    document.getElementById("comuna").value = selectedRow.cells[3].innerHTML;
}


function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nombreCompleto;
    selectedRow.cells[1].innerHTML = formData.formaDePago
    selectedRow.cells[2].innerHTML = formData.monto;
    selectedRow.cells[3].innerHTML = formData.comuna;
}

function onDelete(td) {
    if (confirm('Estás seguro de eliminar este registro ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("empleadoList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("nombreCompleto").value == "") {
        isValid = false;
        document.getElementById("nombreCompletoValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nombreCompletoValidationError").classList.contains("hide"))
            document.getElementById("nombreCompletoValidationError").classList.add("hide");
    }
    return isValid;
}