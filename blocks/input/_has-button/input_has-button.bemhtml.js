block('input').mod('has-button', true).elem('buttons')
    .content()(function() {
        return [applyNext(), {
            elem : 'button',
            title : this._input.buttonTitle,
            content : this._input.buttonContent
        }];
    });
