import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(value: any, searchKey: string): any {
    if(!value)return null;
    if(!searchKey)return value;

    searchKey = searchKey.toLowerCase();
    console.log(searchKey)

    return value.filter((f: any) => {
      return f.name.toLowerCase().indexOf(searchKey) > -1;
    });
  }

}
