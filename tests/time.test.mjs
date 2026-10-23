import test from 'node:test';
import assert from 'node:assert/strict';
import { getTokState } from '../time.js';
test('Friday: one second left, then tok at exactly 16:30 Amsterdam', () => {
  const before = getTokState(new Date('2026-10-23T14:29:59Z'));
  assert.equal(before.seconds, 1); assert.equal(before.friday, true); assert.equal(before.party, false);
  const at = getTokState(new Date('2026-10-23T14:30:00Z'));
  assert.equal(at.party, true); assert.equal(at.seconds, 0);
});
test('Party lasts until local midnight, Saturday counts to next Friday', () => {
  assert.equal(getTokState(new Date('2026-10-23T21:59:59Z')).party, true);
  const saturday = getTokState(new Date('2026-10-23T22:00:00Z'));
  assert.equal(saturday.party, false); assert.equal(saturday.friday, false);
  assert.equal(new Date(saturday.target).toISOString(), '2026-10-30T15:30:00.000Z');
});
test('Countdown crosses autumn DST and targets 16:30 winter time', () => {
  const state = getTokState(new Date('2026-10-24T14:30:00Z'));
  assert.equal(state.seconds, 6 * 86400 + 3600);
});
test('Countdown crosses spring DST and targets 16:30 summer time', () => {
  const state = getTokState(new Date('2026-03-28T15:30:00Z'));
  assert.equal(new Date(state.target).toISOString(), '2026-04-03T14:30:00.000Z');
  assert.equal(state.seconds, 6 * 86400 - 3600);
});
test('Monday countdown and winter Friday work regardless of device timezone', () => {
  const monday = getTokState(new Date('2026-11-02T08:00:00Z'));
  assert.equal(monday.days, 4); assert.equal(monday.hours, 7); assert.equal(monday.minutes, 30);
  assert.equal(getTokState(new Date('2026-11-06T15:30:00Z')).party, true);
});
