import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from './IPost';

@Pipe({
    name : 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform{    

    transform(list : IPost[], filterBy: string) : IPost[]{
        console.log(`inside loc filter pipe.... filter by:  ${ filterBy }`);        

        // if no filterBr return null
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        if(list == null || list == undefined) return list;

        // if not null filter otherwise return original list
        // could be coded with indexOf:        
        //return filterBy ? list.filter( (prod: IPost) => prod.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : list;
        return filterBy ? list.filter( (post: IPost) => post.location.toLocaleLowerCase().includes(filterBy)) : list;
        
    }
}
