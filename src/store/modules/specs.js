import { reqspecsList,reqspecsCount } from '../../utils/http'

const state = {
    list: [],
    page:1,
    size:2,
    total: 1
}

const mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
    changeCount(state,num){
        state.total=num
    },
    changePage(state,num){
        state.page = num
    }
}

const actions = {
    reqList(context,bool) {
        let param = bool?{}:{page:context.state.page,size:context.state.size}
        reqspecsList(param).then(res => {
            let list = res.data.list?res.data.list:[];

            if(list.length ===0 &&context.state.page>1){
                context.commit("changePage",context.state.page-1);
                context.dispatch("reqList");
                return;
            }

            list.forEach(item => {
                item.attrs = JSON.parse(item.attrs)
            });
            context.commit("changeList",list);
        });
    },
    reqCount(context){
        reqspecsCount().then(res=>{
            context.commit("changeCount",res.data.list[0].total);
        });
    },
    reqPage(context,id){
        context.commit("changePage",id);
        context.dispatch("reqList")
    }

}

const getters = {
    list(state) {
        return state.list;
    },
    total(state){
        return state.total;
    },
    page(state){
        return state.page;
    },
    size(state){
        return state.size;
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}