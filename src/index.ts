import {Observable} from 'rxjs';
import {bufferWhen, filter, delay, debounceTime} from 'rxjs/operators'
// @ts-ignore
import * as helpers from './helpers'

const observable1 = Observable.create((observer: any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
const data = ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'];
const observable2 = Observable.interval(400).take(data.length).map(i => data[i]);

// add all the number together in this array, takes some time 400 * len
const observable3 = observable2
    .map(i => parseInt(i))
    .filter(i => !isNaN(i))
    .reduce(((previousValue, currentValue) => previousValue + currentValue));

// change the observable name to run it
// observable3.subscribe(
//     (x:any) => helpers.logItem(x),
//     (error: any) => helpers.logItem ('Error: ' + error),
//     () => helpers.logItem('Completed')
// );

var button = document.querySelector('button');
var label = document.getElementById('label');

var clickStream = Observable.fromEvent(button, 'click');

const dblClickStream = clickStream.pipe(
    bufferWhen(() => clickStream.pipe(debounceTime(250))),
    filter(arr => arr.length === 2)
);


dblClickStream.subscribe(event => {
    label.textContent = 'double click';
});

dblClickStream.pipe(delay(1000))
    .subscribe(suggestion => {
        label.textContent = '-';
    })






