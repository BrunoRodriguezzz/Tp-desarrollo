// Script para generar y poblar datos de ejemplo en MongoDB
// Ejecutar: node scripts/generarDatosEjemplo.js "mongodb+srv://admin:bHaUgtKVu2xKgMOY@tiendasol.4d3wawj.mongodb.net/tienda_sol?retryWrites=true&w=majority&appName=tiendaSol"

import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const N = 100;
const dataDir = path.join(__dirname, "../test/data");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomPhone() {
  return `+54 11 ${randomInt(2000, 9999)}-${randomInt(1000, 9999)}`;
}

function randomEmail(nombre) {
  return `${nombre.toLowerCase().replace(/ /g, ".")}${randomInt(1, 99)}@example.com`;
}

const nombres = [
  "Federico García",
  "Nicolás Barlasina",
  "Juan Chapero",
  "Lucía Pérez",
  "Martín López",
  "Sofía Torres",
  "Juan Cruz",
  "Valentina Díaz",
  "Agustín Fernández",
  "Camila Romero",
  "Mateo Sosa",
  "Julieta Castro",
  "Tomás Giménez",
  "Mía Herrera",
  "Benjamín Molina",
  "Emma Ríos",
  "Lautaro Aguirre",
  "Catalina Ponce",
  "Santiago Vera",
  "Renata Medina",
  "Franco Navarro",
  "Malena Cabrera",
];

const tiposUsuario = ["COMPRADOR", "VENDEDOR", "ADMIN"];
const monedas = ["PESO_ARG", "DOLAR_USA", "EURO"];
const categorias = [
  "Consolas",
  "Electrónica",
  "Hogar",
  "Juguetes",
  "Libros",
  "Ropa",
  "Deportes",
];

const titulosProductos = [
  "Consola PlayStation 5 Slim",
  "Notebook Lenovo IdeaPad",
  "Cafetera Express Philips",
  "Bicicleta Mountain Bike",
  'Smart TV Samsung 50"',
  "Auriculares Bluetooth JBL",
  "Silla Gamer",
  "Lámpara LED",
  "Libro El Principito",
  "Zapatillas Nike Air",
];

const descripciones = [
  "Nueva versión más compacta, 1TB SSD, soporte para juegos 4K y mando DualSense.",
  "Procesador Intel i5, 8GB RAM, 512GB SSD, pantalla FHD.",
  "Café espresso y cappuccino, 15 bares de presión, fácil limpieza.",
  "Cuadro de aluminio, 21 velocidades, frenos a disco.",
  "Resolución 4K UHD, Smart TV, HDR10+, 3 HDMI.",
  "Sonido potente, batería de larga duración, micrófono integrado.",
  "Ergonómica, reclinable, apoyabrazos 3D.",
  "Luz blanca regulable, bajo consumo.",
  "Edición ilustrada, tapa dura.",
  "Amortiguación Air, diseño moderno.",
];

const mensajesNotificacion = [
  "Tu pedido ha sido confirmado y está en preparación",
  "El producto fue enviado",
  "Tu pedido fue entregado",
  "El vendedor canceló el pedido",
  "Tienes una nueva oferta",
  "Producto agregado a favoritos",
  "Recibiste una calificación",
  "Tu producto fue publicado",
  "El pago fue acreditado",
  "Actualización en el estado de tu pedido",
];

function generarUsuarios() {
  const usuarios = [];
  for (let i = 0; i < N; i++) {
    const nombre = randomChoice(nombres) + (i > 19 ? " " + i : "");
    const tipo = randomChoice(tiposUsuario);
    const id = new ObjectId();
    usuarios.push({
      _id: id,
      nombre,
      email: randomEmail(nombre),
      telefono: randomPhone(),
      tipo,
      fechaAlta: randomDate(new Date(2023, 0, 1), new Date()),
    });
  }
  return usuarios;
}

