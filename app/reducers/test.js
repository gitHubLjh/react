import { handleActions } from 'redux-actions'

const QRCodeState = {
    QRCodeFgColor: '#36c',
    QRCodeLevel: 'Q',
    copied: false,
    copyContent: '我是复制的内容',
    CodeMirrorContent: 'var component = {name: "react-codemirror",author: "Jed Watson",repo: "https://github.com/JedWatson/react-codemirror"};',
    CodeMirrorMode: 'javascript',
    CodeMirrorReadOnly: false,
}

export const QRCodeStateResult = handleActions({
    // 发出请求前调用
    'change QRCode color'(state, action) {
        return { ...state, QRCodeFgColor: action.payload.fgcolor.color }
    },
    'change QRCode level'(state, action) {
        return { ...state, QRCodeLevel: action.payload.level }
    },
    'copy'(state, action) {
        return { ...state, copied: true }
    },
    'change copy content'(state, action) {
        return { ...state, copyContent: action.payload.content }
    },
    'change codeMirror mode'(state, action) {
        console.log('mode', action.payload.mode)
        console.log('content', action.payload.content)
        return { ...state, CodeMirrorMode: action.payload.mode, CodeMirrorContent: action.payload.content }
    },
    'change codeMirror readOnly'(state, action) {
        return { ...state, CodeMirrorReadOnly: action.payload.readOnly }
    },
}, QRCodeState)
