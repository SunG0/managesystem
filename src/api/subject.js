import _axios from './request'

function getSubjectList(){
    return _axios({
        url:'/subject/list',
    })
}

export {getSubjectList}