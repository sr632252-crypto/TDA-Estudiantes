/**
 * TDA RegistroEstudiantes
 * ------------------------
 * Implementación ESTÁTICA: la estructura interna es un arreglo de tamaño
 * fijo (capacidad reservada de antemano). El TDA solo se comunica con el
 * exterior a través de sus operaciones públicas (registrar, listar, buscar,
 * modificar, eliminar); el arreglo y el contador son privados (encapsulación).
 *
 * ¿Por qué existe "cantidad" además de "CAPACIDAD" (tamaño del arreglo)?
 * -----------------------------------------------------------------------
 * - CAPACIDAD es el número máximo de casillas reservadas en memoria.
 *   Es una cota fija, definida en tiempo de compilación, propia de un TDA
 *   ESTÁTICO (a diferencia de una lista enlazada o un ArrayList, que crecen
 *   dinámicamente).
 * - cantidad es el número de elementos REALMENTE almacenados en un momento
 *   dado (0 <= cantidad <= CAPACIDAD). Sin este contador:
 *     1) No sabríamos hasta qué posición recorrer el arreglo al listar o
 *        buscar (las posiciones no usadas contienen "basura" o null).
 *     2) No podríamos decidir si el arreglo está lleno (cantidad == CAPACIDAD)
 *        antes de intentar un registrar().
 *     3) No podríamos decidir si está vacío (cantidad == 0).
 *     4) Al eliminar, "cantidad" nos permite saber cuántos elementos hay
 *        que recorrer/desplazar para cerrar el hueco que deja el elemento
 *        borrado, manteniendo el arreglo compacto (sin espacios intermedios).
 *   En resumen: CAPACIDAD = capacidad reservada (estática); cantidad =
 *   ocupación real y variable de esa capacidad.
 */
public class RegistroEstudiantes {

    // Capacidad fija del arreglo (TDA estático). 28 = número de estudiantes
    // de 3B; se deja un pequeño margen para poder registrar alguno más
    // desde el menú sin modificar el código.
    public static final int CAPACIDAD = 30;

    private final Estudiante[] datos = new Estudiante[CAPACIDAD];
    private int cantidad; // elementos realmente almacenados (cantidad <= CAPACIDAD)

    public boolean estaLleno() { return cantidad == CAPACIDAD; }
    public boolean estaVacio() { return cantidad == 0; }
    public int getCantidad() { return cantidad; }

    /**
     * Búsqueda lineal interna por ID.
     * @return índice del estudiante si existe, -1 si no existe.
     */
    private int buscarIndice(int id) {
        for (int i = 0; i < cantidad; i++) {
            if (datos[i].getId() == id) return i;
        }
        return -1;
    }

    // ---------- 1. CREATE: Registrar estudiante ----------
    public boolean registrar(Estudiante e) {
        if (estaLleno()) {
            System.out.println(" [ERROR] Registro lleno. No se puede registrar a " + e.getNombres());
            return false;
        }
        if (buscarIndice(e.getId()) != -1) {
            System.out.println(" [ERROR] Ya existe un estudiante con ID " + e.getId() + ". Registro rechazado.");
            return false;
        }
        datos[cantidad] = e; // se agrega siempre al final: datos[cantidad]
        cantidad++;          // se actualiza la ocupación real
        System.out.println(" [OK] Estudiante registrado: " + e.getNombres() + " " + e.getApellidos());
        return true;
    }

    // ---------- 2. READ: Listar estudiantes ----------
    public void listar() {
        if (estaVacio()) {
            System.out.println(" (registro vacío)");
            return;
        }
        System.out.printf("%-4s %-20s %-24s %5s %8s%n", "ID", "NOMBRES", "APELLIDOS", "EDAD", "PROM.");
        for (int i = 0; i < cantidad; i++) { // se recorre SOLO hasta 'cantidad', no hasta CAPACIDAD
            System.out.println(datos[i]);
        }
    }

    // ---------- 3. READ: Buscar estudiante ----------
    public Estudiante buscar(int id) {
        int idx = buscarIndice(id);
        return (idx == -1) ? null : datos[idx];
    }

    // ---------- 4. UPDATE: Modificar estudiante ----------
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

    // ---------- 5. DELETE: Eliminar estudiante ----------
    public boolean eliminar(int id) {
        int idx = buscarIndice(id);
        if (idx == -1) {
            System.out.println(" [ERROR] No existe estudiante con ID " + id);
            return false;
        }
        // Desplazamiento de todos los elementos posteriores una posición
        // hacia la izquierda para que NO queden espacios intermedios.
        for (int i = idx; i < cantidad - 1; i++) {
            datos[i] = datos[i + 1];
        }
        datos[cantidad - 1] = null; // se libera la última referencia
        cantidad--;                 // se reduce la ocupación real
        System.out.println(" [OK] Estudiante con ID " + id + " eliminado.");
        return true;
    }
}