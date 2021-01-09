import { giveShipCoords, shiftAxis } from './playground';

test('shift axis works!', () => {
  expect(shiftAxis(11, 4)).toBe(14);
});

test('shift axis works!', () => {
  expect(shiftAxis(5, 4)).toBe(5);
});

test('shift axis works in reverse!', () => {
  expect(shiftAxis(14, 4)).toBe(11);
});

test('shift axis works in reverse!', () => {
  expect(shiftAxis(5, 4)).toBe(5);
});

test('ship gives proper array for piece on x axis', () => {
  expect(giveShipCoords(10, 1, 5, 0)).toEqual([1, 2, 3, 4, 5]);
});

test('ship gives proper array for piece on y axis', () => {
  expect(giveShipCoords(10, 1, 3, 1)).toEqual([1, 11, 21]);
});

test('recognizes when a piece doesnt fit in x axis', () => {
  expect(giveShipCoords(10, 1, 15, 0)).toEqual(null);
});

test('recognizes when a piece doesnt fit in y axis', () => {
  expect(giveShipCoords(10, 5, 20, 1)).toEqual(null);
});
