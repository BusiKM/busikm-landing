import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { PRZYKLAD, PUSTE, dataNbp, format, liczba, paliwoZKm, policz, zl } from './kalkulator.ts';

describe('liczba', () => {
  it('przyjmuje przecinek i kropkę', () => {
    assert.equal(liczba('4,24'), 4.24);
    assert.equal(liczba('4.24'), 4.24);
  });
  it('pomija spacje tysięcy, także niełamliwe', () => {
    assert.equal(liczba('1 234,5'), 1234.5);
    assert.equal(liczba('1 234,50'), 1234.5);
  });
  it('rozpoznaje separator dziesiętny przy obu znakach', () => {
    assert.equal(liczba('1.234,5'), 1234.5);
    assert.equal(liczba('1,234.5'), 1234.5);
  });
  it('puste i niezrozumiałe pole to 0', () => {
    assert.equal(liczba(''), 0);
    assert.equal(liczba('   '), 0);
    assert.equal(liczba('abc'), 0);
    assert.equal(liczba('1,2,3'), 0);
  });
});

describe('policz', () => {
  it('przelicza fracht w euro po kursie', () => {
    const w = policz({ ...PUSTE, fracht: '100', waluta: 'EUR', kurs: '4,3' });
    assert.equal(w.przychod, 430);
  });
  it('fracht w złotych nie używa kursu', () => {
    const w = policz({ ...PUSTE, fracht: '2500', waluta: 'PLN', kurs: '4,3' });
    assert.equal(w.przychod, 2500);
  });
  it('liczy paliwo z kilometrów, spalania i ceny', () => {
    assert.equal(paliwoZKm(500, 10, 6.5), 325);
    const w = policz({ ...PUSTE, trybPaliwa: 'km', km: '500', spalanie: '10', cenaLitra: '6,50', paliwo: '999' });
    assert.equal(w.paliwo, 325);
    assert.equal(w.koszty, 325);
  });
  it('w trybie kwoty bierze wpisaną kwotę paliwa', () => {
    const w = policz({ ...PUSTE, trybPaliwa: 'kwota', paliwo: '430', km: '500', spalanie: '10', cenaLitra: '6' });
    assert.equal(w.paliwo, 430);
  });
  it('sumuje koszty, puste pola liczą się jako 0', () => {
    const w = policz({ ...PUSTE, paliwo: '430', oplaty: '140', diety: '', inne: '20,5' });
    assert.equal(w.koszty, 590.5);
  });
  it('bez kilometrów nie dzieli przez zero', () => {
    const w = policz({ ...PUSTE, fracht: '1000', waluta: 'PLN', paliwo: '100' });
    assert.equal(w.zaKm, null);
  });
  it('ujemny wynik zostaje ujemny', () => {
    const w = policz({ ...PUSTE, fracht: '100', waluta: 'PLN', paliwo: '250', km: '100' });
    assert.equal(w.zostaje, -150);
    assert.equal(w.zaKm, -1.5);
    assert.equal(zl(w.zostaje), '-150,00 zł');
  });
  it('pełny wynik wymaga frachtu i kosztu', () => {
    assert.equal(policz({ ...PUSTE, fracht: '590' }).pelny, false);
    assert.equal(policz({ ...PUSTE, paliwo: '430' }).pelny, false);
    assert.equal(policz({ ...PUSTE, fracht: '590', diety: '120' }).pelny, true);
  });
  it('przykład Wiedeń - Kalisz z rolki przy kursie 4,24', () => {
    const w = policz({ ...PRZYKLAD, kurs: '4,24' });
    assert.equal(zl(w.przychod), '2 501,60 zł');
    assert.equal(zl(w.koszty), '690,00 zł');
    assert.equal(zl(w.zostaje), '1 811,60 zł');
    assert.equal(w.zaKm === null ? null : format(w.zaKm), '3,62');
    assert.equal(w.pelny, true);
  });
});

describe('format', () => {
  it('grupuje tysiące niełamliwą spacją i daje przecinek', () => {
    assert.equal(format(1234567.891), '1 234 567,89');
    assert.equal(format(4.2399, 4), '4,2399');
  });
  it('nie pokazuje „-0,00”', () => {
    assert.equal(format(-0.001), '0,00');
  });
  it('datę NBP zapisuje po polsku', () => {
    assert.equal(dataNbp('2026-11-27'), '27.11.2026');
  });
});
