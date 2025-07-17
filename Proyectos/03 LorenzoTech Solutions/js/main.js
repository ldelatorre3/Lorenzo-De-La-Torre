// Filtra servicios por categoría
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const categoria = this.dataset.categoria;
        
        // Actualiza botones activos
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filtra la tabla
        document.querySelectorAll('tbody tr').forEach(row => {
            if (categoria === 'todos' || row.dataset.categoria === categoria) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});