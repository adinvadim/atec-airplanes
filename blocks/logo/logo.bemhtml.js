block('logo')(
    content()(function(){
        return {
            block: 'link',
            mix : { block : 'logo', elem : 'link' },
            url : '/',
            content : {
                block : 'logo',
                elem : 'picture'
            }
        }
    })
)
