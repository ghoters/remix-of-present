# Podświetlanie kafelków przy najechaniu — tylko w aktywnym miejscu konfiguratora

## Cel

Efekt przyciemnienia kafelka po najechaniu myszką (dziś widoczny tylko w punkcie 4 „Podstawka") ma działać we wszystkich punktach, ale wyłącznie tam, gdzie użytkownik aktualnie się znajduje.

## Zasada działania

- Efekt najeżdżania jest aktywny w punkcie, który jest właśnie do wypełnienia.
- Po wybraniu opcji w tym punkcie efekt w nim pozostaje, a dodatkowo włącza się w następnym punkcie.
- Gdy użytkownik wybierze opcję w tym następnym punkcie, w poprzednim efekt znika — aktywne pozostają zawsze co najwyżej dwa sąsiednie punkty: ostatnio wypełniony i kolejny.
- Punkty jeszcze niedostępne (wyszarzone) nie reagują na najechanie, tak jak dziś.
- Kafelek już zaznaczony (fioletowa obwódka) też reaguje na najechanie, dopóki jego punkt jest aktywny.

Przykład: po wyborze rozmiaru (punkt 2) efekt działa w punktach 2 i 3. Po wyborze wykończenia (punkt 3) — w punktach 3 i 4, a w punkcie 2 już nie.

## Szczegóły techniczne

Plik: `src/routes/oferta.tsx`

1. Wyliczyć w `OfferPage` flagę `hoverSteps` na bazie istniejącego `lastFilledStep` i `readySteps`: kafelki punktu są „hoverable", gdy punkt jest dostępny i jego numer odpowiada ostatnio wypełnionemu krokowi albo następnemu po nim (dla punktu 1 – gdy nic dalej nie wybrano poza krokiem 1).
2. Dodać do `ChoiceCard` i `CompactChoice` nowy prop `hoverable: boolean` i przekazać go we wszystkich sekcjach (punkty 1–5).
3. W `ChoiceCard` (obecnie zwykły `div`, bez hoveru) dodać warunkowo klasy przyciemnienia odpowiadające efektowi z punktu 4 (`hover:bg-accent hover:text-accent-foreground`), razem z istniejącym `transition-colors`.
4. W `CompactChoice` (komponent `Button variant="outline"`, który ma hover domyślnie) wyłączyć go, gdy `hoverable` jest fałszywe (`hover:bg-transparent hover:text-inherit`), aby mechanika była spójna.
5. Nie zmieniać logiki zaznaczania/odznaczania ani kolorystyki plakietki POLECAM.

## Weryfikacja

Przejście konfiguratorem w podglądzie i sprawdzenie, że efekt najechania pojawia się tylko w dwóch aktywnych punktach i przesuwa się wraz z postępem.
