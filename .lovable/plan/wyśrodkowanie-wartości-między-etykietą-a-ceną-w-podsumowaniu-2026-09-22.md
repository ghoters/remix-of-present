# Wyśrodkowanie wartości między etykietą a ceną w podsumowaniu konfiguratora

## Problem

W wierszach podsumowania (np. „Rozmiar — 20cm — + 60 zł") wartość jest wyśrodkowana w kolumnie o stałych proporcjach siatki, a nie w rzeczywistej przestrzeni między końcem tekstu etykiety a początkiem tekstu ceny. Przez to „20cm" nie jest dokładnie w połowie odległości między „r" (koniec „Rozmiar") a „+" (początek „+ 60 zł").

## Rozwiązanie

Zmiana układu wiersza `SummaryRow` (w `src/routes/oferta.tsx`) z siatki CSS na flex:

- Ikona i cena mają szerokość zgodną z własną treścią (`shrink-0`) — nie rosną.
- Etykieta (np. „Rozmiar") również ma szerokość swojej treści.
- Kolumna środkowa dostaje `flex-1` — zajmuje dokładnie przestrzeń między końcem etykiety a początkiem ceny.
- Wartość (chip z „×", zwykły tekst, lista osób) jest wyśrodkowana w tej kolumnie (`justify-center`), więc jest dokładnie w połowie odległości między etykietą a ceną — dla każdego wiersza, niezależnie od długości tekstów.

Dla wiersza „Liczba osób / zwierząt" chipy układają się w linie wyśrodkowane (`flex flex-wrap justify-center`), każdy chip też jest symetryczny względem tej osi.

## Pliki

- `src/routes/oferta.tsx` — tylko komponent `SummaryRow` (układ wiersza i środkowej kolumny).
