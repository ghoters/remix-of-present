# Subtelny efekt po najechaniu w górnym menu

## Zakres
- Dodać do nieaktywnych linków menu szybką, płynną zmianę koloru na delikatny odcień koloru głównego.
- Zastosować efekt konsekwentnie na stronie głównej i w konfiguratorze oferty.
- Zachować aktywną pozycję menu z obecnym fioletowym tekstem i dolną linią.
- Nie zmieniać wysokości paska, rozmieszczenia, odstępów, fontów, logo, ikon ani przycisku „Stwórz swoją figurkę”.

## Interakcja
- Przejście koloru potrwa około 200 ms.
- Ten sam efekt będzie dostępny przy obsłudze klawiaturą przez stan focus-visible.
- Efekt nie będzie przesuwał tekstu ani pozostałych elementów.

## Weryfikacja
- Sprawdzić reakcję wszystkich linków menu na obu stronach.
- Potwierdzić brak zmian układu przed najechaniem, w jego trakcie i po nim.
