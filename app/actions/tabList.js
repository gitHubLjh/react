import { createAction } from 'redux-actions'
/**
 * createAction返回一个函数，该函数是一个actionCreate，如下：
 * function createAction(type){
        return payload => {
            return {
                type:type,
                payload:payload
            }
        }
    }
 */
export const requestTabList = createAction('request tab list') // 产生actionCreator
export const updateTabList = createAction('update tab list')
export const updateTabChecked = createAction('update tab checked')
export const deleteTabFromList = createAction('delete tab from list');

