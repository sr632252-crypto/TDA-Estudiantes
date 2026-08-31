#include <iostream>
#include <iomanip>
#include <string>
#include <limits>
using namespace std;

const int CAPACIDAD = 30;

struct Estudiante {
    int id;
    string nombres;
    string apellidos;
    int edad;
    double promedio;
};

void imprimirEstudiante(const Estudiante &e) {
    cout << left << setw(4) << e.id
         << setw(20) << e.nombres
         << setw(24) << e.apellidos
         << right << setw(5) << e.edad << "  "
         << fixed << setprecision(2) << e.promedio << endl;
}

class RegistroEstudiantes {
private:
    Estudiante datos[CAPACIDAD];
    int cantidad;

    int buscarIndice(int id) const {
        for (int i = 0; i < cantidad; i++) {
            if (datos[i].id == id) return i;
        }
        return -1;
    }

public:
    RegistroEstudiantes() : cantidad(0) {}

    bool estaLleno() const { return cantidad == CAPACIDAD; }
    bool estaVacio() const { return cantidad == 0; }
    int getCantidad() const { return cantidad; }

    bool registrar(const Estudiante &e) {
        if (estaLleno()) {
            cout << " [ERROR] Registro lleno. No se puede registrar a " << e.nombres << endl;
            return false;
        }
        if (buscarIndice(e.id) != -1) {
            cout << " [ERROR] Ya existe un estudiante con ID " << e.id << ". Registro rechazado." << endl;
            return false;
        }
        datos[cantidad] = e;
        cantidad++;
        cout << " [OK] Estudiante registrado: " << e.nombres << " " << e.apellidos << endl;
        return true;
    }

    void listar() const {
        if (estaVacio()) {
            cout << " (registro vacio)" << endl;
            return;
        }
        cout << left << setw(4) << "ID" << setw(20) << "NOMBRES" << setw(24)
             << "APELLIDOS" << right << setw(5) << "EDAD" << "  " << "PROM." << endl;
        for (int i = 0; i < cantidad; i++) {
            imprimirEstudiante(datos[i]);
        }
    }

    bool buscar(int id, Estudiante &resultado) const {
        int idx = buscarIndice(id);
        if (idx == -1) return false;
        resultado = datos[idx];
        return true;
    }

    bool modificarPromedio(int id, double nuevoPromedio) {
        int idx = buscarIndice(id);
        if (idx == -1) {
            cout << " [ERROR] No existe estudiante con ID " << id << endl;
            return false;
        }
        datos[idx].promedio = nuevoPromedio;
        cout << " [OK] Promedio actualizado para ID " << id << endl;
        return true;
    }

    bool eliminar(int id) {
        int idx = buscarIndice(id);
        if (idx == -1) {
            cout << " [ERROR] No existe estudiante con ID " << id << endl;
            return false;
        }
        for (int i = idx; i < cantidad - 1; i++) {
            datos[i] = datos[i + 1];
        }
        cantidad--;
        cout << " [OK] Estudiante con ID " << id << " eliminado." << endl;
        return true;
    }
};

