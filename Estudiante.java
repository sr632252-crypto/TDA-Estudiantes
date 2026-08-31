public class Estudiante {
    private int id;
    private String nombres;
    private String apellidos;
    private int edad;
    private double promedio;

    public Estudiante(int id, String nombres, String apellidos, int edad, double promedio) {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.promedio = promedio;
    }

    public int getId() { return id; }
    public String getNombres() { return nombres; }
    public String getApellidos() { return apellidos; }
    public int getEdad() { return edad; }
    public double getPromedio() { return promedio; }

    public void setNombres(String nombres) { this.nombres = nombres; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public void setEdad(int edad) { this.edad = edad; }
    public void setPromedio(double promedio) { this.promedio = promedio; }

    @Override
    public String toString() {
        return String.format("%-4d %-20s %-24s %5d %8.2f", id, nombres, apellidos, edad, promedio);
    }
}