# Coolify Baglama Notlari

Bu repo Coolify'de template olarak degil, Git repo tabanli Docker Compose resource olarak kullanilmalidir.

Tam sifir kurulum ve platform bagimsiz kurulum icin [DEPLOYMENT.md](./DEPLOYMENT.md), operasyon icin [OPERATIONS.md](./OPERATIONS.md) kullanilir.

## Onerilen Akis

1. GitHub'da repo olustur:
   - Onerilen ad: `selfhost-supabase-platform`

2. Coolify'de yeni resource:
   - Project: `Infrastructure` veya `Supabase`
   - Environment: `production`
   - Resource type: Docker Compose / Git repository
   - Repository: `selfhost-supabase-platform`
   - Compose file: `docker-compose.yml`
   - Base Directory: `/`
   - Preserve Repository During Deployment: acik

3. Domain:
   - Ornek: `supabase.example.com`
   - Mevcut production kaynagi migration bitene kadar korunur.
   - Yalniz `kong` servisine domain verilir.
   - Studio, auth, rest, realtime, storage, functions, meta ve supavisor icin ayri public domain uretilmez.

4. Env:
   - `.env.example` sunucuda `.env` icin referanstir.
   - Gercek secretlar GitHub'a commit edilmez.
   - Coolify Environment Variables ekraninda veya server `.env` dosyasinda saklanir.

5. Ilk calistirma:

```bash
docker compose config
docker compose pull
docker compose up -d
```

Coolify'de her Git degisikliginden sonra:

1. `Reload Compose File`
2. `Save`
3. `Redeploy`
4. Deployment commit SHA kontrolu
5. [OPERATIONS.md](./OPERATIONS.md) smoke testleri

6. Modern key aktivasyonu:

```bash
sh utils/generate-keys.sh
sh utils/add-new-auth-keys.sh --update-env
docker compose up -d --force-recreate
```

## Neden Coolify Supabase Template Degil?

Coolify template calisir, fakat resmi Docker repo kadar guncel auth key/JWKS ve operasyon dosyalarini net gostermeyebilir.

Bu repo ile:
- resmi Supabase dosyalari takip edilir,
- auth key modeli daha net yonetilir,
- upgrade farklari Git diff ile gorulur,
- mevcut calisan stack bozulmadan v2 test edilir.

## Bilinen Coolify Tuzaklari

- Runtime dizininde `volumes/db/*.sql`, `volumes/api/kong.yml` veya `volumes/pooler/pooler.exs` dosya yerine klasor olursa bind mount kaynagi kayiptir. Deployment durdurulur; repo korunumu ve compose yolu duzeltilir.
- Kong `name resolution failed` verirse compose network aliaslari kontrol edilir: `supabase-studio`, `supabase-edge-functions`, `realtime-dev.supabase-realtime`.
- `POSTGRES_HOST`, `POSTGRES_HOSTNAME` dahili olarak `db`; dahili port `5432` olmalidir. Dis port yalniz host erisimi icindir.
- Coolify ekrani eski commit gosteriyorsa redeploy yeterli degildir; once compose yeniden yuklenip kaydedilir.
