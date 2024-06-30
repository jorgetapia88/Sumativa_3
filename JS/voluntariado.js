document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del localStorage si están disponibles
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      document.getElementById('name').value = savedFormData.name;
      document.getElementById('email').value = savedFormData.email;
      document.getElementById('message').value = savedFormData.message;
    }
  
    document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar que se envíe el formulario automáticamente
      
      // Obtener los datos del formulario
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
  
      // Guardar los datos en localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
  
      alert('EXCELENTE!! Pronto nos comunicaremos contigo! 🦉');
  
      // Puedes enviar los datos a un servidor aquí si lo deseas
  
      // Limpiar el formulario después de guardar los datos
      this.reset();
    });
  });


  

