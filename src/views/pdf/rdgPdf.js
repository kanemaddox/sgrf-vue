export const crearRdgPdf = (rdg) => {
    const docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: 'portrait',
        pageMargins: [40, 60, 40, 0],

        // Encabesado 
        header: function (currentPage, pageCount, pageSize) {
            return {
                margin: [40, 40, 40, 0],
                stack: [
                    {
                        columns: [
                            {
                                text: 'Empresa',
                                style: 'cabesera',
                                width: '*'
                            },
                            {
                                text: 'cemail@gmail.com | +581000000',
                                width: 'auto',
                                style: 'cabesera',
                                alignment: 'right'
                            }
                        ]
                    },
                    {
                        width: '*',
                        margin: [0, 5, 0, 0],
                        canvas: [
                            {
                                type: 'line', x1: 0, y1: 0, x2: 532, y2: 0, lineWidth: 1, lineColor: '#000000'
                            }
                        ]
                    }
                ]
            };
        },
        //End Encavesado
        // Contenido
        content: [
            {
                table: {
                    widths: [370, 150],
                    body: [
                        [
                            // Columna 1
                            {
                                text: [
                                    { text: rdg.titulo, style: 'titulo' },
                                    { text: '\n' + rdg.fecha, style: 'margen' },
                                    { text: '  ' },
                                    { text: ' Importe Recibido : ' + rdg.importe, style: 'importe' },
                                ]
                            },
                            // Columna 2
                            {
                                stack: [
                                    { text: 'No.: ' + rdg.numero, style: 'numero' },
                                    { text: rdg.gestion, style: 'idp' }
                                ]
                            }
                        ]
                    ]
                },layout: 'noBorders'
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        style: 'table',
                        table: {
                            widths: [70, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                            headerRows: 0,
                            body: [
                                [
                                    {
                                        text: 'I. ' + rdg.seccionUno,
                                        style: 'subtitulo', colSpan: 7
                                    }, {}, {}, {}, {}, {}, {},
                                ],
                                [
                                    {
                                        image: rdg.imagen,
                                        width: 70,
                                        height: 70,
                                        rowSpan: 5
                                    },
                                    { text: rdg.nombre, fontSize: 9, colSpan: 4 }, {}, {}, {},
                                    { text: rdg.idpName + rdg.idp, fontSize: 9, colSpan: 2 }, {},
                                ],
                                [
                                    {},
                                    { text: 'Email: ' + rdg.email, fontSize: 9, colSpan: 6 },
                                    {}, {}, {}, {}, {},
                                ],
                                [
                                    {},
                                    { text: 'Cargo: ' + rdg.cargo, fontSize: 8, colSpan: 3 }, {}, {},
                                    { text: 'Area: ' + rdg.area, fontSize: 8, colSpan: 3 }, {}, {},
                                ],
                                [
                                    {},
                                    { text: 'Tipo CTA.: ', style: 'codigoTable' },
                                    { text: rdg.tipo, style: 'datosTable' },
                                    { text: '| No. CTA.: ', style: 'codigoTable' },
                                    { text: rdg.cuenta, style: 'datosTable' },
                                    { text: '| Banco : ', style: 'codigoTable' },
                                    { text: rdg.banco, style: 'datosTable' },
                                ],
                                [
                                    {},
                                    { text: 'C. Costos : ', style: 'codigoTable' },
                                    { text: rdg.costo, style: 'datosTable', colSpan: 3 }, {}, {},
                                    { text: '| CC : ', style: 'codigoTable' },
                                    { text: rdg.codigo, style: 'datosTable' },
                                ],
                            ],
                        }, width: 450, layout: 'lightHorizontalLines'
                    },
                    {
                        qr: rdg.qr, style: 'numero', fit: 90
                    }
                ],
            },
            //Seccion Dos =======================================================================
            {
                table: {
                    headerRows: 1,
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'II. ' + rdg.seccionDos,
                                style: 'subtitulo',
                            }
                        ]
                    ]
                }, layout: {
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0; // Solo la línea inferior
                    },
                    // vLineWidth elimina las líneas verticales de los lados
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                    // Opcional: define el color de la línea
                    hLineColor: function (i, node) {
                        return '#000000';
                    }
                }
            },
            {
                style: 'table',
                table: {
                    widths: ['auto', 'auto'],
                    headerRows: 0,
                    body: [
                        [
                            { text: 'Actividad / Gasto Realizado : ', style: 'codigoTable' },
                            { text: rdg.actividad, style: 'datosTable' },
                        ],
                    ],
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0; // Solo la línea inferior
                    },
                    // vLineWidth elimina las líneas verticales de los lados
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                    // Opcional: define el color de la línea
                    hLineColor: function (i, node) {
                        return '#000000';
                    }
                }
            },
            {
                style: 'table',
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    headerRows: 1,
                    body: [
                        [
                            { text: 'Del : ', style: 'codigoTable' },
                            { text: rdg.del, style: 'datosTable' },
                            { text: 'Al : ', style: 'codigoTable' },
                            { text: rdg.al, style: 'datosTable' },
                            { text: 'Total Dias : ', style: 'codigoTable' },
                            { text: rdg.dias, style: 'datosTable' },
                        ],
                    ],
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 1) ? 1 : 0; // Solo la línea inferior
                    },
                    // vLineWidth elimina las líneas verticales de los lados
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                    // Opcional: define el color de la línea
                    hLineColor: function (i, node) {
                        return '#000000';
                    }
                }
            },
            {
                alignment: 'justify',
                table: {
                    widths: [120, 'auto'],
                    body: [
                        [
                            { text: 'Descripcion de la Actividad : ', style: 'codigoTable' },
                            { text: rdg.detalle, style: 'datosTable' },
                        ],
                        [
                            { text: 'Participantes : ', style: 'codigoTable' },
                            { text: rdg.participantes, style: 'datosTable' },
                        ],
                    ],
                },
                layout: 'lightHorizontalLines'
            },
            //End Seccion Dos ==================================================================
            //Seccion Tres =====================================================================
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'III. ' + rdg.seccionTres,
                                style: 'subtitulo',
                            }
                        ]
                    ]
                }, layout: 'noBorders'
            },
            {
                style: 'table',
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', '*', 'auto'],
                    body: [
                        [
                            { text: 'Fecha', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Tipo Gasto', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Tipo Doc.', fillColor: '#cecece', fontSize: 10 },
                            { text: 'No. Doc.', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Detalle', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Importe', fillColor: '#cecece', fontSize: 10 },
                        ],
                        ...rdg.facturas,
                        [
                            { colSpan: 5, text: 'Total Gastos Realizados :', style: 'codigoTable' },
                            {}, {}, {}, {},
                            { text: rdg.gastos, style: 'datosTable', fillColor: '#cecece', alignment: 'right' },
                        ],
                        [
                            { colSpan: 5, text: 'Total Fondos Recibidos :', fillColor: '#cecece', fontSize: 9 },
                            {}, {}, {}, {},
                            { text: rdg.importe, style: 'datosTable', fillColor: '#cecece', alignment: 'right' },
                        ],
                        [
                            { colSpan: 5, text: 'Saldo :', style: 'codigoTable' },
                            {}, {}, {}, {},
                            { text: rdg.saldo, style: 'datosTable', fillColor: '#cecece', alignment: 'right' },
                        ],
                    ],
                },
            },
            {},
            ...(
                rdg.r > 0 ? [
                    {
                        style: 'table',
                        table: {
                            widths: ['auto', 'auto'],
                            headerRows: 0,
                            body: [
                                [
                                    { text: 'Fondos por reembolsar al colaborador : ' },
                                    { text: rdg.rembolso, style: 'datosTable', fillColor: '#cecece' },
                                ],
                            ],
                        },
                        layout: 'noBorders'
                    },
                ] : []
            ),
            ...(
                rdg.d > 0 ? [
                    {
                        style: 'table',
                        table: {
                            widths: ['auto', 'auto'],
                            headerRows: 0,
                            body: [
                                [
                                    { text: 'Fondos por devolver a la Oficina : ' },
                                    { text: rdg.devolver, style: 'datosTable', fillColor: '#cecece' },
                                ],
                            ],
                        },
                        layout: 'noBorders'
                    },
                ] : []
            ),
            {
                text: '', style: 'firma'
            },
            {
                table: {
                    widths: [165, 165, 165],
                    body: [
                        [
                            { text: '---------------------------------------\nColaborador', style: 'puntos' },
                            { text: '---------------------------------------\nVo.Bo.', style: 'puntos' },
                            { text: '---------------------------------------\nRevisado Por', style: 'puntos' }],
                        [
                            [
                                {
                                    table: {
                                        widths: [35, 115],
                                        body: [
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: rdg.nombreFirma, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: rdg.cargoFirma, style: 'firmaleft' }],
                                            [{ text: rdg.idpName, style: 'firmaright' }, { text: rdg.idp, style: 'firmaleft' }],
                                        ]
                                    },
                                    layout: 'noBorders'
                                },
                            ],
                            [
                                {
                                    table: {
                                        widths: [35, 115],
                                        body: [
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: rdg.jefe.nombre, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: rdg.jefe.cargo, style: 'firmaleft' }],
                                            [{ text: rdg.idpName, style: 'firmaright' }, { text: rdg.jefe.idp, style: 'firmaleft' }],
                                        ]
                                    },
                                    layout: 'noBorders'
                                },
                            ],
                            [
                                {
                                    table: {
                                        widths: [35, 120],
                                        body: [
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: rdg.pago.nombre, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: rdg.pago.cargo, style: 'firmaleft' }],
                                            [{ text: rdg.idpName, style: 'firmaright' }, { text: rdg.pago.idp, style: 'firmaleft' }],
                                        ]
                                    },
                                    layout: 'noBorders'
                                }
                            ]
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            //---------------PAGINA 2 --------------------
            {
                text: '',
                pageBreak: 'before'
            },
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'IV. RESUMEN',
                                style: 'subtitulo',
                            }
                        ]
                    ]
                }, layout: 'noBorders'
            },
            {
                style: 'table',
                table: {
                    widths: ['auto', 'auto', '*', 'auto'],
                    body: [
                        [
                            { text: 'Tipo Gasto', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Codigo', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Detalle', fillColor: '#cecece', fontSize: 10 },
                            { text: 'Importe', fillColor: '#cecece', fontSize: 10 },
                        ],
                        ...rdg.cuentas,
                        [
                            { colSpan: 3, text: 'Total Gastos :', style: 'codigoTable' },
                            {}, {},
                            { text: rdg.gastos, style: 'datosTable', fillColor: '#cecece', alignment: 'right' },
                        ],
                    ],
                },
            },
            {},
            {

                table: {
                    widths: [50, '*', 'auto'],
                    body: [
                        [
                            { colSpan: 3, text: 'V. DOCUMENTOS', style: 'subtitulo', }, {}, {},
                        ],
                        ...rdg.archivo,
                    ]
                },
            },
        ],
        styles: {
            titulo: {
                fontSize: 13,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 10]
            },
            importe: {
                fontSize: 12,
                bold: true,
                alignment: 'left',
                margin: [5, 0, 0, 5]
            },
            numero: {
                fontSize: 25,
                bold: true,
                alignment: 'right',
                margin: [5, 0, 0, 0]
            },
            idp: {
                fontSize: 8,
                alignment: 'right',
                color: 'grey',
                margin: [0, -5, 0, 5],
            },
            margen: {
                margin: [10, 0, 0, 10],
                color: 'balck',
                fontSize: 10,
            },
            subtitulo: {
                fontSize: 10,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 0],
                //color: 'white',
                fillColor: '#cecece'
            },
            codigo: {
                fontSize: 10,
                bold: true,
                color: 'white',
                background: 'black',
            },
            codigoTable: {
                fontSize: 9,
                bold: true,
            },
            datos: {
                fontSize: 9,
                margin: [10, 0, 0, 10],
            },
            datosTable: {
                fontSize: 9,
            },
            detalle: {
                fontSize: 8,
                margin: [5, 5, 0, 5],
                fillColor: '#cecece'
            },
            firma: {
                margin: [0, 30, 0, 30],
            },
            puntos: {
                alignment: 'center',
                bold: true,
                fontSize: 9
            },
            firmaright: {
                alignment: 'right',
                fontSize: 8,
                margin: [0, -3, 0, 0]
            },
            firmaleft: {
                alignment: 'left',
                fontSize: 8,
                margin: [0, -3, 0, 0]
            },
            cabesera: {
                fontSize: 10,
                color: 'grey'
            },
            obs: {
                fontSize: 9,
                alignment: 'justify'
            },
            table: {
                margin: [0, 1, 0, 1]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
        }
    }
    return docDefinition
}