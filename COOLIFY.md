# Coolify Baglama Notlari

Bu repo Coolify'de template olarak degil, Git repo tabanli Docker Compose resource olarak kullanilmalidir.

Tam sifir kurulum ve platform bagimsiz kurulum icin [DEPLOYMENT.md](./DEPLOYMENT.md), operasyon icin [OPERATIONS.md](./OPERATIONS.md) kullanilir.

## Onerilen Akis

1. Kaynak repoyu hazirla:
   - Public kaynak: `https://github.com/akin-umit/supabase-turkiye-community`
   - Kendi degisikliklerini yoneteceksen repoyu GitHub hesabina forkla.
   - Degisiklik yapmadan kullanacaksan public repoyu dogrudan Coolify kaynagi olarak sec.

2. Coolify'de yeni resource:
   - Project: `Infrastructure` veya `Supabase`
   - Environment: `production`
   - Resource type: Docker Compose / Git repository
   - Repository: `akin-umit/supabase-turkiye-community` veya kendi fork adresin
   - Compose file: `docker-compose.yml`
   - Base Directory: `/`
   - Preserve Repository During Deployment: acik

3. Domain:
   - Ornek: `supabase.example.com`
   - Mevcut production kaynagi migration bitene kadar korunur.
   - Yalniz `kong` servisine domain verilir.
   - Coolify UI ayri service/internal port alani gosteriyorsa:
     - Domain: `https://supabase.example.com`
     - Service/internal port: `8000`
   - Coolify UI tek domain input'u kullaniyorsa domain `https://supabase.example.com:8000` girilir. Buradaki `:8000` kullanicinin acacagi host portu degil, Coolify proxy'nin container icindeki `kong:8000` hedefine yonelmesi icindir.
   - Kullanicilar her iki durumda da disaridan `https://supabase.example.com` adresini acar.
   - Host port publish edilmez.
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

- `https://supabase.example.com` `503 Service Unavailable` donduruyorsa sorun genellikle API key degil, Coolify proxy'nin `kong` backend'ine ulasamamasidir. Once domainin yalniz `kong` servisine bagli oldugunu, backend/internal portun `8000` oldugunu, Compose dosyasinin yeniden yuklenip kaydedildigini ve `kong` health durumunu kontrol et.
- Tarayicida `http://supabase.example.com:8000` acildiginda Coolify login'e gidiyorsa bu host portunun Coolify tarafinda oldugunu gosterir; kullanicilar bu adresi kullanmaz. Public trafik `https://supabase.example.com` uzerinden Coolify proxy ile `kong:8000` internal portuna gitmelidir.
- Base Compose Coolify icin host `ports` yayinlamaz. Yerel CLI testlerinde host port gerekiyorsa yalniz local override dosyasi kullanilir; Coolify deploy'a dahil edilmez.
- Runtime dizininde `volumes/db/*.sql`, `volumes/api/kong.yml` veya `volumes/pooler/pooler.exs` dosya yerine klasor olursa bind mount kaynagi kayiptir. Deployment durdurulur; repo korunumu ve compose yolu duzeltilir.
- Kong `name resolution failed` verirse compose network aliaslari kontrol edilir: `supabase-studio`, `supabase-edge-functions`, `realtime-dev.supabase-realtime`.
- `POSTGRES_HOST`, `POSTGRES_HOSTNAME` dahili olarak `db`; dahili port `5432` olmalidir. Dis port yalniz host erisimi icindir.
- Coolify ekrani eski commit gosteriyorsa redeploy yeterli degildir; once compose yeniden yuklenip kaydedilir.
- Coolify acikca `docker compose -f docker-compose.yml` calistiriyorsa `.env` icindeki `COMPOSE_FILE` overlay listesi uygulanmaz. Opsiyonel servislerin gercekten calistigini container listesi ve log smoke testiyle dogrula.
- Vector calisiyor fakat `unhealthy` gorunuyorsa health endpointinde `localhost` yerine servis icinden `127.0.0.1` veya Compose aginda `vector` adini kullan; `localhost` IPv6 `::1` olarak cozulebilir.
- Runtime log testlerinde Compose proje adini sabitleme. `tests/test-container-logs.sh` varsayilan olarak calisma dizinini kullanir; gerekirse `COMPOSE_PROJECT_NAME` ile acikca ver.
- Edge Functions secret modeli ve Coolify `env_file` fallback'i icin [FUNCTION-SECRETS.md](./FUNCTION-SECRETS.md) belgesini kullan.

