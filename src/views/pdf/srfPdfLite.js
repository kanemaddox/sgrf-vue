export const crearSrfPdf = (srf) => {
    const docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: 'portrait',
        pageMargins: [40, 60, 40, 20],

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
        content: [
            {
                alignment: 'justify',
                columns: [
                    {
                        text: [
                            { text: srf.titulo, style: 'titulo' },
                            { text: '\n' + srf.fecha, style: 'margen' },
                        ], width: 370
                    },

                    {
                        text: [
                            { text: 'No.: ' + srf.numero, style: 'numero', width: 150 },
                            { text: '\n' + srf.gestion, style: 'idp' }
                        ],
                    }
                ]
            },
            {},
            {
                alignment: 'justify',
                columns: [
                    {
                        table: {
                            widths: ['auto', 'auto', 'auto', 'auto'],
                            headerRows: 0,
                            body: [
                                [
                                    {
                                        text: 'I. ' + srf.seccionUno,
                                        style: 'subtitulo', colSpan: 4
                                    }, {}, {}, {},
                                ],
                                [
                                    { text: 'Nombre : ', style: 'codigoTable' },
                                    { text: srf.nombre, style: 'datosTable' },
                                    { text: srf.idpName, style: 'codigoTable' },
                                    { text: srf.idp, style: 'datosTable' },
                                ],
                                [
                                    { text: 'Email : ', style: 'codigoTable' },
                                    { text: srf.email, style: 'datosTable', colSpan: 2 }, {}, {},
                                ],
                                [
                                    { text: 'Cargo : ', style: 'codigoTable' },
                                    { text: srf.cargo, style: 'datosTable', colSpan: 2 }, {}, {},
                                ],
                                [
                                    { text: 'C. Costos : ', style: 'codigoTable' },
                                    { text: srf.costo, style: 'datosTable' },
                                    { text: '| CC : ', style: 'codigoTable' },
                                    { text: srf.codigo, style: 'datosTable' },
                                ],
                            ],
                        }, width: 450, layout: 'lightHorizontalLines'
                    },
                    {
                        qr: srf.qr, style: 'numero', fit: 90
                    }
                ],
            },{},
            {
                table: {
                    widths: ['auto','auto','auto','auto'],
                    headerRows: 0,
                    body: [
                        [
                            {text: 'II. ' + srf.seccionDos,style: 'subtitulo', colSpan:4},{},{},{},
                        ],
                        [
                            { text: srf.fechaTituloFin, style: 'codigoTable' },
                            { text: srf.fechafin, style: 'datosTable' },
                            { text: srf.montoTitulo, style: 'codigoTable' },
                            { text: srf.monto, style: 'datosTable' },
                        ],
                        [
                            { text: srf.descripcion, style: 'codigoTable', colSpan:2 },
                            { },
                            { text: srf.detalle, style: 'datosTable', colSpan:2},
                            { },
                        ],
                    ]
                }, layout: 'lightHorizontalLines'
            },
            
            ...(
                srf.visibleDos ?
                    [
                        {
                            alignment: 'justify',
                            columns: [
                                { text: srf.texto, style: 'datos', width: 300 },
                                { text: srf.numerico, style: 'datos', width: 200 }
                            ],

                        },
                    ] :
                    [{}]
            ),
            ...(
                srf.visibleTres ? [
                    {
                        table: {
                            widths: ['*'],
                            headerRows: 0,
                            body: [
                                [
                                    {
                                        text: 'III. ' + srf.seccionTres,
                                        style: 'subtitulo',
                                    }
                                ],
                                [
                                    {
                                        text: srf.obs, style: 'obs'
                                    }
                                ],
                            ],
                        },layout: 'lightHorizontalLines'
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
                            { text: '---------------------------------------\nElaborado por', style: 'puntos' },
                            { text: '---------------------------------------\nAutorizado por', style: 'puntos' },
                            { text: '---------------------------------------\nRevisado por', style: 'puntos' }],
                        [
                            [
                                {
                                    table: {
                                        widths: [35, 115],
                                        body: [
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: srf.nombreFirma, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: srf.cargofirma, style: 'firmaleft' }],
                                            [{ text: srf.idpName, style: 'firmaright' }, { text: srf.idp, style: 'firmaleft' }],
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
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: srf.jefe.nombre, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: srf.jefe.cargo, style: 'firmaleft' }],
                                            [{ text: srf.idpName, style: 'firmaright' }, { text: srf.jefe.idp, style: 'firmaleft' }],
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
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: srf.pago.nombre, style: 'firmaleft' }],
                                            [{ text: 'Cargo:', style: 'firmaright' }, { text: srf.pago.cargo, style: 'firmaleft' }],
                                            [{ text: srf.idpName, style: 'firmaright' }, { text: srf.pago.idp, style: 'firmaleft' }],
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

        ],
        styles: {
            titulo: {
                fontSize: 12,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 10]
            },
            numero: {
                fontSize: 22,
                bold: true,
                alignment: 'right'
            },
            idp: {
                fontSize: 7,
                alignment: 'right',
                color: 'grey'
            },
            margen: {
                margin: [10, 0, 0, 10],
                color: 'balck',
                fontSize: 9,
            },
            subtitulo: {
                fontSize: 9,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 0],
            },
            codigo: {
                fontSize: 9,
                bold: true,
                color: 'white',
                background: 'black'
            },
            codigoTable: {
                fontSize: 8,
                bold: true,
            },
            datos: {
                fontSize: 8,
                margin: [10, 0, 0, 10],
            },
            datosTable: {
                fontSize: 8,
            },
            seccionuno: {
                fontSize: 12,
                margin: [0, 15, 0, 0],
            },
            detalle: {
                fontSize: 8,
                margin: [5, 5, 0, 5],
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
                fontSize: 8
            },
            firmaleft: {
                alignment: 'left',
                fontSize: 8
            },
            cabesera: {
                fontSize: 9,
                color: 'grey'
            },
            obs: {
                fontSize: 8,
                alignment: 'justify'
            }
        }
    }
    return docDefinition
}