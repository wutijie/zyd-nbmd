export function resetAddRoutes(router){
    if(Object.prototype.toString.call(router) == '[object Array]' && router.length > 0){
        // console.log(router);
        let w_router = [];
        router.forEach( (item, index) => {
            let new_router = {
                path: item.path,
                name: item.name,
                component: require('@/views/layout').default,
                children: [],
                meta: {
                    title: item.title,
                }
            };
            item.children.forEach( (item2, index2) => {
                new_router.children.push({
                    path: item2.path,
                    name: item2.name,
                    meta: {
                        title: item2.title,
                        parentName: item.name,
                        iframeSrc: item2.iframeSrc,
                        components: item2.components
                    }
                })
            })
            w_router.push(new_router);
        })
        return w_router;
    }else{
        return new Error('格式不正确或者为空');
    }
}