## Hata Haritasi

| Belirti | Anlami | Sonraki kontrol |
|---|---|---|
| `https://supabase.example.com` -> `503` | Coolify proxy saglikli backend bulamiyor. | Deploy commit, `Reload Compose File`, domainin `kong` servisine baglanmasi, internal port `8000`, `kong`/`studio`/`storage`/`auth`/`functions` health. |
| `http://supabase.example.com:8000` -> Coolify login | Host port 8000 Coolify katmaninda. | Bu URL'yi kullanma; public HTTPS domainini `kong:8000` backend'ine route et. |
| Studio root -> `401 Basic` | Korumali Studio girisi calisiyor. | Giris bilgileriyle UI smoke testlerini calistir. |
| Auth/REST -> `401 Key` | API key olmadan beklenen ret. | Key testlerini yalniz kontrollu smoke ortaminda yap. |
| Functions root -> `missing function name` | Edge Runtime'a ulasildi ama function path verilmedi. | Bilinen bir function path'i ile Gate 4 testinde cagir. |

## Degisiklik Nedeni Arsivi

Bu bolum kullaniciyi loglara bogmadan, neden eski onerinin degistigini kaydeder.
Tum tarihsel ozet ve ilgili belge baglantilari icin [CHANGELOG.md](./CHANGELOG.md#coolify-gateway-and-acceptance-documentation---2026-07-14) kaydina bak.

### Kong host port yayini ayrildi

- Eski yapi: Kong host `8000` portuna publish edilebiliyordu.
- Sorun: Bazi Coolify kurulumlarinda host `8000` Coolify paneli veya proxy
  katmani tarafindan kullanilir. Bu durumda `http://domain:8000` Supabase degil
  Coolify login acabilir.
- Yeni yapi: Coolify base Compose public host port yayinlamaz; domain proxy
  `kong:8000` internal portuna yonlendirilir. Yerel test gerekiyorsa local
  override kullanilir.
- Kullanici ne yapmali: Tarayicida `:8000` ile gezmemeli; public HTTPS domaini
  uzerinden test etmeli.

### Kong, Studio health sonucunu beklememeli

- Eski yapi: Kong baslamadan once Studio health durumunu bekleyebiliyordu.
- Sorun: Studio gecici olarak sagliksizsa veya login/proxy ayari degisiyorsa
  public gateway de kilitlenebilir ve tum route'lar `503` verebilir.
- Yeni yapi: Kong yalniz Studio container start durumuna bagli kalir; public
  gateway Studio health sonucundan bagimsiz ayakta kalabilir.
- Kullanici ne yapmali: `503` gorurse once `kong` ve domain/backend port
  sagligini kontrol etmeli; bunu API key hatasiyla karistirmamali.

### Coolify domain port notu netlestirildi

- Eski anlatim: `:8000` ifadesi kullanicinin tarayicida acacagi port gibi
  anlasilabiliyordu.
- Sorun: Coolify UI varyantlarinda `:8000` bazen backend/internal port bilgisidir,
  bazen ayri service port alaninda verilir. Bu ayrim karisinca route `503`
  veya Coolify login yonlendirmesi gorulebilir.
- Yeni anlatim: Ayri port alani varsa domain portsuz, service/internal port
  `8000`; tek domain input'u varsa `https://supabase.example.com:8000` backend
  hedefini ifade eder. Dis kullanici yine `https://supabase.example.com` acar.

## Kabul Sirasi

1. Once read-only Gate 3: public route, Kong, Auth, REST, Storage, Functions ve Supavisor saglik/ret kodlari.
2. Gate 3 birden fazla ard arda kontrolde stabil degilse Auth user, Storage bucket veya Realtime gibi yazmali testlere gecme.
3. Gate 4 yazmali testler yalniz sentetik veriyle yapilir ve test sonunda temizlenir.
4. Gate 5 Studio UI testi Basic auth girisinden sonra API Keys, Auth, Storage, Functions ve Logs sayfalarini tek tek kontrol eder.
