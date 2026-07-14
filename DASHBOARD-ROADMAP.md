# Self-host Dashboard Yol Haritasi

[English](./DASHBOARD-ROADMAP.en.md)

Self-host panel, Supabase'in gercek acik kaynak Studio uygulamasidir. Cloud
dashboard ile ana fark tasarim degil, veri kaynagidir: Status, Compute, GitHub,
Last Migration, Last Backup, request grafikleri, altyapi haritasi, proje olusturma
ve billing kartlari Supabase Platform control plane API'lerinden beslenir. Bu
API'ler acik kaynak Docker stackinin parcasi degildir.

## Bugun calisanlar

- Table ve SQL Editor
- Auth kullanicilari ve ayarlari
- Storage bucket/obje islemleri
- Realtime inspector
- Security Advisor
- API keys ve JWT/JWKS
- Edge Functions listeleme/cagirma
- Logflare/Vector etkinse servis loglari

## Kendi yonetim API'mizle eklenebilir

Ilk salt okunur backend asamasi repository'de `management-api` servisi olarak
bulunur. Servis sagligi, sanitize deploy commit'i ve operator tarafindan
dogrulanmis backup/migration durumlarini saglar. Studio ana sayfa kartlari henuz
bu API'ye bagli degildir; panel entegrasyonu ayri bir asamadir.

- servis sagligi ve restart sayisi
- deploy commit/image surumleri
- son migration ve dogrulanmis backup zamani
- request, error ve success-rate metrikleri
- database boyutu, connection ve Storage kullanimi
- Function secret CRUD ve kontrollu restart
- backup olusturma ve restore tatbikati gecmisi
- Functions deploy/restart/log islemleri

## Ayri control-plane urunu gerektirir

- tek panelden yeni izole proje/stack olusturma
- proje basina domain, secret, volume ve kaynak kotasi
- organization/team ve proje degistirici
- preview branch ortamlari
- managed compute, HA, PITR ve billing

Studio dosyalarinda Cloud sayfasinin bulunmasi yeterli degildir. Upstream kodda
bu sorgular `IS_PLATFORM` ile sinirlanir ve acik kaynak stackte bulunmayan
Platform API'lerini cagirir.

## Gelistirme sirasi

1. **Operasyon dashboardu:** health, commit, migration, backup ve Logflare
   metrik kartlari.
2. **Panel islemleri:** Functions secrets/deploy/log ve backup/restore jobs.
3. **Proje fabrikasi:** Coolify dahil farkli deployment adapterlariyla izole
   stack olusturma.
4. **Gelismis platform:** teams, preview environments, HA/PITR ve kota/billing.

Her kart icin backend kaynagi, yetki siniri, loading/error durumu, test, audit
kaydi ve rollback davranisi tanimlanmadan ozellik tamamlandi sayilmaz.

Public plana eklenen her dashboard isi once durum etiketi alir: plan, private
validation, public release veya upstream candidate. Private test sunucusunda
gecen bir is, public community'de ancak sanitize PR, changelog baglantisi ve
gerekli forum/discussion notu hazirlandiktan sonra yayinlanir. Kural:
[Community Publication Flow](./COMMUNITY-PUBLICATION-FLOW.md).

## Guncel Teslim Durumu

- Tamamlandi: Operations, Usage, Observability Lite, Dashboard Preferences ve
  kalici Function Secrets CRUD.
- Yalniz kanit gosterir: backup ve migration durum kartlari.
- Kalan: backup/restore job calistirma, migration uygulama ve ayri coklu proje
  control plane.

Yeni Studio paketlerinde once korunacak yuzeyler: Function Secrets, API Keys,
JWT/JWKS, Operations, Usage, Observability Lite, Dashboard Preferences, Connect,
status hover ve copy menu. Bu yuzeylerden biri kaybolursa yeni paket release
kabul edilmez; once regresyon giderilir.

## Kabul Edilmeyen veya Karistirilmamasi Gerekenler

- Public route `503` donduruyorsa dashboard veya API key testi basarili
  sayilmaz. Once Coolify/Kong backend sagligi duzeltilir.
- Gate 4 yazmali smoke testleri, Gate 3 read-only route stabil olmadan
  calistirilmaz.
- Cloud ekraninda gorunen bir kartin Studio kaynak kodunda bulunmasi, self-host
  backendinin hazir oldugu anlamina gelmez.
- Backup ve migration kartlari su an operator kaniti gosterir; panel henuz
  backup olusturmaz, restore calistirmaz veya migration uygulamaz.
- Bir route'un acilmasi dashboard parity sayilmaz. Hover, dropdown, filtre,
  siralama, create butonlari, nested tablar, hata/bos durumlari ve uzun
  sayfalarda scroll kapsami kontrol edilmeden sayfa tamamlandi denmez.

## Operator Icin Kisa Durum

