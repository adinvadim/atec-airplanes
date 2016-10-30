block('spinner')(
    mod('type', 'three-bounce')(
        content()(function() {
            return {
                elem : 'trick',
                content : [
                    {
                        elem : 'dot',
                        elemMods : { '1' : true }
                    },
                    {
                        elem : 'dot',
                        elemMods : { '2' : true }
                    },
                    {
                        elem : 'dot',
                        elemMods : { '3' : true }
                    }
                ]
            }
        })
    )
)