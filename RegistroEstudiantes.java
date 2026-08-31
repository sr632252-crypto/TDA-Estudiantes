public class RegistroEstudiantes {

    public static final int CAPACIDAD = 30;

    private final Estudiante[] datos = new Estudiante[CAPACIDAD];
    private int cantidad;

    public boolean estaLleno() { return cantidad == CAPACIDAD; }
    public boolean estaVacio() { return cantidad == 0; }
    public int getCantidad() { return cantidad; }

    private int buscarIndice(int id) {
        for (int i = 0; i < cantidad; i++) {
            if (datos[i].getId() == id) return i;
        }
        return -1;
    }

    public boolean registrar(Estudiante e) {
        if (estaLleno()) {
            System.out.println(" [ERROR] Registro lleno. No se puede registrar a " + e.getNombres());
            return false;
        }
        if (buscarIndice(e.getId()) != -1) {
            System.out.println(" [ERROR] Ya existe un estudiante con ID " + e.getId() + ". Registro rechazado.");
            return false;
        }
        datos[cantidad] = e;
        cantidad++;
        System.out.println(" [OK] Estudiante registrado: " + e.getNombres() + " " + e.getApellidos());
        return true;
    }

    public void listar() {
        if (estaVacio()) {
            System.out.println(" (registro vacío)");
            return;
        }
        System.out.printf("%-4s %-20s %-24s %5s %8s%n", "ID", "NOMBRES", "APELLIDOS", "EDAD", "PROM.");
        for (int i = 0; i < cantidad; i++) {
            System.out.println(datos[i]);
        }
    }

    public Estudiante buscar(int id) {
        int idx = buscarIndice(id);
        return (idx == -1) ? null : datos[idx];
    }

    public boolean modificarPromedio(int id, double nuevoPromedio) {
        int idx = buscarIndice(id);
        if (idx == -1) {
            System.out.println(" [ERROR] No existe estudiante con ID " + id);
            return false;
        }
        datos[idx].setPromedio(nuevoPromedio);
        System.out.println(" [OK] Promedio actualizado para ID " + id);
        return true;
    }

    public boolean eliminar(int id) {
        int idx = buscarIndice(id);
        if (idx == -1) {
            System.out.println(" [ERROR] No existe estudiante con ID " + id);
            return false;
        }
        for (int i = idx; i < cantidad - 1; i++) {
            datos[i] = datos[i + 1];
        }
        datos[cantidad - 1] = null;
        cantidad--;
        System.out.println(" [OK] Estudiante con ID " + id + " eliminado.");
        return true;
    }
}