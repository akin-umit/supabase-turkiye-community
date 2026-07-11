# Salt Okunur Operasyon Management API

[English](./MANAGEMENT-API.en.md)

Bu repository, tek bir self-hosted Supabase stackinin operasyon durumunu
sunmak icin ic agda calisan bir `management-api` servisi icerir. Bu servis
Supabase Cloud Platform API degildir; organization/proje olusturmaz, billing,
branching, HA veya PITR saglamaz.

## Guvenlik siniri

- Yalniz `/health` endpointi kimlik dogrulamasizdir.
- `/v1/overview`, `Authorization: Bearer <MANAGEMENT_API_TOKEN>` ister.
- Servisin host portu ve Docker socket mount'u yoktur.
- Root filesystem salt okunur, Linux capability'leri kapali ve
  `no-new-privileges` etkindir.
- Browser tokeni alamaz. Studio entegrasyonu yapildiginda istek server-side
  proxy uzerinden gitmelidir.
- Database parolasi, API key, secret, dosya yolu ve ham hata donmez.

## Overview sozlesmesi

`GET /v1/overview` su sanitize alanlari dondurur:

- cekirdek servislerin `healthy` veya `unavailable` durumu,
- gecerliyse deploy commit'i ve Management API surumu,
- operator tarafindan dogrulanmis son backup zamani,
- operator tarafindan uygulanmis son migration kimligi ve zamani.

Analytics ve Vector opsiyoneldir. Yalniz ilgili logs servisleri calisiyorsa
`MANAGEMENT_ENABLE_ANALYTICS=true` ve `MANAGEMENT_ENABLE_VECTOR=true` yap.

Backup veya migration islemi basariyla kendi dogrulamasini tamamladiktan sonra:

```sh
sh utils/publish-management-status.sh backup-verified
sh utils/publish-management-status.sh migration-applied 20260101000000_example
```

Bu komutlar backup, checksum veya migration dogrulamasi yapmaz; yalniz daha once
dogrulanmis sonucu atomik ve sanitize JSON olarak yayinlar. Studio ana sayfa
kartlari henuz bu API'ye bagli degildir.
