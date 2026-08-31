import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        RegistroEstudiantes registro = new RegistroEstudiantes();

        System.out.println("========================================================");
        System.out.println(" DEMOSTRACIÓN DE PRUEBAS - Estudiantes de 3B");
        System.out.println("========================================================");

        System.out.println("\n-- 1) Registrando a los 28 estudiantes de 3B --");
        registro.registrar(new Estudiante(1, "Lenin Josue", "Caguana Quishpe", 19, 8.5));
        registro.registrar(new Estudiante(2, "Walter Fernando", "Villacres Lopez", 20, 7.2));
        registro.registrar(new Estudiante(3, "Joseph Alejandro", "Romo Nuñez", 21, 9.1));
        registro.registrar(new Estudiante(4, "Jonathan Sebastian", "Tenorio Ronquillo", 22, 8.0));
        registro.registrar(new Estudiante(5, "Kerly Margoth", "Espinoza Reyes", 19, 9.4));
        registro.registrar(new Estudiante(6, "Jeremy Alejandro", "Torosina Armendariz", 20, 7.6));
        registro.registrar(new Estudiante(7, "Damian Alexander", "Cunalata Mendoza", 21, 8.8));
        registro.registrar(new Estudiante(8, "Kenneth Mateo", "Chalco Tasna", 22, 7.9));
        registro.registrar(new Estudiante(9, "Italo Esteban", "Manobanda Puaquiza", 19, 9.6));
        registro.registrar(new Estudiante(10, "Edwin David", "Guamanquispe Guaman", 20, 8.3));
        registro.registrar(new Estudiante(11, "Josue Jampier", "Camacho Monta", 21, 7.1));
        registro.registrar(new Estudiante(12, "Darwin Joel", "Tisalema Guashco", 22, 9.9));
        registro.registrar(new Estudiante(13, "Gabriel Sebastian", "Jijon Viscaino", 19, 8.6));
        registro.registrar(new Estudiante(14, "Andres Joel", "Llamuca Abrajan", 20, 7.4));
        registro.registrar(new Estudiante(15, "Jullisa Brigitte", "Altamirano Segovia", 21, 9.2));
        registro.registrar(new Estudiante(16, "Cristopher Raúl", "Oto Cundulle", 22, 8.1));
        registro.registrar(new Estudiante(17, "Kleber Andrés", "Moyota Chávez", 19, 7.7));
        registro.registrar(new Estudiante(18, "Shirley Micaela", "Yanchatipan Moreta", 20, 9.5));
        registro.registrar(new Estudiante(19, "Lenin Alexander", "Maigua Shigui", 21, 8.4));
        registro.registrar(new Estudiante(20, "Mónica Sara", "Tacuri Santillan", 22, 7.3));
        registro.registrar(new Estudiante(21, "Juan Carlos", "Chico Yunda", 19, 9.0));
        registro.registrar(new Estudiante(22, "Everly Oseas", "Orti Yaucan", 20, 8.7));
        registro.registrar(new Estudiante(23, "Luis Alexander", "Silva Camuendo", 21, 7.8));
        registro.registrar(new Estudiante(24, "Edith Noemi", "Tuza Quinatoa", 22, 9.3));
        registro.registrar(new Estudiante(25, "Jose Ernesto", "Sierra Mera", 19, 8.2));
        registro.registrar(new Estudiante(26, "Rommel Fabricio", "Gamboa Araujo", 20, 7.5));
        registro.registrar(new Estudiante(27, "Héctor Geovanny", "Villacis Jimenez", 21, 9.8));
        registro.registrar(new Estudiante(28, "Justin Alexander", "Guanoquiza Aguaguiña", 22, 8.9));

        System.out.println("\nListado tras el registro (cantidad = " + registro.getCantidad() + "):");
        registro.listar();

        System.out.println("\n-- 2) Intentando registrar un ID repetido (ID 5) --");
        registro.registrar(new Estudiante(5, "Otro", "Estudiante", 20, 5.0));
        System.out.println("cantidad sigue siendo: " + registro.getCantidad());

        System.out.println("\n-- 3) Búsquedas --");
        Estudiante encontrado = registro.buscar(15);
        System.out.println("Buscar ID 15 (existe): " + (encontrado != null ? encontrado : "NO ENCONTRADO"));
        Estudiante noEncontrado = registro.buscar(999);
        System.out.println("Buscar ID 999 (no existe): " + (noEncontrado != null ? noEncontrado : "NO ENCONTRADO"));

        System.out.println("\n-- 4) Modificando el promedio del ID 10 --");
        registro.modificarPromedio(10, 9.9);
        System.out.println("Estudiante actualizado: " + registro.buscar(10));

        System.out.println("\n-- 5) Eliminando al estudiante de la mitad (ID 15) --");
        registro.eliminar(15);

        System.out.println("\n-- 6) Listado final (verificar que NO hay huecos) --");
        System.out.println("cantidad = " + registro.getCantidad() + " (posiciones 0.." +
                (registro.getCantidad() - 1) + " ocupadas de forma contigua)");
        registro.listar();

        menuInteractivo(registro);
    }

    private static void menuInteractivo(RegistroEstudiantes registro) {
        Scanner sc = new Scanner(System.in);
        int opcion;
        do {
            System.out.println("\n=========== REGISTRO DE ESTUDIANTES ===========");
            System.out.println("1. Registrar estudiante");
            System.out.println("2. Listar estudiantes");
            System.out.println("3. Buscar estudiante");
            System.out.println("4. Modificar estudiante");
            System.out.println("5. Eliminar estudiante");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opción: ");

            if (!sc.hasNextInt()) { sc.next(); continue; }
            opcion = sc.nextInt();

            switch (opcion) {
                case 1:
                    System.out.print("ID: "); int id = sc.nextInt(); sc.nextLine();
                    System.out.print("Nombres: "); String nombres = sc.nextLine();
                    System.out.print("Apellidos: "); String apellidos = sc.nextLine();
                    System.out.print("Edad: "); int edad = sc.nextInt();
                    System.out.print("Promedio: "); double prom = sc.nextDouble();
                    registro.registrar(new Estudiante(id, nombres, apellidos, edad, prom));
                    break;
                case 2:
                    registro.listar();
                    break;
                case 3:
                    System.out.print("ID a buscar: "); int idb = sc.nextInt();
                    Estudiante e = registro.buscar(idb);
                    System.out.println(e != null ? e : " No encontrado.");
                    break;
                case 4:
                    System.out.print("ID a modificar: "); int idm = sc.nextInt();
                    System.out.print("Nuevo promedio: "); double np = sc.nextDouble();
                    registro.modificarPromedio(idm, np);
                    break;
                case 5:
                    System.out.print("ID a eliminar: "); int ide = sc.nextInt();
                    registro.eliminar(ide);
                    break;
                case 0:
                    System.out.println("Saliendo...");
                    break;
                default:
                    System.out.println("Opción no válida.");
            }
        } while (opcion != 0);
        sc.close();
    }
}