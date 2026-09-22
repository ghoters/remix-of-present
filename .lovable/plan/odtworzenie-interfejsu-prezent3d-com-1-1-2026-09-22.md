# Odtworzenie interfejsu prezent3d.com 1:1

## Zakres

Odtworzę aktualny stan prywatnego repozytorium `ghoters/remix-of-remix-of-prezent-20` bez zmiany stylistyki i treści. Projekt źródłowy zawiera dwie strony:

- `/` — pełna strona główna z nagłówkiem, banerem, kategoriami okazji, ofertą, realizacjami, procesem, opiniami, sekcją korzyści, wezwaniem do działania i stopką.
- `/oferta` — interaktywny, sześciostopniowy konfigurator figurki z podsumowaniem i dynamiczną ceną.

## Implementacja

- Przeniosę kompletny system wizualny źródła: font Manrope, kolory, obramowania, cienie, promienie, szerokości kontenerów i breakpointy.
- Przeniosę wszystkie 36 oryginalnych zasobów obrazu oraz faviconę, zachowując ich kadrowanie i pozycjonowanie.
- Odtworzę wspólny nagłówek, nawigację, przyciski i ikony Lucide w identycznych rozmiarach oraz stanach.
- Odtworzę stronę główną sekcja po sekcji z identyczną strukturą, tekstami, wymiarami, odstępami i zachowaniem na desktopie, tablecie i telefonie.
- Odtworzę pełne działanie konfiguratora: wybór osób i zwierząt, liczniki, blokowanie kolejnych kroków, rozmiar, wykończenie, podstawkę, opakowanie, przesyłanie zdjęć, cofanie wyborów i kalkulację ceny.
- Zachowam osobne metadane strony głównej i konfiguratora oraz oryginalne stany hover, focus, active i disabled.

## Weryfikacja

- Uruchomię obie strony w przeglądarce i sprawdzę brak błędów ładowania.
- Porównam widoki `/` i `/oferta` na szerokościach desktop, tablet i mobile.
- Przetestuję nawigację, wybory konfiguratora, liczniki, sekwencyjne odblokowywanie kroków, usuwanie wyborów, zmianę ceny i pole zdjęć.
- Poprawię zauważone różnice w układzie, typografii, obrazach i odstępach przed zakończeniem.

## Szczegóły techniczne

- Zachowuję obecną architekturę TanStack Start i Tailwind CSS 4, identyczną jak w projekcie źródłowym.
- Przenoszę tylko pliki potrzebne do wiernego działania i wyglądu; nie dodaję nowego projektu ani dodatkowych funkcji.
