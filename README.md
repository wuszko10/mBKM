# Projekt i implementacja systemu sprzedaży biletów komunikacji miejskiej

Autor: **Wiktor Uszko**

System zawiera aplikację mobilną do zakupu i kasowania biletów komunikacji miejskiej oraz aplikację webową przeznaczoną dla administratora systemu. Zakup biletu jest niezależny od jego kasowania, a sam proces walidacji obywa się na podstawie lokalizacji użytkownika - pasażer musi znajdować się w strefie przystanku. Dzięki temu można zakupić kilka biletów wcześniej i kasować je w dogodnym momencie. Za pomocą aplikacji webowej adminitrator zarządza taryfą przewozową - ustala ceny biletów i okres obowiązywania oferty oraz zarządza dostępem użytkowników. Serwer nie stanowi przedmiotu opracowania, służy jedynie celom obsługowym umożliwiającym sprawdzenie działania systemu.

# Uruchomienie projektu

Poniżej prezentowane są kroki niezbędne do uruchomienia systemu w trybie deweloperskim.

## Aplikacje użytkownika

W celu uruchomienia aplikacji mobilnej mBKM należy w terminalu wskazać lokalizację dla katalogu `mBKM`, następnie zainstalować niezbędne zależności z wykorzystaniem komendy `npm install`. Uruchomienie aplikacja odbywa się przez wpisanie komendy `npm start`, a uruchomienie testów za pomocą `npm test`. W pliku variables.tsx należy określić adres IP serwera.

W celu uruchomienia aplikacji webowej należy w terminalu wskazać lokalizację dla katalogu `web-app`, następnie zainstalować niezbędne zależności z wykorzystaniem komendy `npm install`. Uruchomienie aplikacja odbywa się przez wpisanie komendy `npm start`, a uruchomienie testów za pomocą `npm test`. W pliku .env należy określić adres IP serwera.

## Dokumentacja serwera API

W celu uruchomienia serwera należy w terminalu wskazać lokalizację dla katalogu `server`, następnie zainstalować niezbędne zależności z wykorzystaniem komendy `npm install`, a następnie uruchomić go za pomocą komendy `npm start`. Należy również poprawnie skonfigurować plik .env oraz .env.local, które zawierają dane dostępu do bazy danych, klucz JWT oraz PORT na którym działa serwer.

W celu uruchomienia dokumentacji serwera należy przejść do folderu `serwer` -> `doc` -> `web`. W folderze `web` należy uruchomić plik `documentation.html`. Dokumentacja uruchomi się w domyślnej przeglądarce. Są w niej prezentowane wszystkie dostępne endpointy wraz z przykładowymi strukturami danych.

