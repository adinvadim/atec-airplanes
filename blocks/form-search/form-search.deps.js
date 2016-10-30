({
    mustDeps : [
        {
            block : 'form-search',
            mods : { 'adaptive' : true }
        },
        'form',
        {
            block : 'icon',
            mods : { 'type' : 'search' }
        },
        {
            block : 'form-field',
            mods : {
                type : 'input',
                required : true
            }
        },
        {
            block : 'input',
            mods : {
                width : 'available',
                'has-clear' : true,
                'has-button' : true,
                type : 'search',
                size : 'medium',
            }
        }
    ]
})
