const PedidosMock = [
  {
    _id: "67163a5f5c77a9b5d1430001",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "6w163a5f5c77a9b5d1430006",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "67s63a5f5c77a9b5d143000a",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
  {
    _id: "67163a5x5c77a9b5d1430001",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "61163a5f5c77a9b5d1430006",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "6716aa5f5c77a9b5d143000a",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d1430001",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d14300x6",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d1430009",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d1430004",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d1430706",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a7b5d143000a",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
  {
    _id: "67163a5f1c77a9b5d1430001",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "67163a5f5c1119b5d1430006",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d143000a",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
  {
    _id: "67163a5f5c47a9b5d1430001",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430003",
      nombre: "Martín Gómez",
      email: "martin.gomez@gmail.com",
      telefono: "1149876543",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430004",
          titulo: "Auriculares Inalámbricos Sony WH-1000XM5",
          descripcion:
            "Auriculares con cancelación activa de ruido y batería de larga duración.",
          precio: 4500,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 2,
        precioUnitario: 4500,
      },
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 12000,
          moneda: "PESO_ARG",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 12000,
      },
    ],
    total: 21000,
    moneda: "PESO_ARG",
    direccion: {
      ciudad: {
        nombre: "Buenos Aires",
        provincia: {
          nombre: "Buenos Aires",
          pais: { nombre: "Argentina" },
        },
      },
      domicilio: {
        calle: "Av. Corrientes",
        altura: 1234,
        piso: 5,
        departamento: "B",
        codigoPostal: "1043",
      },
      coordenada: { latitud: -34.6037, longitud: -58.3816 },
    },
    estado: "CONFIRMADO",
    fechaCreacion: "2025-10-01T10:15:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-10-01T10:15:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pedido recibido y pendiente de confirmación.",
      },
      {
        estado: "CONFIRMADO",
        fecha: "2025-10-02T09:00:00Z",
        usuario: "67163a5f5c77a9b5d1430003",
        motivo: "Pago confirmado.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a9b5d1430006",
    comprador: {
      _id: "67163a5f5c77a9b5d1430007",
      nombre: "Carlos Medina",
      email: "carlos.medina@hotmail.com",
      telefono: "1122334455",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430009",
          titulo: "Mouse Logitech MX Master 3S",
          descripcion: "Mouse inalámbrico ergonómico con carga USB-C.",
          precio: 25,
          moneda: "DOLAR_USA",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 3,
        precioUnitario: 25,
      },
    ],
    total: 75,
    moneda: "DOLAR_USA",
    direccion: {
      ciudad: {
        nombre: "Miami",
        provincia: {
          nombre: "Florida",
          pais: { nombre: "Estados Unidos" },
        },
      },
      domicilio: {
        calle: "Ocean Drive",
        altura: 1500,
        codigoPostal: "33139",
      },
      coordenada: { latitud: 25.7907, longitud: -80.13 },
    },
    estado: "ENVIADO",
    fechaCreacion: "2025-09-28T13:45:00Z",
    historialEstados: [
      {
        estado: "CONFIRMADO",
        fecha: "2025-09-28T14:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido confirmado por el vendedor.",
      },
      {
        estado: "EN_PREPARACION",
        fecha: "2025-09-29T08:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Producto en preparación.",
      },
      {
        estado: "ENVIADO",
        fecha: "2025-09-30T11:00:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido enviado al cliente.",
      },
    ],
  },
  {
    _id: "67163a5f5c77a945d143000a",
    comprador: {
      _id: "67163a5f5c77a9b5d1430002",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@gmail.com",
      telefono: "1134567890",
    },
    vendedor: {
      _id: "67163a5f5c77a9b5d1430008",
      nombre: "Ana Pereira",
      email: "ana.pereira@gmail.com",
      telefono: "1188776655",
    },
    items: [
      {
        producto: {
          _id: "67163a5f5c77a9b5d1430005",
          titulo: "Monitor LG 27'' UltraGear",
          descripcion: "Monitor gamer con 144Hz y 1ms de respuesta.",
          precio: 15000,
          moneda: "REAL",
          fotos: ["/images/celular.webp"],
        },
        cantidad: 1,
        precioUnitario: 15000,
      },
    ],
    total: 15000,
    moneda: "REAL",
    direccion: {
      ciudad: {
        nombre: "São Paulo",
        provincia: {
          nombre: "São Paulo",
          pais: { nombre: "Brasil" },
        },
      },
      domicilio: {
        calle: "Rua Augusta",
        altura: 250,
        codigoPostal: "01305-000",
      },
      coordenada: { latitud: -23.5566, longitud: -46.6623 },
    },
    estado: "CANCELADO",
    fechaCreacion: "2025-09-20T17:30:00Z",
    historialEstados: [
      {
        estado: "PENDIENTE",
        fecha: "2025-09-20T17:30:00Z",
        usuario: "67163a5f5c77a9b5d1430008",
        motivo: "Pedido recibido.",
      },
      {
        estado: "CANCELADO",
        fecha: "2025-09-21T09:15:00Z",
        usuario: "67163a5f5c77a9b5d1430002",
        motivo: "Cancelado por el comprador antes del envío.",
      },
    ],
  },
];

const UsuarioDtoMock = {
  id: "67163a5f5c77a9b5d1430002",
  nombre: "Lucía Fernández",
  email: "lucia.fernandez@gmail.com",
  telefono: "1134567890",
  tipoUsuario: "COMPRADOR",
  fechaAlta: "2024-06-10T00:00:00Z",
};

export const HistorialUsuarioResponseMock = {
  usuario: UsuarioDtoMock,
  numeroPagina: 1,
  elementosPorPagina: 4,
  total: PedidosMock.length,
  totalPages: 1,
  data: PedidosMock,
};
