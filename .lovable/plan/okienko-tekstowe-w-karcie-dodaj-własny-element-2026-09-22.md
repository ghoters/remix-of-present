# Okienko tekstowe w karcie „Dodaj własny element”

## Cel
W karcie „Dodaj własny element” w konfiguratorze (/oferta) dodać pole tekstowe do wpisania własnego opisu. Tytuł karty ma być dwuliniowy, a cena przesunięta do góry, nad nowe pole.

## Zmiany

1. **Tytuł karty**
   - W `subjectOptions` zmienić tytuł opcji `custom` z `Dodaj własny element` na `Dodaj własny\nelement`.
   - Dostosować wyświetlanie tytułu w `ChoiceCard`, aby honorował nową linię (np. przez `white-space: pre-line` lub podział na dwa `span`).

2. **Nowe pole tekstowe w `ChoiceCard`**
   - Rozszerzyć props `ChoiceCard` o opcjonalne pola:
     - `textInput?: { value: string; placeholder: string; onChange: (value: string) => void; buttonLabel: string }`
     - `textInputOpen?: boolean`
     - `onToggleTextInput?: () => void`
   - Gdy karta jest zaznaczona i `textInputOpen` jest `false`, na dole karty (pod ceną) pokazać przycisk z ikoną plus i etykietą „Dodaj własny element” — styl zbliżony do istniejących liczników (prostokąt z obramowaniem, małe litery).
   - Po kliknięciu przycisku zamienić go w jednowierszowe pole `<input type="text">` z tym samym obramowaniem.
   - Wpisywany tekst zapisywać w stanie formularza, bez wpływu na podsumowanie (zgodnie z decyzją użytkownika).
   - Kliknięcie w przycisk i input musi używać `stopPropagation`, aby nie przełączało zaznaczenia samej karty.

3. **Cena „idzie do góry”**
   - Wewnątrz `ChoiceCard` wyświetlić etykietę ceny (`priceLabel`) nad przyciskiem/polem tekstowym, a nie pod nim.
   - Zmienić kolejność elementów wewnątrz opisu karty: ikona + tytuł, opis, cena, przycisk/pole tekstowe.

4. **Stan w `OfferPage`**
   - Dodać `const [customText, setCustomText] = useState("");`.
   - Dodać `const [customInputOpen, setCustomInputOpen] = useState(false);`.
   - Przekazać te stany i handlery do karty `custom` w mapowaniu `subjectOptions`.

## Weryfikacja

- Wyświetlić `/oferta` i upewnić się, że tytuł karty „Dodaj własny” + „element” jest czytelny.
- Sprawdzić, czy cena „+ 40 zł" znajduje się bezpośrednio pod opisem, a nad przyciskiem/polem.
- Kliknąć „Dodaj własny element” — powinno pojawić się pole tekstowe.
- Wpisać tekst i kliknąć poza kartę — tekst musi pozostać zapisany, a zaznaczenie karty nie może się zmienić podczas edycji.
- Sprawdzić responsywność na desktopie i tablecie.

## Szczegóły techniczne

- Edytowany plik: `src/routes/oferta.tsx`.
- Bez zmian w backendzie ani w innych stronach.
- Zachowujemy istniejący design system, kolory, obramowania i fonty.
