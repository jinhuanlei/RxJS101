import {Observable} from 'rxjs';
// @ts-ignore
import * as helpers from './helpers'

const observable1 = Observable.create((observer:any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
const arr = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
const observable2 = Observable.interval(400).take(arr.length).map(i => arr[i]);

// add all the number together in this array, takes some time 400 * len
const observable3 = observable2
    .map(i => parseInt(i))
    .filter(i => !isNaN(i))
    .reduce(((previousValue, currentValue) => previousValue + currentValue));

// change the observable name to run it
observable3.subscribe(
    (x:any) => helpers.logItem(x),
    (error: any) => helpers.logItem ('Error: ' + error),
    () => helpers.logItem('Completed')
);


