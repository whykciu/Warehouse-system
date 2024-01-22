# Warehouse-system "Abar"
Abar to prosta aplikacja web'owa ułatwiająca zarządzanie hurtownią z głównym nastawieniem na hurtownię z napojami (lecz jest opcja rozszerzenia na inne kategorie). Aplikacja umożliwia zarządzanie klientami i ich zamówieniami, dostawami wykonywanymi przez pracowników hurtownii oraz zleceniami wydawanymi przez pracowników biura.

# Technologie
- Backend: Django
- Frontend: Angular, Typescript, HTML, CSS
- Baza Danych: SQLite

# Użytkownicy
W aplikacji znajduję się mechanizm logowania i rejestracji (tylko Klienta). Ostatecznie wyróżniamy 5 rodzaje użytkowników:
- Administrator
- Klient
- Pracownik hurtownii
- Pracownik biura
- Użytkownik niezalogowany(gość)

# Administrator
Konto administratora to konto które jest w stanie edytować każdy model znajdujący się w aplikacji. Konto to jest tworzone i dostępne do zalogowania się tylko na stronie administratorskiej Django, gdyż konto to wykorzystuje właśnie technologie i zalety Django. Tylko administrator jest w stanie dodawać nowe produkty oraz użytkowników typu Pracownika biura i hurtownii.

# Klient
Jest to jedyny typ konta które może stworzyć każdy, korzystając z rejestracji na stronie. Konto to ma jedynie możliwość zamówienia produktów na swój podany przy rejestracji adres i podglądnięcia historii swoich zamówienień oraz stanu dostarczenia.

# Pracownik biura
Typ konta tworzonego tylko przez administratora i odpowiadającego za przeglądanie zamówień złożonych przez klientów, i przydzielanie ich do dostaw dla odpowiednich pracowników. Pracownik biura może również nadać jedno z ustalonych zadań hurtownii lub stworzyć własne zadanie, gdyby nie było możliwe nadanie go wcześniejszymi sposobami.

# Pracownik hurtownii
To konto które odpowiada za wykonywanie zleconych mu zadań. Użytkownik ten może przeglądać wszystkie zadania jakie kiedykolwiek zostały mu nadane. Dzielimy je na trzy grupy:
- Nowe
- W trakcie
- Zakończone
    
Pracownik hurtownii może rozpocząć nowe zadanie, lub zakończyć już rozpoczęte. Przy wykonywaniu tych operacji, zadania przechodzą do odpowiednich kategorii w zależności od stanu ukończenia. Dodatkowo przy zadaniu "przesyłka" wszystkie zamówienia które znajdowały się w danej przesyłce zostaną zaktualizowane a właściwie ich stan ukończenia, dzięki temu Klient zamawiający dane przesyłki będze w stanie dokładniej wiedzieć co się dzieje z jego zamówieniem.

# Gość
Nie jest to konto posiadający jakikolwiek obiekt w systemie a jest to poprostu użytkownik niezalogowany, którego jedyną opcją przeglądania jest główna strona i możliwość rejestracji.

# Wykorzystane wzorce
Zadania różnych rodzanjów dziedziczą po jednym wspólnym modelu Task, dlatego przy tworzeniu zadania został wykorzystany wzorzec Factory Method gdzie tworzę odpowiednich Creator'ów dla odpowiednich typów zadań. Creator tworzy odpowiednie zadanie, ustawia jego parametry i zapisuje do bazy danych. W architekturze Django używany jest wzorzec MVT (Model - View - Template) gdzie ze strony internetowej (Template) wywołujemy odpowiednie metody REST na odpowiednie endpointy, które wywołują metody w views (View) czyli metody komunikujące się z bazą danych za pomocą modeli obietków (Model) klas w Django.

# Możliwości rozwoju aplikacji
- Dodanie klasy magazynu przechowującego ilości danych obiektów w prawdziwym obiekcie
- Stworzenie interaktywnej listy produktów (możliwych do zaznaczenia/odznaczenia) w zamówieniu dla pracownika hurtownii w celu zaznaczania postępów wypakowywania produktów z pojazdu
- Tworzenie na mapach trasy calej przesyłki oraz kolejności punktów 
- Stworzenie skalowalnej na urządzenia mobilne aplikacji internetowej, lub osobnej aplikacji na telefon (umożliwiało by to łatwą możliwość wykorzystania dwóch wcześniejszych opcji)