function generarProductos(usuarios) {
  const productos = [];
  const vendedores = usuarios.filter((u) => u.tipo === "VENDEDOR");
  for (let i = 0; i < N; i++) {
    const vendedor = randomChoice(vendedores)._id;
    const titulo = randomChoice(titulosProductos) + " " + (i + 1);
    const descripcion = randomChoice(descripciones);
    const cats = Array.from(
      new Set([
        randomChoice(categorias),
        randomChoice(categorias),
        randomChoice(categorias),
      ])
    );
    const precio = parseFloat(
      (randomInt(100, 100000) + Math.random()).toFixed(2)
    );
    const moneda = randomChoice(monedas);
    const stock = randomInt(0, 50);
    const fotos = [`https://picsum.photos/seed/${i}/400/300`];
    productos.push({
      _id: new ObjectId(),
      vendedor,
      titulo,
      descripcion,
      categorias: cats,
      precio,
      moneda,
      stock,
      fotos,
      activo: true,
      ventasTotales: randomInt(0, 100),
      createdAt: randomDate(new Date(2023, 0, 1), new Date()),
      updatedAt: randomDate(new Date(2023, 0, 1), new Date()),
      __v: 0,
    });
  }
  return productos;
}

function generarPedidos(usuarios, productos) {
  const pedidos = [];
  for (let i = 0; i < N; i++) {
    const comprador = randomChoice(
      usuarios.filter((u) => u.tipo === "COMPRADOR")
    )._id;
    const itemsCount = randomInt(1, 3);
    const items = [];
    let total = 0;
    let moneda = "PESO_ARG";
    for (let j = 0; j < itemsCount; j++) {
      const prod = randomChoice(productos);
      const cantidad = randomInt(1, Math.max(1, prod.stock));
      items.push({
        producto: prod._id,
        cantidad,
        precioUnitario: prod.precio,
        subTotal: prod.precio * cantidad,
      });
      total += prod.precio * cantidad;
      moneda = prod.moneda;
    }
    pedidos.push({
      _id: new ObjectId(),
      comprador,
      items,
      total: parseFloat(total.toFixed(2)),
      moneda,
      direccion: {
        calle: `Calle ${randomInt(1, 999)}`,
        numero: randomInt(1, 9999),
        ciudad: "Ciudad " + randomInt(1, 20),
        provincia: "Provincia " + randomInt(1, 10),
        pais: "Argentina",
      },
      estado: "pendiente",
      fechaCreacion: randomDate(new Date(2023, 0, 1), new Date()),
      historialEstados: [
        {
          estado: "pendiente",
          fecha: randomDate(new Date(2023, 0, 1), new Date()),
        },
      ],
    });
  }
  return pedidos;
}

function generarNotificaciones(usuarios, pedidos) {
  const notificaciones = [];
  for (let i = 0; i < N; i++) {
    const usuarioDestino = randomChoice(usuarios)._id;
    const mensaje = randomChoice(mensajesNotificacion);
    notificaciones.push({
      _id: new ObjectId(),
      usuarioDestino,
      mensaje,
      fechaAlta: randomDate(new Date(2023, 0, 1), new Date()),
      leida: Math.random() < 0.5,
    });
  }
  return notificaciones;
}

async function main() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const usuarios = generarUsuarios();
  const productos = generarProductos(usuarios);
  const pedidos = generarPedidos(usuarios, productos);
  const notificaciones = generarNotificaciones(usuarios, pedidos);

  fs.writeFileSync(
    path.join(dataDir, "usuarios.json"),
    JSON.stringify(usuarios, null, 2)
  );
  fs.writeFileSync(
    path.join(dataDir, "productos.json"),
    JSON.stringify(productos, null, 2)
  );
  fs.writeFileSync(
    path.join(dataDir, "pedidos.json"),
    JSON.stringify(pedidos, null, 2)
  );
  fs.writeFileSync(
    path.join(dataDir, "notificaciones.json"),
    JSON.stringify(notificaciones, null, 2)
  );

  // Si se pasa una URI de MongoDB, insertar los datos
  const mongoUri = process.argv[2];
  if (mongoUri) {
    const client = new MongoClient(mongoUri);
    try {
      await client.connect();
      const db = client.db();
      await db.collection("usuarios").deleteMany({});
      await db.collection("productos").deleteMany({});
      await db.collection("pedidos").deleteMany({});
      await db.collection("notificaciones").deleteMany({});
      await db.collection("usuarios").insertMany(usuarios);
      await db.collection("productos").insertMany(productos);
      await db.collection("pedidos").insertMany(pedidos);
      await db.collection("notificaciones").insertMany(notificaciones);
      console.log("Datos insertados correctamente en MongoDB");
    } finally {
      await client.close();
    }
  } else {
    console.log("Archivos JSON generados en", dataDir);
    console.log(
      "Para insertar en MongoDB: node scripts/generarDatosEjemplo.js <MONGO_URI>"
    );
  }
}

main();
