import test from 'ava';
import delay from 'delay';
import m from './';

test('returns the first fulfilled value', async t => {
	const f = [
		Promise.reject(1),
		Promise.resolve(2),
		Promise.reject(3),
		Promise.resolve(4)
	];
	t.deepEqual(await m(f), 2);
});

test('returns the first fulfilled value #2', async t => {
	const f = [
		Promise.resolve(1).then(delay(100)),
		Promise.resolve(2).then(delay(10)),
		Promise.resolve(3).then(delay(50))
	];
	t.deepEqual(await m(f), 2);
});

test('rejects on empty iterable', async t => {
	await t.throws(m([]), RangeError);
});
