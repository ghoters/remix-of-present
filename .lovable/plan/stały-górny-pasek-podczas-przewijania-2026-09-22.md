# Stały górny pasek podczas przewijania

## Zakres
- Ustawić nagłówek strony głównej jako przyklejony do górnej krawędzi ekranu podczas przewijania.
- Zachować jego obecną wysokość, kolory, obramowanie, układ i wygląd na komputerze oraz telefonie.
- Ujednolicić zachowanie z konfiguracją oferty, której nagłówek ma już ustawienie `sticky`.
- Skorygować ograniczenie przewijania na stronie głównej tak, aby nie blokowało przyklejenia nagłówka, bez wywołania poziomego przewijania.

## Sprawdzenie
- Zweryfikować przewijanie w dół i w górę na stronie głównej oraz stronie oferty.
- Sprawdzić desktop i telefon: pasek ma być stale widoczny, ponad treścią, bez skoków i nachodzenia elementów.

## Szczegóły techniczne
- Zastosować `position: sticky`, `top: 0` i istniejącą wysoką warstwę nagłówka.
- Zastąpić problematyczne ograniczenie `overflow` wariantem blokującym wyłącznie poziome przepełnienie bez tworzenia osobnego obszaru przewijania.
