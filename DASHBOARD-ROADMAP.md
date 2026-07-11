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
