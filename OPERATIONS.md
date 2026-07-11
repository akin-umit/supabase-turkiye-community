# Operations Runbook

## Gunluk Saglik Kontrolu

```bash
docker compose ps
docker compose logs --tail=100 kong auth rest realtime storage functions supavisor
curl -fsS https://supabase.example.com/auth/v1/health
curl -fsS https://supabase.example.com/functions/v1/hello
```

Anahtar isteyen endpointler `apikey` header'i ile test edilir. Secret degerleri terminal ciktisina veya ticket'a yazilmaz.

## Baslangic Kabul Testleri

- Studio `/project/default` acilir.
- Database, Authentication, Storage ve Realtime ekranlari yuklenir.
- Edge Functions listesinde ornek fonksiyon gorunur.
- Edge Function Secrets ekrani varsayilan secret adlarini gosterir.
- Auth, REST ve Functions public endpointleri beklenen HTTP kodunu verir.
- Tum container restart sayilari sabit kalir.

## Yedekleme

Minimum production politikasi:

- Her gun `pg_dump` custom-format veritabani yedegi
- Storage dosyalarinin ayri yedegi
- Function kaynaklari ve migrationlar Git'te
- Secret/env yedegi sifreli secret manager'da
- En az bir yedek sunucu disinda
- Periyodik restore tatbikati

Ornek:

```bash
docker compose exec -T db pg_dump -U postgres -d postgres -Fc > backup.dump
tar -czf storage.tar.gz volumes/storage
```

Bu iki komut tek basina tam felaket kurtarma garantisi degildir. Restore testi zorunludur.

## Restore Sirasi

1. Yeni bos stack ve ayni uyumlu image surumleri kurulur.
2. Secret/JWT anahtarlari geri yuklenir.
3. Database restore edilir.
4. Storage dosyalari geri yuklenir.
5. Functions kaynaklari geri yuklenir.
6. Servisler yeniden olusturulur.
7. Kabul testleri calistirilir.
8. DNS ancak testler basariliysa degistirilir.

## Upgrade

1. Database, Storage ve secret yedegi al.
2. Upstream `CHANGELOG.md` ve `versions.md` farklarini incele.
3. Compose degisikligini ayri branch/committe yap.
4. Test stackinde deploy et.
5. Smoke ve restore testlerini calistir.
6. Production deploy et ve restart sayilarini izle.

## Sik Arizalar

| Belirti | Muhtemel neden | Kontrol |
|---|---|---|
| Kong restart | Bos veya gecersiz deklaratif config env'i | Kong logu, timeout/buffering envleri |
| `name resolution failed` | Eksik Docker network aliasi | `getent hosts` ve compose aliases |
| Auth restart | Bos boolean env veya DB rol sifresi | Auth logu, init SQL durumu |
| Supavisor restart | Bos DB host veya eksik pooler config | `POSTGRES_HOSTNAME`, pooler mountu |
| Functions paneli bos | Studio functions mountu yok | `/app/edge-functions` mountu |
| Function endpointi 503 | Kong runtime DNS adi eksik | `supabase-edge-functions` aliasi |
| SQL init dosyasi klasor | Repo deploymentta korunmamis | runtime bind mount kaynaklari |

## Rollback

Uygulama rollback'i image/compose commitine geri donerek yapilir. Database downgrade otomatik kabul edilmez. Semaya dokunan degisikliklerde expand-migrate-switch-cleanup ve ayri geri donus migrationi gerekir.
