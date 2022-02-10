export const options = {

    definition: {
        openapi: "3.0.0",
        info: {
            title: 'SynsSensors',
            version: '1.0.0', 
            description: 'A simple express library API'
        },
        servers: [
            {
                url: "http://localhost:4000"
            }
        ]

    },
    apis: [
        "./src/routes/User/user.routes.ts",
    ]

}