export const crearSrfPdf = (srf) => {
    const docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: 'portrait',
        pageMargins: [40, 60, 40, 0],

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
                            widths: [100, 280],
                            body: [
                                [
                                    {
                                        text: 'I. ' + srf.seccionUno,
                                        style: 'subtitulo', colSpan: 2

                                    }, {}
                                ],
                                [
                                    {
                                        image: srf.imagen,
                                        width: 100,
                                        height: 100,
                                        rowSpan: 5
                                    },
                                    {
                                    },
                                ],
                                [
                                    {},
                                    { text: srf.nombre }
                                ],
                                [
                                    {},
                                    { text: 'IDP: ' + srf.idp },
                                ],
                                [
                                    {},
                                    { text: 'Email: ' + srf.email },
                                ],
                                [
                                    {},
                                    { text: 'Cargo: ' + srf.cargo },
                                ]
                            ]
                        }, width: 350, layout: 'noBorders'
                    },
                    {
                        qr: srf.qr, style: 'numero', fit: 120
                    }
                ],
            },
            {
                alignment: 'justify',
                columns: [
                    { text: srf.costo, style: 'datos', width: 350 },
                    {
                        text: [
                            { text: 'CC : ', style: 'codigo' },
                            { text: srf.codigo, style: 'datos' }
                        ], width: 150
                    }
                ],

            },
            {},
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: 'II. ' + srf.seccionDos,
                                style: 'subtitulo',
                            }
                        ]
                    ]
                },
            },
            {
                alignment: 'justify',
                columns: [
                    { text: srf.fechafin, style: 'datos', width: 300 },
                    { text: srf.monto, style: 'datos', width: 200 }
                ],

            },
            {
                alignment: 'justify',
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                text: srf.detalle,
                                style: 'detalle',
                            }
                        ]
                    ]
                },
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
                            body: [
                                [
                                    {
                                        text: 'III. ' + srf.seccionTres,
                                        style: 'subtitulo',
                                    }
                                ]
                            ]
                        },
                    },
                    {
                        text: srf.obs, style: 'obs'
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
                            { text: '---------------------------------------\nVo.Vo.', style: 'puntos' },
                            { text: '---------------------------------------\nRevisado Por', style: 'puntos' }],
                        [
                            [
                                {
                                    table: {
                                        widths: [35, 115],
                                        body: [
                                            [{ text: 'Nombre:', style: 'firmaright' }, { text: srf.nombre, style: 'firmaleft' }],
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
                                            [{ text: 'Nombre:', style: 'firmaright' }, {text:srf.pago.nombre,style:'firmaleft'}],
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
                fontSize: 15,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 10]
            },
            numero: {
                fontSize: 25,
                bold: true,
                alignment: 'right'
            },
            idp: {
                fontSize: 10,
                alignment: 'right',
                color: 'grey'
            },
            margen: {
                margin: [10, 0, 0, 10]
            },
            subtitulo: {
                fontSize: 13,
                bold: true,
                alignment: 'left',
                margin: [10, 0, 0, 0],
                color: 'white',
                fillColor: 'black'
            },
            codigo: {
                fontSize: 13,
                bold: true,
                color: 'white',
                background: 'black'
            },
            seccionuno: {
                fontSize: 12,
                margin: [0, 15, 0, 0],
            },
            datos: {
                fontSize: 12,
                margin: [10, 5, 0, 5],
            },
            detalle: {
                fontSize: 11,
                margin: [5, 5, 0, 5],
                fillColor: '#cecece'
            },
            firma: {
                margin: [0, 40, 0, 40],
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
                fontSize: 10,
                color: 'grey'
            },
            obs: {
                fontSize: 9,
                alignment: 'justify'
            }
        }
    }
    return docDefinition
}