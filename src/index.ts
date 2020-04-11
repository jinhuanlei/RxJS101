import {Observable} from 'rxjs';
// @ts-ignore
import * as helpers from './helpers'

var observable1 = Observable.create((observer:any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
const arr = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
var observable2 = Observable.interval(400).take(arr.length).map(i => arr[i]);


// change the observerable name to run it
observable2.subscribe(
    (x:any) => helpers.logItem(x),
    (error: any) => helpers.logItem ('Error: ' + error),
    () => helpers.logItem('Completed')
);


