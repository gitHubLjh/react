import {
    createAction,
} from 'redux-actions'

export const changeQRCodeColor = createAction('change QRCode color')
export const changeQRCodeLevel = createAction('change QRCode level')
export const copy = createAction('copy')
export const changeCopyContent = createAction('change copy content')
export const changeCodeMirrorMode = createAction('change codeMirror mode')
export const changeCodeMirrorReadOnly = createAction('change codeMirror readOnly')
