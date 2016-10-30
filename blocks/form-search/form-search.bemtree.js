block('form-search')(
    content()(function() {
        var ctx = this.ctx;

        return {
            block : 'form',
            method : 'GET',
            action : ctx.action,
            content : [
                {
                    block : 'form-field',
                    name : 'q',
                    mods : {
                        type : 'input',
                        required : true
                    },
                    content : [
                        {
                            block : 'input',
                            placeholder: this.ctx.placeholder,
                            mods : {
                                width : 'available',
                                'has-clear' : true,
                                'has-button' : true,
                                type : 'search',
                                size : 'medium'
                            },
                            buttonTitle : 'Поиск',
                            buttonContent : {
                                block : 'icon',
                                mix : {
                                    block : 'form-search',
                                    elem : 'icon'
                                },
                                mods : { 'type' : 'search' },
                                svg : true
                            },
                            mix : { block : 'form-search', elem : 'input' },
                        }
                    ]
                }
            ]

        }
    })
)