| Alan | Durum | Not |
|---|---|---|
| Self-host runtime temeli | Kismi tamam | Compose, key/JWKS, Function Secrets, Logflare/Vector ve management API temeli var. |
| Coolify kurulumu | Kismi tamam | Domain/backend port ve host-port tuzaklari belgelendi; canli deploy her ortamda ayrica smoke ister. |
| Dashboard Cloud benzerligi | Kismi | Bazi kartlar var, Cloud compute/topology/backup/PITR/proje fabrikasi yok. |
| Coklu proje platformu | Baslamadi | Ayri orchestrator/control-plane urunu gerekir. |

Tahmini ilerleme: self-host runtime temeli yuzde 60-65, Coolify dokumantasyonu
yuzde 70, Cloud benzeri dashboard yuzde 25-30, coklu proje control plane yuzde
0-10 seviyesindedir. Bu oranlar release garantisi degil, kapsam okumasidir.

## 2026-07-12 Durum Notu

Topluluk Studio imaji artik self-host icin temel panel bosluklarini kapatan ilk
paketi icerir: servis sagligi, deploy commit bilgisi, Logflare tabanli usage
kartlari, Observability Lite, Dashboard Preferences ve kalici Function Secrets.

Bu asama Supabase Cloud'un birebir kopyasi degildir. Cloud ekranlarindaki
compute, request basari orani, altyapi haritasi, backup, migration, organization,
team, proje olusturma ve billing verileri Supabase Platform control plane
API'lerinden gelir. Self-host dagitimda bu veriler ancak kendi management API ve
job runner katmanimizla uretilebilir.

Siradaki kucuk paketler:

1. Logflare verisinden API Gateway, Edge Functions, Postgres, Storage, Realtime
   ve Auth icin daha zengin usage kartlari.
2. Management API uzerinden sanitize altyapi ozeti ve connection bilgileri.
3. Backup ve migration kartlarinda sadece "var/yok" yerine operator kaniti ve
   runbook baglantisi.
4. Panelden backup/restore/migration calistirmadan once yetkili, idempotent ve
   audit loglu job runner tasarimi.

Bu siralama korunacak: once read-only kanit, sonra kontrollu operasyon, en son
coklu proje control plane.

## 2026-07-14 Durum Notu

Coolify/Kong calismalarinda iki onemli ders netlesti:

1. Kong public gateway, Studio health sonucuna baglanmamalidir. Studio gecici
   olarak sagliksiz olsa bile gateway public route'lari tasiyabilmelidir.
2. Coolify domain routing ile host port yayini ayni sey degildir. Kullanici
   `https://supabase.example.com` adresini acar; Coolify proxy backend olarak
   container icindeki `kong:8000` portuna gider.

Bu not, public community icin geneldir. Her production ortaminda son karar
container health, deploy commit, Compose config ve read-only smoke kanitiyla
verilir.

## 2026-07-14 Etkilesim Denetimi

Resmi Supabase dashboard davranislari self-host planina su ilave ayrimlari
getirdi:

- Project Home icin siradaki paket, genis route kopyalama degil; compact
  status, copy menu, self-host operasyon kartlari, usage kartlari ve
  backup/migration kanit kartlaridir.
- Observability ve Logs, yalniz sayfa listesi degil; zaman araligi secicileri,
  filtreler, metrik kartlari, bos/hata durumlari ve Logflare/Vector kaynak
  durumlariyla birlikte degerlendirilir.
- Integrations icin Data API, Vault, Cron ve Database Webhooks self-hostta
  extension/servis durumuyla gosterilebilir. Cloud-only wrapper ve entegrasyonlar
  ancak acik kaynak karsiligi kuruldugunda aktif sayilir.
- Settings icin API Keys, JWT/JWKS, Auth/SMTP, Storage ve Realtime gibi
  config-backed ayarlar aktif olabilir. Managed compute, PITR, billing,
  subscription, Cloud Log Drains ve hosted AI Assistant ise ayri operator
  backend olmadan aktif gosterilmez.

Siradaki uygulama sirasi: once read-only self-host kanit, sonra kontrollu panel
operasyonlari, en son ayri coklu proje control plane.

## Community Planlama ve Forum Yayini

Dashboard veya control-plane icin yeni bir paket acildiginda:

1. Kisa public plan `DASHBOARD-ROADMAP.md` ve gerekirse
   `PLATFORM-CAPABILITIES.md` icinde yazilir.
2. Private testte denenen kisimlar public belgede yalniz sanitize ve genellenmis
   sonuc olarak yer alir.
3. Forum veya GitHub Discussions duyurusu, ilgili changelog ve roadmap linkleri
   olmadan yayinlanmaz.
4. Yeni AI/operator devraldiginda once `AGENTS.md`,
   `COMMUNITY-PUBLICATION-FLOW.md`, bu roadmap ve `CHANGELOG.md` dosyalarini
   okur.
