import {Observable, merge} from 'rxjs';
import {mapTo, scan, startWith, distinctUntilChange} from 'rxjs/operators';

const taskStarts = new Observable();
const taskCompletions = new Observable();
const showSpinner = new Observable();

const loadUp = taskStarts.pipe(mapTo(1));
const loadDown = taskCompletions.pipe(mapTo(-1));

const loadVariations = merge(loadUp, loadDown);

const currentLoadCount = loadVariations.pipe(
  startWith(0),
  scan((totalCurrentLoads, changeInLoads) => {
    const newLoadCount = totalCurrentLoads + changeInLoads;
    return newLoadCount < 0 ? 0 : newLoadCount;
  }),
  distinctUntilChange()
);

export default {};
