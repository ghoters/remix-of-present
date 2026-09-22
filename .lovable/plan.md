# Plan: poprawiona mechanika odznaczania w konfiguratorze + dopracowanie odcieni POLECAM

## Cel

Strona Oferty zachowuje obecną mechanikę zaznaczania i kolorystykę POLECAM (fioletowy dla aktualnego i wypełnionych kroków, szary dla następnego, blade dla dalszych), ale zmienia się zasada odznaczania:

**Dziś:** kliknięcie już wybranej opcji w kroku 2 kasuje kroki 2, 3, 4 i 5 naraz.
**Docelowo:** odznaczyć kliknięciem można tylko **najgłębiej wypełniony krok**. Gdy wypełnione są kroki 1–4, odznaczyć można wyłącznie krok 4; po jego odznaczeniu — krok 3, itd.

## Zmiany w mechanice (src/routes/oferta.tsx)

1. **Odznaczanie tylko ostatniego kroku** — kliknięcie w zaznaczoną kartę w krokach Rozmiar, Wykończenie, Podstawka, Opakowanie:
   - jeśli to najgłębiej wypełniony krok → odznacza go (jak dziś, z wyczyszczeniem ewentualnych późniejszych);
   - jeśli to wcześniejszy krok → kliknięcie w zaznaczoną kartę nic nie robi.
2. **Zmiana wyboru bez zmian** — kliknięcie innej, niezaznaczonej opcji w dowolnym kroku nadal przełącza wybór w tym kroku (obecna mechanika zachowana, późniejsze kroki nie są kasowane).
3. **Podsumowanie (prawa kolumna)** — bez zmian: przycisk X do usunięcia jest już pokazywany tylko przy najgłębiej wypełnionym kroku, więc będzie spójny z nową mechaniką.
4. **POLECAM przy odznaczaniu** — pasek POLECAM przelicza się dokładnie tak samo jak przy zaznaczaniu: po odznaczeniu kroku poprzedni aktualny krok ma fioletowy pasek, następny szary, kolejne blade. Mechanika kolorów pozostaje nietknięta logicznie.

## Dopracowanie odcieni POLECAM

Bez zmiany logiki (fiolet / szary / blady szary) — tylko lepsze dobranie odcieni szarości, żeby różnica między „następnym" a „bladym" stanem była wyraźniejsza i bardziej elegancka (np. wyraźniejszy kontrast ciemniejszego szarego dla następnego kroku i jaśniejszego, delikatniejszego dla dalszych).

## Weryfikacja

Po zmianach sprawdzę w podglądzie: zaznaczenie kroków 1–5, próbę odznaczenia kroku 2 przy wypełnionym 4 (nic się nie dzieje), odznaczenie kroku 4 (działa), zmianę wyboru w kroku 2 na inną opcję (późniejsze kroki zostają), oraz kolory POLECAM przy zaznaczaniu i odznaczaniu.

## Szczegóły techniczne

- Jedyny modyfikowany plik: `src/routes/oferta.tsx`.
- Nowy warunek w `onClick` kart: odznaczenie dozwolone tylko gdy kliknięty krok jest najgłębiej wypełniony (porównanie z `lastFilledStep`).
- Korekta klas odcieni w `recommendedTone` (jasnoszary / ciemniejszy szary) — tylko wartości klas Tailwind, bez zmiany logiki.
