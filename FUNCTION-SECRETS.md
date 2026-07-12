# Edge Functions Secret Yonetimi

Self-host Studio, Edge Function secret degerlerini versioned JSON store uzerinden
yonetebilir. Degerler kaydedildikten sonra tekrar gosterilmez; liste API'si
yalniz ad, guncelleme zamani ve SHA-256 digest dondurur.

## Calisma modeli

- Studio path: `/app/function-secrets/.supabase/function-secrets.json`
- Edge Runtime path: `/run/function-secrets/.supabase/function-secrets.json`
- Kalicilik: `function-secrets` named volume
- Yeni dosya modu: `0600`
- Uygulama: sonraki function isteginde hot reload; container restart gerekmez

Function kaynaklari Studio'da salt okunur kalir. Secret volume kaynak bind
mountundan ayridir; bu ayrim Coolify release dizini degisimlerinde kaliciligi
korur ve nested mount sorununu onler.

`SUPABASE_*`, `SB_*`, `DENO_*`, `JWT_SECRET` ve `VERIFY_JWT` gibi runtime
isimleri yonetilemez. Gecersiz store son gecerli snapshot'i bozmaz ve loglara
secret degeri yazilmaz.

## Guvenli dogrulama

1. Studio'da **Edge Functions > Secrets** sayfasini acin.
2. Sentetik ve hassas olmayan bir secret ekleyin.
3. Listede plaintext yerine digest gorundugunu kontrol edin.
4. Yalniz degiskenin varligini boolean olarak donduren smoke function cagirin.
5. Secret'i guncelleyin; restart yapmadan sonraki istekte degisikligi dogrulayin.
6. Secret'i silin ve sonraki istekte kaldirildigini dogrulayin.
7. Redeploy sonrasi listenin named volume sayesinde korundugunu kontrol edin.

Secret dosyasini Git'e, image'a, deployment loguna veya sifresiz backup'a
eklemeyin. Bu ozellik Supabase Cloud control plane kopyasi degildir; tek
self-host stack icin denetlenebilir secret CRUD ve runtime yukleme katmanidir.
