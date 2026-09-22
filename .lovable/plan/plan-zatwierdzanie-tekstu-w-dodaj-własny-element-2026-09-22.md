# Plan: Zatwierdzanie tekstu w „Dodaj własny element"

## Cel
W karcie „Dodaj własny element" (krok 1 konfiguratora) wpisywany tekst powinien zostać w polu po kliknięciu gdzie indziej — ale **tylko jeśli użytkownik go zatwierdzi** (Enter lub nowa strzałka po prawej). Bez zatwierdzenia pole znika i wraca przycisk „Dodaj własny element".

## Obecny stan (potwierdzone w kodzie)
- `src/routes/oferta.tsx`, karta `id: "custom"` (linia 51).
- Stany: `subjects` (lista zaznaczonych), `customText` (tekst). Brak pojęcia „zatwierdzony".
- `ChoiceCard` (linie 211–233): gdy `selected` → pokazuje `<input autoFocus>`, gdy `!selected` → pokazuje przycisk pill „Dodaj własny element".
- Klik karty przełącza `custom` w `subjects`. Brak obsługi „klik gdzie indziej zamyka pole".
- Prop `textInput` = `{ value, placeholder, onChange, buttonLabel }`.

## Zmiany

### 1. Nowy stan `customCommitted` (w `OfferPage`)
- `const [customCommitted, setCustomCommitted] = useState(false)`.
- Zatwierdzenie = `customCommitted === true`.

### 2. Rozszerzenie propa `textInput`
Dodaj pola:
- `committed: boolean`
- `onCommit: () => void` — zatwierdź tekst
- `onEdit: () => void` — wróć do edycji (gdy zatwierdzone + klik)

### 3. Nowy wygląd pola w `ChoiceCard` (linie 211–233)
Trzy stany zamiast dwóch:

```
!selected && !committed  →  przycisk pill „Dodaj własny element" (jak dziś)
selected && !committed   →  pole tekstowe + strzałka ► po prawej (zatwierdzanie)
committed               →  tekst zapisany w polu (nieedytowalny, np. disabled input z tekstem); klik = powrót do edycji
```

- Strzałka: ikona `ArrowRight` (już importowana) w przycisku po prawej wewnątrz pola, ten sam styl `border-primary/30 bg-primary/10`. `onMouseDown preventDefault` (żeby nie zgubić focusa przed klikiem).
- Enter w inpucie → `onCommit()` (gdy `value.trim()` niepuste).
- Klik strzałki → `onCommit()`.
- Klik zatwierdzonego pola → `onEdit()` (odblokowuje edycję, `autoFocus`).

### 4. Zachowanie „klik gdzie indziej" (blur pola)
- `onBlur` na inpucie: jeśli `!committed` → wyczyść tekst + usuń `custom` z `subjects` (wraca przycisk). Jeśli `committed` → nic nie rób (tekst zostaje).
- To obsługuje klik w innego boksa lub gdzieś na stronie.

### 5. Logika `onClick` karty custom
- `!committed` → przełącz jak dziś (zaznacz/odznacz + pokaż pole/przycisk).
- `committed` → klik = `onEdit()` (wejdź w tryb edycji), NIE odznaczuj.

### 6. Podsumowanie (prawa kolumna)
Linia 305: chip „Własny element" → zamienić etykietę na `customText` (zatwierdzony tekst), gdy `customCommitted && customText`. Pozostałe bez zmian.

## Weryfikacja
- Playwright: wpisz tekst → Enter → klik inny boks → tekst zostaje; wpisz tekst → bez Enter klik inny boks → wraca przycisk; klik zatwierdzonego pola → edycja.
- Sprawdzenie `build-errors.log` = „build OK".
