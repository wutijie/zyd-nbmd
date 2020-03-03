export function resetAddRoutes(router){
    if(Object.prototype.toString.call(router) == '[object Array]' && router.length > 0){
        let w_router = [];
        // console.log(router)
        router.forEach( (item, index) => {
            let new_router = {
                path: item.path,
                name: item.name,
                component: require('@/views/layout').default,
                children: [],
                meta: {
                    title: item.title,
                    iframeSrc: item.iframeSrc,
                    components: item.components.split(','),
                    mark: item.mark,
                    iconClass: item.iconClass
                }
            };
            item.children.forEach( (item2, index2) => {
                new_router.children.push({
                    path: item2.path,
                    name: item2.name,
                    children: [],
                    meta: {
                        title: item2.title,
                        parentName: item.name,
                        iframeSrc: item2.iframeSrc,
                        components: item2.components.split(','),
                        mark: item2.mark
                    }
                })
                item2.children.forEach( (item3, index3) => {
                    new_router.children[index2].children.push({
                        path: item3.path,
                        name: item3.name,
                        meta: {
                            title: item3.title,
                            parentName: item.name,
                            iframeSrc: item3.iframeSrc,
                            components: item3.components.split(','),
                            mark: item3.mark
                        }
                    })
                })
            })
            w_router.push(new_router);
        })
        return w_router;
    }else{
        return new Error('格式不正确或者为空');
    }
}