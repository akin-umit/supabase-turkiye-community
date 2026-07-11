# Platform Capabilities

## Cloud ile Self-host Farki

Resmi self-hosted Supabase tek projeyi taklit eder. Studio coklu organization/proje kontrol duzlemi degildir.

| Ozellik | Self-host durumu |
|---|---|
| PostgreSQL, SQL Editor, RLS, extensions | Var |
| Auth, OAuth, MFA, hooks | Var; provider ve SMTP/SMS ayari bize ait |
| REST/GraphQL API | Var |
| Realtime | Var |
| Storage ve image transformation | Var |
| Edge Runtime ve Functions listesi | Var |
| Function custom secrets | Docker/platform environment variables ile |
| Studio | Var |
| Supavisor pooler | Var |
| Bir panelden yeni Supabase projeleri olusturma | Yok; her proje ayri stack |
| Managed PITR, otomatik backup, HA | Platform ozelligi degil; bizim sorumlulugumuz |
| Global multi-region Edge Functions | Yok; kurdugumuz bolgelerde calisir |
| Supabase Management API / branching | Yok |
| Cloud'a ozel analytics, ETL ve bazi entegrasyonlar | Sinirli veya yok |

## Supabase'den Neleri Alabiliriz?

Acik kaynak ve lisansi uygun parcalar kendi stackimize dahil edilebilir:

- Supabase Studio
- Auth (GoTrue)
- Realtime
- Storage API
- Edge Runtime
- postgres-meta
- Supavisor
- Supabase PostgreSQL image'i ve extensionlari
- Supabase JS/Flutter/diger resmi client kutuphaneleri
- Resmi Docker compose, migration ve utility scriptleri

Her alimda lisans, image surumu, env sozlesmesi, migration ve geri donus kontrol edilir. Upstream dosya dogrudan kopyalanip unutulmaz; kaynak commit ve yerel fark kaydedilir.

## Plugin Kelimesinin Uc Anlami

1. PostgreSQL extensions: Studio Database > Extensions veya SQL ile etkinlestirilebilir. Image icinde bulunmayan extension icin ozel Postgres image gerekir.
2. Studio integrations: Bazilari self-hostta calisir, bazilari Supabase Cloud servislerine baglidir. Ekranda gorunmesi calisacagi anlamina gelmez.
3. Uygulama/client kutuphaneleri: `supabase-js`, auth/storage/realtime clientlari self-host URL ve anahtarlarla calisir.

Bir Cloud ozelligini kopyalamadan once kaynak kodun acik olup olmadigi ve harici platform API'sine bagimliligi kontrol edilir. Kapali Cloud kontrol duzlemi kodu bu repoya dahil edilemez.

## Coklu Proje Modeli

Her musteri/proje icin ayri stack kullanilir. Her stackin ayri domaini, database volume'u, JWT/keys, backup plani ve kaynak limitleri olur. Tek Studio icinde Cloud benzeri proje olusturma bu dagitimin hedefi degildir.