void demoPruebas(RegistroEstudiantes &registro) {
    cout << "========================================================\n";
    cout << " DEMOSTRACION DE PRUEBAS - Estudiantes de 3B\n";
    cout << "========================================================\n";

    cout << "\n-- 1) Registrando a los 28 estudiantes de 3B --\n";
    registro.registrar({1, "Lenin Josue", "Caguana Quishpe", 19, 8.5});
    registro.registrar({2, "Walter Fernando", "Villacres Lopez", 20, 7.2});
    registro.registrar({3, "Joseph Alejandro", "Romo Nuñez", 21, 9.1});
    registro.registrar({4, "Jonathan Sebastian", "Tenorio Ronquillo", 22, 8.0});
    registro.registrar({5, "Kerly Margoth", "Espinoza Reyes", 19, 9.4});
    registro.registrar({6, "Jeremy Alejandro", "Torosina Armendariz", 20, 7.6});
    registro.registrar({7, "Damian Alexander", "Cunalata Mendoza", 21, 8.8});
    registro.registrar({8, "Kenneth Mateo", "Chalco Tasna", 22, 7.9});
    registro.registrar({9, "Italo Esteban", "Manobanda Puaquiza", 19, 9.6});
    registro.registrar({10, "Edwin David", "Guamanquispe Guaman", 20, 8.3});
    registro.registrar({11, "Josue Jampier", "Camacho Monta", 21, 7.1});
    registro.registrar({12, "Darwin Joel", "Tisalema Guashco", 22, 9.9});
    registro.registrar({13, "Gabriel Sebastian", "Jijon Viscaino", 19, 8.6});
    registro.registrar({14, "Andres Joel", "Llamuca Abrajan", 20, 7.4});
    registro.registrar({15, "Jullisa Brigitte", "Altamirano Segovia", 21, 9.2});
    registro.registrar({16, "Cristopher Raul", "Oto Cundulle", 22, 8.1});
    registro.registrar({17, "Kleber Andres", "Moyota Chavez", 19, 7.7});
    registro.registrar({18, "Shirley Micaela", "Yanchatipan Moreta", 20, 9.5});
    registro.registrar({19, "Lenin Alexander", "Maigua Shigui", 21, 8.4});
    registro.registrar({20, "Monica Sara", "Tacuri Santillan", 22, 7.3});
    registro.registrar({21, "Juan Carlos", "Chico Yunda", 19, 9.0});
    registro.registrar({22, "Everly Oseas", "Orti Yaucan", 20, 8.7});
    registro.registrar({23, "Luis Alexander", "Silva Camuendo", 21, 7.8});
    registro.registrar({24, "Edith Noemi", "Tuza Quinatoa", 22, 9.3});
    registro.registrar({25, "Jose Ernesto", "Sierra Mera", 19, 8.2});
    registro.registrar({26, "Rommel Fabricio", "Gamboa Araujo", 20, 7.5});
    registro.registrar({27, "Hector Geovanny", "Villacis Jimenez", 21, 9.8});
    registro.registrar({28, "Justin Alexander", "Guanoquiza Aguaguina", 22, 8.9});

    cout << "\nListado tras el registro (cantidad = " << registro.getCantidad() << "):\n";
    registro.listar();

    cout << "\n-- 2) Intentando registrar un ID repetido (ID 5) --\n";
    registro.registrar({5, "Otro", "Estudiante", 20, 5.0});
    cout << "cantidad sigue siendo: " << registro.getCantidad() << endl;

    cout << "\n-- 3) Busquedas --\n";
    Estudiante res;
    if (registro.buscar(15, res)) {
        cout << "Buscar ID 15 (existe): "; imprimirEstudiante(res);
    } else {
        cout << "Buscar ID 15 (existe): NO ENCONTRADO\n";
    }
    if (registro.buscar(999, res)) {
        cout << "Buscar ID 999 (no existe): "; imprimirEstudiante(res);
    } else {
        cout << "Buscar ID 999 (no existe): NO ENCONTRADO\n";
    }

    cout << "\n-- 4) Modificando el promedio del ID 10 --\n";
    registro.modificarPromedio(10, 9.9);
    if (registro.buscar(10, res)) {
        cout << "Estudiante actualizado: "; imprimirEstudiante(res);
    }

    cout << "\n-- 5) Eliminando al estudiante de la mitad (ID 15) --\n";
    registro.eliminar(15);

    cout << "\n-- 6) Listado final (verificar que NO hay huecos) --\n";
    cout << "cantidad = " << registro.getCantidad()
         << " (posiciones 0.." << registro.getCantidad() - 1 << " ocupadas de forma contigua)\n";
    registro.listar();
}

void menuInteractivo(RegistroEstudiantes &registro) {
    int opcion;
    do {
        cout << "\n=========== REGISTRO DE ESTUDIANTES ===========\n";
        cout << "1. Registrar estudiante\n";
        cout << "2. Listar estudiantes\n";
        cout << "3. Buscar estudiante\n";
        cout << "4. Modificar estudiante\n";
        cout << "5. Eliminar estudiante\n";
        cout << "0. Salir\n";
        cout << "Seleccione una opcion: ";
        cin >> opcion;
        if (cin.fail()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;
        }
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        switch (opcion) {
            case 1: {
                Estudiante e;
                cout << "ID: "; cin >> e.id; cin.ignore();
                cout << "Nombres: "; getline(cin, e.nombres);
                cout << "Apellidos: "; getline(cin, e.apellidos);
                cout << "Edad: "; cin >> e.edad;
                cout << "Promedio: "; cin >> e.promedio;
                registro.registrar(e);
                break;
            }
            case 2:
                registro.listar();
                break;
            case 3: {
                int id; cout << "ID a buscar: "; cin >> id;
                Estudiante r;
                if (registro.buscar(id, r)) imprimirEstudiante(r);
                else cout << " No encontrado.\n";
                break;
            }
            case 4: {
                int id; double np;
                cout << "ID a modificar: "; cin >> id;
                cout << "Nuevo promedio: "; cin >> np;
                registro.modificarPromedio(id, np);
                break;
            }
            case 5: {
                int id; cout << "ID a eliminar: "; cin >> id;
                registro.eliminar(id);
                break;
            }
            case 0:
                cout << "Saliendo...\n";
                break;
            default:
                cout << "Opcion no valida.\n";
        }
    } while (opcion != 0);
}

int main() {
    RegistroEstudiantes registro;
    demoPruebas(registro);
    menuInteractivo(registro);
    return 0;
}
