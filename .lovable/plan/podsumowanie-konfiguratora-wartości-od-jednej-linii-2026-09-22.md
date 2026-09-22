# Podsumowanie konfiguratora — wartości od jednej linii

## Cel
Wybrane opcje w wierszach podsumowania mają zaczynać się na tej samej pozycji (wspólna lewa krawędź środkowej kolumny), zamiast być wyśrodkowane — ale nadal nie mogą wchodzić pod cenę po prawej.

## Zmiana
Plik: `src/routes/oferta.tsx` (komponent `SummaryRow`, ~linia 589)

- Środkowa kolumna wartości: `justify-center` → `justify-start`, `text-center` → `text-left`.
- Usunąć wyrównanie chipów do środka (`justify-center`) — chipy układają się od lewej wspólnej krawędzi.
- Zachować `min-w-0 flex-1` na środkowej kolumnie oraz `truncate`/`max-w-full min-w-0` na wartościach i chipach — dzięki temu przy długim tekście wartość kończy się „…" i nigdy nie zasłania ceny po prawej.
- Etykieta po lewej i cena po prawej pozostają bez zmian (`shrink-0`, `whitespace-nowrap`).

## Weryfikacja
Playwright na `/oferta`: wszystkie wartości w wierszach zaczynają się na tej samej linii pionowej, długi tekst obcina się wielokropkiem przed ceną. Build OK.
