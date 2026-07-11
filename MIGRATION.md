# Migration Guide

Bu belge Supabase Cloud veya baska bir PostgreSQL kaynagindan self-host stackine kontrollu tasimayi tanimlar.

## Zorunlu Sira

1. Expand: hedef stacki bos ve uyumlu olarak kur.
2. Migrate: sema, veri, Auth, Storage ve Functions'i kopyala.
3. Switch: testler sonrasinda uygulama URL/key ayarlarini degistir.
4. Cleanup: rollback suresi bittikten sonra eski kaynagi kapat.

## Envanter

- PostgreSQL surumu ve extensionlar
- Sema, migrationlar, RLS, trigger ve functionlar
- Auth users ve identities
- Storage bucket metadata ve dosyalar
- Edge Functions kaynaklari ve secret adlari
- OAuth, SMTP, SMS ve webhook ayarlari
- Cron, database webhooks, Vault ve Realtime publicationlari

## Tasima

Native `pg_dump`/`pg_restore` tercih edilir. Kaynak erisimi bunu engelliyorsa kurtarma exportu kullanilabilir fakat native dump ile esdeger oldugu iddia edilmez. Auth ve Storage SQL tablolarinin yaninda dosya nesneleri de tasinmalidir.

## Kesinti ve Geri Donus

- Son delta icin yazma dondurma veya cift-yazma stratejisi secilir.
- Uygulama once test/staging ortaminda hedefe baglanir.
- Eski kaynak salt-okunur veya erisilebilir rollback kaynagi olarak tutulur.
- Veri sayilari, kritik sorgular, login, upload/download ve function callbackleri dogrulanmadan cleanup yapilmaz.
