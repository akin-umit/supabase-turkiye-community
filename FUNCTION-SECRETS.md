# Edge Functions Secret Yonetimi

Supabase Cloud'daki secret CRUD ekrani managed control plane'e aittir. Self-host
kurulumda desteklenen model, Edge Runtime'a environment variable saglamaktir.
Bu repository bunu Git'e secret yazmadan tasinabilir bir dosya ile uygular.

## Kullanim

Varsayilan dosya `volumes/functions/.env` olur, `0600` izniyle saklanir ve Git
tarafindan izlenmez.

```bash
printf '%s\n' "$DEGER" | bash utils/manage-function-secrets.sh set SECRET_ADI
bash utils/manage-function-secrets.sh list
bash utils/manage-function-secrets.sh unset SECRET_ADI
docker compose up -d --force-recreate functions
```

`list` yalniz adlari gosterir. Degerler komut ciktisina yazilmaz. Cok satirli
degerler desteklenmez.

## Coolify Notu

Bazi Coolify surumleri kaynak Compose dosyasindaki servis `env_file` alanini
etkin Compose modeline aktarmaz. Functions servisi bu nedenle ayni mount edilen
dosyayi baslangicta guvenli bicimde yukleyen bir fallback icerir. Coolify'in
urettigi Compose dosyasini elle degistirmeyin; sonraki deploy degisikligi siler.

Compose icindeki runtime shell degiskenleri `$$line` seklinde kacirilmalidir.
Tek `$line`, Compose tarafindan container baslamadan genisletilir ve loader'i
bozar.

## Guvenli Dogrulama

Sentetik bir secret ekleyin, Functions container'ini yeniden olusturun ve degeri
yazdirmadan yalniz PID 1 environment'inda adini kontrol edin:

```bash
docker exec "$FUNCTIONS_CONTAINER" sh -c \
  'tr "\000" "\n" < /proc/1/environ | grep -q "^SYNTHETIC_SECRET="'
```

`docker exec ... test -n "$SYNTHETIC_SECRET"` yanlis negatif verebilir. Yeni
exec sureci, entrypoint'in PID 1'e sonradan export ettigi degiskenleri miras
almaz. Test bittiginde sentetik secret'i kaldirin ve container'i yeniden
olusturun.

Bu ozellik Supabase Cloud secret panelinin birebir kopyasi degildir; self-host
Edge Runtime icin denetlenebilir dosya tabanli secret yonetimidir.
