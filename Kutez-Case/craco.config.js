const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@font-family': '\'Poppins\', sans-serif',
                            '@text-color': '#2B2E39',
                            '@font-size-base': '27pt',
                            '@border-radius-base': '30pt',
                            '@height-base': '60pt',
                            '@btn-default-color': '#FFFFFF',
                            '@btn-default-bg': 'linear-gradient(to left, #AC6EFF, #2414DB)',
                            '@control-padding-horizontal': '25pt'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
